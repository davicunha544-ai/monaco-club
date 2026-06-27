import { prisma } from "@/lib/db";
import { BroadcastForm } from "@/components/admin/BroadcastForm";

export default async function AdminClientes() {
  const clientes = await prisma.user.findMany({
    where: { role: "cliente" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-light sm:text-4xl">Clientes</h1>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <section>
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
            {clientes.length} cadastrados
          </h2>
          {clientes.length === 0 ? (
            <p className="mt-3 text-sm text-ink/55">Nenhum cliente ainda.</p>
          ) : (
            <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
              {clientes.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-3 py-3 text-sm"
                >
                  <span className="min-w-0 truncate">
                    {c.nome}
                    <span className="text-ink/45"> · {c.email}</span>
                  </span>
                  <span className="shrink-0 text-xs text-ink/45">
                    {c._count.orders}{" "}
                    {c._count.orders === 1 ? "pedido" : "pedidos"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
            Enviar e-mail a todos
          </h2>
          <p className="mt-1 text-xs text-ink/45">
            Em dev é só registrado no log. Defina <code>RESEND_API_KEY</code> para
            enviar de verdade.
          </p>
          <div className="mt-4">
            <BroadcastForm />
          </div>
        </section>
      </div>
    </div>
  );
}
