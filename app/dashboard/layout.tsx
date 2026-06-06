import { DashboardShell } from "@/components/dashboard-shell";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Layout({children}:{children:React.ReactNode}){
  const user = await requireUser();
  const unread=await prisma.conversation.aggregate({where:{workspaceId:user.workspaceId},_sum:{unreadCount:true}});
  return <DashboardShell unreadCount={unread._sum.unreadCount??0} user={{name:user.name,email:user.email,title:user.title ?? "عضو الفريق"}}>{children}</DashboardShell>
}
