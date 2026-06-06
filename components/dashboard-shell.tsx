"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";
import { dashboardNav } from "@/lib/dashboard-data";
import { logout } from "@/app/actions/auth";

export function DashboardShell({ children, user, unreadCount }: { children: React.ReactNode; user: { name: string; email: string; title: string }; unreadCount: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[color:var(--page)]">
      {open && <button aria-label="إغلاق القائمة" className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-ui bg-[color:var(--card)]/95 shadow-2xl shadow-black/5 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-20 items-center justify-between border-b border-ui px-6"><Brand/><button className="lg:hidden" onClick={()=>setOpen(false)}><X size={20}/></button></div>
        <nav className="no-scrollbar flex-1 overflow-y-auto p-4">
          <p className="muted mb-3 px-3 text-[10px] font-bold">مساحة العمل</p>
          <div className="space-y-1">
            {dashboardNav.map(({label,href,icon:Icon,badge}) => {
              const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
              const visibleBadge = href === "/dashboard/inbox" ? (unreadCount ? String(unreadCount) : undefined) : badge;
              return <Link key={href} href={href} onClick={()=>setOpen(false)} className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${active?"bg-brand/10 text-brand-dark dark:text-brand":"muted hover:bg-black/[.03] hover:text-main dark:hover:bg-white/[.04]"}`}>
                {active&&<span className="absolute -right-4 h-7 w-1 rounded-l-full bg-brand"/>}<Icon size={19}/><span className="flex-1">{label}</span>{visibleBadge&&<span className="rounded-full bg-brand px-2 py-0.5 text-[10px] text-white">{visibleBadge}</span>}
              </Link>
            })}
          </div>
        </nav>
        <div className="border-t border-ui p-4">
          <div className="mb-3 rounded-2xl border border-brand/10 bg-brand/10 p-4"><div className="flex justify-between text-xs font-bold"><span>الخطة الاحترافية</span><span className="text-brand-dark dark:text-brand">68%</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-brand/15"><div className="h-full w-[68%] rounded-full bg-brand"/></div><p className="muted mt-2 text-[10px]">6,820 من 10,000 محادثة</p></div>
          <div className="flex items-center gap-3 px-2"><span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-orange-400 to-orange-700 text-xs font-bold text-white">{user.name.slice(0,2)}</span><div className="min-w-0 flex-1"><b className="block truncate text-xs">{user.name}</b><small className="muted block truncate">{user.title}</small></div><form action={logout}><button aria-label="تسجيل الخروج" title="تسجيل الخروج" className="grid size-9 place-items-center rounded-lg text-red-500 hover:bg-red-500/10"><LogOut size={17}/></button></form></div>
        </div>
      </aside>
      <div className="lg:mr-72">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-ui bg-[color:var(--page)]/80 px-5 backdrop-blur-2xl md:px-8">
          <button className="grid size-10 place-items-center rounded-xl border border-ui surface lg:hidden" onClick={()=>setOpen(true)}><Menu size={20}/></button>
          <form action="/dashboard/conversations" className="hidden max-w-md flex-1 items-center rounded-xl border border-ui surface px-4 md:flex"><Search size={18} className="muted"/><input name="q" placeholder="ابحث عن محادثة أو جهة اتصال..." className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"/><button className="text-xs font-bold text-brand-dark dark:text-brand">بحث</button></form>
          <div className="mr-auto flex items-center gap-2"><ThemeToggle/><button disabled title="الإشعارات قريبًا" aria-label="الإشعارات قريبًا" className="relative grid size-10 cursor-not-allowed place-items-center rounded-xl border border-ui surface opacity-55"><Bell size={18}/><span className="absolute left-2 top-2 size-2 rounded-full bg-brand ring-2 ring-white dark:ring-[#101b16]"/></button></div>
        </header>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
