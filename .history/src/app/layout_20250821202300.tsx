import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "Authentication example with Next.js, Prisma, and NextAuth",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Global auth guard logic
  const pathname =
    typeof window === "undefined" ? "" : window.location.pathname;
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtectedPage =
    pathname.startsWith("/dashboard") || pathname.startsWith("/profile");

  if (!session && isProtectedPage) {
    redirect("/login");
  }

  if (session && isAuthPage) {
    redirect("/dashboard");
  }

  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
