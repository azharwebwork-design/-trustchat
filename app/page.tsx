import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpLeft,
  BarChart3,
  Bot,
  Check,
  CheckCheck,
  ChevronLeft,
  Clock3,
  ContactRound,
  Headphones,
  Inbox,
  LayoutDashboard,
  Megaphone,
  MessageCircleMore,
  MessageSquareText,
  MoreHorizontal,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";

const stats = [
  ["42%", "استجابة أسرع"],
  ["3.2x", "عائد أعلى للحملات"],
  ["98%", "رضا العملاء"],
  ["24/7", "تغطية مستمرة"],
];

const benefits = [
  {
    icon: Inbox,
    eyebrow: "خدمة العملاء",
    title: "صندوق وارد ينظّم العمل، لا يضيف إليه.",
    text: "كل محادثات العملاء في مكان واحد، مع تعيين ذكي وسياق كامل وملاحظات داخلية تمنح فريقك وضوحاً فورياً.",
  },
  {
    icon: Bot,
    eyebrow: "الأتمتة",
    title: "أتمتة ذكية تبقى إنسانية.",
    text: "صمّم مسارات ترحيب وتأهيل ومتابعة بلا برمجة، وسلّم المحادثة للموظف المناسب في اللحظة المناسبة.",
  },
  {
    icon: BarChart3,
    eyebrow: "التحليلات",
    title: "اعرف ما يحدث، ولماذا، وما التالي.",
    text: "حوّل بيانات المحادثات إلى رؤية عملية لأداء الفريق ورضا العملاء ونتائج الحملات، دون تقارير معقدة.",
  },
];

const testimonials = [
  {
    quote: "انتقل فريقنا من متابعة مشتتة إلى تجربة واضحة بالكامل. أصبحنا نرد أسرع، ونعرف بالضبط أين تحتاج كل محادثة إلى تدخل.",
    name: "ريم الخالدي",
    role: "مديرة تجربة العملاء، نواة",
    initials: "رخ",
  },
  {
    quote: "TrustChat جمع المبيعات والدعم في مساحة واحدة. الأثر لم يكن فقط في السرعة، بل في جودة القرارات التي نتخذها كل يوم.",
    name: "سلمان الحربي",
    role: "مدير النمو، مدار",
    initials: "سح",
  },
  {
    quote: "إطلاق الحملات وقياس نتائجها أصبح أبسط بكثير. الفريق يرى الصورة كاملة، والعملاء يحصلون على تجربة أكثر اتساقاً.",
    name: "لينا منصور",
    role: "رئيسة التجارة الرقمية، أثر",
    initials: "لم",
  },
];

const plans = [
  {
    name: "البداية",
    price: "199",
    description: "لفرق الخدمة الصغيرة التي تريد بداية منظمة.",
    features: ["3 مستخدمين", "1,000 جهة اتصال", "صندوق وارد موحد", "تقارير أساسية"],
  },
  {
    name: "النمو",
    price: "499",
    description: "للفرق النامية التي تحتاج أتمتة ورؤية أعمق.",
    features: ["10 مستخدمين", "10,000 جهة اتصال", "حملات وأتمتة", "تحليلات متقدمة"],
    popular: true,
  },
  {
    name: "الأعمال",
    price: "مخصص",
    description: "للمؤسسات التي تحتاج مرونة وتحكماً أكبر.",
    features: ["مستخدمون غير محدودين", "صلاحيات مخصصة", "API وWebhooks", "مدير نجاح مخصص"],
  },
];

