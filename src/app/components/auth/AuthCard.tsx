"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

type AuthCardProps = {
  mode: "login" | "signup";
};

export function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else if (result?.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.message || "Signup failed");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError("Account created but login failed. Try logging in manually.");
    } else if (result?.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await signIn("github", { callbackUrl: "/dashboard", redirect: true });
    } catch (err) {
      console.error("GitHub sign-in error:", err);
      setError("GitHub sign-in failed. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {mode === "login" ? "Login to your account" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {mode === "login"
            ? "Enter your email and password to login"
            : "Fill in your details to sign up"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 text-sm rounded-md">
            {error}
          </div>
        )}

        {mode === "login" ? (
          <form
            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...loginForm.register("email")} />
              {loginForm.formState.errors.email && (
                <span className="text-sm text-red-500">
                  {loginForm.formState.errors.email.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...loginForm.register("password")}
              />
              {loginForm.formState.errors.password && (
                <span className="text-sm text-red-500">
                  {loginForm.formState.errors.password.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loginForm.formState.isSubmitting}
            >
              {loginForm.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        ) : (
          <form
            onSubmit={signupForm.handleSubmit(onSignupSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...signupForm.register("name")} />
              {signupForm.formState.errors.name && (
                <span className="text-sm text-red-500">
                  {signupForm.formState.errors.name.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...signupForm.register("email")}
              />
              {signupForm.formState.errors.email && (
                <span className="text-sm text-red-500">
                  {signupForm.formState.errors.email.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...signupForm.register("password")}
              />
              {signupForm.formState.errors.password && (
                <span className="text-sm text-red-500">
                  {signupForm.formState.errors.password.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...signupForm.register("confirmPassword")}
              />
              {signupForm.formState.errors.confirmPassword && (
                <span className="text-sm text-red-500">
                  {signupForm.formState.errors.confirmPassword.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={signupForm.formState.isSubmitting}
            >
              {signupForm.formState.isSubmitting
                ? "Creating account..."
                : "Sign Up"}
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={handleGitHubSignIn}
          type="button"
        >
          Continue with GitHub
        </Button>

        {mode === "login" ? (
          <Button asChild variant="link" className="cursor-pointer">
            <a href="/register">Don’t have an account? Sign Up</a>
          </Button>
        ) : (
          <Button asChild variant="link" className="cursor-pointer">
            <a href="/login">Already have an account? Login</a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
