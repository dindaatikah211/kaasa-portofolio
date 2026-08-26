"use client";

import { useActionState } from "react";
import { loginAction } from "../services/login-service";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="flex w-80 flex-col gap-3">
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <button type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}