import { prisma } from "@/shared/lib/prisma";

export default async function Home() {
  const adminCount = await prisma.admin.count();

  return (
    <main style={{ padding: 40 }}>
      <h1>Koneksi database berhasil ✅</h1>
      <p>Jumlah admin saat ini: {adminCount}</p>
    </main>
  );
}