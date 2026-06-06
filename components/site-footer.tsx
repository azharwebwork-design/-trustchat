import Link from "next/link";
import { Brand } from "./brand";

const columns = [
  { title: "المنتج", links: [["المزايا", "/features"], ["الأسعار", "/pricing"], ["التكاملات", "/dashboard/integrations"]] },
  { title: "الشركة", links: [["من نحن", "/about"], ["تواصل معنا", "/contact"], ["الوظائف", "/about"]] },
  { title: "الدعم", links: [["مركز المساعدة", "/contact"], ["حالة الخدمة", "/contact"], ["سياسة الخصوصية", "/about"]] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ui surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Brand />
          <p className="muted mt-5 max-w-sm text-sm leading-7">
            منصة موحدة تمنح فرقك الأدوات اللازمة لبناء علاقات أقوى مع العملاء عبر كل محادثة.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="mb-4 font-bold">{column.title}</h3>
            <div className="flex flex-col gap-3">
              {column.links.map(([label, href]) => <Link key={label} href={href} className="muted text-sm hover:text-brand">{label}</Link>)}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-ui py-5 text-center text-xs muted">© 2026 TrustChat. جميع الحقوق محفوظة.</div>
    </footer>
  );
}
