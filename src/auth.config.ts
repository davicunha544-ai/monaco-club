import type { NextAuthConfig } from "next-auth";

/**
 * Config base do Auth.js — segura para o Edge (middleware): sem bcrypt/prisma.
 * Os providers reais (Credentials) ficam em `auth.ts`.
 */
export const authConfig = {
  pages: {
    signIn: "/entrar",
  },
  trustHost: true,
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      if (!user) return false; // deslogado → vai pra /entrar
      // /admin exige role admin; logado-mas-não-admin volta pra home.
      if (nextUrl.pathname.startsWith("/admin") && user.role !== "admin") {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "cliente";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (typeof token.id === "string") session.user.id = token.id;
        session.user.role =
          typeof token.role === "string" ? token.role : "cliente";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
