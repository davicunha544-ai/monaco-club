"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useCart } from "./CartProvider";

interface AddToCartProps {
  slug: string;
  nome: string;
  preco: number;
  imagem: string;
  tamanhos: string[];
}

export function AddToCart({ slug, nome, preco, imagem, tamanhos }: AddToCartProps) {
  const { addItem } = useCart();
  const [tamanho, setTamanho] = useState<string | null>(null);
  const [qtd, setQtd] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  function handleAdd() {
    if (!tamanho) return;
    addItem({ slug, nome, preco, imagem, tamanho, quantidade: qtd });
    setAdicionado(true);
    window.setTimeout(() => setAdicionado(false), 2500);
  }

  return (
    <div className="mt-8">
      <div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
          Tamanho
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {tamanhos.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTamanho(t)}
              className={cn(
                "min-w-[3rem] border px-3 py-2 text-sm transition-colors",
                tamanho === t
                  ? "border-ink bg-ink text-bone"
                  : "border-ink/20 text-ink hover:border-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
          Qtd
        </span>
        <div className="flex items-center border border-ink/20">
          <button
            type="button"
            onClick={() => setQtd((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-ink/70 hover:text-ink"
            aria-label="Diminuir quantidade"
          >
            −
          </button>
          <span className="w-10 text-center text-sm">{qtd}</span>
          <button
            type="button"
            onClick={() => setQtd((q) => q + 1)}
            className="px-3 py-2 text-ink/70 hover:text-ink"
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!tamanho}
        className={cn(
          "mt-8 w-full px-8 py-4 text-xs uppercase tracking-[0.2em] transition-opacity sm:w-auto",
          tamanho
            ? "bg-ink text-bone hover:opacity-90"
            : "cursor-not-allowed bg-ink/30 text-bone/70",
        )}
      >
        {adicionado ? "Adicionado à sacola ✓" : "Adicionar à sacola"}
      </button>

      {!tamanho ? (
        <p className="mt-2 text-xs text-ink/45">Selecione um tamanho.</p>
      ) : null}
    </div>
  );
}
