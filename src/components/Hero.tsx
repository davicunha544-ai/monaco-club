import Link from "next/link";
import { Container } from "./Container";

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-ink text-center text-bone">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/editorial/hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/50" />

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
    </section>
  );
}
