import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import { vi } from "vitest";
import React from "react";
import { AuthCard } from "@/app/components/auth/AuthCard";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

vi.mock("next-auth/react", () => {
  return {
    signIn: vi.fn().mockResolvedValue({ ok: true }),
    useSession: () => ({ data: null, status: "unauthenticated" }),
  };
});

describe("AuthCard", () => {
  it("renders the login form with email & password and a submit button", () => {
    render(<AuthCard mode="login" />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    const submit = screen.getByRole("button", {
      name: /log ?in|sign ?in/i,
    });
    expect(submit).toBeInTheDocument();
  });

  it("renders the signup form with name, email, password, confirm password", () => {
    render(<AuthCard mode="signup" />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/confirm password|confirm/i)
    ).toBeInTheDocument();

    const submit = screen.getByRole("button", {
      name: /sign ?up|create account/i,
    });
    expect(submit).toBeInTheDocument();
  });

  it("shows a validation error when signup passwords don't match", async () => {
    const user = userEvent.setup();
    render(<AuthCard mode="signup" />);

    await user.type(screen.getByLabelText(/email/i), "ada@example.com");
  });
});
