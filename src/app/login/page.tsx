import { AuthCard } from "@/app/components/auth/AuthCard";
import { requireGuest } from "@/lib/auth-utils";

export default async function LoginPage() {
  await requireGuest();

  return (
    <div className="flex items-center justify-center bg-background mb-10">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account or create a new one
          </p>
        </div>
        <AuthCard mode="login" />
      </div>
    </div>
  );
}
