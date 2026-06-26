import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { CartButton } from "./cart/CartButton";
import { NAV_ITEMS } from "@/lib/nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-midnight/90 backdrop-blur supports-[backdrop-filter]:bg-midnight/75">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          aria-label="Monaco Club — início"
          className="relative block h-12 w-36 sm:h-14 sm:w-48"
        >
          {/* object-cover recorta o respiro transparente do PNG quadrado,
              ampliando o wordmark de traço fino para boa legibilidade no mobile. */}
          <Image
            src="/logo-monaco-white.png"
            alt="Monaco Club"
            fill
            priority
            sizes="192px"
            className="object-cover object-center"
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-7">
          {/* Nav desktop */}
          <nav className="hidden items-center gap-9 sm:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[0.18em] text-bone/70 transition-colors hover:text-bone"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Conta (redireciona p/ login se deslogado) */}
          <Link
            href="/conta"
            aria-label="Minha conta"
            className="flex h-10 w-10 items-center justify-center text-bone transition-colors hover:text-bone/70"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" strokeLinecap="round" />
            </svg>
          </Link>

          {/* Sacola */}
          <CartButton />

          {/* Menu sanduíche (mobile) */}
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
