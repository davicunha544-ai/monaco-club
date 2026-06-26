import Link from "next/link";
import { Container } from "./Container";

/** Faixa editorial full-bleed (imagem de fundo + texto centralizado). */
export function EditorialBand({
  imagem,
  titulo,
  texto,
  href,
  cta,
}: {
  imagem: string;
  titulo: string;
  texto: string;
  href: string;
  cta: string;
}) {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-ink text-center text-bone">
      {/* Placeholder editorial — troque por foto real em /public/editorial/. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imagem}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />

      <Container className="relative py-20">
        <h2 className="font-display text-4xl font-light sm:text-5xl">{titulo}</h2>
        <p className="mx-auto mt-4 max-w-md text-bone/75">{texto}</p>
        <Link
          href={href}
          className="mt-8 inline-block border-b border-bone/50 pb-1 text-xs uppercase tracking-[0.2em] transition-colors hover:border-bone"
        >
          {cta}
        </Link>
      </Container>
    </section>
  );
}
