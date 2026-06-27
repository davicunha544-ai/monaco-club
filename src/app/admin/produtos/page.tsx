import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatBRL } from "@/lib/format";
import { excluirProduto } from "@/lib/actions/admin-produtos";

export default async function AdminProdutos() {
  const produtos = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-light sm:text-4xl">Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="bg-ink px-6 py-3 text-xs uppercase tracking-[0.18em] text-bone transition-opacity hover:opacity-90"
        >
          + Novo produto
        </Link>
      </div>

      {produtos.length === 0 ? (
        <p className="text-sm text-ink/55">Nenhum produto ainda.</p>
      ) : (
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {produtos.map((p) => (
            <li key={p.id} className="flex items-center gap-4 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.imagem}
                alt=""
                className="h-16 w-12 shrink-0 bg-mist object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-ink">
                  {p.nome}{" "}
                  {!p.ativo ? (
                    <span className="text-xs text-ink/40">(inativo)</span>
                  ) : null}
                </p>
                <p className="mt-0.5 text-xs text-ink/45">
                  {p.categoria} · {p.genero} ·{" "}
                  {p.precoAntigo ? (
                    <span className="mr-1 line-through">
                      {formatBRL(p.precoAntigo)}
                    </span>
                  ) : null}
                  {formatBRL(p.preco)}
                </p>
              </div>
              <Link
                href={`/admin/produtos/${p.id}/editar`}
                className="text-xs uppercase tracking-[0.16em] text-ink/55 transition-colors hover:text-ink"
              >
                Editar
              </Link>
              <form action={excluirProduto}>
                <input type="hidden" name="id" value={p.id} />
                <button
                  type="submit"
                  className="text-xs uppercase tracking-[0.16em] text-ink/40 transition-colors hover:text-bordo"
                >
                  Excluir
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
