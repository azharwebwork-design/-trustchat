import Link from "next/link";
import { MessageCircleMore, Sparkles } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="relative grid size-11 place-items-center rounded-[15px] bg-gradient-to-br from-orange-400 via-brand to-orange-700 text-white shadow-lg shadow-orange-500/20 transition group-hover:-rotate-3">
        <MessageCircleMore size={24} strokeWidth={2.5} />
        <Sparkles className="absolute -left-1 -top-1 text-orange-300" size={11} fill="currentColor" />
      </span>
      {!compact && (
        <span>
          <strong className="block text-xl font-black leading-5 tracking-tight text-main" dir="ltr">TrustChat</strong>
          <small className="muted text-[9px] font-semibold">محادثات تبني الثقة</small>
        </span>
      )}
    </Link>
  );
}
