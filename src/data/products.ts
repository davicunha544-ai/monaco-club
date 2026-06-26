/**
 * Catálogo da Monaco Club — marca de moda clássica/atemporal.
 *
 * Fonte única de dados — sem backend/banco. Para adicionar uma peça, inclua um
 * objeto no array `products` abaixo e coloque as imagens em `public/products/`.
 *
 * genero: "masculino" | "feminino".
 * categoria: tipo da peça (Camisa, Calça, Vestido, Blazer, Sapato, ...).
 * Tudo é pronta entrega — a loja é organizada por gênero e categoria.
 */

export type ProductGenero = "masculino" | "feminino";

export interface Product {
  id: string;
  slug: string;
  nome: string;
  /** Preço em reais (R$). */
  preco: number;
  descricao: string;
  /** Caminhos das imagens (relativos a /public). A primeira é a principal. */
  imagens: string[];
  tamanhos: string[];
  genero: ProductGenero;
  categoria: string;
}

export const GENERO_LABEL: Record<ProductGenero, string> = {
  masculino: "Masculino",
  feminino: "Feminino",
};

export const products: Product[] = [
  // ───────────────────────────── MASCULINO ──────────────────────────────
  {
    id: "1",
    slug: "camisa-linho-larvotto",
    nome: "Camisa de Linho Larvotto",
    preco: 690,
    descricao:
      "Linho lavado de gramatura média, caimento solto e botões em madrepérola. Feita para os fins de tarde da riviera.",
    imagens: ["/products/camisa-linho-larvotto.svg"],
    tamanhos: ["P", "M", "G", "GG"],
    genero: "masculino",
    categoria: "Camisa",
  },
  {
    id: "2",
    slug: "calca-alfaiataria-casino",
    nome: "Calça de Alfaiataria Casino",
    preco: 890,
    descricao:
      "Alfaiataria em lã fria com pences e barra reta. Estrutura impecável e conforto para o dia inteiro.",
    imagens: ["/products/calca-alfaiataria-casino.svg"],
    tamanhos: ["38", "40", "42", "44", "46"],
    genero: "masculino",
    categoria: "Calça",
  },
  {
    id: "3",
    slug: "sueter-cashmere-riviera",
    nome: "Suéter de Cashmere Riviera",
    preco: 1480,
    descricao:
      "Cashmere puro de tramas finas, gola careca e toque aveludado. Conforto de inverno com elegância atemporal.",
    imagens: ["/products/sueter-cashmere-riviera.svg"],
    tamanhos: ["P", "M", "G", "GG"],
    genero: "masculino",
    categoria: "Tricô",
  },
  {
    id: "4",
    slug: "tenis-couro-boulevard",
    nome: "Tênis de Couro Boulevard",
    preco: 1190,
    descricao:
      "Couro italiano premium em solado de borracha leve. Silhueta minimalista que vai do dia à noite.",
    imagens: ["/products/tenis-couro-boulevard.svg"],
    tamanhos: ["38", "39", "40", "41", "42", "43"],
    genero: "masculino",
    categoria: "Sapato",
  },
  {
    id: "5",
    slug: "jaqueta-couro-grand-prix",
    nome: "Jaqueta de Couro Grand Prix",
    preco: 3290,
    descricao:
      "Couro de cordeiro com forro acetinado e zíperes italianos. Produção limitada da coleção.",
    imagens: ["/products/jaqueta-couro-grand-prix.svg"],
    tamanhos: ["P", "M", "G", "GG"],
    genero: "masculino",
    categoria: "Jaqueta",
  },

  // ───────────────────────────── FEMININO ───────────────────────────────
  {
    id: "6",
    slug: "vestido-seda-riviera",
    nome: "Vestido de Seda Riviera",
    preco: 1390,
    descricao:
      "Seda pura de caimento fluido, decote discreto e comprimento midi. Elegância para o entardecer na riviera.",
    imagens: ["/products/vestido-seda-riviera.svg"],
    tamanhos: ["P", "M", "G", "GG"],
    genero: "feminino",
    categoria: "Vestido",
  },
  {
    id: "7",
    slug: "blazer-alfaiataria-cote",
    nome: "Blazer de Alfaiataria Côte",
    preco: 980,
    descricao:
      "Alfaiataria feminina em lã fria, ombro estruturado e botão único. Estrutura impecável do dia à noite.",
    imagens: ["/products/blazer-alfaiataria-cote.svg"],
    tamanhos: ["P", "M", "G", "GG"],
    genero: "feminino",
    categoria: "Blazer",
  },
  {
    id: "8",
    slug: "blusa-linho-larvotto",
    nome: "Blusa de Linho Larvotto",
    preco: 520,
    descricao:
      "Linho leve de toque seco, modelagem solta e acabamento artesanal. Frescor para os dias quentes.",
    imagens: ["/products/blusa-linho-larvotto.svg"],
    tamanhos: ["P", "M", "G", "GG"],
    genero: "feminino",
    categoria: "Blusa",
  },
  {
    id: "9",
    slug: "scarpin-couro-boulevard",
    nome: "Scarpin de Couro Boulevard",
    preco: 1090,
    descricao:
      "Couro italiano premium, bico fino e salto médio confortável. O clássico que eleva qualquer look.",
    imagens: ["/products/scarpin-couro-boulevard.svg"],
    tamanhos: ["34", "35", "36", "37", "38", "39"],
    genero: "feminino",
    categoria: "Sapato",
  },
  {
    id: "10",
    slug: "saia-midi-casino",
    nome: "Saia Midi Casino",
    preco: 760,
    descricao:
      "Saia midi em sarja encorpada, cintura alta e fenda discreta. Movimento e sofisticação atemporal.",
    imagens: ["/products/saia-midi-casino.svg"],
    tamanhos: ["36", "38", "40", "42", "44"],
    genero: "feminino",
    categoria: "Saia",
  },
];

/** Retorna os produtos de um determinado gênero. */
export function getProdutosPorGenero(genero: ProductGenero): Product[] {
  return products.filter((produto) => produto.genero === genero);
}

/** Lista as categorias únicas de uma lista de produtos, em ordem alfabética (pt-BR). */
export function getCategorias(lista: Product[]): string[] {
  return Array.from(new Set(lista.map((p) => p.categoria))).sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}

/** Busca um produto pelo slug (útil para a página de detalhe). */
export function getProdutoPorSlug(slug: string): Product | undefined {
  return products.find((produto) => produto.slug === slug);
}
