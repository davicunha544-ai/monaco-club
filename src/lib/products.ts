import { prisma } from "@/lib/db";
import type { Product } from "@prisma/client";

export type { Product } from "@prisma/client";

export type ProductGenero = "masculino" | "feminino";

export const GENERO_LABEL: Record<ProductGenero, string> = {
  masculino: "Masculino",
  feminino: "Feminino",
};

/** Converte CSV ("P,M,G") em lista (["P","M","G"]). */
export function parseLista(csv: string | null | undefined): string[] {
  return (csv ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Todos os produtos ativos (loja). */
export async function getProdutos(): Promise<Product[]> {
  return prisma.product.findMany({
    where: { ativo: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function getProdutoPorSlug(slug: string): Promise<Product | null> {
  return prisma.product.findFirst({ where: { slug, ativo: true } });
}

export async function getProdutosPorGenero(
  genero: ProductGenero,
): Promise<Product[]> {
  return prisma.product.findMany({
    where: { ativo: true, genero },
    orderBy: { createdAt: "asc" },
  });
}

/** Categorias únicas de uma lista de produtos (ordem alfabética pt-BR). */
export function getCategorias(lista: Product[]): string[] {
  return Array.from(new Set(lista.map((p) => p.categoria))).sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}
