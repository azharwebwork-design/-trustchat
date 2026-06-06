import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { SectionHeading } from "@/components/section-heading";
import { featureItems } from "@/lib/marketing-data";

export const metadata = { title: "المزايا" };

export default function FeaturesPage() {
  return (
    <MarketingShell>
      <section className="grid-pattern px-5 py-24">
        <SectionHeading eyebrow="مزايا TrustChat" title="كل محادثاتك. فريق واحد. نتائج أوضح." description="مجموعة متكاملة من الأدوات تساعدك على خدمة عملائك، تنمية مبيعاتك وأتمتة عملياتك من مكان واحد." />
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {featureItems.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="flex gap-5 rounded-3xl border border-ui surface p-7 transition hover:border-brand/40 hover:shadow-soft">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand-dark dark:text-brand"><Icon size={23} /></span>
              <div><span className="muted text-xs">0{index + 1}</span><h2 className="mt-1 text-lg font-bold">{title}</h2><p className="muted mt-2 text-sm leading-7">{text}</p></div>
            </article>
          ))}
        </div>
        <div className="premium-dark mt-20 grid items-center gap-10 rounded-[2rem] p-8 text-white md:grid-cols-2 md:p-12">
          <div><h2 className="text-3xl font-black">صُممت لتعمل بطريقتك</h2><p className="mt-4 leading-8 text-white/60">ابدأ بالأدوات التي تحتاجها اليوم، وتوسّع بسلاسة كلما نما فريقك وأعمالك.</p></div>
          <div className="space-y-3">
            {["إعداد سريع دون خبرة تقنية", "تجربة عربية كاملة من اليمين إلى اليسار", "دعم متخصص في كل خطوة"].map(x => <div key={x} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded-full bg-brand/20 text-brand"><Check size={14}/></span>{x}</div>)}
            <Link href="/register" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-bold">ابدأ مجاناً <ArrowLeft size={17}/></Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
