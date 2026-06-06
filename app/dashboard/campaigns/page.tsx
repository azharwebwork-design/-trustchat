import Link from "next/link";
import { CalendarClock, Megaphone, MessageSquareText, Plus, Send, UsersRound } from "lucide-react";
import { createCampaign } from "@/app/actions/dashboard";
import { DashboardModal } from "@/components/dashboard-modal";
import { Card, MoreButton, PageTitle, StatCard, TableHead } from "@/components/dashboard-ui";
import { formatNumber, getCampaignsData } from "@/lib/dashboard";

export const metadata = { title: "الحملات" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CampaignsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const status = typeof params.status === "string" ? params.status : "";
  const campaigns = await getCampaignsData(status);
  const sent = campaigns.reduce((sum, item) => sum + item.sentCount, 0);
  const read = campaigns.reduce((sum, item) => sum + item.readCount, 0);
  const audience = campaigns.reduce((sum, item) => sum + item.audienceCount, 0);

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageTitle title="الحملات التسويقية" description="أنشئ حملات مخصصة وتابع نتائجها." action={<Link href="/dashboard/campaigns?new=1" className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white"><Plus size={18} /> حملة جديدة</Link>} />
      {params.created && <p className="mb-5 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-700 dark:text-emerald-400">تم إنشاء الحملة بنجاح.</p>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="الحملات النشطة" value={String(campaigns.filter(x => x.status === "SENDING" || x.status === "SCHEDULED").length)} change="+2" icon={Megaphone} />
        <StatCard label="الرسائل المرسلة" value={formatNumber(sent)} change="+18.4%" icon={Send} color="bg-blue-500/10 text-blue-500" />
        <StatCard label="معدل القراءة" value={sent ? `${Math.round(read / sent * 100)}%` : "0%"} change="+4.1%" icon={MessageSquareText} color="bg-violet-500/10 text-violet-500" />
        <StatCard label="إجمالي الجمهور" value={formatNumber(audience)} change="+8.2%" icon={UsersRound} color="bg-amber-500/10 text-amber-500" />
      </div>
      <Card className="mt-5 overflow-hidden">
        <form className="flex flex-col gap-3 border-b border-ui p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="font-bold">جميع الحملات</h2><p className="muted mt-1 text-xs">بيانات الحملات المحفوظة في مساحة العمل</p></div>
          <div className="flex gap-2">
            <select name="status" defaultValue={status} className="rounded-xl border border-ui bg-transparent px-3 py-2 text-xs font-bold">
              <option value="">كل الحالات</option><option value="DRAFT">مسودة</option><option value="SCHEDULED">مجدولة</option><option value="SENDING">قيد الإرسال</option><option value="COMPLETED">مكتملة</option>
            </select>
            <button className="flex items-center gap-2 rounded-xl border border-ui px-3 py-2 text-xs font-bold"><CalendarClock size={16} /> تطبيق</button>
            {status && <Link href="/dashboard/campaigns" className="px-3 py-2 text-xs font-bold text-brand-dark dark:text-brand">مسح</Link>}
          </div>
        </form>
        <div className="overflow-x-auto">
          <TableHead><div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px]"><span>اسم الحملة</span><span>الحالة</span><span>الجمهور</span><span>تم الإرسال</span><span>القراءة</span><span /></div></TableHead>
          <div className="min-w-[650px] divide-y divide-[color:var(--border)]">
            {campaigns.map((campaign) => <div key={campaign.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] items-center px-5 py-4 text-xs">
              <div><b className="block">{campaign.name}</b><small className="muted">{campaign.date}</small></div>
              <span><Status value={campaign.statusLabel} /></span><span>{formatNumber(campaign.audienceCount)}</span><span>{campaign.sentCount ? formatNumber(campaign.sentCount) : "—"}</span><span className="font-bold">{campaign.readRate}</span><MoreButton />
            </div>)}
            {!campaigns.length && <p className="muted p-8 text-center text-sm">لا توجد حملات مطابقة.</p>}
          </div>
        </div>
      </Card>

      {params.new === "1" && (
        <DashboardModal title="إنشاء حملة" description="احفظ حملة جديدة كمسودة أو جهّزها للجدولة." closeHref="/dashboard/campaigns">
          {params.error && <p className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">تحقق من بيانات الحملة.</p>}
          <form action={createCampaign} className="mt-6 space-y-4">
            <label className="block text-xs font-bold">اسم الحملة<input name="name" required minLength={3} className="mt-2 w-full rounded-xl border border-ui bg-transparent px-4 py-3 outline-none focus:border-brand" /></label>
            <label className="block text-xs font-bold">حجم الجمهور<input name="audienceCount" type="number" min={0} defaultValue={0} required className="mt-2 w-full rounded-xl border border-ui bg-transparent px-4 py-3 outline-none focus:border-brand" /></label>
            <label className="block text-xs font-bold">الحالة<select name="status" className="mt-2 w-full rounded-xl border border-ui bg-transparent px-4 py-3"><option value="DRAFT">حفظ كمسودة</option><option value="SCHEDULED">جاهزة للجدولة</option></select></label>
            <button className="w-full rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white">إنشاء الحملة</button>
          </form>
        </DashboardModal>
      )}
    </div>
  );
}

function Status({ value }: { value: string }) {
  const colors: Record<string, string> = { "قيد الإرسال": "bg-blue-500/10 text-blue-500", "مكتملة": "bg-brand/10 text-brand-dark dark:text-brand", "مجدولة": "bg-amber-500/10 text-amber-600", "مسودة": "bg-gray-500/10 muted" };
  return <small className={`rounded-full px-3 py-1 font-bold ${colors[value]}`}>{value}</small>;
}
