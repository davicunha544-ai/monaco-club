import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { auth } from "@/auth";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/entrar");

  return (
    <Container className="py-12 sm:py-16">
      <header className="mb-10 text-center">
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
          Checkout
        </span>
        <h1 className="mt-2 font-display text-4xl font-light sm:text-5xl">
          Finalizar compra
        </h1>
      </header>
      <CheckoutForm />
    </Container>
  );
}
