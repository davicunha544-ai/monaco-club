import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EditorialBand } from "@/components/EditorialBand";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Monaco Club — marca de moda clássica fina, para ela e para ele. Alfaiataria e peças atemporais.",
};

const ESSENCIAIS = [
  {
    titulo: "Alfaiataria fina",
    texto: "Tecidos nobres e acabamento cuidadoso, do corte à costura.",
  },
  {
    titulo: "Por coleção",
    texto: "Peças pensadas como coleção atemporal, feitas para durar.",
  },
  {
    titulo: "Para ela e para ele",
    texto: "Moda clássica para todos os guarda-roupas.",
  },
];

export default function QuemSomosPage() {
  return (
    <>
      {/* Hero com imagem */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-ink text-center text-bone">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/editorial/quem-somos.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />

        <Container className="relative">
          <span className="text-xs uppercase tracking-[0.3em] text-bone/70">
            Quem somos
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-light leading-[1.08] sm:text-6xl">
            Uma marca de roupa clássica fina.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-bone/80 sm:text-lg">
            Monaco Club é moda clássica e atemporal, para ela e para ele. Peças por
            coleção, em pronta entrega e feitas para durar.
          </p>
        </Container>
      </section>

      {/* Essenciais */}
      <section className="border-t border-ink/10 bg-mist/30">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-8 sm:grid-cols-3">
            {ESSENCIAIS.map((item, index) => (
              <div key={item.titulo} className="text-center">
                <span className="text-[11px] uppercase tracking-[0.2em] text-ink/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 font-display text-lg font-normal text-ink">
                  {item.titulo}
                </h2>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink/65">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Editorial — polo (fechamento + CTA) */}
      <EditorialBand
        imagem="/editorial/polo.jpg"
        titulo="Esporte e elegância."
        texto="O espírito atemporal da riviera, em cada peça."
        href="/loja"
        cta="Ver a coleção"
      />
    </>
  );
}
