import type { ButtonHTMLAttributes, ReactNode } from "react";

export function ComingSoonButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      disabled
      title="قريبًا"
      className={`${className} cursor-not-allowed opacity-55`}
      {...props}
    >
      {children}
      <span className="rounded-full bg-black/5 px-2 py-0.5 text-[9px] font-bold dark:bg-white/10">قريبًا</span>
    </button>
  );
}
