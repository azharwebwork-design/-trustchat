import { Download, Filter, Plus, Search, Upload } from "lucide-react";
import { Avatar, Card, MoreButton, PageTitle, TableHead } from "@/components/dashboard-ui";
import { formatNumber, getContactsData } from "@/lib/dashboard";

export const metadata = { title: "جهات الاتصال" };

export default async function ContactsPage() {
  const {contacts,total}=await getContactsData();
  return (
    <div className="mx-auto max-w-[1500px]">
      <PageTitle title="جهات الاتصال" description="نظّم بيانات عملائك وشرائحهم في قاعدة موحّدة." action={<button className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white"><Plus size={18} /> إضافة جهة اتصال</button>} />
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        {[["إجمالي العملاء", formatNumber(total), "من قاعدة البيانات"], ["عملاء جدد هذا الشهر", formatNumber(contacts.filter(x=>x.date==="اليوم").length), "+12.4%"], ["الشرائح النشطة", formatNumber(new Set(contacts.map(x=>x.tag)).size), "حسب الوسوم"]].map(([label, value, note]) => (
          <Card key={label} className="p-5"><p className="muted text-xs">{label}</p><div className="mt-2 flex items-end justify-between"><strong className="text-2xl font-black">{value}</strong><span className="text-[10px] font-bold text-brand-dark dark:text-brand">{note}</span></div></Card>
        ))}
      </div>
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ui p-4 md:flex-row md:items-center">
          <div className="flex max-w-md flex-1 items-center rounded-xl border border-ui px-3"><Search size={17} className="muted" /><input className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" placeholder="ابحث بالاسم أو رقم الجوال..." /></div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-xl border border-ui px-3 py-2.5 text-xs font-bold"><Filter size={16} /> تصفية</button>
            <button className="flex items-center gap-2 rounded-xl border border-ui px-3 py-2.5 text-xs font-bold"><Upload size={16} /> استيراد</button>
            <button className="flex items-center gap-2 rounded-xl border border-ui px-3 py-2.5 text-xs font-bold"><Download size={16} /> تصدير</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <TableHead><div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_40px]"><span>جهة الاتصال</span><span>رقم الجوال</span><span>الوسم</span><span>تاريخ الإضافة</span><span /></div></TableHead>
          <div className="min-w-[650px] divide-y divide-[color:var(--border)]">
            {contacts.map((contact) => (
              <div key={contact.id} className="grid grid-cols-[2fr_1.5fr_1fr_1fr_40px] items-center px-5 py-4 text-xs hover:bg-black/[.015] dark:hover:bg-white/[.02]">
                <div className="flex items-center gap-3"><Avatar initials={contact.initials} color={contact.color} /><div><b className="block">{contact.name}</b><small className="muted">{contact.email}</small></div></div>
                <span dir="ltr" className="text-right">{contact.phone}</span>
                <span><small className="rounded-full bg-brand/10 px-3 py-1 text-brand-dark dark:text-brand">{contact.tag}</small></span>
                <span className="muted">{contact.date}</span>
                <MoreButton />
              </div>
            ))}
          </div>
        </div>
        <div className="muted flex items-center justify-between border-t border-ui px-5 py-4 text-xs"><span>عرض {contacts.length} من {formatNumber(total)}</span><div className="flex gap-2"><button className="rounded-lg border border-ui px-3 py-1.5">السابق</button><button className="rounded-lg bg-brand px-3 py-1.5 text-white">1</button><button className="rounded-lg border border-ui px-3 py-1.5">التالي</button></div></div>
      </Card>
    </div>
  );
}
