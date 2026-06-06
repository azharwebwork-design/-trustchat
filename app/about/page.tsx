import { HeartHandshake, Lightbulb, Target, Users } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { SectionHeading } from "@/components/section-heading";

export const metadata = { title: "من نحن" };
const values = [
  { icon: Target, title: "نركّز على الأثر", text: "نبني ما يساعد الشركات فعلاً على خدمة عملائها وتحقيق نمو مستدام." },
  { icon: HeartHandshake, title: "العميل أولاً", text: "كل قرار يبدأ من سؤال بسيط: هل سيجعل تجربة العميل أفضل؟" },
  { icon: Lightbulb, title: "البساطة قوة", text: "نحوّل العمليات المعقدة إلى تجربة واضحة يمكن للجميع استخدامها." },
  { icon: Users, title: "ننجح معاً", text: "نؤمن أن أفضل المنتجات تُبنى بالتعاون والاستماع المستمر." },
];
export default function AboutPage() {
  return <MarketingShell>
    <section className="grid-pattern px-5 py-24"><SectionHeading eyebrow="قصتنا" title="نجعل تواصل الأعمال أكثر إنسانية" description="بدأت TrustChat برؤية واضحة: أن تستحق كل شركة أدوات قوية وسهلة لبناء علاقات حقيقية مع عملائها." /></section>
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <div className="grid gap-6 md:grid-cols-2">{values.map(({icon:Icon,title,text})=><article key={title} className="rounded-3xl border border-ui surface p-8"><Icon className="mb-5 text-brand" size={28}/><h2 className="text-xl font-bold">{title}</h2><p className="muted mt-3 leading-7">{text}</p></article>)}</div>
      <div className="mt-16 rounded-[2rem] bg-brand/10 p-10 text-center"><strong className="text-3xl font-black">نبني من المنطقة، للعالم</strong><p className="muted mx-auto mt-4 max-w-2xl leading-8">تجربة عربية أصيلة، بمعايير عالمية، وفريق شغوف بمساعدة الشركات على تقديم تواصل يستحقه عملاؤها.</p></div>
    </section>
  </MarketingShell>;
}
