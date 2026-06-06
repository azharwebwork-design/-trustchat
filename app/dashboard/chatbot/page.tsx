import { Bot, CheckCircle2, GitBranch, MessageSquareText, MoreHorizontal, Play, Plus, Save, Sparkles } from "lucide-react";
import { Card, PageTitle } from "@/components/dashboard-ui";
import { ComingSoonButton } from "@/components/coming-soon-button";

export const metadata = { title: "منشئ الرد الآلي" };

export default function ChatbotPage() {
  return (
    <div className="mx-auto max-w-[1500px]">
      <PageTitle title="منشئ الرد الآلي" description="صمّم تجربة محادثة ذكية بالسحب والإفلات." action={<div className="flex gap-2"><ComingSoonButton className="flex items-center gap-2 rounded-xl border border-ui surface px-4 py-2.5 text-sm font-bold"><Play size={17} /> اختبار</ComingSoonButton><ComingSoonButton className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white"><Save size={17} /> حفظ ونشر</ComingSoonButton></div>} />
      <Card className="grid min-h-[690px] overflow-hidden lg:grid-cols-[240px_1fr_270px]">
        <aside className="border-l border-ui p-4">
          <h2 className="text-sm font-bold">عناصر التدفق</h2><p className="muted mt-1 text-[10px]">اسحب العنصر إلى مساحة العمل</p>
          <div className="mt-5 space-y-3">
            <NodeTool icon={MessageSquareText} title="إرسال رسالة" color="text-blue-500 bg-blue-500/10" />
            <NodeTool icon={GitBranch} title="شرط وتفرّع" color="text-violet-500 bg-violet-500/10" />
            <NodeTool icon={Bot} title="رد ذكي" color="text-brand-dark bg-brand/10 dark:text-brand" />
            <NodeTool icon={CheckCircle2} title="إنهاء المحادثة" color="text-amber-500 bg-amber-500/10" />
          </div>
          <div className="mt-8 rounded-2xl bg-brand/10 p-4"><Sparkles size={20} className="text-brand" /><b className="mt-3 block text-xs">اقتراح بالذكاء الاصطناعي</b><p className="muted mt-2 text-[10px] leading-5">دع TrustChat ينشئ مساراً أولياً بناءً على هدفك.</p><ComingSoonButton className="mt-3 flex items-center gap-2 text-[10px] font-bold text-brand-dark dark:text-brand">إنشاء مسار</ComingSoonButton></div>
        </aside>
        <section className="relative min-h-[620px] overflow-auto bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:24px_24px]">
          <FlowNode className="right-[10%] top-10" icon={Play} eyebrow="نقطة البداية" title="عند بدء محادثة جديدة" color="bg-brand" />
          <Connector className="right-[30%] top-[148px] h-14" />
          <FlowNode className="right-[10%] top-[205px]" icon={MessageSquareText} eyebrow="رسالة ترحيبية" title="مرحباً بك! كيف يمكننا مساعدتك؟" color="bg-blue-500" />
          <Connector className="right-[30%] top-[343px] h-14" />
          <FlowNode className="right-[10%] top-[400px]" icon={GitBranch} eyebrow="خيارات العميل" title="المبيعات  |  الدعم  |  طلباتي" color="bg-violet-500" />
          <button disabled title="إضافة خطوة قريبًا" aria-label="إضافة خطوة قريبًا" className="absolute right-[27.5%] top-[535px] grid size-9 cursor-not-allowed place-items-center rounded-full border-2 border-dashed border-brand bg-[color:var(--card)] text-brand opacity-55"><Plus size={17} /></button>
        </section>
        <aside className="hidden border-r border-ui p-5 lg:block">
          <div className="flex items-center justify-between"><h2 className="text-sm font-bold">خصائص العنصر</h2><MoreHorizontal size={18} className="muted" /></div>
          <p className="mt-6 rounded-xl bg-brand/10 p-3 text-[10px] font-bold text-brand-dark dark:text-brand">تحرير التدفق قريبًا</p>
          <label className="mt-5 block text-xs font-bold">اسم العنصر<input disabled defaultValue="رسالة ترحيبية" className="mt-2 w-full cursor-not-allowed rounded-xl border border-ui bg-transparent px-3 py-2.5 opacity-60" /></label>
          <label className="mt-5 block text-xs font-bold">نص الرسالة<textarea disabled defaultValue="مرحباً بك في متجرنا! كيف يمكننا مساعدتك اليوم؟" rows={5} className="mt-2 w-full cursor-not-allowed resize-none rounded-xl border border-ui bg-transparent p-3 leading-6 opacity-60" /></label>
          <label className="mt-5 block text-xs font-bold">وقت الانتظار<select disabled className="mt-2 w-full cursor-not-allowed rounded-xl border border-ui bg-transparent px-3 py-2.5 opacity-60"><option>إرسال فوراً</option><option>بعد ثانية</option></select></label>
          <div className="mt-5 rounded-xl border border-ui p-3"><div className="flex items-center justify-between text-xs"><span>مؤشر الكتابة</span><span className="h-5 w-9 rounded-full bg-brand p-0.5"><i className="block size-4 rounded-full bg-white" /></span></div></div>
        </aside>
      </Card>
    </div>
  );
}

function NodeTool({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) {
  return <div title="السحب والإفلات قريبًا" className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-ui p-3 opacity-65"><span className={`grid size-9 place-items-center rounded-lg ${color}`}><Icon size={18} /></span><b className="flex-1 text-xs">{title}</b><small className="muted text-[8px]">قريبًا</small></div>;
}
function FlowNode({ icon: Icon, eyebrow, title, color, className }: { icon: React.ElementType; eyebrow: string; title: string; color: string; className: string }) {
  return <div className={`absolute w-[42%] min-w-56 rounded-2xl border border-ui surface p-4 shadow-soft ${className}`}><div className="flex gap-3"><span className={`grid size-9 place-items-center rounded-lg ${color} text-white`}><Icon size={17} /></span><div><small className="muted">{eyebrow}</small><b className="mt-1 block text-xs">{title}</b></div></div></div>;
}
function Connector({ className }: { className: string }) {
  return <span className={`absolute w-px bg-brand ${className}`}><i className="absolute -bottom-1 -right-1 size-2.5 rounded-full bg-brand" /></span>;
}
