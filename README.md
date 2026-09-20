# Kaasa Portfolio

Portofolio pribadi Dinda Atikah Ghaisani — Front-End Developer, UI/UX Designer, dan Graphic Designer. Dibangun dengan Next.js dan dilengkapi admin dashboard, jadi semua konten (profil, pengalaman, pendidikan, project, dll) bisa diupdate lewat form tanpa perlu edit kode.

🔗 **Live site:** [dinda-atikah-portfolio.vercel.app](https://dinda-atikah-portfolio.vercel.app)

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL (Neon) via Prisma ORM
- **Auth:** Auth.js (NextAuth) — credentials login untuk admin
- **File storage:** Vercel Blob (upload CV, foto profil, gambar project/sertifikat)
- **Icons:** react-icons
- **Package manager:** pnpm
- **Hosting:** Vercel

## Fitur

### Halaman publik
- Hero dengan foto polaroid dan badge minat
- About, Experience, Education, Organization, Volunteer (timeline)
- Skills (dikelompokkan per kategori)
- Projects (filter per kategori: Development, UI/UX, Design Graphic, Others)
- Certifications
- Contact (link sosial media)

### Admin dashboard (`/dashboard`)
- Login terproteksi (`/login`)
- CRUD penuh untuk semua konten di atas
- Upload file (CV, foto profil, galeri foto, gambar project & sertifikat) dengan validasi ukuran

## Struktur Folder

```
src/
├── app/
│   ├── (auth)/login/       # Halaman login admin
│   ├── (dashboard)/        # Admin dashboard + CRUD pages
│   ├── api/auth/           # NextAuth route handler
│   └── page.tsx            # Halaman publik utama
├── features/
│   ├── auth/               # Logic login
│   ├── dashboard/          # Layout & navigasi admin
│   ├── landing/            # Semua section halaman publik
│   ├── profile/            # CRUD Profile
│   ├── experience/         # CRUD Experience
│   ├── education/          # CRUD Education
│   ├── organization/       # CRUD Organization
│   ├── volunteer/          # CRUD Volunteer
│   ├── project/            # CRUD Projects
│   ├── certification/      # CRUD Certifications
│   └── skill/               # CRUD Skills
└── shared/
    ├── components/ui/      # shadcn/ui components
    ├── lib/                 # Prisma client, auth config
    └── services/            # Upload file (Vercel Blob)
```

Tiap fitur di `features/` konsisten dibagi jadi `components/`, `services/`, `types/`, dan `constants/` (kalau ada).

## Setup Lokal

1. Clone repo dan install dependencies:
   ```bash
   git clone https://github.com/dindaatikah211/kaasa-portfolio.git
   cd kaasa-portfolio
   pnpm install
   ```

2. Salin `.env.example` jadi `.env`, isi:
   ```
   DATABASE_URL=          # Neon Postgres, pooled connection
   DIRECT_URL=            # Neon Postgres, direct connection
   AUTH_SECRET=           # generate: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ADMIN_EMAIL=           # untuk seed akun admin pertama
   ADMIN_PASSWORD=
   BLOB_READ_WRITE_TOKEN= # dari Vercel Blob store
   ```

3. Jalankan migration:
   ```bash
   pnpm exec prisma migrate dev
   ```

4. Buat akun admin pertama:
   ```bash
   pnpm exec tsx prisma/seed-admin.ts
   ```

5. Jalankan dev server:
   ```bash
   pnpm dev
   ```

6. Buka `http://localhost:3000` untuk halaman publik, atau `http://localhost:3000/login` untuk masuk ke admin.

## Deployment

Project ini di-deploy di Vercel dengan integrasi otomatis dari branch `main`. Environment variables yang sama seperti di atas (kecuali `ADMIN_EMAIL`/`ADMIN_PASSWORD`, yang cuma dipakai sekali untuk seed lokal) perlu diset di **Settings → Environment Variables** pada project Vercel.

---

© 2026 Dinda Atikah Ghaisani. All rights reserved.