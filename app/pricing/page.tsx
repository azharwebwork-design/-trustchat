import Link from "next/link";
import { Check } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { SectionHeading } from "@/components/section-heading";
import { plans } from "@/lib/marketing-data";

export const metadata = { title: "الأسعار" };

export default function PricingPage() {
  return (
    <MarketingShell>
      <section className="grid-pattern px-5 py-24">
        <SectionHeading eyebrow="أسعار واضحة" title="خطة تناسب كل مرحلة من نموك" description="جميع الخطط تشمل تجربة مجانية لمدة 14 يوماً. لا رسوم خفية، ويمكنك الترقية أو الإلغاء في أي وقت." />
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map(plan => (
            <article key={plan.name} className={`relative rounded-[2rem] border p-8 surface shadow-card ${plan.popular ? "border-brand shadow-xl shadow-orange-500/10 lg:-translate-y-4" : "border-ui"}`}>
              {plan.popular && <span className="absolute -top-3 right-8 rounded-full bg-brand px-4 py-1 text-xs font-bold text-white">الأكثر اختياراً</span>}
              <h2 className="text-xl font-black">{plan.name}</h2><p className="muted mt-2 min-h-12 text-sm">{plan.desc}</p>
              <div className="my-7"><strong className="text-4xl font-black">{plan.price}</strong><span className="muted mr-2 text-sm">ر.س / شهرياً</span></div>
              <Link href="/register" className={`block rounded-xl py-3 text-center font-bold ${plan.popular ? "bg-brand text-white" : "border border-ui hover:border-brand"}`}>ابدأ تجربتك</Link>
              <div className="mt-7 space-y-4">{plan.features.map(item => <div key={item} className="flex items-center gap-2 text-sm"><Check size={17} className="text-brand"/>{item}</div>)}</div>
            </article>
          ))}
        </div>
        <p className="muted mt-10 text-center text-sm">الأسعار لا تشمل رسوم محادثات Meta. تحتاج حلاً مخصصاً؟ <Link href="/contact" className="font-bold text-brand-dark dark:text-brand">تحدث مع فريق المبيعات</Link></p>
      </section>
    </MarketingShell>
  );
}
