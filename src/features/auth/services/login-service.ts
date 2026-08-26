"use server";

import { signIn } from "@/shared/lib/auth";
import { AuthError } from "next-auth";
import type { LoginState } from "../types";

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email atau password salah" };
    }
    throw error;
  }
}