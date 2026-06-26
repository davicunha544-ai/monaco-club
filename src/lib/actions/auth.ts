"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/db";

export type FormState = { error?: string } | undefined;

/** Cadastro de cliente: valida, cria o usuário (senha com hash) e já loga. */
export async function cadastrar(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const senha = String(formData.get("senha") ?? "");
  const termos = formData.get("termos");

  if (nome.length < 2) return { error: "Informe seu nome." };
  if (!email.includes("@") || email.length < 5)
    return { error: "E-mail inválido." };
  if (senha.length < 6)
    return { error: "A senha precisa de ao menos 6 caracteres." };
  if (termos !== "on")
    return { error: "Você precisa aceitar os Termos e a Privacidade." };

  const existe = await prisma.user.findUnique({ where: { email } });
  if (existe) return { error: "Já existe uma conta com esse e-mail." };

  const passwordHash = await bcrypt.hash(senha, 10);
  await prisma.user.create({
    data: { nome, email, passwordHash, aceitouTermosEm: new Date() },
  });

  try {
    await signIn("credentials", { email, senha, redirectTo: "/conta" });
  } catch (error) {
    if (error instanceof AuthError)
      return { error: "Conta criada, mas não foi possível entrar. Faça login." };
    throw error; // deixa o redirect (NEXT_REDIRECT) propagar
  }
  return undefined;
}

/** Login do cliente. */
export async function entrar(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const senha = String(formData.get("senha") ?? "");

  try {
    await signIn("credentials", { email, senha, redirectTo: "/conta" });
  } catch (error) {
    if (error instanceof AuthError)
      return { error: "E-mail ou senha incorretos." };
    throw error; // deixa o redirect propagar
  }
  return undefined;
}

/** Logout. */
export async function sair() {
  await signOut({ redirectTo: "/" });
}