export default function Home() {
  return (
    <MarketingShell>
      <div className="bg-[#fffaf6] text-[#1e1713] dark:bg-[color:var(--page)] dark:text-main">
        <Hero />
        <TrustSection />
        <Stats />
        <Benefits />
        <CustomerStory />
        <Testimonials />
        <Pricing />
        <FinalCta />
      </div>
    </MarketingShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#f1e8e1] dark:border-ui">
      <div className="absolute inset-x-0 top-0 h-[430px] bg-[radial-gradient(circle_at_72%_12%,rgba(249,115,22,.18),transparent_32%),radial-gradient(circle_at_28%_0%,rgba(253,186,116,.16),transparent_28%)]" />
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-10 sm:px-5 lg:px-8 lg:pb-14 lg:pt-12">
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-4 py-2 text-xs font-black text-orange-700 dark:border-orange-800/50 dark:bg-orange-950/30 dark:text-orange-300">
            <Sparkles size={14} /> منصة واحدة لكل محادثة مع عملائك
          </span>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[1.2] tracking-[-.04em] sm:text-5xl lg:text-[4.1rem]">
            ابنِ علاقات أقوى مع العملاء،
            <span className="block text-[#e97932]">محادثة بعد محادثة.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#665b54] dark:text-[color:var(--muted)] md:text-lg">
            TrustChat يجمع خدمة العملاء والمبيعات والحملات والأتمتة في مساحة عمل متكاملة، لتعمل فرقك بوضوح وتمنح عملاءك تجربة أسرع وأكثر شخصية.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ed7b35] px-7 py-4 text-sm font-black text-white shadow-[0_14px_35px_rgba(237,123,53,.24)] transition hover:-translate-y-0.5 hover:bg-[#dc6d2c]">
              ابدأ مجاناً <ArrowLeft size={18} />
            </Link>
            <Link href="/features" className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#e8ded7] bg-white px-7 py-4 text-sm font-black shadow-[0_8px_30px_rgba(72,48,32,.06)] transition hover:border-orange-300 dark:border-ui dark:surface">
              <span className="grid size-7 place-items-center rounded-full bg-orange-50 text-[#e97932] dark:bg-orange-950/30"><Play size={12} fill="currentColor" /></span>
              شاهد كيف تعمل
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold text-[#746860] dark:text-[color:var(--muted)]">
            {["14 يوماً مجاناً", "بدون بطاقة ائتمانية", "إعداد خلال دقائق"].map((item) => (
              <span key={item} className="flex items-center gap-1.5"><Check size={14} className="text-[#e97932]" />{item}</span>
            ))}
          </div>
        </div>
        <div className="relative mt-9 lg:mt-10">
          <div className="absolute inset-x-[8%] -bottom-8 h-36 rounded-full bg-orange-400/20 blur-3xl" />
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="border-b border-[#eadfd7] bg-[#211914] py-7 text-white dark:border-ui">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [ShieldCheck, "حماية بمستوى المؤسسات", "صلاحيات وسجل نشاط"],
            [Star, "4.9 من 5", "متوسط تقييم العملاء"],
            [Headphones, "دعم عربي متخصص", "معك من الإعداد إلى النمو"],
            [Zap, "إعداد خلال دقائق", "بدون تعقيد تقني"],
          ].map(([icon, title, text]) => {
            const Icon = icon as typeof ShieldCheck;
            return (
              <div key={title as string} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.055] px-4 py-3.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#ef8b4f]/15 text-[#f2a06f]"><Icon size={17} /></span>
                <div><strong className="block text-xs">{title as string}</strong><span className="mt-0.5 block text-[9px] text-white/45">{text as string}</span></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-5 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label], index) => (
            <div key={label} className={index ? "lg:border-r lg:border-[#eee4dd] dark:lg:border-ui" : ""}>
              <strong className="text-4xl font-black tracking-[-.04em] text-[#c95f28]">{value}</strong>
              <p className="mt-1.5 text-sm font-bold text-[#655a53] dark:text-[color:var(--muted)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="bg-[#f6eee8] py-16 dark:bg-white/[.025] md:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionIntro
          eyebrow="منصة متكاملة"
          title="بساطة في الواجهة. قوة في كل خطوة."
          description="صُممت TrustChat لتمنح فريقك الأدوات التي يحتاجها فعلاً، في تجربة واضحة تتوسع مع نمو أعمالك."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, eyebrow, title, text }, index) => (
            <article key={title} className={`group rounded-[1.5rem] border p-7 shadow-[0_20px_55px_rgba(65,38,22,.11)] transition duration-300 hover:-translate-y-1 md:p-8 ${index === 1 ? "border-[#e5a47d] bg-[#fff4eb] dark:border-orange-800/50 dark:bg-orange-950/15" : "border-[#dfd2c9] bg-[#fffdfb] dark:border-ui dark:surface"}`}>
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-[#fce9dc] text-[#d66b30] dark:bg-orange-950/30 dark:text-orange-300"><Icon size={22} /></span>
                <span className="text-[10px] font-black tracking-[.13em] text-[#b28e79]">0{index + 1}</span>
              </div>
              <p className="mt-6 text-xs font-black text-[#c75f29]">{eyebrow}</p>
              <h3 className="mt-3 text-xl font-black leading-8 tracking-tight">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#7a6e67] dark:text-[color:var(--muted)]">{text}</p>
              <Link href="/features" className="mt-7 inline-flex items-center gap-1 text-xs font-black text-[#cd662f]">اكتشف المزيد <ChevronLeft size={15} /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomerStory() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#f4e8df] shadow-[0_28px_75px_rgba(56,31,17,.2)] ring-1 ring-[#ddcfc5]">
            <Image src="/images/trustchat-customer-story.png" alt="فريق تجارة إلكترونية يراجع تجربة العملاء" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="absolute -bottom-7 -left-3 hidden w-56 rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#1b1714]/90 sm:block">
            <div className="flex items-center justify-between"><span className="text-xs font-black">رضا العملاء</span><TrendingUp size={17} className="text-[#df7336]" /></div>
            <strong className="mt-3 block text-3xl font-black">94.8%</strong>
            <span className="mt-2 flex items-center gap-1 text-[10px] font-black text-emerald-600"><ArrowUpLeft size={12} /> 12.4% هذا الشهر</span>
          </div>
        </div>
        <div>
          <span className="text-xs font-black text-[#db7137]">تجربة عميل موحدة</span>
          <h2 className="mt-4 max-w-xl text-3xl font-black leading-[1.4] tracking-[-.025em] md:text-5xl">امنح فريقك الصورة الكاملة، في كل محادثة.</h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-[#655b54] dark:text-[color:var(--muted)]">
            من آخر طلب إلى آخر حملة، يرى فريقك كل ما يحتاجه لفهم العميل وتقديم إجابة دقيقة وشخصية من أول مرة.
          </p>
          <div className="mt-6 space-y-4">
            {[
              [ContactRound, "ملف عميل موحد", "بيانات ومحادثات وطلبات ووسوم في مكان واحد."],
              [Users, "تعاون بلا ازدواجية", "تعيين وملاحظات داخلية وحالة واضحة لكل محادثة."],
              [ShieldCheck, "ثقة على مستوى المؤسسة", "صلاحيات وسجل نشاط وحماية متقدمة للبيانات."],
            ].map(([icon, title, text]) => {
              const Icon = icon as typeof ContactRound;
              return (
                <div key={title as string} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fae9dd] text-[#d66d32] dark:bg-orange-950/30"><Icon size={19} /></span>
                  <div><h3 className="font-black">{title as string}</h3><p className="mt-1 text-sm leading-6 text-[#81756e] dark:text-[color:var(--muted)]">{text as string}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-[#211814] py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionIntro eyebrow="قصص عملائنا" title="فرق أفضل. خدمة أسرع. عملاء أكثر رضا." description="شاهد كيف تستخدم فرق المنطقة TrustChat لتحويل كل محادثة إلى تجربة أفضل." dark />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-[1.5rem] border border-white/15 bg-white/[.075] p-7 shadow-[0_18px_45px_rgba(0,0,0,.18)] backdrop-blur-sm">
              <div className="flex gap-1 text-[#f2a36f]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}</div>
              <blockquote className="mt-6 min-h-32 text-[15px] font-semibold leading-8 text-white/85">“{testimonial.quote}”</blockquote>
              <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="grid size-10 place-items-center rounded-full bg-[#e67a3e] text-xs font-black">{testimonial.initials}</span>
                <div><strong className="block text-sm">{testimonial.name}</strong><span className="mt-0.5 block text-[10px] text-white/45">{testimonial.role}</span></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionIntro eyebrow="أسعار واضحة" title="ابدأ بما يناسبك، وتوسّع بثقة." description="جميع الخطط تشمل تجربة مجانية لمدة 14 يوماً. لا رسوم خفية، ويمكنك الترقية أو الإلغاء في أي وقت." />
        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className={`relative rounded-[1.6rem] border p-7 md:p-8 ${plan.popular ? "border-[#dc8958] bg-[#fff3e9] shadow-[0_28px_65px_rgba(181,75,22,.18)] dark:border-orange-700/60 dark:bg-orange-950/15" : "border-[#dfd3cb] bg-[#fffdfb] shadow-[0_18px_50px_rgba(66,39,23,.1)] dark:border-ui dark:surface"}`}>
              {plan.popular && <span className="absolute -top-3 right-7 rounded-full bg-[#e5783b] px-4 py-1.5 text-[10px] font-black text-white">الأكثر اختياراً</span>}
              <h3 className="text-xl font-black">{plan.name}</h3>
              <p className="mt-3 min-h-12 text-sm leading-6 text-[#7d716a] dark:text-[color:var(--muted)]">{plan.description}</p>
              <div className="mt-7 border-b border-[#eee5df] pb-7 dark:border-ui">
                <strong className="text-4xl font-black tracking-tight">{plan.price}</strong>
                {plan.price !== "مخصص" && <span className="mr-2 text-xs text-[#8a7e76]">ر.س / شهرياً</span>}
              </div>
              <div className="mt-7 space-y-4">
                {plan.features.map((feature) => <div key={feature} className="flex items-center gap-2.5 text-sm font-bold"><span className="grid size-5 place-items-center rounded-full bg-[#f8e7dc] text-[#d46a31] dark:bg-orange-950/30"><Check size={12} /></span>{feature}</div>)}
              </div>
              <Link href={plan.price === "مخصص" ? "/contact" : "/register"} className={`mt-8 block rounded-xl py-3.5 text-center text-sm font-black transition ${plan.popular ? "bg-[#e5783b] text-white shadow-lg shadow-orange-500/15 hover:bg-[#d96c31]" : "border border-[#dfd4cd] hover:border-[#e59465] dark:border-ui"}`}>
                {plan.price === "مخصص" ? "تحدث مع المبيعات" : "ابدأ تجربتك"}
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-[#948880] dark:text-[color:var(--muted)]">تحتاج إلى مقارنة كاملة؟ <Link href="/pricing" className="font-black text-[#cf682f]">استعرض جميع تفاصيل الخطط</Link></p>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 pb-16 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#ed8b51] px-7 py-12 text-center text-[#25170f] shadow-[0_24px_65px_rgba(176,73,23,.2)] md:px-16 md:py-14">
        <div className="absolute -right-20 -top-24 size-72 rounded-full border border-white/25" />
        <div className="absolute -bottom-28 -left-12 size-72 rounded-full bg-white/15 blur-2xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-black leading-[1.4] tracking-tight md:text-5xl">اجعل محادثاتك أفضل نقطة نمو في أعمالك.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-semibold leading-7 text-[#573629]/75">ابدأ تجربتك المجانية اليوم، واجمع فريقك وعملاءك في مساحة صُممت لبناء الثقة.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2b201b] px-7 py-4 text-sm font-black text-white shadow-xl shadow-orange-950/15">ابدأ مجاناً <ArrowLeft size={18} /></Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-[#4d3024]/20 bg-white/35 px-7 py-4 text-sm font-black backdrop-blur-sm">تحدث مع فريقنا</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description: string; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className={`text-xs font-black ${dark ? "text-[#f2a36f]" : "text-[#da7137]"}`}>{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-black leading-[1.32] tracking-[-.03em] md:text-[2.65rem]">{title}</h2>
      <p className={`mt-4 text-sm leading-7 md:text-base ${dark ? "text-white/60" : "text-[#665b54] dark:text-[color:var(--muted)]"}`}>{description}</p>
    </div>
  );
}

function DashboardMockup() {
  const nav = [
    [LayoutDashboard, "نظرة عامة"],
    [Inbox, "صندوق الفريق"],
    [MessageSquareText, "المحادثات"],
    [ContactRound, "جهات الاتصال"],
    [Megaphone, "الحملات"],
  ] as const;

  return (
    <div className="relative mx-auto max-w-[1320px] rounded-[1.65rem] border border-[#d9c9be] bg-[#e9ddd4] p-2.5 shadow-[0_38px_100px_rgba(58,32,17,.25)] dark:border-ui dark:bg-[#16120f] md:p-3.5">
      <div className="overflow-hidden rounded-[1.25rem] border border-[#dfd3ca] bg-white dark:border-ui dark:surface">
        <div className="flex h-12 items-center justify-between border-b border-[#eee6e0] px-4 dark:border-ui">
          <div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-[#f1a77b]" /><span className="size-2.5 rounded-full bg-[#f5cf87]" /><span className="size-2.5 rounded-full bg-[#9fceb4]" /></div>
          <div className="flex h-7 w-52 items-center rounded-lg bg-[#f7f3f0] px-3 text-[9px] text-[#9a8d85] dark:bg-white/5"><Search size={11} className="ml-2" /> app.trustchat.com</div>
          <MoreHorizontal size={16} className="text-[#a59992]" />
        </div>
        <div className="grid min-h-[540px] grid-cols-[76px_1fr] sm:grid-cols-[205px_1fr]">
          <aside className="border-l border-[#eee6e0] bg-[#fcfaf8] p-3 dark:border-ui dark:bg-white/[.02]">
            <div className="mb-7 flex items-center gap-2 px-2">
              <span className="grid size-8 place-items-center rounded-xl bg-[#ea7b3e] text-white"><MessageCircleMore size={16} /></span>
              <strong className="hidden text-xs sm:block" dir="ltr">TrustChat</strong>
            </div>
            <div className="space-y-1.5">
              {nav.map(([Icon, label], index) => (
                <div key={label} className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[10px] font-bold ${index === 0 ? "bg-[#fae9de] text-[#c65f2b] dark:bg-orange-950/25" : "text-[#8d817a]"}`}>
                  <Icon size={15} /><span className="hidden sm:block">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-20 hidden rounded-xl bg-[#fff3ea] p-3 sm:block dark:bg-orange-950/15">
              <span className="text-[8px] font-black text-[#ce6a33]">الخطة الاحترافية</span>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-orange-100"><div className="h-full w-2/3 rounded-full bg-[#e98249]" /></div>
              <span className="mt-2 block text-[7px] text-[#9b8b81]">68% من الاستخدام الشهري</span>
            </div>
          </aside>
          <main className="min-w-0 bg-[#faf7f4] p-4 dark:bg-[#15110f] sm:p-7">
            <div className="flex items-start justify-between">
              <div><span className="text-[8px] font-black tracking-wider text-[#dc743b]">TRUSTCHAT WORKSPACE</span><h2 className="mt-1 text-sm font-black sm:text-lg">صباح الخير، أحمد</h2><p className="mt-1 hidden text-[8px] text-[#9b8e86] sm:block">إليك ما يحدث في مساحة عملك اليوم.</p></div>
              <span className="rounded-lg bg-[#e77b40] px-3 py-2 text-[8px] font-black text-white">+ محادثة جديدة</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                [MessageCircleMore, "المحادثات", "2,847", "+12.5%"],
                [Clock3, "زمن الرد", "2:48 د", "+18.2%"],
                [CheckCheck, "تم الحل", "1,924", "+8.4%"],
                [Star, "رضا العملاء", "94.8%", "+2.1%"],
              ].map(([icon, label, value, change]) => {
                const Icon = icon as typeof MessageCircleMore;
                return (
                  <div key={label as string} className="rounded-xl border border-[#e1d5cd] bg-white p-3.5 shadow-[0_8px_24px_rgba(66,39,23,.09)] dark:border-ui dark:surface">
                    <div className="flex items-center justify-between"><span className="grid size-7 place-items-center rounded-lg bg-[#fae9de] text-[#db7338]"><Icon size={13} /></span><span className="text-[7px] font-black text-emerald-600">{change as string}</span></div>
                    <p className="mt-3 text-[7px] text-[#9a8d85]">{label as string}</p><strong className="mt-0.5 block text-xs sm:text-sm">{value as string}</strong>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-[1.45fr_.75fr]">
              <div className="rounded-xl border border-[#e1d5cd] bg-white p-5 shadow-[0_8px_24px_rgba(66,39,23,.08)] dark:border-ui dark:surface">
                <div className="flex items-center justify-between"><div><strong className="block text-[10px]">نشاط المحادثات</strong><span className="text-[7px] text-[#a0938b]">آخر 7 أيام</span></div><TrendingUp size={14} className="text-[#df773c]" /></div>
                <div className="mt-5 flex h-36 items-end gap-2 border-b border-[#eee6e0] px-1 dark:border-ui">
                  {[46, 62, 53, 76, 68, 91, 79].map((height, index) => <div key={index} className="flex flex-1 items-end justify-center"><span className="w-full max-w-6 rounded-t bg-gradient-to-t from-[#dd7136] to-[#f1a173]" style={{ height: `${height}%` }} /></div>)}
                </div>
                <div className="mt-2 flex justify-between px-1 text-[6px] text-[#aa9d95]">{["س", "ح", "ن", "ث", "ر", "خ", "ج"].map((day) => <span key={day}>{day}</span>)}</div>
              </div>
              <div className="rounded-xl border border-[#e1d5cd] bg-white p-5 shadow-[0_8px_24px_rgba(66,39,23,.08)] dark:border-ui dark:surface">
                <div className="flex items-center justify-between"><strong className="text-[10px]">أداء الفريق</strong><Headphones size={14} className="text-[#df773c]" /></div>
                <div className="mt-4 space-y-3">
                  {[["ر", "ريم القحطاني", "متاحة"], ["خ", "خالد المنصور", "مشغول"], ["ل", "لمى السالم", "متاحة"]].map(([initial, name, state], index) => (
                    <div key={name} className="flex items-center gap-2"><span className={`grid size-7 place-items-center rounded-full text-[7px] font-black text-white ${index === 1 ? "bg-[#765f52]" : "bg-[#e48550]"}`}>{initial}</span><div className="min-w-0 flex-1"><strong className="block truncate text-[7px]">{name}</strong><span className="text-[6px] text-[#a0938b]">دعم العملاء</span></div><span className={`text-[6px] font-black ${state === "متاحة" ? "text-emerald-600" : "text-amber-600"}`}>{state}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 hidden rounded-xl border border-[#e1d5cd] bg-white shadow-[0_8px_24px_rgba(66,39,23,.07)] dark:border-ui dark:surface sm:block">
              <div className="flex items-center justify-between border-b border-[#eee6e0] px-4 py-3 dark:border-ui"><div><strong className="block text-[9px]">أحدث المحادثات</strong><span className="text-[6px] text-[#a0938b]">آخر تفاعلات عملائك</span></div><span className="text-[7px] font-black text-[#cf682f]">عرض الكل</span></div>
              <div className="grid grid-cols-3 divide-x divide-x-reverse divide-[#eee6e0] dark:divide-[color:var(--border)]">
                {[["س", "سارة أحمد", "تغيير عنوان التوصيل", "الآن"], ["م", "محمد علي", "شكراً لسرعة الرد", "5 د"], ["ن", "نورة خالد", "موعد وصول الطلب", "12 د"]].map(([initial, name, message, time], index) => (
                  <div key={name} className="flex items-center gap-2 px-3 py-3">
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full text-[7px] font-black text-white ${index === 1 ? "bg-[#735e52]" : "bg-[#e28149]"}`}>{initial}</span>
                    <div className="min-w-0 flex-1"><strong className="block truncate text-[7px]">{name}</strong><span className="block truncate text-[6px] text-[#9c8f87]">{message}</span></div>
                    <span className="text-[6px] text-[#aa9d95]">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="absolute -left-3 top-28 hidden rounded-2xl border border-white bg-white/95 p-4 shadow-xl backdrop-blur-xl dark:border-ui dark:bg-[#211b17]/95 lg:block">
        <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-[#f9e6d9] text-[#d86e34]"><Zap size={18} /></span><div><strong className="block text-[10px]">أتمتة نشطة</strong><span className="text-[8px] text-[#9a8c84]">1,248 محادثة هذا الشهر</span></div></div>
      </div>
    </div>
  );
}
