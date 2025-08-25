import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">
            Welcome to MyAnimeVault
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Discover, track, and review your favorite anime. Log in to your
            account or create one to start building your list.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button asChild variant="link">
            <Link href="/explore">Browse Anime Database</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
