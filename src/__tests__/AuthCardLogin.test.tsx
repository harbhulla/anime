import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, expect, describe, it } from "vitest";
import React from "react";
import { AuthCard } from "@/app/components/auth/AuthCard";

const replace = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }));

const signIn = vi.fn().mockResolvedValue({ ok: true });
vi.mock("next-auth/react", () => ({
  signIn,
  useSession: () => ({ data: null, status: "unauthenticated" }),
}));

describe("AuthCard login flow", () => {
  it("calls signIn with credentials and navigates on success", async () => {
    const user = userEvent.setup();
    render(<AuthCard mode="login" />);

    await user.type(screen.getByLabelText(/email/i), "ada@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "secret123");
    await user.click(screen.getByRole("button", { name: /log ?in|sign ?in/i }));

    expect(signIn).toHaveBeenCalledWith(
      "credentials",
      expect.objectContaining({
        email: "ada@example.com",
        password: "secret123",
        redirect: false,
      })
    );
    expect(replace).toHaveBeenCalledWith("/dashboard");
  });

  it("shows an error if signIn returns not ok", async () => {
    signIn.mockResolvedValueOnce({ ok: false, error: "Invalid creds" });
    const user = userEvent.setup();
    render(<AuthCard mode="login" />);

    await user.type(screen.getByLabelText(/email/i), "x@y.com");
    await user.type(screen.getByLabelText(/^password$/i), "bad");
    await user.click(screen.getByRole("button", { name: /log ?in|sign ?in/i }));

    expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  });
});
