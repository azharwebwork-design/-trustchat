import Link from "next/link";
import { X } from "lucide-react";

export function DashboardModal({
  title,
  description,
  closeHref,
  children,
}: {
  title: string;
  description: string;
  closeHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/45 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="surface w-full max-w-lg rounded-[1.5rem] border border-ui p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h2 id="dialog-title" className="text-xl font-black">{title}</h2>
            <p className="muted mt-1 text-sm">{description}</p>
          </div>
          <Link href={closeHref} aria-label="إغلاق" className="grid size-9 place-items-center rounded-xl border border-ui hover:bg-black/5 dark:hover:bg-white/5">
            <X size={18} />
          </Link>
        </div>
        {children}
      </section>
    </div>
  );
}
