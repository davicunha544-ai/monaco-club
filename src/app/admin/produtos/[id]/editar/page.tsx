import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produto = await prisma.product.findUnique({ where: { id } });
  if (!produto) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-light sm:text-4xl">
        Editar produto
      </h1>
      <ProductForm produto={produto} />
    </div>
  );
}
