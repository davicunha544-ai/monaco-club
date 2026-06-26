import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Sacola",
  description: "Sua sacola na Monaco Club — desconto progressivo e cálculo de frete.",
};

export default function CarrinhoPage() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-light sm:text-5xl">Carrinho</h1>

      <div className="mt-10">
        <CartView />
      </div>
    </Container>
  );
}
