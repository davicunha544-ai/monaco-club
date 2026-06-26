import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Termos de Uso" };

const SECOES = [
  {
    titulo: "1. Aceitação",
    texto:
      "Ao criar uma conta ou comprar na Monaco Club você concorda com estes Termos de Uso e com a nossa Política de Privacidade. Se não concordar, não utilize a loja.",
  },
  {
    titulo: "2. Conta",
    texto:
      "Você é responsável por manter a confidencialidade dos seus dados de acesso e por todas as atividades realizadas na sua conta. As informações de cadastro devem ser verdadeiras e atualizadas.",
  },
  {
    titulo: "3. Produtos e preços",
    texto:
      "Descrições, imagens e preços podem ser alterados a qualquer momento. Eventuais erros de cadastro de preço não obrigam a Monaco Club a manter a venda; nesses casos, você será comunicado e poderá cancelar.",
  },
  {
    titulo: "4. Pedidos e pagamento",
    texto:
      "A compra se conclui após a confirmação do pagamento. Enquanto o pagamento não for confirmado, o pedido permanece como “aguardando pagamento”. Reservamo-nos o direito de recusar pedidos em caso de suspeita de fraude.",
  },
  {
    titulo: "5. Entrega",
    texto:
      "Os prazos de entrega são estimados e contados a partir da confirmação do pagamento. Atrasos de transportadoras podem ocorrer e serão informados sempre que possível.",
  },
  {
    titulo: "6. Trocas e devoluções",
    texto:
      "Conforme o Código de Defesa do Consumidor, você pode desistir da compra em até 7 dias corridos após o recebimento. A peça deve estar sem uso, com etiquetas e na embalagem original.",
  },
  {
    titulo: "7. Propriedade intelectual",
    texto:
      "Marca, logotipo, textos e imagens são de propriedade da Monaco Club e não podem ser reproduzidos sem autorização.",
  },
  {
    titulo: "8. Contato",
    texto:
      "Dúvidas sobre estes Termos podem ser enviadas pelos nossos canais de atendimento.",
  },
];

export default function TermosPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10">
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
            Legal
          </span>
          <h1 className="mt-2 font-display text-4xl font-light sm:text-5xl">
            Termos de Uso
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
