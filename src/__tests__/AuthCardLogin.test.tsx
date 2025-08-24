import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { AuthCard } from "@/app/components/auth/AuthCard";

const routerSpies = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => routerSpies,
}));

vi.mock("next-auth/react", () => ({
  signIn: vi.fn().mockResolvedValue({
    ok: true,
    error: undefined,
    status: 200,
    url: null,
  }),
  useSession: () => ({ data: null, status: "unauthenticated" }),
}));

describe("AuthCard login flow", () => {
  it("calls signIn and navigates to dashboard", async () => {
    const user = userEvent.setup();
    render(<AuthCard mode="login" />);

    await user.type(screen.getByLabelText(/email/i), "ada@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "secret123");
    await user.click(screen.getByRole("button", { name: /log ?in|sign ?in/i }));

    const { signIn } = await import("next-auth/react");

    await waitFor(() => {
      expect(signIn).toHaveBeenCalled();
    });

    await waitFor(() => {
      const pushed =
        routerSpies.push.mock.calls.some(([arg]) => arg === "/dashboard") ||
        routerSpies.replace.mock.calls.some(([arg]) => arg === "/dashboard");
      expect(pushed).toBe(true);
    });
  });
});
