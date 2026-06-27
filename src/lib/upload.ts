import { writeFile, mkdir } from "fs/promises";
import path from "path";

const PASTA = path.join(process.cwd(), "public", "uploads");

/**
 * Salva um arquivo enviado em `public/uploads` e devolve o caminho público.
 * (Local apenas — em produção/Vercel o fs é read-only; trocar por Vercel Blob.)
 */
export async function salvarUpload(file: File): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());
  await mkdir(PASTA, { recursive: true });
  const ext =
    (file.name.split(".").pop() || "jpg")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "") || "jpg";
  const nome = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  await writeFile(path.join(PASTA, nome), bytes);
  return `/uploads/${nome}`;
}
