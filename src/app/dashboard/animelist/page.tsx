"use client";
import React from "react";
import { StarIcon, PlayIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const animeList = [
  {
    id: 1,
    title: "Attack on Titan: Final Season",
    image: "https://cdn.myanimelist.net/images/anime/1000/110531.jpg",
    episodes: "16/16",
    score: 9.2,
    type: "TV",
    progress: "Completed",
  },
  {
    id: 2,
    title: "Demon Slayer: Kimetsu no Yaiba",
    image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    episodes: "26/26",
    score: 8.7,
    type: "TV",
    progress: "Completed",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    episodes: "24/24",
    score: 8.5,
    type: "TV",
    progress: "Completed",
  },
  {
    id: 4,
    title: "Chainsaw Man",
    image: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
    episodes: "0/12",
    score: 0,
    type: "TV",
    progress: "Plan to Watch",
  },
  {
    id: 5,
    title: "Spy x Family",
    image: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
    episodes: "25/25",
    score: 8.3,
    type: "TV",
    progress: "Completed",
  },
  {
    id: 6,
    title: "Demon Slayer: Entertainment District Arc",
    image: "https://cdn.myanimelist.net/images/anime/1908/120036.jpg",
    episodes: "8/11",
    score: 8.8,
    type: "TV",
    progress: "Watching",
  },
];
export default function AnimeList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="text-lg font-medium">My Anime List</div>
        <div className="flex space-x-2">
          <Button size="sm">All Anime</Button>
          <Button variant="outline" size="sm">
            Currently Watching
          </Button>
          <Button variant="outline" size="sm">
            Completed
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-b">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {animeList.map((anime) => (
                <tr key={anime.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {anime.id}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="h-16 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium">{anime.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {anime.episodes} episodes
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {anime.type}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        anime.progress === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : anime.progress === "Watching"
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {anime.progress === "Watching" && (
                        <PlayIcon className="mr-1 h-3 w-3" />
                      )}
                      {anime.progress}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {anime.score > 0 ? (
                      <div className="flex items-center text-sm">
                        <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{anime.score}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
