import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { NAV_ITEMS } from "@/lib/nav";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-ink text-bone/70">
      <Container className="flex flex-col items-center gap-7 py-16 text-center">
        <div className="relative h-14 w-48">
          <Image
            src="/logo-monaco-white.png"
            alt="Monaco Club"
            fill
            sizes="192px"
            className="object-cover object-center"
          />
        </div>

        <p className="max-w-md text-sm leading-relaxed text-bone/55">
          Moda clássica fina — para ela e para ele.
        </p>

        <nav className="flex flex-wrap justify-center gap-8 text-[11px] uppercase tracking-[0.18em]">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-wrap justify-center gap-6 text-[11px] uppercase tracking-[0.18em] text-bone/45">
          <Link href="/conta" className="transition-colors hover:text-bone">
            Conta
          </Link>
          <Link href="/termos" className="transition-colors hover:text-bone">
            Termos
          </Link>
          <Link href="/privacidade" className="transition-colors hover:text-bone">
            Privacidade
          </Link>
        </nav>

        <p className="text-[11px] uppercase tracking-[0.18em] text-bone/35">
          © {ano} Monaco Club
        </p>
      </Container>
    </footer>
  );
}
