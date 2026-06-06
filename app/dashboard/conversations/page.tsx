import Link from "next/link";
import { CheckCheck, MessageSquarePlus, MoreVertical, Paperclip, Phone, Search, Send, Smile, UserRound } from "lucide-react";
import { createConversation, sendMessage } from "@/app/actions/dashboard";
import { ComingSoonButton } from "@/components/coming-soon-button";
import { DashboardModal } from "@/components/dashboard-modal";
import { Avatar, Card, PageTitle } from "@/components/dashboard-ui";
import { getContactsData, getConversationsData } from "@/lib/dashboard";

export const metadata = { title: "المحادثات" };
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ConversationsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const filter = typeof params.filter === "string" ? params.filter : "";
  const selectedId = typeof params.conversation === "string" ? params.conversation : "";
  const [conversations, contactData] = await Promise.all([
    getConversationsData(query, filter, selectedId),
    getContactsData(),
  ]);
  const selected = conversations[0];
  const baseParams = new URLSearchParams();
  if (query) baseParams.set("q", query);
  if (filter) baseParams.set("filter", filter);

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageTitle
        title="المحادثات"
        description="تابع رسائل العملاء وأدِرها من مكان واحد."
        action={<Link href="/dashboard/conversations?new=1" className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white"><MessageSquarePlus size={17} /> محادثة جديدة</Link>}
      />
      <Card className="grid min-h-[680px] overflow-hidden xl:grid-cols-[340px_1fr_280px]">
        <section className="border-l border-ui">
          <div className="border-b border-ui p-4">
            <form className="flex items-center rounded-xl border border-ui px-3">
              <Search size={17} className="muted" />
              <input name="q" defaultValue={query} className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" placeholder="ابحث في المحادثات..." />
              {filter && <input type="hidden" name="filter" value={filter} />}
              <button aria-label="بحث" className="text-xs font-bold text-brand-dark dark:text-brand">بحث</button>
            </form>
            <div className="mt-3 flex gap-2 text-xs">
              <FilterLink href={query ? `?q=${encodeURIComponent(query)}` : "?"} active={!filter}>الكل</FilterLink>
              <FilterLink href={`?${new URLSearchParams({ ...(query ? { q: query } : {}), filter: "unread" })}`} active={filter === "unread"}>غير مقروءة</FilterLink>
              <FilterLink href={`?${new URLSearchParams({ ...(query ? { q: query } : {}), filter: "mine" })}`} active={filter === "mine"}>المعيّنة لي</FilterLink>
            </div>
          </div>
          <div className="divide-y divide-[color:var(--border)]">
            {conversations.map((item, index) => {
              const itemParams = new URLSearchParams(baseParams);
              itemParams.set("conversation", item.id);
              return (
                <Link href={`?${itemParams}`} key={item.id} className={`flex gap-3 p-4 ${index === 0 ? "bg-brand/10" : "hover:bg-black/[.02] dark:hover:bg-white/[.02]"}`}>
                  <Avatar initials={item.initials} color={item.color} size="size-11" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2"><b className="truncate text-sm">{item.name}</b><small className="muted text-[9px]">{item.time}</small></div>
                    <div className="mt-1 flex items-center gap-2"><p className="muted flex-1 truncate text-xs">{item.msg}</p>{item.unread > 0 && <span className="grid size-5 place-items-center rounded-full bg-brand text-[9px] text-white">{item.unread}</span>}</div>
                  </div>
                </Link>
              );
            })}
            {!conversations.length && <p className="muted p-8 text-center text-sm">لا توجد محادثات مطابقة.</p>}
          </div>
        </section>

        <section className="flex min-h-[620px] flex-col">
          <header className="flex items-center gap-3 border-b border-ui p-4">
            <Avatar initials={selected?.initials ?? "—"} color={selected?.color ?? "bg-brand"} size="size-10" />
            <div className="flex-1"><b className="block text-sm">{selected?.name ?? "لا توجد محادثات"}</b><small className="flex items-center gap-1 text-[10px] text-brand-dark dark:text-brand"><span className="size-1.5 rounded-full bg-brand" /> {selected ? "محادثة نشطة" : "ابدأ بإضافة جهة اتصال"}</small></div>
            <ComingSoonButton className="muted flex items-center gap-1 rounded-lg p-2 text-[9px]"><Phone size={18} /></ComingSoonButton>
            <ComingSoonButton className="muted flex items-center gap-1 rounded-lg p-2 text-[9px]"><MoreVertical size={18} /></ComingSoonButton>
          </header>
          <div className="flex-1 space-y-4 bg-orange-50/45 p-5 dark:bg-orange-950/10">
            <p className="muted text-center text-[10px]">سجل المحادثة</p>
            {selected?.messages.map(message => <Bubble key={message.id} mine={message.mine} text={message.text} time={message.time} />)}
            {!selected && <p className="muted text-center text-sm">لا توجد محادثات بعد.</p>}
          </div>
          <footer className="border-t border-ui p-4">
            <form action={sendMessage} className="flex items-end gap-2 rounded-2xl border border-ui p-2">
              <input type="hidden" name="conversationId" value={selected?.id ?? ""} />
              <ComingSoonButton className="muted flex items-center gap-1 p-2 text-[9px]"><Paperclip size={19} /></ComingSoonButton>
              <textarea name="content" required disabled={!selected} rows={1} className="max-h-24 flex-1 resize-none bg-transparent py-2 text-sm outline-none disabled:cursor-not-allowed" placeholder="اكتب رسالتك..." />
              <ComingSoonButton className="muted flex items-center gap-1 p-2 text-[9px]"><Smile size={19} /></ComingSoonButton>
              <button disabled={!selected} aria-label="إرسال الرسالة" className="grid size-10 place-items-center rounded-xl bg-brand text-white disabled:cursor-not-allowed disabled:opacity-50"><Send size={18} /></button>
            </form>
          </footer>
        </section>

        <aside className="hidden border-r border-ui p-5 xl:block">
          <div className="text-center"><Avatar initials={selected?.initials ?? "—"} color={selected?.color ?? "bg-brand"} size="mx-auto size-16" /><h2 className="mt-3 font-bold">{selected?.name ?? "لا توجد بيانات"}</h2><p className="muted mt-1 text-xs" dir="ltr">{selected?.phone ?? "—"}</p></div>
          <div className="mt-7 space-y-5 border-t border-ui pt-5 text-sm"><Info label="البريد الإلكتروني" value={selected?.email ?? "—"} /><Info label="المسؤول" value={selected?.assignedTo ?? "—"} /><Info label="عدد الرسائل" value={String(selected?.messages.length ?? 0)} /><div><p className="muted mb-2 text-xs">الوسوم</p><div className="flex flex-wrap gap-2"><span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-600">{selected?.tag ?? "بدون وسم"}</span><span className="rounded-full bg-brand/10 px-3 py-1 text-xs text-brand-dark dark:text-brand">نشط</span></div></div></div>
          {selected ? <Link href={`/dashboard/contacts?q=${encodeURIComponent(selected.phone)}`} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-ui py-2.5 text-xs font-bold"><UserRound size={16} /> عرض ملف العميل</Link> : <button disabled className="mt-7 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-ui py-2.5 text-xs font-bold opacity-50"><UserRound size={16} /> عرض ملف العميل</button>}
        </aside>
      </Card>

      {params.new === "1" && (
        <DashboardModal title="محادثة جديدة" description="اختر جهة اتصال وأرسل الرسالة الأولى." closeHref="/dashboard/conversations">
          {!contactData.contacts.length ? (
            <div className="mt-6 rounded-xl bg-brand/10 p-4 text-sm">أضف جهة اتصال أولًا. <Link href="/dashboard/contacts?new=1" className="font-bold text-brand-dark dark:text-brand">إضافة جهة اتصال</Link></div>
          ) : (
            <form action={createConversation} className="mt-6 space-y-4">
              <label className="block text-xs font-bold">جهة الاتصال<select name="contactId" required className="mt-2 w-full rounded-xl border border-ui bg-transparent px-4 py-3">{contactData.contacts.map(contact => <option key={contact.id} value={contact.id}>{contact.name} - {contact.phone}</option>)}</select></label>
              <label className="block text-xs font-bold">الموضوع<input name="subject" placeholder="استفسار جديد" className="mt-2 w-full rounded-xl border border-ui bg-transparent px-4 py-3 outline-none focus:border-brand" /></label>
              <label className="block text-xs font-bold">الرسالة الأولى<textarea name="content" required rows={4} className="mt-2 w-full resize-none rounded-xl border border-ui bg-transparent p-3 outline-none focus:border-brand" /></label>
              <button className="w-full rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white">إنشاء وإرسال</button>
            </form>
          )}
        </DashboardModal>
      )}
    </div>
  );
}

function FilterLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return <Link href={href} className={`rounded-lg px-3 py-2 ${active ? "bg-brand font-bold text-white" : "bg-black/[.04] dark:bg-white/[.05]"}`}>{children}</Link>;
}
function Bubble({ text, time, mine = false }: { text: string; time: string; mine?: boolean }) {
  return <div className={`max-w-[75%] rounded-2xl p-3 text-sm shadow-sm ${mine ? "mr-auto rounded-tl-sm bg-brand text-white" : "rounded-tr-sm surface"}`}><p className="leading-7">{text}</p><small className={`mt-1 flex items-center justify-end gap-1 text-[9px] ${mine ? "text-white/70" : "muted"}`}>{time}{mine && <CheckCheck size={12} />}</small></div>;
}
function Info({ label, value }: { label: string; value: string }) {
  return <div><p className="muted text-xs">{label}</p><p className="mt-1 text-xs font-semibold" dir="auto">{value}</p></div>;
}
