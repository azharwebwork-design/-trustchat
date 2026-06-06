import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
