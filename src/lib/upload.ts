import { writeFile, mkdir } from "fs/promises";
import path from "path";

const PASTA = path.join(process.cwd(), "public", "uploads");

function nomeArquivo(file: File): string {
  const ext =
    (file.name.split(".").pop() || "jpg")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "") || "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
}

/**
 * Salva um arquivo enviado e devolve a URL pública.
 *
 * - Em produção (Vercel), o filesystem é somente-leitura: usa **Vercel Blob**
 *   quando `BLOB_READ_WRITE_TOKEN` estiver definido.
 * - Em dev (sem o token), grava em `public/uploads` — sem depender de rede.
 */
export async function salvarUpload(file: File): Promise<string> {
  const nome = nomeArquivo(file);

  // Produção / quando o Blob está configurado.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const { url } = await put(`uploads/${nome}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return url;
  }

  // Dev local — grava no disco.
  const bytes = Buffer.from(await file.arrayBuffer());
  await mkdir(PASTA, { recursive: true });
  await writeFile(path.join(PASTA, nome), bytes);
  return `/uploads/${nome}`;
}
