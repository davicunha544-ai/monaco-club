"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

export function Carousel({
  imagens,
  intervalo = 5000,
}: {
  imagens: string[];
  intervalo?: number;
}) {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (imagens.length <= 1) return;
    const t = setInterval(
      () => setAtual((p) => (p + 1) % imagens.length),
      intervalo,
    );
    return () => clearInterval(t);
  }, [imagens.length, intervalo]);

  return (
    <section className="relative flex min-h-[86vh] items-center justify-center overflow-hidden bg-ink text-center text-bone">
      {imagens.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out",
            i === atual ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/35" />

      <Container className="relative">
        <span className="text-xs uppercase tracking-[0.35em] text-bone/70 sm:text-sm">
          Monaco Club
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-light leading-[1.05] sm:text-7xl">
          Clássicos atemporais.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-bone/80 sm:text-lg">
          Moda clássica fina, para ela e para ele.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/loja"
            className="bg-bone px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-90"
          >
            Ver a coleção
          </Link>
          <Link
            href="/quem-somos"
            className="border border-bone/40 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-bone/85 transition-colors hover:border-bone hover:text-bone"
          >
            Quem somos
          </Link>
        </div>
      </Container>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
        {imagens.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setAtual(i)}
            aria-label={`Imagem ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === atual ? "w-6 bg-bone" : "w-1.5 bg-bone/50 hover:bg-bone/80",
            )}
          />
        ))}
      </div>
    </section>
  );
}
