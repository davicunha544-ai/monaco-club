import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { AddToCart } from "@/components/cart/AddToCart";
import { formatBRL } from "@/lib/format";
import { getProdutoPorSlug, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const produto = getProdutoPorSlug(slug);
  if (!produto) return { title: "Produto" };
  return { title: produto.nome, description: produto.descricao };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produto = getProdutoPorSlug(slug);
  if (!produto) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <Link
        href="/loja"
        className="text-xs uppercase tracking-[0.18em] text-ink/50 transition-colors hover:text-bordo"
      >
        ← Voltar para a loja
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Imagem */}
        <div className="relative aspect-[3/4] overflow-hidden bg-mist">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={produto.imagens[0]}
            alt={produto.nome}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
            {produto.categoria}
          </span>
          <h1 className="mt-2 font-display text-4xl font-light leading-tight sm:text-5xl">
            {produto.nome}
          </h1>
          <p className="mt-4 text-2xl text-ink/80">{formatBRL(produto.preco)}</p>

          <p className="mt-6 max-w-prose leading-relaxed text-ink/70">
            {produto.descricao}
          </p>

          <AddToCart
            slug={produto.slug}
            nome={produto.nome}
            preco={produto.preco}
            imagem={produto.imagens[0]}
            tamanhos={produto.tamanhos}
          />

          <p className="mt-6 text-xs text-ink/45">
            Compre mais e economize: até 15% de desconto progressivo na sacola.
          </p>
        </div>
      </div>
    </Container>
  );
}
