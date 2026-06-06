import { AuthCard } from "@/components/auth-card";
import { redirectAuthenticatedUser } from "@/app/actions/auth";
export const metadata={title:"إنشاء حساب"};
export default async function Page(){await redirectAuthenticatedUser();return <AuthCard mode="register"/>}
