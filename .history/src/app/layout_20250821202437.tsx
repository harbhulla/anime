import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "Authentication example with Next.js, Prisma, and NextAuth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
