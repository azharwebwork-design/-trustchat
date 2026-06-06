import { Bell, Building2, KeyRound, LockKeyhole, Save, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { Avatar, Card, PageTitle } from "@/components/dashboard-ui";
import { requireUser } from "@/lib/auth";

export const metadata = { title: "الإعدادات" };

const tabs = [
  { label: "الملف الشخصي", icon: UserRound, active: true },
  { label: "مساحة العمل", icon: Building2 },
  { label: "الفريق والصلاحيات", icon: UsersRound },
  { label: "الإشعارات", icon: Bell },
  { label: "الأمان", icon: ShieldCheck },
  { label: "مفاتيح API", icon: KeyRound },
];

export default async function SettingsPage() {
  const user=await requireUser();
  const [firstName,...rest]=user.name.split(" ");
  const lastName=rest.join(" ");
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageTitle title="الإعدادات" description="خصّص حسابك ومساحة عمل فريقك." />
      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        <Card className="h-fit p-3">
          <nav className="space-y-1">{tabs.map(({label,icon:Icon,active})=><button key={label} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-xs font-bold ${active?"bg-brand/10 text-brand-dark dark:text-brand":"muted hover:bg-black/[.03] dark:hover:bg-white/[.03]"}`}><Icon size={18}/>{label}</button>)}</nav>
        </Card>
        <div className="space-y-6">
          <Card className="p-6 md:p-8">
            <div><h2 className="font-bold">المعلومات الشخصية</h2><p className="muted mt-1 text-xs">حدّث صورتك وبيانات التواصل الخاصة بك.</p></div>
            <div className="mt-7 flex items-center gap-5 border-b border-ui pb-7"><Avatar initials={user.name.slice(0,2)} color="bg-gradient-to-br from-orange-400 to-orange-700" size="size-20"/><div><button className="rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white">تغيير الصورة</button><button className="muted mr-2 rounded-xl border border-ui px-4 py-2 text-xs font-bold">حذف</button><p className="muted mt-2 text-[9px]">PNG أو JPG، بحد أقصى 2MB</p></div></div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="الاسم الأول" value={firstName}/><Field label="اسم العائلة" value={lastName}/><Field label="البريد الإلكتروني" value={user.email} type="email"/><Field label="رقم الجوال" value={user.phone??""}/></div>
            <label className="mt-5 block text-xs font-bold">نبذة مختصرة<textarea rows={4} defaultValue={`${user.title??"عضو الفريق"} في ${user.workspace.name}.`} className="mt-2 w-full resize-none rounded-xl border border-ui bg-transparent p-3 outline-none focus:border-brand"/></label>
            <button className="mt-6 flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-xs font-bold text-white"><Save size={16}/> حفظ التغييرات</button>
          </Card>
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-violet-500/10 text-violet-500"><LockKeyhole size={19}/></span><div><h2 className="font-bold">كلمة المرور</h2><p className="muted mt-1 text-xs">استخدم كلمة مرور قوية وفريدة.</p></div></div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2"><Field label="كلمة المرور الحالية" value="••••••••" type="password"/><div/><Field label="كلمة المرور الجديدة" value="••••••••" type="password"/><Field label="تأكيد كلمة المرور" value="••••••••" type="password"/></div>
            <button className="mt-6 rounded-xl border border-ui px-5 py-3 text-xs font-bold">تحديث كلمة المرور</button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({label,value,type="text"}:{label:string;value:string;type?:string}) {
  return <label className="text-xs font-bold">{label}<input type={type} defaultValue={value} className="mt-2 w-full rounded-xl border border-ui bg-transparent px-4 py-3 outline-none focus:border-brand"/></label>;
}
