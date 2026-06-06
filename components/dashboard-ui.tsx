import { ArrowDownLeft, ArrowUpLeft, MoreHorizontal } from "lucide-react";

export function PageTitle({title,description,action}:{title:string;description:string;action?:React.ReactNode}){
  return <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><span className="mb-2 block text-[10px] font-black tracking-[.18em] text-brand">TRUSTCHAT WORKSPACE</span><h1 className="text-2xl font-black tracking-tight md:text-3xl">{title}</h1><p className="muted mt-2 text-sm">{description}</p></div>{action}</div>
}
export function Card({children,className=""}:{children:React.ReactNode;className?:string}){return <section className={`rounded-[1.35rem] border border-ui surface shadow-card ${className}`}>{children}</section>}
export function StatCard({label,value,change,icon:Icon,color="text-brand bg-brand/10"}:{label:string;value:string;change:string;icon:React.ElementType;color?:string}){
  const up=!change.startsWith("-");
  return <Card className="group relative overflow-hidden p-5 transition hover:-translate-y-0.5 hover:border-brand/30"><span className="absolute -left-8 -top-8 size-24 rounded-full bg-brand/5 transition group-hover:scale-150"/><div className="relative flex items-start justify-between"><span className={`grid size-11 place-items-center rounded-xl ${color}`}><Icon size={21}/></span><span className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-black ${up?"bg-emerald-500/10 text-emerald-600":"bg-red-500/10 text-red-500"}`}>{change}{up?<ArrowUpLeft size={13}/>:<ArrowDownLeft size={13}/>}</span></div><p className="muted relative mt-5 text-xs">{label}</p><strong className="relative mt-1 block text-2xl font-black tracking-tight">{value}</strong></Card>
}
export function TableHead({children}:{children:React.ReactNode}){return <div className="muted grid min-w-[650px] border-b border-ui bg-black/[.015] px-5 py-3 text-[11px] font-bold dark:bg-white/[.02]">{children}</div>}
export function MoreButton(){return <button type="button" disabled title="المزيد قريبًا" aria-label="المزيد قريبًا" className="grid size-8 cursor-not-allowed place-items-center rounded-lg opacity-45"><MoreHorizontal size={17}/></button>}
export function Avatar({initials,color="bg-brand",size="size-9"}:{initials:string;color?:string;size?:string}){return <span className={`grid ${size} shrink-0 place-items-center rounded-full ${color} text-[10px] font-bold text-white`}>{initials}</span>}
