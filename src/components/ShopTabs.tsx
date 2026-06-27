"use client";

import { useMemo, useState } from "react";
import {
  GENERO_LABEL,
  type Product,
  type ProductGenero,
} from "@/lib/products";
import { cn } from "@/lib/cn";
import { ProductGrid } from "./ProductGrid";

type GeneroFiltro = ProductGenero | "todos";

const GENEROS: GeneroFiltro[] = ["todos", "masculino", "feminino"];

export function ShopTabs({
  products,
  initialGenero = "todos",
  initialCategoria = "todas",
}: {
  products: Product[];
  initialGenero?: GeneroFiltro;
  initialCategoria?: string;
}) {
  const [genero, setGenero] = useState<GeneroFiltro>(initialGenero);
  const [categoria, setCategoria] = useState<string>(initialCategoria);

  const base = useMemo(
    () => products.filter((p) => genero === "todos" || p.genero === genero),
    [products, genero],
  );

  const categorias = useMemo(() => {
    const unicas = Array.from(new Set(base.map((p) => p.categoria))).sort(
      (a, b) => a.localeCompare(b, "pt-BR"),
    );
    return ["todas", ...unicas];
  }, [base]);

  const categoriaAtiva = categorias.includes(categoria) ? categoria : "todas";
  const filtrados = base.filter(
    (p) => categoriaAtiva === "todas" || p.categoria === categoriaAtiva,
  );

  return (
    <div>
      {/* Gênero — centralizado */}
      <div className="flex justify-center gap-8 border-b border-ink/10 pb-6 sm:gap-12">
        {GENEROS.map((opcao) => (
          <button
            key={opcao}
            type="button"
            onClick={() => {
              setGenero(opcao);
              setCategoria("todas");
            }}
            className={cn(
              "text-sm uppercase tracking-[0.22em] transition-colors sm:text-base",
              genero === opcao ? "text-ink" : "text-ink/35 hover:text-ink/70",
            )}
          >
            {opcao === "todos" ? "Todos" : GENERO_LABEL[opcao]}
          </button>
        ))}
      </div>

      {/* Categoria — centralizado */}
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        {categorias.map((opcao) => (
          <button
            key={opcao}
            type="button"
            onClick={() => setCategoria(opcao)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors",
              categoriaAtiva === opcao
                ? "border-ink bg-ink text-bone"
                : "border-ink/15 text-ink/55 hover:border-ink/40 hover:text-ink",
            )}
          >
            {opcao === "todas" ? "Todas" : opcao}
          </button>
        ))}
      </div>

      {/* Contagem + grid */}
      <p className="mb-8 mt-10 text-center text-xs uppercase tracking-[0.2em] text-ink/40">
        {filtrados.length} {filtrados.length === 1 ? "peça" : "peças"}
      </p>
      <ProductGrid products={filtrados} />
    </div>
  );
}
