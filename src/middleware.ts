import NextAuth from "next-auth";
import { authConfig } from "@/shared/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth;