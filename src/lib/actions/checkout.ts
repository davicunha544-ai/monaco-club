"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getProdutoPorSlug } from "@/lib/products";
import { getDescontoPercent } from "@/lib/discount";
import { getPaymentProvider } from "@/lib/payments";
import { validarCPF, formatarCPF } from "@/lib/cpf";

export interface ItemPedido {
  slug: string;
  tamanho: string;
  quantidade: number;
}

export interface EnderecoEntrega {
  nome: string;
  cpf: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export type ResultadoCheckout =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

/**
 * Cria o pedido. Recalcula preços/desconto/frete NO SERVIDOR a partir do
 * catálogo (não confia nos valores do cliente) e dispara o pagamento via
 * abstração (`getPaymentProvider`).
 */
export async function finalizarPedido(
  itens: ItemPedido[],
  endereco: EnderecoEntrega,
  frete: { nome: string; valor: number } | null,
): Promise<ResultadoCheckout> {
  const session = await auth();
  if (!session?.user?.id)
    return { ok: false, error: "Faça login para finalizar a compra." };

  if (!Array.isArray(itens) || itens.length === 0)
    return { ok: false, error: "Sua sacola está vazia." };

  const campos = [
    endereco?.nome,
    endereco?.cep,
    endereco?.logradouro,
    endereco?.numero,
    endereco?.bairro,
    endereco?.cidade,
    endereco?.estado,
  ];
  if (campos.some((c) => !c || String(c).trim() === ""))
    return { ok: false, error: "Preencha o endereço de entrega." };
  if (!validarCPF(endereco.cpf))
    return { ok: false, error: "CPF inválido." };

  // Recalcula a partir do catálogo (fonte da verdade).
  const itensValidos = [];
  let subtotal = 0;
  let totalPecas = 0;
  for (const it of itens) {
    const p = await getProdutoPorSlug(it.slug);
    if (!p) continue;
    const qtd = Math.max(1, Math.floor(Number(it.quantidade) || 1));
    subtotal += p.preco * qtd;
    totalPecas += qtd;
    itensValidos.push({
      productSlug: p.slug,
      nome: p.nome,
      preco: p.preco,
      tamanho: String(it.tamanho || "—"),
      quantidade: qtd,
      imagem: p.imagem,
    });
  }
  if (itensValidos.length === 0)
    return { ok: false, error: "Nenhum item válido na sacola." };

  const descontoPercent = getDescontoPercent(totalPecas);
  const descontoValor = (subtotal * descontoPercent) / 100;
  const freteValor = frete?.valor ?? 0;
  const total = subtotal - descontoValor + freteValor;

  const enderecoResumo = `${endereco.nome} — ${endereco.logradouro}, ${endereco.numero}${
    endereco.complemento ? ` (${endereco.complemento})` : ""
  } — ${endereco.bairro}, ${endereco.cidade}/${endereco.estado} — CEP ${endereco.cep} — CPF ${formatarCPF(endereco.cpf)}`;

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      status: "pendente",
      subtotal,
      descontoPercent,
      descontoValor,
      freteNome: frete?.nome ?? null,
      freteValor,
      total,
      enderecoResumo,
      cpf: formatarCPF(endereco.cpf),
      items: { create: itensValidos },
    },
  });

  // Pagamento (abstração — hoje stub).
  const pagamento = await getPaymentProvider().iniciarPagamento({
    id: order.id,
    total,
    descricao: `Pedido Monaco Club ${order.id}`,
  });
  await prisma.order.update({
    where: { id: order.id },
    data: {
      paymentProvider: pagamento.provider,
      paymentStatus: pagamento.status,
      paymentRef: pagamento.ref ?? null,
    },
  });

  // Salva o endereço na conta do cliente, se ainda não houver um igual.
  const enderecoExiste = await prisma.address.findFirst({
    where: {
      userId: session.user.id,
      cep: endereco.cep,
      numero: endereco.numero,
    },
  });
  if (!enderecoExiste) {
    await prisma.address.create({
      data: {
        userId: session.user.id,
        nome: endereco.nome,
        cpf: formatarCPF(endereco.cpf),
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        complemento: endereco.complemento || null,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado,
      },
    });
  }

  return { ok: true, orderId: order.id };
}
