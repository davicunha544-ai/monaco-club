import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatBRL } from "@/lib/format";
import { atualizarStatusPedido } from "@/lib/actions/admin-pedidos";
import { STATUS_PEDIDO } from "@/lib/pedido";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const o = await prisma.order.findUnique({
    where: { id },
    include: { user: true, items: true },
  });
  if (!o) notFound();

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/vendas"
        className="text-xs uppercase tracking-[0.16em] text-ink/50 transition-colors hover:text-bordo"
      >
        ← Vendas
      </Link>

      {/* Ticket de despacho */}
      <div className="mt-4 border border-ink/15 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink/10 pb-4">
          <div>
            <h1 className="font-display text-2xl">
              Pedido #{o.id.slice(-6).toUpperCase()}
            </h1>
            <p className="mt-0.5 text-xs text-ink/45">
              {new Date(o.createdAt).toLocaleString("pt-BR")}
            </p>
          </div>
          <span className="text-[11px] uppercase tracking-[0.16em] text-ink/55">
            {o.status} · pgto {o.paymentStatus}
          </span>
        </div>

        <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
              Cliente
            </h2>
            <p className="mt-1 text-ink/80">{o.user.nome}</p>
            <p className="text-ink/55">{o.user.email}</p>
          </div>
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
              Entrega
            </h2>
            <p className="mt-1 leading-relaxed text-ink/70">{o.enderecoResumo}</p>
            {o.cpf ? <p className="mt-0.5 text-ink/55">CPF {o.cpf}</p> : null}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
            Itens para separar
          </h2>
          <ul className="mt-2 divide-y divide-ink/10 border-y border-ink/10">
            {o.items.map((it) => (
              <li key={it.id} className="flex justify-between gap-3 py-2.5 text-sm">
                <span>
                  <strong className="font-medium">{it.quantidade}×</strong>{" "}
                  {it.nome}
                  <span className="text-ink/45"> · Tam. {it.tamanho}</span>
                </span>
                <span className="shrink-0 text-ink/70">
                  {formatBRL(it.preco * it.quantidade)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between text-ink/60">
            <dt>Subtotal</dt>
            <dd>{formatBRL(o.subtotal)}</dd>
          </div>
          {o.descontoValor > 0 ? (
            <div className="flex justify-between text-bordo">
              <dt>Desconto ({o.descontoPercent}%)</dt>
              <dd>− {formatBRL(o.descontoValor)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between text-ink/60">
            <dt>Frete{o.freteNome ? ` (${o.freteNome})` : ""}</dt>
            <dd>{o.freteValor === 0 ? "Grátis" : formatBRL(o.freteValor)}</dd>
          </div>
          <div className="flex justify-between border-t border-ink/10 pt-2 text-base font-medium text-ink">
            <dt>Total</dt>
            <dd>{formatBRL(o.total)}</dd>
          </div>
        </dl>
      </div>

      {/* Atualizar status */}
      <form action={atualizarStatusPedido} className="mt-5 flex flex-wrap items-center gap-3">
        <input type="hidden" name="id" value={o.id} />
        <select
          name="status"
          defaultValue={o.status}
          className="border border-ink/20 bg-transparent px-4 py-2.5 text-sm capitalize outline-none focus:border-ink"
        >
          {STATUS_PEDIDO.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="border border-ink px-6 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-bone"
        >
          Atualizar status
        </button>
      </form>
    </div>
  );
}
