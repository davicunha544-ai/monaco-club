const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata um valor numérico (em reais) como moeda BRL — ex.: 690 -> "R$ 690,00". */
export function formatBRL(valor: number): string {
  return brl.format(valor);
}
