"use client";
import React from "react";
import Link from "next/link";

import {
  HomeIcon,
  ListIcon,
  HeartIcon,
  TvIcon,
  CalendarIcon,
  SettingsIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 h-screen border-r bg-background">
      <div className="flex justify-center p-4 border-b">
        <h2 className="text-xl font-bold">MyAnimeVault</h2>
      </div>
      <nav className="flex-1 p-4 space-y-1 text-sm">
        <SidebarItem
          icon={<HomeIcon className="h-4 w-4" />}
          label="Home"
          href="/dashboard"
        />
        <SidebarItem
          icon={<ListIcon className="h-4 w-4" />}
          label="Anime List"
          href="/dashboard/animelist"
        />
        <SidebarItem
          icon={<TvIcon className="h-4 w-4" />}
          label="Currently Watching"
          href="/dashboard/animelist"
        />

        <SidebarItem
          icon={<HeartIcon className="h-4 w-4" />}
          label="Favorites"
          href="/dashboard/animelist"
        />

        <SidebarItem
          icon={<CalendarIcon className="h-4 w-4" />}
          label="Seasonal Anime"
          href="/dashboard/animelist"
        />
        <SidebarItem
          icon={<SettingsIcon className="h-4 w-4" />}
          label="Settings"
          href="/dashboard/animelist"
        />
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
            OT
          </div>
          <div>
            <p className="text-sm font-medium">OtakuFan2023</p>
            <p className="text-xs text-muted-foreground">
              Anime: 254 | Manga: 126
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
interface SidebarItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

function SidebarItem({ href, icon, label }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted ${
        isActive
          ? "bg-muted text-foreground font-medium"
          : "text-muted-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
