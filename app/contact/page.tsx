import { Mail, MapPin, Phone } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { SectionHeading } from "@/components/section-heading";
export const metadata = { title: "تواصل معنا" };
export default function ContactPage() {
  return <MarketingShell>
    <section className="grid-pattern px-5 py-20"><SectionHeading eyebrow="نحن هنا لمساعدتك" title="لنتحدث عن أهدافك" description="أخبرنا قليلاً عن عملك، وسيتواصل معك أحد خبرائنا لمساعدتك على اختيار الحل المناسب." /></section>
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 lg:grid-cols-[.8fr_1.2fr]">
      <div className="space-y-5">
        {[{icon:Mail,title:"البريد الإلكتروني",text:"hello@trustchat.com"},{icon:Phone,title:"المبيعات",text:"+966 11 234 5678"},{icon:MapPin,title:"المكتب",text:"الرياض، المملكة العربية السعودية"}].map(({icon:Icon,title,text})=><div key={title} className="flex gap-4 rounded-2xl border border-ui surface p-5 shadow-card"><span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand"><Icon size={20}/></span><div><b>{title}</b><p className="muted mt-1 text-sm" dir="auto">{text}</p></div></div>)}
      </div>
      <form className="rounded-[2rem] border border-ui surface p-7 shadow-soft md:p-9">
        <div className="grid gap-5 sm:grid-cols-2"><Field label="الاسم الكامل" placeholder="اكتب اسمك"/><Field label="البريد الإلكتروني" placeholder="name@company.com" type="email"/><Field label="اسم الشركة" placeholder="اسم شركتك"/><Field label="رقم الجوال" placeholder="+966 5X XXX XXXX"/></div>
        <label className="mt-5 block text-sm font-bold">كيف يمكننا مساعدتك؟<textarea rows={5} placeholder="حدثنا عن احتياجك..." className="mt-2 w-full resize-none rounded-xl border border-ui bg-transparent px-4 py-3 outline-none focus:border-brand"/></label>
        <button className="mt-5 w-full rounded-xl bg-brand py-3.5 font-bold text-white hover:bg-brand-dark">إرسال الرسالة</button>
      </form>
    </section>
  </MarketingShell>;
}
function Field({label,placeholder,type="text"}:{label:string;placeholder:string;type?:string}){return <label className="text-sm font-bold">{label}<input type={type} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-ui bg-transparent px-4 py-3 outline-none focus:border-brand"/></label>}
