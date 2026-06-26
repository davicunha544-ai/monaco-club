/**
 * Desconto progressivo: quanto mais peças, maior o desconto.
 * (Aplicado sobre o subtotal, com base na quantidade total de peças.)
 */

export interface FaixaDesconto {
  /** Quantidade mínima de peças para a faixa. */
  minPecas: number;
  /** Percentual de desconto. */
  percent: number;
  label: string;
}

export const FAIXAS_DESCONTO: FaixaDesconto[] = [
  { minPecas: 1, percent: 0, label: "1 peça" },
  { minPecas: 2, percent: 5, label: "2 peças" },
  { minPecas: 3, percent: 10, label: "3 a 4 peças" },
  { minPecas: 5, percent: 15, label: "5+ peças" },
];

/** Percentual de desconto para uma quantidade de peças. */
export function getDescontoPercent(qtdPecas: number): number {
  let percent = 0;
  for (const faixa of FAIXAS_DESCONTO) {
    if (qtdPecas >= faixa.minPecas) percent = faixa.percent;
  }
  return percent;
}

/** Próxima faixa acima da atual (para incentivar "compre mais"); null se já no topo. */
export function getProximaFaixa(qtdPecas: number): FaixaDesconto | null {
  return FAIXAS_DESCONTO.find((faixa) => faixa.minPecas > qtdPecas) ?? null;
}
