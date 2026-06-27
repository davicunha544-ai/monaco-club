"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { enviarEmail, emailSimples } from "@/lib/email";

export type BroadcastState = { error?: string; sucesso?: string } | undefined;

/** Envia um e-mail (assunto + mensagem) para todos os clientes cadastrados. */
export async function emailEmMassa(
  _prev: BroadcastState,
  formData: FormData,
): Promise<BroadcastState> {
  const session = await auth();
  if (session?.user?.role !== "admin") return { error: "Acesso negado." };

  const assunto = String(formData.get("assunto") ?? "").trim();
  const mensagem = String(formData.get("mensagem") ?? "").trim();
  if (!assunto || !mensagem)
    return { error: "Preencha o assunto e a mensagem." };

  const clientes = await prisma.user.findMany({
    where: { role: "cliente" },
    select: { email: true },
  });

  const html = emailSimples(mensagem);
  let enviados = 0;
  for (const c of clientes) {
    try {
      await enviarEmail({ to: c.email, subject: assunto, html });
      enviados++;
    } catch {
      // ignora falhas individuais
    }
  }

  return {
    sucesso: `E-mail enfileirado para ${enviados} cliente(s).${
      process.env.RESEND_API_KEY
        ? ""
        : " (Em dev: registrado no log — defina RESEND_API_KEY para enviar de verdade.)"
    }`,
  };
}
