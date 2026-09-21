import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dinda Atikah Ghaisani",
  description: "Front-End Developer, UI/UX Designer, and Graphic Designer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body className="min-h-full">{children}</body>
    </html>
  );
}