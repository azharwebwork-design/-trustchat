import { Bell, Building2, KeyRound, LockKeyhole, Save, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { updatePassword, updateProfile } from "@/app/actions/dashboard";
import { ComingSoonButton } from "@/components/coming-soon-button";
import { Avatar, Card, PageTitle } from "@/components/dashboard-ui";
import { requireUser } from "@/lib/auth";

export const metadata = { title: "الإعدادات" };
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const tabs = [
  { label: "الملف الشخصي", icon: UserRound, active: true },
  { label: "مساحة العمل", icon: Building2 },
  { label: "الفريق والصلاحيات", icon: UsersRound },
  { label: "الإشعارات", icon: Bell },
  { label: "الأمان", icon: ShieldCheck },
  { label: "مفاتيح API", icon: KeyRound },
];

export default async function SettingsPage({ searchParams }: { searchParams: SearchParams }) {
  const [user, params] = await Promise.all([requireUser(), searchParams]);
  const [firstName, ...rest] = user.name.split(" ");
  const lastName = rest.join(" ");
  const message = params.saved === "profile" ? "تم حفظ بيانات الملف الشخصي." : params.saved === "password" ? "تم تحديث كلمة المرور." : null;
  const error = params.error === "email" ? "البريد الإلكتروني مستخدم في حساب آخر." : params.error === "current" ? "كلمة المرور الحالية غير صحيحة." : params.error ? "تحقق من البيانات المدخلة وحاول مجددًا." : null;

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageTitle title="الإعدادات" description="خصّص حسابك ومساحة عمل فريقك." />
      {message && <p className="mb-5 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-700 dark:text-emerald-400">{message}</p>}
      {error && <p className="mb-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">{error}</p>}
      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        <Card className="h-fit p-3">
          <nav className="space-y-1">
            {tabs.map(({ label, icon: Icon, active }) => active
              ? <span key={label} className="flex w-full items-center gap-3 rounded-xl bg-brand/10 px-3 py-3 text-right text-xs font-bold text-brand-dark dark:text-brand"><Icon size={18} />{label}</span>
              : <ComingSoonButton key={label} className="muted flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-xs font-bold"><Icon size={18} />{label}</ComingSoonButton>
            )}
          </nav>
        </Card>
        <div className="space-y-6">
          <Card className="p-6 md:p-8">
            <div><h2 className="font-bold">المعلومات الشخصية</h2><p className="muted mt-1 text-xs">حدّث بيانات التواصل الخاصة بك.</p></div>
            <div className="mt-7 flex items-center gap-5 border-b border-ui pb-7"><Avatar initials={user.name.slice(0, 2)} color="bg-gradient-to-br from-orange-400 to-orange-700" size="size-20" /><div><ComingSoonButton className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white">تغيير الصورة</ComingSoonButton><p className="muted mt-2 text-[9px]">رفع الصور سيكون متاحًا قريبًا</p></div></div>
            <form action={updateProfile}>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field name="firstName" label="الاسم الأول" value={firstName} required />
                <Field name="lastName" label="اسم العائلة" value={lastName} />
                <Field name="email" label="البريد الإلكتروني" value={user.email} type="email" required />
                <Field name="phone" label="رقم الجوال" value={user.phone ?? ""} />
              </div>
              <Field name="title" label="المسمى الوظيفي" value={user.title ?? ""} className="mt-5 block" />
              <button className="mt-6 flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-xs font-bold text-white"><Save size={16} /> حفظ التغييرات</button>
            </form>
          </Card>
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-violet-500/10 text-violet-500"><LockKeyhole size={19} /></span><div><h2 className="font-bold">كلمة المرور</h2><p className="muted mt-1 text-xs">استخدم كلمة مرور قوية وفريدة.</p></div></div>
            <form action={updatePassword}>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field name="currentPassword" label="كلمة المرور الحالية" type="password" required /><div />
                <Field name="newPassword" label="كلمة المرور الجديدة" type="password" minLength={8} required />
                <Field name="confirmPassword" label="تأكيد كلمة المرور" type="password" minLength={8} required />
              </div>
              <button className="mt-6 rounded-xl border border-ui px-5 py-3 text-xs font-bold hover:border-brand">تحديث كلمة المرور</button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({ name, label, value, type = "text", required = false, minLength, className = "" }: { name: string; label: string; value?: string; type?: string; required?: boolean; minLength?: number; className?: string }) {
  return <label className={`text-xs font-bold ${className}`}>{label}<input name={name} type={type} defaultValue={value} required={required} minLength={minLength} className="mt-2 w-full rounded-xl border border-ui bg-transparent px-4 py-3 outline-none focus:border-brand" /></label>;
}
