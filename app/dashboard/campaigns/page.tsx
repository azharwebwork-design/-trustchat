import { CalendarClock, Megaphone, MessageSquareText, Plus, Send, UsersRound } from "lucide-react";
import { Card, MoreButton, PageTitle, StatCard, TableHead } from "@/components/dashboard-ui";
import { formatNumber, getCampaignsData } from "@/lib/dashboard";

export const metadata = { title: "الحملات" };

export default async function CampaignsPage() {
  const campaigns=await getCampaignsData();
  const sent=campaigns.reduce((sum,item)=>sum+item.sentCount,0);
  const read=campaigns.reduce((sum,item)=>sum+item.readCount,0);
  const audience=campaigns.reduce((sum,item)=>sum+item.audienceCount,0);
  return (
    <div className="mx-auto max-w-[1500px]">
      <PageTitle title="الحملات التسويقية" description="أنشئ حملات واتساب مخصصة وتابع نتائجها." action={<button className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white"><Plus size={18} /> حملة جديدة</button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="الحملات النشطة" value={String(campaigns.filter(x=>x.status==="SENDING"||x.status==="SCHEDULED").length)} change="+2" icon={Megaphone} />
        <StatCard label="الرسائل المرسلة" value={formatNumber(sent)} change="+18.4%" icon={Send} color="bg-blue-500/10 text-blue-500" />
        <StatCard label="معدل القراءة" value={sent?`${Math.round(read/sent*100)}%`:"0%"} change="+4.1%" icon={MessageSquareText} color="bg-violet-500/10 text-violet-500" />
        <StatCard label="إجمالي الجمهور" value={formatNumber(audience)} change="+8.2%" icon={UsersRound} color="bg-amber-500/10 text-amber-500" />
      </div>
      <Card className="mt-5 overflow-hidden">
        <div className="flex items-center justify-between border-b border-ui p-5"><div><h2 className="font-bold">جميع الحملات</h2><p className="muted mt-1 text-xs">آخر تحديث منذ دقيقتين</p></div><button className="flex items-center gap-2 rounded-xl border border-ui px-3 py-2 text-xs font-bold"><CalendarClock size={16} /> الفترة الزمنية</button></div>
        <div className="overflow-x-auto">
          <TableHead><div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px]"><span>اسم الحملة</span><span>الحالة</span><span>الجمهور</span><span>تم الإرسال</span><span>القراءة</span><span /></div></TableHead>
          <div className="min-w-[650px] divide-y divide-[color:var(--border)]">
            {campaigns.map((campaign) => <div key={campaign.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] items-center px-5 py-4 text-xs">
              <div><b className="block">{campaign.name}</b><small className="muted">{campaign.date}</small></div>
              <span><Status value={campaign.statusLabel} /></span><span>{formatNumber(campaign.audienceCount)}</span><span>{campaign.sentCount?formatNumber(campaign.sentCount):"—"}</span><span className="font-bold">{campaign.readRate}</span><MoreButton />
            </div>)}
          </div>
        </div>
      </Card>
    </div>
  );
}

function Status({ value }: { value: string }) {
  const colors: Record<string, string> = { "قيد الإرسال": "bg-blue-500/10 text-blue-500", "مكتملة": "bg-brand/10 text-brand-dark dark:text-brand", "مجدولة": "bg-amber-500/10 text-amber-600", "مسودة": "bg-gray-500/10 muted" };
  return <small className={`rounded-full px-3 py-1 font-bold ${colors[value]}`}>{value}</small>;
}
