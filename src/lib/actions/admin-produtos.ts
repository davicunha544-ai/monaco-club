"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { salvarUpload } from "@/lib/upload";
import type { FormState } from "./auth";

async function exigirAdmin() {
  const session = await auth();
  if (session?.user?.role !== "admin") throw new Error("Acesso negado.");
}

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[^\x00-\x7F]/g, "") // remove marcas de acento (decompostas) e não-ASCII
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function salvarProduto(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await exigirAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const nome = String(formData.get("nome") ?? "").trim();
  const categoria = String(formData.get("categoria") ?? "").trim();
  const genero = String(formData.get("genero") ?? "").trim();
  const descricao = String(formData.get("descricao") ?? "").trim();
  const tamanhos = String(formData.get("tamanhos") ?? "").trim();
  const cores = String(formData.get("cores") ?? "").trim() || null;
  const preco = Number(String(formData.get("preco") ?? "").replace(",", "."));
  const precoAntigoRaw = String(formData.get("precoAntigo") ?? "").trim();
  const precoAntigo = precoAntigoRaw
    ? Number(precoAntigoRaw.replace(",", "."))
    : null;
  const ativo = formData.get("ativo") === "on";

  if (!nome) return { error: "Informe o nome." };
  if (!categoria) return { error: "Informe a categoria." };
  if (genero !== "masculino" && genero !== "feminino")
    return { error: "Selecione o gênero." };
  if (!Number.isFinite(preco) || preco <= 0)
    return { error: "Preço inválido." };
  if (precoAntigo != null && (!Number.isFinite(precoAntigo) || precoAntigo <= 0))
    return { error: "Preço antigo inválido." };

  // Imagem: usa o arquivo enviado, ou mantém a atual (edição).
  const arquivo = formData.get("imagemArquivo");
  let imagem = String(formData.get("imagemAtual") ?? "").trim();
  if (
    arquivo &&
    typeof arquivo === "object" &&
    "size" in arquivo &&
    (arquivo as File).size > 0
  ) {
    imagem = await salvarUpload(arquivo as File);
  }
  if (!imagem) return { error: "Envie uma imagem do produto." };

  const dados = {
    nome,
    descricao,
    preco,
    precoAntigo,
    imagem,
    cores,
    tamanhos,
    genero,
    categoria,
    ativo,
  };

  if (id) {
    await prisma.product.update({ where: { id }, data: dados });
  } else {
    const base = slugify(nome) || "produto";
    let slug = base;
    let n = 2;
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${base}-${n++}`;
    }
    await prisma.product.create({ data: { ...dados, slug } });
  }

  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
  revalidatePath("/");
  redirect("/admin/produtos");
}

export async function excluirProduto(formData: FormData) {
  await exigirAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
  revalidatePath("/");
}
