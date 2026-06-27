import Link from "next/link";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { EditorialBand } from "@/components/EditorialBand";
import { ProductCard } from "@/components/ProductCard";
import { Testimonials } from "@/components/Testimonials";
import { cn } from "@/lib/cn";
import {
  GENERO_LABEL,
  getCategorias,
  getProdutos,
  type ProductGenero,
} from "@/lib/products";

export default async function HomePage() {
  const todos = await getProdutos();
  const destaques = todos.slice(0, 4);
  const generos: ProductGenero[] = ["feminino", "masculino"];

  return (
    <>
      <Hero />

      {/* Editorial — riva */}
      <EditorialBand
        imagem="/editorial/riva.jpg"
        titulo="Old money, atemporal."
        texto="A elegância silenciosa que atravessa as estações."
        href="/loja"
        cta="Ver a coleção"
      />

      {/* Feminino / Masculino */}
      <section>
        <Container className="py-16 sm:py-20">
          <div className="mb-10 text-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
              Coleções
            </span>
            <h2 className="mt-2 font-display text-3xl font-light sm:text-4xl">
              Para ela e para ele
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {generos.map((genero, index) => {
              const categorias = getCategorias(
                todos.filter((p) => p.genero === genero),
              );
              const dark = genero === "masculino";
              return (
                <Link
                  key={genero}
                  href={`/loja?genero=${genero}`}
                  className={cn(
                    "group flex min-h-[220px] flex-col items-center justify-between p-8 text-center transition-opacity hover:opacity-95 sm:min-h-[280px] sm:p-10",
                    dark ? "bg-midnight text-bone" : "bg-mist text-ink",
                  )}
                >
                  <div>
                    <span
                      className={cn(
                        "text-[11px] uppercase tracking-[0.2em]",
                        dark ? "text-bone/45" : "text-ink/40",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-light sm:text-4xl">
                      {GENERO_LABEL[genero]}
                    </h3>
                  </div>

                  <div className="mt-8">
                    <div
                      className={cn(
                        "flex flex-wrap justify-center gap-x-2.5 gap-y-1 text-xs",
                        dark ? "text-bone/55" : "text-ink/55",
                      )}
                    >
                      {categorias.map((categoria, i) => (
                        <span key={categoria}>
                          {categoria}
                          {i < categorias.length - 1 ? " ·" : ""}
                        </span>
                      ))}
                    </div>
                    <span
                      className={cn(
                        "mt-5 inline-block border-b pb-1 text-[11px] uppercase tracking-[0.18em] transition-colors",
                        dark
                          ? "border-bone/40 group-hover:border-bone"
                          : "border-ink/40 group-hover:border-ink",
                      )}
                    >
                      Explorar {GENERO_LABEL[genero]}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Editorial — monte carlo */}
      <EditorialBand
        imagem="/editorial/monte-carlo.jpg"
        titulo="A elegância de Monte Carlo."
        texto="Alfaiataria e peças atemporais, da riviera ao seu guarda-roupa."
        href="/loja?genero=masculino"
        cta="Explorar Masculino"
      />

      {/* Seleção em destaque */}
      <section className="border-t border-ink/10">
        <Container className="py-20 text-center">
          <h2 className="font-display text-3xl font-light sm:text-4xl">Seleção</h2>

          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 text-left sm:gap-x-6 lg:grid-cols-4">
            {destaques.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/loja"
              className="inline-block border-b border-ink pb-1 text-xs uppercase tracking-[0.18em] transition-colors hover:border-bordo hover:text-bordo"
            >
              Ver tudo
            </Link>
          </div>
        </Container>
      </section>

      {/* Editorial — porto */}
      <EditorialBand
        imagem="/editorial/porto.jpg"
        titulo="Descubra a coleção."
        texto="Para ela e para ele — em pronta entrega."
        href="/loja"
        cta="Ver a loja"
      />

      {/* Feedbacks */}
      <Testimonials />
    </>
  );
}
