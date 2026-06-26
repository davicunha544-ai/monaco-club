import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Política de Privacidade" };

const SECOES = [
  {
    titulo: "1. Dados que coletamos",
    texto:
      "Coletamos os dados que você fornece no cadastro e na compra (nome, e-mail, endereço) e dados de uso necessários para operar a loja.",
  },
  {
    titulo: "2. Como usamos",
    texto:
      "Usamos seus dados para criar e gerenciar sua conta, processar pedidos e entregas, dar suporte e cumprir obrigações legais.",
  },
  {
    titulo: "3. Compartilhamento",
    texto:
      "Compartilhamos dados apenas com parceiros necessários à operação (ex.: transportadora e gateway de pagamento), na medida do necessário para concluir seu pedido.",
  },
  {
    titulo: "4. Segurança",
    texto:
      "Sua senha é armazenada de forma criptografada (hash). Adotamos medidas razoáveis para proteger seus dados, mas nenhum sistema é 100% seguro.",
  },
  {
    titulo: "5. Seus direitos (LGPD)",
    texto:
      "Você pode solicitar acesso, correção ou exclusão dos seus dados, bem como revogar consentimentos, pelos nossos canais de atendimento.",
  },
  {
    titulo: "6. Cookies",
    texto:
      "Usamos cookies essenciais para manter sua sessão e o funcionamento do carrinho. Cookies de terceiros, se houver, serão informados.",
  },
];

export default function PrivacidadePage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10">
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
            Legal
          </span>
          <h1 className="mt-2 font-display text-4xl font-light sm:text-5xl">
            Política de Privacidade
          </h1>
        </header>

        <div className="space-y-8">
          {SECOES.map((s) => (
            <section key={s.titulo}>
              <h2 className="font-display text-lg font-normal text-ink">
                {s.titulo}
              </h2>
              <p className="mt-2 leading-relaxed text-ink/70">{s.texto}</p>
            </section>
          ))}
        </div>

        <p className="mt-12 text-xs text-ink/40">
          Documento modelo — recomendamos revisão por um advogado antes de operar
          comercialmente.
        </p>
      </div>
    </Container>
  );
}
