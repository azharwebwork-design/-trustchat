import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const [users, contacts, conversations, messages, campaigns] = await Promise.all([
    prisma.user.count(),
    prisma.contact.count(),
    prisma.conversation.count(),
    prisma.message.count(),
    prisma.campaign.count(),
  ]);

  if (!users || !contacts || !conversations || !messages || !campaigns) {
    throw new Error(`Missing seed data: ${JSON.stringify({ users, contacts, conversations, messages, campaigns })}`);
  }

  const demo = await prisma.user.findUnique({ where: { email: "demo@trustchat.com" } });
  if (!demo || !(await bcrypt.compare("TrustChat123!", demo.passwordHash))) {
    throw new Error("Demo login verification failed.");
  }

  const email = `production-check-${Date.now()}@trustchat.test`;
  const passwordHash = await bcrypt.hash("ProductionCheck123!", 10);
  const workspace = await prisma.workspace.create({
    data: {
      name: "Production verification",
      slug: `production-check-${Date.now()}`,
      users: {
        create: {
          name: "Production Check",
          email,
          passwordHash,
          role: "OWNER",
        },
      },
    },
    include: { users: true },
  });

  const registeredUser = await prisma.user.findUnique({ where: { email } });
  const loginValid =
    registeredUser &&
    (await bcrypt.compare("ProductionCheck123!", registeredUser.passwordHash));

  await prisma.workspace.delete({ where: { id: workspace.id } });

  if (!loginValid) throw new Error("Register/login verification failed.");

  console.log(JSON.stringify({
    tables: "ok",
    seed: { users, contacts, conversations, messages, campaigns },
    demoLogin: "ok",
    registerLogin: "ok",
  }));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
