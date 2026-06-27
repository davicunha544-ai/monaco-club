interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

const FROM = process.env.EMAIL_FROM || "Monaco Club <onboarding@resend.dev>";

/**
 * Envia um e-mail. Se `RESEND_API_KEY` estiver definido, envia de verdade via
 * Resend (https://resend.com); caso contrário, apenas registra no console (dev).
 * Para outro provedor (SMTP/SendGrid/etc.), troque a implementação abaixo.
 */
export async function enviarEmail({ to, subject, html }: EmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      `[email:dev] (defina RESEND_API_KEY para enviar de verdade)\n  Para: ${to}\n  Assunto: ${subject}`,
    );
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });

  if (!res.ok) {
    console.error("[email] falha ao enviar:", res.status, await res.text());
  }
}

const WRAP = (conteudo: string) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;color:#0A0A0A;max-width:480px;margin:0 auto;padding:8px">${conteudo}</div>`;

export function emailBoasVindas(nome: string): { subject: string; html: string } {
  const primeiro = nome.split(" ")[0] || nome;
  return {
    subject: "Bem-vindo(a) à Monaco Club",
    html: WRAP(`
      <h1 style="font-weight:300;font-size:26px">Bem-vindo(a), ${primeiro}.</h1>
      <p style="color:#555;line-height:1.6">Sua conta na <strong>Monaco Club</strong> foi criada com sucesso. Moda clássica fina, para ela e para ele.</p>
      <p style="margin-top:24px"><a href="#" style="background:#0A0A0A;color:#fff;text-decoration:none;padding:12px 28px;letter-spacing:2px;font-size:12px;text-transform:uppercase">Ver a coleção</a></p>
    `),
  };
}

/** Monta um e-mail simples (texto livre) — usado no envio em massa do admin. */
export function emailSimples(mensagem: string): string {
  const seguro = mensagem
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return WRAP(
    `<p style="color:#222;line-height:1.7;white-space:pre-wrap">${seguro}</p>`,
  );
}
