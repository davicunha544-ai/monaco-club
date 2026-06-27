"use client";

import { useActionState, useState } from "react";
import { salvarProduto } from "@/lib/actions/admin-produtos";
import { type FormState } from "@/lib/actions/auth";
import { Field } from "@/components/ui/Field";
import type { Product } from "@/lib/products";

const inputCls =
  "w-full border border-ink/20 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-ink";

export function ProductForm({ produto }: { produto?: Product }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    salvarProduto,
    undefined,
  );
  const [preview, setPreview] = useState<string | null>(produto?.imagem ?? null);

  return (
    <form action={action} className="grid max-w-3xl gap-5 sm:grid-cols-2">
      {produto ? <input type="hidden" name="id" value={produto.id} /> : null}
      <input type="hidden" name="imagemAtual" value={produto?.imagem ?? ""} />

      <Field
        label="Nome"
        name="nome"
        defaultValue={produto?.nome}
        required
        className="sm:col-span-2"
      />
      <Field
        label="Categoria"
        name="categoria"
        defaultValue={produto?.categoria}
        placeholder="Camisa, Vestido, Sapato…"
        required
      />
      <label className="block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-ink/45">
          Gênero
        </span>
        <select
          name="genero"
          defaultValue={produto?.genero ?? "masculino"}
          className={inputCls}
        >
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </label>
      <Field
        label="Preço (R$)"
        name="preco"
        type="number"
        step="0.01"
        min="0"
        defaultValue={produto?.preco}
        required
      />
      <Field
        label="Preço antigo (R$, opcional)"
        name="precoAntigo"
        type="number"
        step="0.01"
        min="0"
        defaultValue={produto?.precoAntigo ?? ""}
      />
      <Field
        label="Tamanhos (separados por vírgula)"
        name="tamanhos"
        defaultValue={produto?.tamanhos}
        placeholder="P,M,G,GG"
        required
        className="sm:col-span-2"
      />
      <Field
        label="Cores (separadas por vírgula)"
        name="cores"
        defaultValue={produto?.cores ?? ""}
        placeholder="Preto, Branco"
        className="sm:col-span-2"
      />
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-ink/45">
          Descrição
        </span>
        <textarea
          name="descricao"
          defaultValue={produto?.descricao ?? ""}
          rows={3}
          className={inputCls}
        />
      </label>

      {/* Imagem */}
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-ink/45">
          Imagem
        </span>
        <input
          type="file"
          name="imagemArquivo"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setPreview(URL.createObjectURL(f));
          }}
          className="block w-full text-sm text-ink/70 file:mr-3 file:border file:border-ink/20 file:bg-transparent file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.12em]"
        />
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="mt-3 h-40 w-32 bg-mist object-cover" />
        ) : null}
      </div>

      <label className="flex items-center gap-2 text-sm text-ink/70 sm:col-span-2">
        <input
          type="checkbox"
          name="ativo"
          defaultChecked={produto ? produto.ativo : true}
          className="accent-bordo"
        />
        Ativo (aparece na loja)
      </label>

      {state?.error ? (
        <p className="text-sm text-bordo sm:col-span-2">{state.error}</p>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-ink px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-bone transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Salvando…" : "Salvar produto"}
        </button>
      </div>
    </form>
  );
}
