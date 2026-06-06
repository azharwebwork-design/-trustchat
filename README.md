# TrustChat MVP

Arabic RTL customer conversation workspace built with Next.js 16, PostgreSQL, and Prisma.

## Local setup

```bash
docker compose up -d postgres
npm install
npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed
npm run dev
```

PostgreSQL is exposed on local port `5434` to avoid conflicts with other projects.

## Demo account

- Email: `demo@trustchat.com`
- Password: `TrustChat123!`

## Commands

```bash
npm run lint
npm run build
npm run prisma:migrate -- --name <migration-name>
npm run prisma:seed
```

WhatsApp API integration is intentionally not included in this MVP.
