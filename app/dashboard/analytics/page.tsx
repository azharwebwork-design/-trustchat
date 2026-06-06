import { CalendarDays, Clock3, Download, MessageCircleMore, Star, TrendingUp, UsersRound } from "lucide-react";
import { Avatar, Card, PageTitle, StatCard } from "@/components/dashboard-ui";
import { formatNumber, getAnalyticsData } from "@/lib/dashboard";

export const metadata = { title: "التحليلات" };

const chart = [38, 52, 46, 68, 58, 76, 64, 82, 72, 91, 78, 88];

export default async function AnalyticsPage() {
  const {conversations,contacts,messages,team}=await getAnalyticsData();
  return (
    <div className="mx-auto max-w-[1500px]">
      <PageTitle title="التحليلات والتقارير" description="افهم أداء فريقك وتجربة عملائك بوضوح." action={<div className="flex gap-2"><button className="flex items-center gap-2 rounded-xl border border-ui surface px-4 py-2.5 text-xs font-bold"><CalendarDays size={16} /> آخر 30 يوماً</button><button className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-white"><Download size={16} /> تصدير التقرير</button></div>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="إجمالي المحادثات" value={formatNumber(conversations)} change="+16.8%" icon={MessageCircleMore} />
        <StatCard label="عملاء تم خدمتهم" value={formatNumber(contacts)} change="+12.3%" icon={UsersRound} color="bg-blue-500/10 text-blue-500" />
        <StatCard label="إجمالي الرسائل" value={formatNumber(messages)} change="+21.4%" icon={Clock3} color="bg-violet-500/10 text-violet-500" />
        <StatCard label="تقييم الخدمة" value="4.8/5" change="+3.2%" icon={Star} color="bg-amber-500/10 text-amber-500" />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_.7fr]">
        <Card className="p-5 md:p-6">
          <div className="flex items-center justify-between"><div><h2 className="font-bold">حجم المحادثات</h2><p className="muted mt-1 text-xs">المحادثات الواردة والمغلقة يومياً</p></div><div className="flex gap-4 text-[10px]"><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-brand" /> واردة</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-blue-500" /> مغلقة</span></div></div>
          <div className="relative mt-8 h-64 border-b border-ui">
            <div className="absolute inset-0 flex flex-col justify-between">{[100,75,50,25].map(x=><div key={x} className="flex items-center gap-2"><small className="muted w-6 text-[9px]">{x}</small><span className="h-px flex-1 bg-[color:var(--border)]" /></div>)}</div>
            <div className="absolute inset-x-8 bottom-0 flex h-full items-end gap-2">
              {chart.map((value,index)=><div key={index} className="flex flex-1 items-end justify-center gap-0.5"><span className="w-2 rounded-t bg-brand" style={{height:`${value}%`}} /><span className="w-2 rounded-t bg-blue-400/70" style={{height:`${Math.max(value-13,20)}%`}} /></div>)}
            </div>
          </div>
          <div className="muted mr-8 mt-3 flex justify-between text-[9px]">{["7 مايو","12 مايو","17 مايو","22 مايو","27 مايو","1 يونيو","6 يونيو"].map(x=><span key={x}>{x}</span>)}</div>
        </Card>
        <Card className="p-5 md:p-6">
          <div className="flex items-center justify-between"><div><h2 className="font-bold">رضا العملاء</h2><p className="muted mt-1 text-xs">بناءً على 2,841 تقييماً</p></div><TrendingUp size={19} className="text-brand" /></div>
          <div className="relative mx-auto mt-8 grid size-44 place-items-center rounded-full bg-[conic-gradient(#f97316_0_86%,#e5e7eb_86%_100%)] after:absolute after:size-32 after:rounded-full after:bg-[color:var(--card)]"><div className="relative z-10 text-center"><strong className="text-3xl font-black">86%</strong><p className="muted text-[10px]">راضون جداً</p></div></div>
          <div className="mt-8 space-y-3">{[["ممتاز","72%","bg-brand"],["جيد","14%","bg-blue-500"],["محايد","9%","bg-amber-500"],["غير راضٍ","5%","bg-red-500"]].map(([label,value,color])=><div key={label} className="flex items-center gap-2 text-[10px]"><span className={`size-2 rounded-full ${color}`} /><span className="flex-1">{label}</span><b>{value}</b></div>)}</div>
        </Card>
      </div>
      <Card className="mt-5 p-5 md:p-6">
        <div className="mb-5"><h2 className="font-bold">أداء أعضاء الفريق</h2><p className="muted mt-1 text-xs">مقارنة مؤشرات الأداء الرئيسية</p></div>
        <div className="overflow-x-auto"><div className="min-w-[650px] divide-y divide-[color:var(--border)]">{team.map((member,index)=><div key={member.id} className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center py-4 text-xs"><div className="flex items-center gap-3"><Avatar initials={member.name.slice(0,2)} color={member.status==="BUSY"?"bg-blue-500":member.status==="OFFLINE"?"bg-amber-500":"bg-pink-500"}/><div><b className="block">{member.name}</b><small className="muted">{member.title??"عضو الفريق"}</small></div></div><span>{formatNumber(member._count.assignedConversations)} محادثة</span><span>{["1:42 د","2:08 د","2:24 د","3:10 د"][index]??"—"}</span><span className="flex items-center gap-1 font-bold"><Star size={13} className="fill-amber-400 text-amber-400"/>{["4.9","4.8","4.8","4.6"][index]??"—"}</span></div>)}</div></div>
      </Card>
    </div>
  );
}
