import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminHome() {
  const [produtos, pedidos, clientes] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count({ where: { role: "cliente" } }),
  ]);

  const cards = [
    {
      href: "/admin/produtos",
      titulo: "Produtos",
      valor: produtos,
      sub: "Gerenciar peças →",
    },
    {
      href: "/admin/vendas",
      titulo: "Vendas",
      valor: pedidos,
      sub: "Pedidos & tickets →",
    },
    {
      href: "/admin/clientes",
      titulo: "Clientes",
      valor: clientes,
      sub: "Lista & e-mails →",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-light sm:text-4xl">Painel</h1>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="border border-ink/10 p-6 transition-colors hover:border-ink/30"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
              {c.titulo}
            </span>
            <p className="mt-2 font-display text-3xl">{c.valor}</p>
            <p className="mt-1 text-xs text-ink/55">{c.sub}</p>
          </Link>
        ))}

        <div className="border border-ink/10 p-6 opacity-70">
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
            Dashboard
          </span>
          <p className="mt-2 font-display text-3xl">—</p>
          <p className="mt-1 text-xs text-ink/45">Faturamento — em breve</p>
        </div>
      </div>
    </div>
  );
}
