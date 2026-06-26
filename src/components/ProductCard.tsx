import Link from "next/link";
import type { Product } from "@/data/products";
import { formatBRL } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col text-center">
      <Link href={`/produto/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[3/4] overflow-hidden bg-mist">
          {/* Placeholders são SVG; ao usar fotos reais, troque por next/image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imagens[0]}
            alt={product.nome}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <span className="text-[11px] uppercase tracking-[0.18em] text-ink/45">
            {product.categoria}
          </span>
          <h3 className="mt-1 font-display text-lg font-light leading-snug text-ink transition-colors group-hover:text-bordo">
            {product.nome}
          </h3>
          <p className="mt-1.5 text-sm text-ink/80">{formatBRL(product.preco)}</p>
        </div>
      </Link>
    </article>
  );
}
