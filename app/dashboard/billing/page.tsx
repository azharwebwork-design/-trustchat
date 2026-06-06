import { Check, CreditCard, Download, FileText, Sparkles } from "lucide-react";
import { Card, PageTitle } from "@/components/dashboard-ui";

export const metadata = { title: "الفوترة" };

const invoices = [
  ["INV-2026-006", "1 يونيو 2026", "499.00 ر.س", "مدفوعة"],
  ["INV-2026-005", "1 مايو 2026", "499.00 ر.س", "مدفوعة"],
  ["INV-2026-004", "1 أبريل 2026", "499.00 ر.س", "مدفوعة"],
];

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageTitle title="الفوترة والاشتراك" description="أدِر خطتك، وسائل الدفع والفواتير." />
      <Card className="premium-dark relative overflow-hidden p-7 text-white md:p-9">
        <div className="absolute -left-20 -top-24 size-72 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative flex flex-col gap-7 md:flex-row md:items-center">
          <div className="flex-1"><span className="flex w-fit items-center gap-2 rounded-full bg-brand/20 px-3 py-1 text-xs font-bold text-brand"><Sparkles size={14}/> الخطة الحالية</span><h2 className="mt-4 text-3xl font-black">الخطة الاحترافية</h2><p className="mt-2 text-sm text-white/55">499 ر.س شهرياً · التجديد في 1 يوليو 2026</p></div>
          <div className="flex gap-3"><button className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold">إلغاء الاشتراك</button><button className="rounded-xl bg-brand px-5 py-3 text-sm font-bold">ترقية الخطة</button></div>
        </div>
        <div className="relative mt-8 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-3">{[["المستخدمون","7 من 10"],["جهات الاتصال","6,820 من 10,000"],["الرسائل الشهرية","68,240 من 100,000"]].map(([label,value])=><div key={label}><div className="flex justify-between text-xs"><span className="text-white/55">{label}</span><b>{value}</b></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[68%] rounded-full bg-brand"/></div></div>)}</div>
      </Card>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6"><div className="flex items-center justify-between"><div><h2 className="font-bold">وسيلة الدفع</h2><p className="muted mt-1 text-xs">البطاقة المستخدمة للتجديد التلقائي</p></div><CreditCard className="text-brand" size={21}/></div><div className="mt-6 flex items-center gap-4 rounded-2xl border border-ui p-4"><span className="grid h-10 w-16 place-items-center rounded-lg bg-blue-600 text-xs font-black italic text-white">VISA</span><div className="flex-1"><b className="text-sm" dir="ltr">•••• •••• •••• 4242</b><p className="muted mt-1 text-[10px]">تنتهي في 09/28</p></div><span className="flex items-center gap-1 text-[10px] text-brand-dark dark:text-brand"><Check size={13}/> أساسية</span></div><button className="mt-4 w-full rounded-xl border border-ui py-2.5 text-xs font-bold">تحديث وسيلة الدفع</button></Card>
        <Card className="p-6"><div className="flex items-center justify-between"><div><h2 className="font-bold">بيانات الفوترة</h2><p className="muted mt-1 text-xs">تظهر هذه البيانات في فواتيرك</p></div><FileText className="text-brand" size={21}/></div><div className="mt-6 space-y-3 text-xs"><p><span className="muted inline-block w-28">اسم المنشأة</span> شركة TrustChat للتقنية</p><p><span className="muted inline-block w-28">الرقم الضريبي</span> 310123456700003</p><p><span className="muted inline-block w-28">البريد</span> billing@company.sa</p></div><button className="mt-5 w-full rounded-xl border border-ui py-2.5 text-xs font-bold">تعديل البيانات</button></Card>
      </div>
      <Card className="mt-6 overflow-hidden"><div className="border-b border-ui p-5"><h2 className="font-bold">سجل الفواتير</h2><p className="muted mt-1 text-xs">حمّل فواتير اشتراكك السابقة</p></div><div className="divide-y divide-[color:var(--border)]">{invoices.map(([number,date,total,status])=><div key={number} className="grid grid-cols-[1.3fr_1fr_1fr_1fr] items-center px-5 py-4 text-xs"><b>{number}</b><span className="muted">{date}</span><span>{total}</span><div className="flex items-center justify-between"><span className="rounded-full bg-brand/10 px-3 py-1 text-brand-dark dark:text-brand">{status}</span><button className="muted"><Download size={16}/></button></div></div>)}</div></Card>
    </div>
  );
}
