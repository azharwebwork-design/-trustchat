import { CheckCircle2, Clock3, MessageCircleMore, Plus, UsersRound } from "lucide-react";
import Link from "next/link";
import { Avatar, Card, PageTitle, StatCard } from "@/components/dashboard-ui";
import { formatNumber, getOverviewData } from "@/lib/dashboard";
export const metadata={title:"نظرة عامة"};
export default async function Dashboard(){
  const {user,conversationCount,closedCount,contactCount,unreadCount,conversations,team}=await getOverviewData();
  return <div className="mx-auto max-w-[1500px]">
    <PageTitle title={`مرحباً، ${user.name.split(" ")[0]}`} description="إليك ما يحدث في مساحة عملك اليوم." action={<Link href="/dashboard/conversations?new=1" className="flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white"><Plus size={18}/>محادثة جديدة</Link>}/>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="إجمالي المحادثات" value={formatNumber(conversationCount)} change="+12.5%" icon={MessageCircleMore}/>
      <StatCard label="رسائل تحتاج متابعة" value={formatNumber(unreadCount)} change="+18.2%" icon={Clock3} color="bg-blue-500/10 text-blue-500"/>
      <StatCard label="المحادثات المغلقة" value={formatNumber(closedCount)} change="+8.4%" icon={CheckCircle2} color="bg-violet-500/10 text-violet-500"/>
      <StatCard label="إجمالي العملاء" value={formatNumber(contactCount)} change="+2.1%" icon={UsersRound} color="bg-amber-500/10 text-amber-500"/>
    </div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_.8fr]">
      <Card className="p-5 md:p-6">
        <div className="flex items-center justify-between"><div><h2 className="font-bold">نشاط المحادثات</h2><p className="muted mt-1 text-xs">آخر 7 أيام</p></div><span className="rounded-lg border border-ui px-3 py-2 text-xs">هذا الأسبوع</span></div>
        <div className="mt-8 flex h-56 items-end gap-3 border-b border-ui px-2">
          {[44,62,50,78,67,91,74].map((h,i)=><div key={i} className="flex flex-1 flex-col items-center justify-end gap-2"><div className="group relative w-full max-w-10 rounded-t-lg bg-gradient-to-t from-brand-dark to-brand transition hover:opacity-80" style={{height:`${h}%`}}/><span className="muted text-[10px]">{["س","ح","ن","ث","ر","خ","ج"][i]}</span></div>)}
        </div>
      </Card>
      <Card className="p-5 md:p-6"><div className="flex items-center justify-between"><div><h2 className="font-bold">أداء الفريق</h2><p className="muted mt-1 text-xs">الحالة الحالية</p></div><UsersRound size={19} className="text-brand"/></div><div className="mt-5 space-y-4">{team.map(x=><div key={x.name} className="flex items-center gap-3"><Avatar initials={x.initials} color={x.color}/><div className="min-w-0 flex-1"><b className="block truncate text-xs">{x.name}</b><small className="muted">{x.role}</small></div><span className={`text-[10px] font-bold ${x.state==="متاحة"?"text-brand-dark dark:text-brand":x.state==="مشغول"?"text-amber-500":"muted"}`}>{x.state}</span></div>)}</div></Card>
    </div>
    <Card className="mt-5 overflow-hidden"><div className="flex items-center justify-between border-b border-ui p-5"><div><h2 className="font-bold">أحدث المحادثات</h2><p className="muted mt-1 text-xs">آخر تفاعلات عملائك</p></div><Link href="/dashboard/conversations" className="text-xs font-bold text-brand-dark dark:text-brand">عرض الكل</Link></div><div className="divide-y divide-[color:var(--border)]">{conversations.map(x=><Link href={`/dashboard/conversations?conversation=${x.id}`} key={x.id} className="flex items-center gap-3 p-4 hover:bg-black/[.015] dark:hover:bg-white/[.02]"><Avatar initials={x.initials} color={x.color}/><div className="min-w-0 flex-1"><b className="block text-xs">{x.name}</b><p className="muted truncate text-xs">{x.msg}</p></div><span className="muted text-[10px]">{x.time}</span>{x.unread>0&&<span className="grid size-5 place-items-center rounded-full bg-brand text-[9px] text-white">{x.unread}</span>}</Link>)}</div></Card>
  </div>
}
