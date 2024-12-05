<div align="center">
  <a href="https://theheavyshop.vercel.app/">
    <img src="https://github.com/user-attachments/assets/f1737d0d-1e0f-4f39-ad0f-66136e3c4d54">
  </a>
</div>

## 🚩 Introduction
The Heavy Shop is a full-stack Nuxt-based concept store specializing in heavy metal merchandise and apparel. I built this personal project as a way to extend my coding knowledge and familiarize myself with various modern technologies that are being used in the industry.

The result was a well-polished web application with a minimalistic UI, an intuitive UX and a clean, stable, further scalable codebase. Learn more about the development journey, features and technical details [here](https://theheavyshop.vercel.app/about).

## 🚀 Quick Start

### 1. Clone the project

```bash
git clone https://github.com/alex-croitoriu/The-Heavy-Shop.git
```

### 2. Go to the project directory

```bash
cd The-Heavy-Shop
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Configure the project
Create an `.env` file and provide the required environment variables (refer to the `.env.example` file).

```bash
# You can generate a secret by running
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
AUTH_SECRET=
AUTH_ORIGIN="http://localhost:3000"

# Stripe API Keys
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# GitHub OAuth Keys
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Discord OAuth Keys
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Nodemailer SMTP credentials
MAIL_USER=
MAIL_PASSWORD=

# Vercel Blob token
BLOB_READ_WRITE_TOKEN=

DATABASE_URL=
```

After setting up your environment, update the `prisma/schema.prisma` file for development use.

```prisma
datasource db {
  // Used in development
  provider = "postgresql"
  url      = env("DATABASE_URL")

  // Used in production (Vercel deployment)
  // provider  = "postgresql"
  // url       = env("POSTGRES_PRISMA_URL")
  // directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

### 5. Start developing locally

```bash
# Start a development server on http://localhost:3000
pnpm run dev

# Start a prisma studio server on http://localhost:5555
pnpm prisma studio
```

