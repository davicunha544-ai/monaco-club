import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ShopTabs } from "@/components/ShopTabs";
import { getProdutos, type ProductGenero } from "@/lib/products";

export const metadata: Metadata = {
  title: "Loja",
  description:
    "A coleção Monaco Club. Filtre por gênero (Masculino / Feminino) e categoria.",
};

// Lê o catálogo do banco por requisição (evita acesso ao DB no build).
export const dynamic = "force-dynamic";

export default async function LojaPage({
  searchParams,
}: {
  searchParams: Promise<{ genero?: string; categoria?: string }>;
}) {
  const { genero, categoria } = await searchParams;

  const initialGenero: ProductGenero | "todos" =
    genero === "masculino" || genero === "feminino" ? genero : "todos";
  const initialCategoria = categoria ?? "todas";

  const products = await getProdutos();

  return (
    <>
      {/* Banner com imagem */}
      <section className="relative flex min-h-[44vh] items-center justify-center overflow-hidden bg-ink text-center text-bone">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/editorial/loja.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/50" />

        <Container className="relative">
          <span className="text-[11px] uppercase tracking-[0.2em] text-bone/70">
            A loja
          </span>
          <h1 className="mt-3 font-display text-4xl font-light sm:text-5xl">
            Coleção
          </h1>
          <p className="mx-auto mt-4 max-w-md text-bone/80">
            Moda clássica fina, para ela e para ele.
          </p>
        </Container>
      </section>

      {/* Filtros + grid */}
      <Container className="py-12 sm:py-16">
        <ShopTabs
          products={products}
          initialGenero={initialGenero}
          initialCategoria={initialCategoria}
        />
      </Container>
    </>
  );
}
