"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";

const links = [
  ["الرئيسية", "/"],
  ["المزايا", "/features"],
  ["الأسعار", "/pricing"],
  ["من نحن", "/about"],
  ["تواصل معنا", "/contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-ui bg-[color:var(--page)]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-[84px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="muted text-sm font-bold transition hover:text-brand">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link href="/login" className="px-3 text-sm font-bold">تسجيل الدخول</Link>
          <Link href="/register" className="rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-brand-dark">
            ابدأ مجاناً
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-xl border border-ui surface">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-ui surface p-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-semibold hover:bg-brand/10 hover:text-brand">
                {label}
              </Link>
            ))}
            <Link href="/login" className="mt-3 rounded-xl border border-ui px-4 py-3 text-center font-bold">تسجيل الدخول</Link>
            <Link href="/register" className="rounded-xl bg-brand px-4 py-3 text-center font-bold text-white">ابدأ مجاناً</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
