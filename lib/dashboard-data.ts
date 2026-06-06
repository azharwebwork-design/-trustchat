import {
  BarChart3, Bot, Cable, ContactRound, CreditCard, Inbox, LayoutDashboard,
  Megaphone, MessageSquareText, Settings,
} from "lucide-react";

export const dashboardNav = [
  { label: "نظرة عامة", href: "/dashboard", icon: LayoutDashboard },
  { label: "صندوق الفريق", href: "/dashboard/inbox", icon: Inbox, badge: "12" },
  { label: "المحادثات", href: "/dashboard/conversations", icon: MessageSquareText },
  { label: "جهات الاتصال", href: "/dashboard/contacts", icon: ContactRound },
  { label: "الحملات", href: "/dashboard/campaigns", icon: Megaphone },
  { label: "منشئ الرد الآلي", href: "/dashboard/chatbot", icon: Bot },
  { label: "التحليلات", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "التكاملات", href: "/dashboard/integrations", icon: Cable },
  { label: "الفوترة", href: "/dashboard/billing", icon: CreditCard },
  { label: "الإعدادات", href: "/dashboard/settings", icon: Settings },
];
