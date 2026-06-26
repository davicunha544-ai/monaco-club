import type { PaymentProvider } from "./types";

/**
 * Provider de teste (sem gateway real). Apenas registra o pedido como
 * "aguardando pagamento". Troque por uma implementação real quando o
 * gateway for definido.
 */
export const stubProvider: PaymentProvider = {
  nome: "stub",
  async iniciarPagamento(pedido) {
    return {
      status: "aguardando",
      provider: "stub",
      ref: `stub_${pedido.id}`,
    };
  },
};
