"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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

const baseSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = baseSchema
  .extend({
    name: z.string().min(2, "Name must be at least 2 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type AuthFormValues = z.infer<typeof signupSchema>;

export function AuthCard() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthFormValues>({
    resolver: zodResolver(mode === "login" ? baseSchema : signupSchema),
  });

  const onSubmit = async (data: AuthFormValues) => {
    setError("");
    try {
      if (mode === "login") {
        const result = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (result?.error) {
          setError("Invalid email or password");
        } else if (result?.ok) {
          router.push("/dashboard");
        }
      } else {
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
          setError("Account created but login failed. Please try logging in.");
        } else if (result?.ok) {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleModeSwitch = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
    reset();
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
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {mode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {mode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? "Loading..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          Continue with Google
        </Button>
        <Button variant="link" type="button" onClick={handleModeSwitch}>
          {mode === "login"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}
