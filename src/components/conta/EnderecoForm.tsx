"use client";

import { useActionState } from "react";
import { adicionarEndereco } from "@/lib/actions/address";
import { type FormState } from "@/lib/actions/auth";
import { Field } from "@/components/ui/Field";

export function EnderecoForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    adicionarEndereco,
    undefined,
  );

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <Field label="Identificação (ex.: Casa)" name="nome" required className="sm:col-span-2" />
      <Field label="CEP" name="cep" inputMode="numeric" required />
      <Field label="Estado (UF)" name="estado" required />
      <Field label="Logradouro" name="logradouro" required className="sm:col-span-2" />
      <Field label="Número" name="numero" required />
      <Field label="Complemento" name="complemento" />
      <Field label="Bairro" name="bairro" required />
      <Field label="Cidade" name="cidade" required />

      {state?.error ? (
        <p className="text-sm text-bordo sm:col-span-2">{state.error}</p>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="border border-ink px-6 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-bone disabled:opacity-50"
        >
          {pending ? "Salvando…" : "Adicionar endereço"}
        </button>
      </div>
    </form>
  );
}
