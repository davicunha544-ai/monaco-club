import type { PaymentProvider } from "./types";
import { stubProvider } from "./stub";

export * from "./types";

/**
 * Seleciona o provider de pagamento. Hoje retorna o stub.
 * Para plugar um gateway real: crie `./stripe.ts` (ou mercadopago/pagarme)
 * implementando `PaymentProvider` e selecione-o aqui via env, ex.:
 *
 *   switch (process.env.PAYMENT_PROVIDER) {
 *     case "stripe": return stripeProvider;
 *     default: return stubProvider;
 *   }
 */
export function getPaymentProvider(): PaymentProvider {
  return stubProvider;
}
