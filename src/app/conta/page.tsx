import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import { EnderecoForm } from "@/components/conta/EnderecoForm";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { sair } from "@/lib/actions/auth";
import { removerEndereco } from "@/lib/actions/address";
import { formatBRL } from "@/lib/format";

export const metadata: Metadata = { title: "Minha conta" };

export default async function ContaPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/entrar");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      addresses: { orderBy: { createdAt: "desc" } },
      orders: {
        orderBy: { createdAt: "desc" },
        include: { items: true },
      },
    },
  });
  if (!user) redirect("/entrar");

  return (
    <Container className="py-12 sm:py-16">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
            Minha conta
          </span>
          <h1 className="mt-2 font-display text-4xl font-light sm:text-5xl">
            Olá, {user.nome.split(" ")[0]}
          </h1>
          <p className="mt-2 text-sm text-ink/55">{user.email}</p>
        </div>
        <form action={sair}>
          <button
            type="submit"
            className="text-xs uppercase tracking-[0.18em] text-ink/50 transition-colors hover:text-bordo"
          >
            Sair
          </button>
        </form>
      </header>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Pedidos */}
        <section>
          <h2 className="font-display text-2xl font-light">Pedidos</h2>
          {user.orders.length === 0 ? (
            <p className="mt-4 text-sm text-ink/55">
              Você ainda não fez pedidos.{" "}
              <Link href="/loja" className="underline hover:text-ink">
                Ver a loja
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {user.orders.map((o) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between gap-3 py-4"
                >
                  <div>
                    <Link
                      href={`/conta/pedidos/${o.id}`}
                      className="text-sm text-ink transition-colors hover:text-bordo"
                    >
                      Pedido #{o.id.slice(-6).toUpperCase()}
                    </Link>
                    <p className="mt-0.5 text-xs text-ink/45">
                      {new Date(o.createdAt).toLocaleDateString("pt-BR")} ·{" "}
                      {o.items.length} {o.items.length === 1 ? "item" : "itens"} ·{" "}
                      {o.status}
                    </p>
                  </div>
                  <span className="text-sm text-ink/80">{formatBRL(o.total)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Endereços */}
        <section>
          <h2 className="font-display text-2xl font-light">Endereços</h2>
          {user.addresses.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {user.addresses.map((a) => (
                <li
                  key={a.id}
                  className="flex items-start justify-between gap-3 border border-ink/10 p-4 text-sm"
                >
                  <div>
                    <p className="font-medium text-ink">{a.nome}</p>
                    <p className="mt-0.5 text-ink/60">
                      {a.logradouro}, {a.numero}
                      {a.complemento ? ` (${a.complemento})` : ""} — {a.bairro},{" "}
                      {a.cidade}/{a.estado} — CEP {a.cep}
                    </p>
                    {a.cpf ? (
                      <p className="mt-0.5 text-xs text-ink/45">CPF {a.cpf}</p>
                    ) : null}
                  </div>
                  <form action={removerEndereco}>
                    <input type="hidden" name="id" value={a.id} />
                    <button
                      type="submit"
                      aria-label="Remover endereço"
                      className="text-ink/40 transition-colors hover:text-bordo"
                    >
                      ✕
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-ink/45">
              Adicionar endereço
            </h3>
            <div className="mt-3">
              <EnderecoForm />
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
