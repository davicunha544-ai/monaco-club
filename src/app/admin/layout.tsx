import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import { auth } from "@/auth";
import { sair } from "@/lib/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/");

  return (
    <Container className="py-8 sm:py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-display text-lg">Admin</span>
          <nav className="flex flex-wrap gap-5 text-xs uppercase tracking-[0.16em] text-ink/55">
            <Link href="/admin" className="transition-colors hover:text-ink">
              Painel
            </Link>
            <Link
              href="/admin/produtos"
              className="transition-colors hover:text-ink"
            >
              Produtos
            </Link>
            <Link
              href="/admin/vendas"
              className="transition-colors hover:text-ink"
            >
              Vendas
            </Link>
            <Link
              href="/admin/clientes"
              className="transition-colors hover:text-ink"
            >
              Clientes
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-5 text-xs uppercase tracking-[0.16em] text-ink/55">
          <Link href="/" className="transition-colors hover:text-ink">
            Ver site
          </Link>
          <form action={sair}>
            <button
              type="submit"
              className="uppercase tracking-[0.16em] transition-colors hover:text-bordo"
            >
              Sair
            </button>
          </form>
        </div>
      </div>

      {children}
    </Container>
  );
}
