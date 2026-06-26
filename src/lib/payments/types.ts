/**
 * Abstração de pagamento — pronta para plugar um gateway real
 * (Stripe, Mercado Pago, Pagar.me, etc.) sem mexer no resto do checkout.
 * Basta criar um novo arquivo que implemente `PaymentProvider` e selecioná-lo
 * em `index.ts`.
 */

export interface PedidoParaPagamento {
  id: string;
  total: number;
  /** Descrição/itens resumidos, se o gateway precisar. */
  descricao?: string;
}

export type StatusPagamento = "aguardando" | "pago" | "falhou";

export interface ResultadoPagamento {
  status: StatusPagamento;
  provider: string;
  /** Referência do gateway (id da transação/preferência). */
  ref?: string;
  /** URL de redirecionamento (checkout hospedado), se houver. */
  redirectUrl?: string;
}

export interface PaymentProvider {
  nome: string;
  iniciarPagamento(pedido: PedidoParaPagamento): Promise<ResultadoPagamento>;
}
