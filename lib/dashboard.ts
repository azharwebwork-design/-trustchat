import "server-only";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const number = new Intl.NumberFormat("en-US");
const shortDate = new Intl.DateTimeFormat("ar-SA", { day: "numeric", month: "short" });
const shortTime = new Intl.DateTimeFormat("ar-SA", { hour: "numeric", minute: "2-digit" });

export function formatNumber(value: number) {
  return number.format(value);
}

export function formatDate(value: Date) {
  const today = new Date();
  if (value.toDateString() === today.toDateString()) return "اليوم";
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (value.toDateString() === yesterday.toDateString()) return "أمس";
  return shortDate.format(value);
}

export function formatTime(value: Date) {
  return shortTime.format(value);
}

export async function getOverviewData() {
  const user = await requireUser();
  const where = { workspaceId: user.workspaceId };
  const [conversationCount, closedCount, contactCount, unread, conversations, team] = await Promise.all([
    prisma.conversation.count({ where }),
    prisma.conversation.count({ where: { ...where, status: "CLOSED" } }),
    prisma.contact.count({ where }),
    prisma.conversation.aggregate({ where, _sum: { unreadCount: true } }),
    prisma.conversation.findMany({
      where,
      orderBy: { lastMessageAt: "desc" },
      take: 4,
      include: {
        contact: true,
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    }),
    prisma.user.findMany({ where, orderBy: { createdAt: "asc" }, take: 4 }),
  ]);

  return {
    user,
    conversationCount,
    closedCount,
    contactCount,
    unreadCount: unread._sum.unreadCount ?? 0,
    conversations: conversations.map((item) => ({
      id: item.id,
      name: item.contact.name,
      msg: item.messages[0]?.content ?? "لا توجد رسائل",
      time: formatTime(item.lastMessageAt),
      unread: item.unreadCount,
      initials: item.contact.initials,
      color: item.contact.color,
    })),
    team: team.map((member) => ({
      name: member.name,
      role: member.title ?? "عضو الفريق",
      state: member.status === "ONLINE" ? "متاحة" : member.status === "BUSY" ? "مشغول" : "غير متصل",
      initials: member.name.slice(0, 2),
      color: member.status === "BUSY" ? "bg-blue-500" : member.status === "OFFLINE" ? "bg-amber-500" : "bg-pink-500",
    })),
  };
}

export async function getContactsData() {
  const user = await requireUser();
  const contacts = await prisma.contact.findMany({
    where: { workspaceId: user.workspaceId },
    orderBy: { createdAt: "desc" },
  });
  return {
    total: contacts.length,
    contacts: contacts.map((contact) => ({
      ...contact,
      tag: contact.tag ?? "بدون وسم",
      email: contact.email ?? "—",
      date: formatDate(contact.createdAt),
    })),
  };
}

export async function getConversationsData() {
  const user = await requireUser();
  const conversations = await prisma.conversation.findMany({
    where: { workspaceId: user.workspaceId },
    orderBy: { lastMessageAt: "desc" },
    include: {
      contact: true,
      assignedTo: true,
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  return conversations.map((conversation) => ({
    id: conversation.id,
    name: conversation.contact.name,
    phone: conversation.contact.phone,
    email: conversation.contact.email ?? "—",
    tag: conversation.contact.tag ?? "بدون وسم",
    initials: conversation.contact.initials,
    color: conversation.contact.color,
    assignedTo: conversation.assignedTo?.name ?? "غير معيّن",
    unread: conversation.unreadCount,
    time: formatTime(conversation.lastMessageAt),
    msg: conversation.messages.at(-1)?.content ?? "لا توجد رسائل",
    messages: conversation.messages.map((message) => ({
      id: message.id,
      text: message.content,
      time: formatTime(message.createdAt),
      mine: message.direction === "OUTBOUND",
    })),
  }));
}

export async function getCampaignsData() {
  const user = await requireUser();
  const campaigns = await prisma.campaign.findMany({
    where: { workspaceId: user.workspaceId },
    orderBy: { createdAt: "desc" },
  });
  return campaigns.map((campaign) => ({
    ...campaign,
    statusLabel:
      campaign.status === "SENDING" ? "قيد الإرسال" :
      campaign.status === "COMPLETED" ? "مكتملة" :
      campaign.status === "SCHEDULED" ? "مجدولة" : "مسودة",
    readRate: campaign.sentCount ? `${Math.round((campaign.readCount / campaign.sentCount) * 100)}%` : "—",
    date: campaign.scheduledAt ? shortDate.format(campaign.scheduledAt) : campaign.completedAt ? shortDate.format(campaign.completedAt) : "غير محدد",
  }));
}

export async function getAnalyticsData() {
  const user = await requireUser();
  const where = { workspaceId: user.workspaceId };
  const [conversations, contacts, messages, team] = await Promise.all([
    prisma.conversation.count({ where }),
    prisma.contact.count({ where }),
    prisma.message.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "asc" },
      include: { _count: { select: { assignedConversations: true } } },
      take: 4,
    }),
  ]);
  return { conversations, contacts, messages, team };
}
