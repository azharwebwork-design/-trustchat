import Link from "next/link";
import { Download, Filter, Plus, Search, Upload } from "lucide-react";
import { createContact } from "@/app/actions/dashboard";
import { ComingSoonButton } from "@/components/coming-soon-button";
import { DashboardModal } from "@/components/dashboard-modal";
import { Avatar, Card, MoreButton, PageTitle, TableHead } from "@/components/dashboard-ui";
import { formatNumber, getContactsData } from "@/lib/dashboard";

export const metadata = { title: "جهات الاتصال" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ContactsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const tag = typeof params.tag === "string" ? params.tag : "";
  const { contacts, total, tags } = await getContactsData(query, tag);

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageTitle
        title="جهات الاتصال"
        description="نظّم بيانات عملائك وشرائحهم في قاعدة موحّدة."
        action={<Link href="/dashboard/contacts?new=1" className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white"><Plus size={18} /> إضافة جهة اتصال</Link>}
      />
      {params.created && <Notice>تمت إضافة جهة الاتصال بنجاح.</Notice>}
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        {[["إجمالي العملاء", formatNumber(total), "من قاعدة البيانات"], ["نتائج العرض", formatNumber(contacts.length), query || tag ? "حسب البحث والتصفية" : "جميع الجهات"], ["الشرائح النشطة", formatNumber(tags.length), "حسب الوسوم"]].map(([label, value, note]) => (
          <Card key={label} className="p-5"><p className="muted text-xs">{label}</p><div className="mt-2 flex items-end justify-between"><strong className="text-2xl font-black">{value}</strong><span className="text-[10px] font-bold text-brand-dark dark:text-brand">{note}</span></div></Card>
        ))}
      </div>
      <Card className="overflow-hidden">
        <form className="flex flex-col gap-3 border-b border-ui p-4 md:flex-row md:items-center">
          <div className="flex max-w-md flex-1 items-center rounded-xl border border-ui px-3"><Search size={17} className="muted" /><input name="q" defaultValue={query} className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" placeholder="ابحث بالاسم أو رقم الجوال..." /></div>
          <select name="tag" defaultValue={tag} className="rounded-xl border border-ui bg-transparent px-3 py-2.5 text-xs font-bold">
            <option value="">كل الوسوم</option>
            {tags.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-ui px-3 py-2.5 text-xs font-bold"><Filter size={16} /> تطبيق</button>
          {(query || tag) && <Link href="/dashboard/contacts" className="rounded-xl px-3 py-2.5 text-center text-xs font-bold text-brand-dark dark:text-brand">مسح</Link>}
          <ComingSoonButton className="flex items-center gap-2 rounded-xl border border-ui px-3 py-2.5 text-xs font-bold"><Upload size={16} /> استيراد</ComingSoonButton>
          <ComingSoonButton className="flex items-center gap-2 rounded-xl border border-ui px-3 py-2.5 text-xs font-bold"><Download size={16} /> تصدير</ComingSoonButton>
        </form>
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
            {!contacts.length && <p className="muted p-8 text-center text-sm">لا توجد نتائج مطابقة.</p>}
          </div>
        </div>
        <div className="muted flex items-center justify-between border-t border-ui px-5 py-4 text-xs"><span>عرض {contacts.length} من {formatNumber(total)}</span><span>صفحة واحدة</span></div>
      </Card>

      {params.new === "1" && (
        <DashboardModal title="إضافة جهة اتصال" description="أضف بيانات العميل إلى مساحة العمل." closeHref="/dashboard/contacts">
          {params.error === "duplicate" && <ErrorNotice>رقم الجوال مسجل مسبقًا.</ErrorNotice>}
          {params.error === "invalid" && <ErrorNotice>تحقق من البيانات المدخلة.</ErrorNotice>}
          <form action={createContact} className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field name="name" label="الاسم الكامل" required />
            <Field name="phone" label="رقم الجوال" required dir="ltr" />
            <Field name="email" label="البريد الإلكتروني" type="email" />
            <Field name="tag" label="الوسم" placeholder="عميل محتمل" />
            <button className="rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white sm:col-span-2">إضافة جهة الاتصال</button>
          </form>
        </DashboardModal>
      )}
    </div>
  );
}

function Field({ name, label, type = "text", required = false, placeholder, dir }: { name: string; label: string; type?: string; required?: boolean; placeholder?: string; dir?: "ltr" }) {
  return <label className="text-xs font-bold">{label}<input name={name} type={type} required={required} placeholder={placeholder} dir={dir} className="mt-2 w-full rounded-xl border border-ui bg-transparent px-4 py-3 outline-none focus:border-brand" /></label>;
}

function Notice({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-700 dark:text-emerald-400">{children}</p>;
}

function ErrorNotice({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">{children}</p>;
}
