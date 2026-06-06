"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const messageSchema = z.object({
  conversationId: z.string().min(1),
  content: z.string().trim().min(1).max(4000),
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  email: z.union([z.string().trim().email(), z.literal("")]),
  tag: z.string().trim().max(50),
});

const conversationSchema = z.object({
  contactId: z.string().min(1),
  subject: z.string().trim().max(160),
  content: z.string().trim().min(1).max(4000),
});

const campaignSchema = z.object({
  name: z.string().trim().min(3).max(140),
  audienceCount: z.coerce.number().int().min(0).max(1_000_000),
  status: z.enum(["DRAFT", "SCHEDULED"]),
});

const profileSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().max(50),
  email: z.string().trim().email(),
  phone: z.string().trim().max(30),
  title: z.string().trim().max(100),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export async function createContact(formData: FormData) {
  const user = await requireUser();
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/dashboard/contacts?new=1&error=invalid");

  const existing = await prisma.contact.findFirst({
    where: { workspaceId: user.workspaceId, phone: parsed.data.phone },
    select: { id: true },
  });
  if (existing) redirect("/dashboard/contacts?new=1&error=duplicate");

  await prisma.contact.create({
    data: {
      workspaceId: user.workspaceId,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      tag: parsed.data.tag || null,
      initials: parsed.data.name.slice(0, 2),
    },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/contacts");
  redirect("/dashboard/contacts?created=1");
}

export async function createConversation(formData: FormData) {
  const user = await requireUser();
  const parsed = conversationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/dashboard/conversations?new=1&error=invalid");

  const contact = await prisma.contact.findFirst({
    where: { id: parsed.data.contactId, workspaceId: user.workspaceId },
    select: { id: true },
  });
  if (!contact) throw new Error("Unauthorized");

  const now = new Date();
  const conversation = await prisma.conversation.create({
    data: {
      workspaceId: user.workspaceId,
      contactId: contact.id,
      assignedToId: user.id,
      subject: parsed.data.subject || null,
      lastMessageAt: now,
      messages: {
        create: {
          workspaceId: user.workspaceId,
          senderId: user.id,
          content: parsed.data.content,
          direction: "OUTBOUND",
          readAt: now,
          createdAt: now,
        },
      },
    },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/conversations");
  revalidatePath("/dashboard/inbox");
  redirect(`/dashboard/conversations?conversation=${conversation.id}`);
}

export async function createCampaign(formData: FormData) {
  const user = await requireUser();
  const parsed = campaignSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/dashboard/campaigns?new=1&error=invalid");

  await prisma.campaign.create({
    data: {
      workspaceId: user.workspaceId,
      name: parsed.data.name,
      audienceCount: parsed.data.audienceCount,
      status: parsed.data.status,
      scheduledAt: parsed.data.status === "SCHEDULED" ? new Date() : null,
    },
  });
  revalidatePath("/dashboard/campaigns");
  redirect("/dashboard/campaigns?created=1");
}

export async function updateProfile(formData: FormData) {
  const user = await requireUser();
  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/dashboard/settings?error=profile");

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findFirst({
    where: { email, NOT: { id: user.id } },
    select: { id: true },
  });
  if (existing) redirect("/dashboard/settings?error=email");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: `${parsed.data.firstName} ${parsed.data.lastName}`.trim(),
      email,
      phone: parsed.data.phone || null,
      title: parsed.data.title || null,
    },
  });
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard/settings?saved=profile");
}

export async function updatePassword(formData: FormData) {
  const user = await requireUser();
  const parsed = passwordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success || parsed.data.newPassword !== parsed.data.confirmPassword) {
    redirect("/dashboard/settings?error=password");
  }
  if (!(await bcrypt.compare(parsed.data.currentPassword, user.passwordHash))) {
    redirect("/dashboard/settings?error=current");
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(parsed.data.newPassword, 12) },
  });
  redirect("/dashboard/settings?saved=password");
}

export async function sendMessage(formData: FormData) {
  const user = await requireUser();
  const parsed = messageSchema.safeParse({
    conversationId: formData.get("conversationId"),
    content: formData.get("content"),
  });
  if (!parsed.success) return;

  const conversation = await prisma.conversation.findFirst({
    where: { id: parsed.data.conversationId, workspaceId: user.workspaceId },
    select: { id: true },
  });
  if (!conversation) throw new Error("Unauthorized");

  const now = new Date();
  await prisma.$transaction([
    prisma.message.create({
      data: {
        workspaceId: user.workspaceId,
        conversationId: conversation.id,
        senderId: user.id,
        content: parsed.data.content,
        direction: "OUTBOUND",
        readAt: now,
        createdAt: now,
      },
    }),
    prisma.conversation.update({
      where: { id: conversation.id },
      data: { lastMessageAt: now, unreadCount: 0, assignedToId: user.id },
    }),
  ]);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/conversations");
  revalidatePath("/dashboard/inbox");
}
