"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import type { FormState } from "./auth";
import { validarCPF, formatarCPF } from "@/lib/cpf";

/** Adiciona um endereço à conta do cliente. */
export async function adicionarEndereco(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Sessão expirada." };

  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const dados = {
    nome: get("nome"),
    cep: get("cep"),
    logradouro: get("logradouro"),
    numero: get("numero"),
    complemento: get("complemento") || null,
    bairro: get("bairro"),
    cidade: get("cidade"),
    estado: get("estado"),
  };

  const obrigatorios = [
    dados.nome,
    dados.cep,
    dados.logradouro,
    dados.numero,
    dados.bairro,
    dados.cidade,
    dados.estado,
  ];
  if (obrigatorios.some((c) => c === ""))
    return { error: "Preencha todos os campos obrigatórios." };

  const cpf = String(formData.get("cpf") ?? "").trim();
  if (!validarCPF(cpf)) return { error: "CPF inválido." };

  await prisma.address.create({
    data: { userId: session.user.id, cpf: formatarCPF(cpf), ...dados },
  });

  revalidatePath("/conta");
  return undefined;
}

/** Remove um endereço (somente do próprio usuário). */
export async function removerEndereco(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.address.deleteMany({ where: { id, userId: session.user.id } });
  revalidatePath("/conta");
}
