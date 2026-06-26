import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/Container";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { formatBRL } from "@/lib/format";

export const metadata: Metadata = { title: "Pedido" };

export default async function PedidoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/entrar");

  const order = await prisma.order.findFirst({
    where: { id, userId: session.user.id },
    include: { items: true },
  });
  if (!order) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <Link
        href="/conta"
        className="text-xs uppercase tracking-[0.18em] text-ink/50 transition-colors hover:text-bordo"
      >
        ← Minha conta
      </Link>

      <header className="mt-6">
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
          Pedido confirmado
        </span>
        <h1 className="mt-2 font-display text-3xl font-light sm:text-4xl">
          Pedido #{order.id.slice(-6).toUpperCase()}
        </h1>
        <p className="mt-2 text-sm text-ink/55">
          {new Date(order.createdAt).toLocaleString("pt-BR")} · Status:{" "}
          {order.status} · Pagamento: {order.paymentStatus}
        </p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-display text-xl font-light">Itens</h2>
          <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {order.items.map((it) => (
              <li key={it.id} className="flex justify-between gap-3 py-4 text-sm">
                <span>
                  {it.nome}
                  <span className="text-ink/45">
                    {" "}
                    · {it.tamanho} · {it.quantidade}x
                  </span>
                </span>
                <span>{formatBRL(it.preco * it.quantidade)}</span>
              </li>
            ))}
          </ul>

          {order.enderecoResumo ? (
            <div className="mt-6 text-sm">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-ink/45">
                Entrega
              </h3>
              <p className="mt-2 text-ink/60">{order.enderecoResumo}</p>
            </div>
          ) : null}
        </div>

        <aside className="h-fit border border-ink/10 p-5">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between text-ink/70">
              <dt>Subtotal</dt>
              <dd>{formatBRL(order.subtotal)}</dd>
            </div>
            {order.descontoValor > 0 ? (
              <div className="flex justify-between text-bordo">
                <dt>Desconto ({order.descontoPercent}%)</dt>
                <dd>− {formatBRL(order.descontoValor)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between text-ink/70">
              <dt>Frete{order.freteNome ? ` (${order.freteNome})` : ""}</dt>
              <dd>
                {order.freteValor === 0 ? "Grátis" : formatBRL(order.freteValor)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-medium text-ink">
              <dt>Total</dt>
              <dd>{formatBRL(order.total)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-ink/50">
            Pagamento aguardando — será concluído quando o gateway for integrado.
          </p>
        </aside>
      </div>
    </Container>
  );
}
