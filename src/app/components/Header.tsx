import React from "react";
import { SignOutButton } from "@/app/components/auth/signout-button";
import { MenuIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../components/ModeToggle";
import { requireAuth } from "@/lib/auth-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default async function Header() {
  const session = await requireAuth();
  return (
    <>
      <header className=" bg-background p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-md font-medium hidden md:inline-block">
            {session.user?.name}
          </span>
        </div>
        <div className="flex items-center flex-1 max-w-xlg mx-4">
          <div className="relative w-full">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search anime, manga, characters..."
              className="pl-8"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <SignOutButton />
          <ModeToggle />
        </div>
      </header>
    </>
  );
}
