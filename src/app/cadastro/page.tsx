import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CadastroForm } from "@/components/auth/CadastroForm";

export const metadata: Metadata = { title: "Criar conta" };

export default function CadastroPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-sm">
        <header className="mb-8 text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
            Conta
          </span>
          <h1 className="mt-2 font-display text-3xl font-light sm:text-4xl">
            Criar conta
          </h1>
        </header>
        <CadastroForm />
      </div>
    </Container>
  );
}
