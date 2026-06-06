import { Check, ExternalLink, Plus, Search, Webhook, Zap } from "lucide-react";
import { Card, PageTitle } from "@/components/dashboard-ui";

export const metadata = { title: "التكاملات" };

const integrations = [
  { name: "WhatsApp Cloud API", mark: "WA", color: "bg-brand", category: "المراسلة", description: "اربط رقم واتساب الأعمال واستقبل الرسائل في TrustChat.", connected: true },
  { name: "Shopify", mark: "S", color: "bg-emerald-600", category: "التجارة الإلكترونية", description: "زامن العملاء والطلبات وأرسل تحديثات الشحن تلقائياً.", connected: true },
  { name: "Google Sheets", mark: "GS", color: "bg-green-600", category: "الإنتاجية", description: "أرسل بيانات العملاء والحملات مباشرة إلى جداولك.", connected: false },
  { name: "Zapier", mark: "Z", color: "bg-orange-500", category: "الأتمتة", description: "اربط TrustChat مع آلاف التطبيقات ومسارات العمل.", connected: false },
  { name: "HubSpot", mark: "H", color: "bg-orange-600", category: "إدارة العملاء", description: "وحّد جهات الاتصال والصفقات وأنشطة فريق المبيعات.", connected: false },
  { name: "WooCommerce", mark: "Woo", color: "bg-violet-600", category: "التجارة الإلكترونية", description: "اربط متجرك وأتمت رسائل الطلبات والسلات المتروكة.", connected: false },
];

export default function IntegrationsPage() {
  return (
    <div className="mx-auto max-w-[1500px]">
      <PageTitle title="التكاملات" description="اربط TrustChat بالأدوات التي يستخدمها فريقك كل يوم." action={<button className="flex items-center gap-2 rounded-xl border border-ui surface px-4 py-2.5 text-sm font-bold"><Webhook size={17} /> إدارة Webhooks</button>} />
      <Card className="mb-6 flex flex-col gap-4 p-4 md:flex-row md:items-center">
        <div className="flex max-w-md flex-1 items-center rounded-xl border border-ui px-3"><Search size={17} className="muted" /><input className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" placeholder="ابحث عن تكامل..." /></div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto text-xs"><button className="rounded-lg bg-brand px-4 py-2 font-bold text-white">الكل</button>{["المراسلة","التجارة الإلكترونية","إدارة العملاء","الأتمتة"].map(x=><button key={x} className="whitespace-nowrap rounded-lg border border-ui px-4 py-2">{x}</button>)}</div>
      </Card>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map(item=><Card key={item.name} className="p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft">
          <div className="flex items-start justify-between"><span className={`grid size-12 place-items-center rounded-2xl ${item.color} text-xs font-black text-white`}>{item.mark}</span>{item.connected?<span className="flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-[10px] font-bold text-brand-dark dark:text-brand"><Check size={12}/> متصل</span>:<span className="muted rounded-full bg-black/[.04] px-3 py-1 text-[10px] dark:bg-white/[.05]">{item.category}</span>}</div>
          <h2 className="mt-5 font-bold">{item.name}</h2><p className="muted mt-2 min-h-12 text-xs leading-6">{item.description}</p>
          <button className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold ${item.connected?"border border-ui":"bg-brand text-white"}`}>{item.connected?"إدارة الاتصال":"ربط التكامل"}{item.connected?<ExternalLink size={14}/>:<Plus size={14}/>}</button>
        </Card>)}
      </div>
      <div className="premium-dark mt-6 flex items-center gap-4 rounded-2xl p-6 text-white"><span className="grid size-12 place-items-center rounded-xl bg-brand/20 text-brand"><Zap size={24}/></span><div className="flex-1"><b>لم تجد الأداة التي تبحث عنها؟</b><p className="mt-1 text-xs text-white/55">استخدم API TrustChat المرن لبناء تكاملك الخاص.</p></div><button className="rounded-xl bg-brand px-4 py-2.5 text-xs font-bold">استكشف API</button></div>
    </div>
  );
}
