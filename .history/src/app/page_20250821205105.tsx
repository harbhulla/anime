import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <main className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Next Auth App
        </h1>
        <p className="text-gray-600">
          Sign in to your account or create a new one to get started.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Add a link to test auth */}
        <div className="mt-8">
          <Link
            href="/api/auth/signin"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Test NextAuth Sign In
          </Link>
        </div>
      </main>
    </div>
  );
}
