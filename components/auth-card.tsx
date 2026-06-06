"use client";

import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useActionState, useState } from "react";
import { login, register, type AuthState } from "@/app/actions/auth";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";

const initialState: AuthState = {};

export function AuthCard({ mode }: { mode: "login" | "register" | "forgot" }) {
  const [show, setShow] = useState(false);
  const action = mode === "register" ? register : login;
  const [state, formAction, pending] = useActionState(action, initialState);
  const copy = {
    login: ["مرحباً بعودتك", "سجّل دخولك للمتابعة إلى مساحة عملك"],
    register: ["ابدأ مع TrustChat", "أنشئ حسابك وابدأ تجربتك المجانية"],
    forgot: ["استعادة كلمة المرور", "هذه الميزة ستكون متاحة في الإصدار القادم"],
  }[mode];

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="premium-dark relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute left-12 top-28 size-56 rounded-full border border-white/10" />
        <div className="relative [&_.text-main]:!text-white [&_.muted]:!text-white/55"><Brand /></div>
        <div className="relative max-w-lg">
          <span className="text-6xl text-brand">“</span>
          <h2 className="text-3xl font-black leading-relaxed">TrustChat جعل فريقنا أقرب لعملائنا، وأسرع في كل محادثة.</h2>
          <p className="mt-5 text-white/55">أكثر من مجرد صندوق وارد، إنها مساحة عمل فريقك للنمو.</p>
        </div>
        <p className="relative text-xs text-white/45">موثوق من فرق طموحة في المنطقة</p>
      </section>
      <section className="relative flex items-center justify-center px-5 py-12">
        <div className="absolute left-5 top-5"><ThemeToggle /></div>
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden"><Brand /></div>
          <h1 className="text-3xl font-black">{copy[0]}</h1>
          <p className="muted mt-2">{copy[1]}</p>

          {mode === "forgot" ? (
            <div className="mt-8 rounded-2xl border border-brand/15 bg-brand/10 p-5 text-sm leading-7">
              تواصل مع مدير مساحة العمل لإعادة تعيين كلمة المرور.
            </div>
          ) : (
            <form action={formAction} className="mt-8 space-y-5">
              {mode === "register" && (
                <AuthField
                  icon={UserRound}
                  label="الاسم الكامل"
                  name="name"
                  placeholder="أحمد محمد"
                  error={state.errors?.name?.[0]}
                />
              )}
              <AuthField
                icon={Mail}
                label="البريد الإلكتروني"
                name="email"
                placeholder="name@company.com"
                type="email"
                error={state.errors?.email?.[0]}
              />
              <label className="block text-sm font-bold">
                كلمة المرور
                <div className="mt-2 flex items-center rounded-xl border border-ui surface px-4 focus-within:border-brand">
                  <LockKeyhole size={18} className="muted" />
                  <input
                    name="password"
                    required
                    minLength={8}
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    className="min-w-0 flex-1 bg-transparent px-3 py-3.5 outline-none"
                  />
                  <button type="button" onClick={() => setShow(!show)} className="muted" aria-label="إظهار كلمة المرور">
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {state.errors?.password?.[0] && <span className="mt-2 block text-xs text-red-500">{state.errors.password[0]}</span>}
              </label>
              {mode === "login" && (
                <div className="flex items-center justify-between text-sm">
                  <label className="muted flex cursor-not-allowed items-center gap-2"><input type="checkbox" disabled className="accent-brand" /> تذكرني <small>قريبًا</small></label>
                  <Link href="/forgot-password" className="font-bold text-brand-dark dark:text-brand">نسيت كلمة المرور؟</Link>
                </div>
              )}
              {state.message && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">{state.message}</p>}
              <button disabled={pending} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 font-bold text-white hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70">
                {pending ? "جارٍ المتابعة..." : mode === "login" ? "تسجيل الدخول" : "إنشاء الحساب"}
                {!pending && <ArrowLeft size={18} />}
              </button>
            </form>
          )}

          <p className="muted mt-7 text-center text-sm">
            {mode === "login" ? (
              <>ليس لديك حساب؟ <Link href="/register" className="font-bold text-brand-dark dark:text-brand">أنشئ حساباً</Link></>
            ) : mode === "register" ? (
              <>لديك حساب بالفعل؟ <Link href="/login" className="font-bold text-brand-dark dark:text-brand">سجّل الدخول</Link></>
            ) : (
              <Link href="/login" className="font-bold text-brand-dark dark:text-brand">العودة لتسجيل الدخول</Link>
            )}
          </p>
          {mode === "login" && (
            <div className="muted mt-6 rounded-xl border border-ui p-3 text-center text-[11px]">
              الحساب التجريبي: <b dir="ltr">demo@trustchat.com</b> / <b dir="ltr">TrustChat123!</b>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function AuthField({
  icon: Icon,
  label,
  name,
  placeholder,
  type = "text",
  error,
}: {
  icon: typeof Mail;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <div className="mt-2 flex items-center rounded-xl border border-ui surface px-4 focus-within:border-brand">
        <Icon size={18} className="muted" />
        <input name={name} required type={type} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent px-3 py-3.5 outline-none" />
      </div>
      {error && <span className="mt-2 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
