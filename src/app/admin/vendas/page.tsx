import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatBRL } from "@/lib/format";

export default async function AdminVendas() {
  const pedidos = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, items: true },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-light sm:text-4xl">Vendas</h1>

      {pedidos.length === 0 ? (
        <p className="mt-4 text-sm text-ink/55">Nenhum pedido ainda.</p>
      ) : (
        <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {pedidos.map((o) => (
            <li
              key={o.id}
              className="flex flex-wrap items-center justify-between gap-3 py-4"
            >
              <div className="min-w-0">
                <Link
                  href={`/admin/vendas/${o.id}`}
                  className="text-sm text-ink transition-colors hover:text-bordo"
                >
                  Pedido #{o.id.slice(-6).toUpperCase()}
                </Link>
                <p className="mt-0.5 truncate text-xs text-ink/45">
                  {new Date(o.createdAt).toLocaleString("pt-BR")} · {o.user.email}{" "}
                  · {o.items.length} {o.items.length === 1 ? "item" : "itens"}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-ink/55">
                  {o.status}
                </span>
                <span className="text-sm text-ink/80">{formatBRL(o.total)}</span>
                <Link
                  href={`/admin/vendas/${o.id}`}
                  className="text-xs uppercase tracking-[0.16em] text-ink/55 transition-colors hover:text-ink"
                >
                  Ticket →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
