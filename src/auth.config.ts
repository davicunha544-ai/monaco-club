import type { NextAuthConfig } from "next-auth";

/**
 * Config base do Auth.js — segura para o Edge (middleware): sem bcrypt/prisma.
 * Os providers reais (Credentials, que usa bcrypt + prisma) ficam em `auth.ts`.
 */
export const authConfig = {
  pages: {
    signIn: "/entrar",
  },
  trustHost: true,
  providers: [],
  callbacks: {
    authorized({ auth }) {
      // O matcher do middleware já limita às rotas protegidas;
      // basta exigir usuário logado.
      return !!auth?.user;
    },
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user && typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
