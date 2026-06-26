/**
 * Cálculo de frete (simulado — sem integração com Correios/gateway).
 * Estima custo e prazo a partir da região do CEP e oferece frete econômico
 * grátis acima de um valor de subtotal.
 */

export interface OpcaoFrete {
  nome: string;
  preco: number;
  prazoDias: number;
}

export interface ResultadoFrete {
  cepValido: boolean;
  gratis: boolean;
  opcoes: OpcaoFrete[];
}

/** Subtotal a partir do qual o frete econômico fica grátis. */
export const FRETE_GRATIS_MIN = 800;

function arredonda(valor: number): number {
  return Math.round(valor * 100) / 100;
}

export function calcularFrete(cep: string, subtotal: number): ResultadoFrete {
  const digitos = cep.replace(/\D/g, "");
  if (digitos.length !== 8) {
    return { cepValido: false, gratis: false, opcoes: [] };
  }

  // Região postal a partir do 1º dígito do CEP (simulação de distância).
  const regiao = Number(digitos[0]);
  const baseEconomico = 19.9 + regiao * 3;
  const baseExpresso = 34.9 + regiao * 4;
  const prazoBase = 3 + regiao;

  const gratis = subtotal >= FRETE_GRATIS_MIN;

  const opcoes: OpcaoFrete[] = [
    {
      nome: "Econômico",
      preco: gratis ? 0 : arredonda(baseEconomico),
      prazoDias: prazoBase + 4,
    },
    {
      nome: "Expresso",
      preco: arredonda(baseExpresso),
      prazoDias: Math.max(1, prazoBase),
    },
  ];

  return { cepValido: true, gratis, opcoes };
}
