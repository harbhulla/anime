import Link from "next/link"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

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
      </main>
    </div>
  )
}
