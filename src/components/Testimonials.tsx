import { testimonials } from "@/data/testimonials";
import { Container } from "./Container";

export function Testimonials() {
  return (
    <section className="border-t border-ink/10 bg-mist/30">
      <Container className="py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-light sm:text-4xl">
            O que dizem
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink/55">
            Quem já veste Monaco Club.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col border border-ink/10 bg-bone p-6 sm:p-7"
            >
              <blockquote className="flex-1 leading-relaxed text-ink/80">
                “{t.texto}”
              </blockquote>
              <figcaption className="mt-6 flex items-baseline justify-between gap-3 border-t border-ink/10 pt-4">
                <span className="text-sm">
                  <span className="font-medium text-ink">{t.nome}</span>
                  <span className="text-ink/45"> · {t.local}</span>
                </span>
                {t.contexto ? (
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.16em] text-ink/35">
                    {t.contexto}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
