import { FlowerField } from "@/features/landing/components/flower-field";

export default function Home() {
  return (
    <main
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fff8f2 0%, #ffd4a8 60%, #ff9fc7 100%)" }}
    >
      <FlowerField />
    </main>
  );
}