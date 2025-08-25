import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireAuth() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return session;
}

export async function requireGuest() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
}

export function createAuthMiddleware() {
  return async function middleware(request: NextRequest) {
    const session = await auth();
    const { pathname } = request.nextUrl;
    console.log("HIT");
    const isAuthPage =
      pathname.startsWith("/login") || pathname.startsWith("/register");
    const isProtectedPage =
      pathname.startsWith("/dashboard") || pathname.startsWith("/profile");

    if (isAuthPage && session) {
      return Response.redirect(new URL("/dashboard", request.url));
    }

    if (isProtectedPage && !session) {
      return Response.redirect(new URL("/login", request.url));
    }

    return null;
  };
}
