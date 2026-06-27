import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Middleware edge-safe: usa só a config base (sem bcrypt/prisma).
// O callback `authorized` redireciona não-logados para /entrar.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/conta/:path*", "/checkout", "/admin/:path*"],
};
