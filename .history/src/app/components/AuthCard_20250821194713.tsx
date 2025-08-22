"use client";

import { useState, useEffect } from "react";
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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type AuthFormValues = LoginFormValues | SignupFormValues;

export function AuthCard() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const currentForm = mode === "login" ? loginForm : signupForm;

  const onLoginSubmit = async (data: LoginFormValues) => {
    setError("");
    try {
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
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    setError("");
    try {
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
        setError("Account created but login failed. Please try logging in manually.");
      } else if (result?.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleModeSwitch = () => {
    const newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);
    setError("");
    
    loginForm.reset();
    signupForm.reset();
  };

  const handleGitHubSignIn = async () => {
    try {
      await signIn("github", { 
        callbackUrl: "/dashboard",
        redirect: true 
      });
    } catch (error) {
      console.error("GitHub sign-in error:", error);
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
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
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
              <Input 
                id="email" 
                type="email" 
                {...loginForm.register("email")} 
              />
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
              className="w-full" 
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
              <Input 
                id="name" 
                {...signupForm.register("name")} 
              />
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
              className="w-full" 
              disabled={signupForm.formState.isSubmitting}
            >
              {signupForm.formState.isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGitHubSignIn}
          type="button"
        >
          Continue with GitHub
        </Button>
        <Button
          variant="link"
          type="button"
          onClick={handleModeSwitch}
        >
          {mode === "login"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}