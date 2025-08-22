import { AuthCard } from "@/app/components/auth/AuthCard";
import { requireGuest } from "@/lib/auth-utils";

export default async function LoginPage() {
  await requireGuest();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account or create a new one
          </p>
        </div>
        <AuthCard />
      </div>
    </div>
  );
}
