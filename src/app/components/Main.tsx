import React from "react";
import {
  TvIcon,
  BookIcon,
  HeartIcon,
  StarIcon,
  ClockIcon,
  EyeIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Main() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Anime Watched"
        value="254"
        subtext="32 currently watching"
        icon={<TvIcon className="h-4 w-4" />}
      />
      <StatCard
        title="Total Manga Read"
        value="126"
        subtext="14 currently reading"
        icon={<BookIcon className="h-4 w-4" />}
      />
      <StatCard
        title="Favorites"
        value="47"
        subtext="Anime & Manga"
        icon={<HeartIcon className="h-4 w-4" />}
      />
      <StatCard
        title="Average Rating"
        value="8.4"
        subtext="From 380 ratings"
        icon={<StarIcon className="h-4 w-4" />}
      />
      <StatCard
        title="Watch Time"
        value="1,254 hrs"
        subtext="Since Jan 2022"
        icon={<ClockIcon className="h-4 w-4" />}
      />
      <StatCard
        title="Episodes Watched"
        value="3,841"
        subtext="Across all anime"
        icon={<EyeIcon className="h-4 w-4" />}
      />
    </div>
  );
}
interface StatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, subtext, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="p-2 bg-secondary rounded-md text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
      </CardContent>
    </Card>
  );
}
