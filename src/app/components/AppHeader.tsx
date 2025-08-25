"use client";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";

export default function AppHeader() {
  const pathname = usePathname();
  const showToggle =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname === "/";

  if (!showToggle) return null;

  return (
    <header className="flex items-center justify-end p-4 ">
      <ModeToggle />
    </header>
  );
}
