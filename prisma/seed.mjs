import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const hoursAgo = (hours) => new Date(Date.now() - hours * 60 * 60 * 1000);
const daysAgo = (days) => hoursAgo(days * 24);

async function main() {
  await prisma.workspace.deleteMany({ where: { slug: "trustchat-demo" } });

  const passwordHash = await bcrypt.hash("TrustChat123!", 12);
  const workspace = await prisma.workspace.create({
    data: {
      name: "TrustChat Demo",
      slug: "trustchat-demo",
      users: {
        create: [
          { name: "أحمد محمد", email: "demo@trustchat.com", passwordHash, role: "OWNER", title: "مدير الحساب", phone: "+966 55 100 1000", status: "ONLINE" },
          { name: "ريم القحطاني", email: "reem@trustchat.com", passwordHash, role: "AGENT", title: "دعم العملاء", status: "ONLINE" },
          { name: "خالد المنصور", email: "khaled@trustchat.com", passwordHash, role: "AGENT", title: "المبيعات", status: "BUSY" },
          { name: "لمى السالم", email: "lama@trustchat.com", passwordHash, role: "AGENT", title: "دعم العملاء", status: "ONLINE" },
          { name: "عمر الغامدي", email: "omar@trustchat.com", passwordHash, role: "AGENT", title: "المبيعات", status: "OFFLINE" },
        ],
      },
    },
    include: { users: true },
  });

  const [owner, reem, khaled, lama] = workspace.users;
  const contacts = await Promise.all([
    prisma.contact.create({ data: { workspaceId: workspace.id, name: "سارة أحمد", email: "sara@example.com", phone: "+966 55 123 4567", tag: "عميل مميز", initials: "سأ", color: "bg-violet-500", createdAt: hoursAgo(2) } }),
    prisma.contact.create({ data: { workspaceId: workspace.id, name: "محمد العتيبي", email: "mohammed@example.com", phone: "+966 50 987 6543", tag: "مهتم", initials: "مع", color: "bg-blue-500", createdAt: hoursAgo(4) } }),
    prisma.contact.create({ data: { workspaceId: workspace.id, name: "نورة خالد", email: "noura@example.com", phone: "+966 53 246 8101", tag: "متجر إلكتروني", initials: "نخ", color: "bg-pink-500", createdAt: daysAgo(1) } }),
    prisma.contact.create({ data: { workspaceId: workspace.id, name: "عبدالله سالم", email: "abdullah@example.com", phone: "+966 56 135 7924", tag: "متابعة", initials: "عس", color: "bg-amber-500", createdAt: hoursAgo(27) } }),
    prisma.contact.create({ data: { workspaceId: workspace.id, name: "شركة المدار", email: "hello@almadar.example", phone: "+966 11 456 7890", tag: "شركات", initials: "شم", color: "bg-teal-500", createdAt: daysAgo(3) } }),
  ]);

  const conversationData = [
    { contact: contacts[0], agent: reem, unreadCount: 2, status: "OPEN", messages: [["مرحباً، أحتاج إلى تغيير عنوان التوصيل للطلب رقم #4821", "INBOUND"], ["أهلاً سارة، بكل تأكيد. أرسلي العنوان الجديد وسنحدّثه فوراً.", "OUTBOUND"], ["حي الملقا، شارع أنس بن مالك. شكراً لك!", "INBOUND"]] },
    { contact: contacts[1], agent: khaled, unreadCount: 0, status: "CLOSED", messages: [["هل يمكن إرسال عرض سعر للفريق؟", "INBOUND"], ["تم إرساله إلى بريدك، ويسعدني الإجابة عن أي سؤال.", "OUTBOUND"], ["ممتاز، شكراً على سرعة الرد", "INBOUND"]] },
    { contact: contacts[2], agent: lama, unreadCount: 1, status: "OPEN", messages: [["متى يصل طلبي؟", "INBOUND"], ["طلبك في الطريق وسيصل غداً بإذن الله.", "OUTBOUND"]] },
    { contact: contacts[3], agent: reem, unreadCount: 0, status: "PENDING", messages: [["تم إرسال صورة المنتج المتضرر", "INBOUND"], ["وصلتنا الصورة، وسيتواصل معك فريق الاستبدال اليوم.", "OUTBOUND"]] },
    { contact: contacts[4], agent: owner, unreadCount: 0, status: "OPEN", messages: [["نحتاج عرض سعر للفريق", "INBOUND"], ["يسعدنا ذلك. كم عدد أعضاء الفريق المتوقع؟", "OUTBOUND"]] },
  ];

  for (let index = 0; index < conversationData.length; index += 1) {
    const item = conversationData[index];
    const lastMessageAt = hoursAgo(index + 1);
    const conversation = await prisma.conversation.create({
      data: {
        workspaceId: workspace.id,
        contactId: item.contact.id,
        assignedToId: item.agent.id,
        status: item.status,
        unreadCount: item.unreadCount,
        lastMessageAt,
      },
    });

    for (let messageIndex = 0; messageIndex < item.messages.length; messageIndex += 1) {
      const [content, direction] = item.messages[messageIndex];
      await prisma.message.create({
        data: {
          workspaceId: workspace.id,
          conversationId: conversation.id,
          senderId: direction === "OUTBOUND" ? item.agent.id : null,
          content,
          direction,
          readAt: direction === "OUTBOUND" ? lastMessageAt : null,
          createdAt: new Date(lastMessageAt.getTime() + messageIndex * 60_000),
        },
      });
    }
  }

  await prisma.campaign.createMany({
    data: [
      { workspaceId: workspace.id, name: "عروض نهاية الأسبوع", status: "SENDING", audienceCount: 8420, sentCount: 6218, readCount: 4477, scheduledAt: new Date() },
      { workspaceId: workspace.id, name: "إطلاق المجموعة الصيفية", status: "COMPLETED", audienceCount: 12840, sentCount: 12803, readCount: 11010, completedAt: daysAgo(4) },
      { workspaceId: workspace.id, name: "استعادة السلات المتروكة", status: "SCHEDULED", audienceCount: 1250, sentCount: 0, readCount: 0, scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
      { workspaceId: workspace.id, name: "ترحيب العملاء الجدد", status: "DRAFT", audienceCount: 640, sentCount: 0, readCount: 0 },
    ],
  });

  console.log("Seeded TrustChat demo: demo@trustchat.com / TrustChat123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
