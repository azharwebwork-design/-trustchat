"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const messageSchema = z.object({
  conversationId: z.string().min(1),
  content: z.string().trim().min(1).max(4000),
});

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
