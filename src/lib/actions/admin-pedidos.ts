"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { STATUS_PEDIDO } from "@/lib/pedido";

export async function atualizarStatusPedido(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "admin") throw new Error("Acesso negado.");

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !STATUS_PEDIDO.includes(status as (typeof STATUS_PEDIDO)[number]))
    return;

  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath(`/admin/vendas/${id}`);
  revalidatePath("/admin/vendas");
}
