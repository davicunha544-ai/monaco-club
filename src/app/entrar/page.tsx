import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EntrarForm } from "@/components/auth/EntrarForm";

export const metadata: Metadata = { title: "Entrar" };

export default function EntrarPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-sm">
        <header className="mb-8 text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
            Conta
          </span>
          <h1 className="mt-2 font-display text-3xl font-light sm:text-4xl">
            Entrar
          </h1>
        </header>
        <EntrarForm />
      </div>
    </Container>
  );
}
