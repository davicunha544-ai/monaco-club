/**
 * Depoimentos de clientes (feedbacks). Dados estáticos, sem backend.
 * Para adicionar, inclua um item no array `testimonials`.
 */

export interface Testimonial {
  id: string;
  nome: string;
  local: string;
  texto: string;
  /** Linha de contexto opcional (ex.: status da compra ou gênero). */
  contexto?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    nome: "Rafael Andrade",
    local: "São Paulo, SP",
    texto:
      "Comprei a jaqueta e chegou rapidíssimo. O acabamento é impecável, bem acima do que eu esperava.",
    contexto: "Masculino",
  },
  {
    id: "2",
    nome: "Marina Costa",
    local: "Rio de Janeiro, RJ",
    texto:
      "Comprei em pronta entrega numa sexta e recebi na terça. Tecido e caimento muito acima do que esperava pelo preço.",
    contexto: "Feminino",
  },
  {
    id: "3",
    nome: "Thiago Menezes",
    local: "Belo Horizonte, MG",
    texto:
      "A curadoria de clássicos atemporais é exatamente o que eu procurava. Atendimento direto e transparente do início ao fim.",
    contexto: "Masculino",
  },
  {
    id: "4",
    nome: "Camila Borges",
    local: "Curitiba, PR",
    texto:
      "Fiquei na dúvida sobre o tamanho, mas o atendimento me ajudou e a peça caiu perfeita. Com certeza volto a comprar.",
    contexto: "Feminino",
  },
];
