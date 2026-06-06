"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, deleteSession, getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type AuthState = {
  message?: string;
  errors?: Partial<Record<"name" | "email" | "password", string[]>>;
};

const email = z.string().trim().email("أدخل بريداً إلكترونياً صحيحاً.");
const password = z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل.");
const registerSchema = z.object({
  name: z.string().trim().min(2, "الاسم يجب أن يكون حرفين على الأقل."),
  email,
  password,
});
const loginSchema = z.object({ email, password });

export async function register(_: AuthState, formData: FormData): Promise<AuthState> {
  const result = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) return { errors: result.error.flatten().fieldErrors };

  const normalizedEmail = result.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) return { message: "يوجد حساب مسجل بهذا البريد بالفعل." };

  const passwordHash = await bcrypt.hash(result.data.password, 12);
  const slugBase = normalizedEmail.split("@")[0].replace(/[^a-zA-Z0-9-]/g, "").toLowerCase() || "workspace";
  const slug = `${slugBase}-${Date.now().toString(36)}`;

  const user = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: { name: `مساحة ${result.data.name}`, slug },
    });
    return tx.user.create({
      data: {
        workspaceId: workspace.id,
        name: result.data.name,
        email: normalizedEmail,
        passwordHash,
        role: "OWNER",
        title: "مدير الحساب",
      },
    });
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export async function login(_: AuthState, formData: FormData): Promise<AuthState> {
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!result.success) return { errors: result.error.flatten().fieldErrors };

  const user = await prisma.user.findUnique({
    where: { email: result.data.email.toLowerCase() },
  });
  if (!user || !(await bcrypt.compare(result.data.password, user.passwordHash))) {
    return { message: "البريد الإلكتروني أو كلمة المرور غير صحيحة." };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function redirectAuthenticatedUser() {
  if (await getCurrentUser()) redirect("/dashboard");
}
