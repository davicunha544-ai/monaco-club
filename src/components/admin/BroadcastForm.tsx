"use client";

import { useActionState } from "react";
import {
  emailEmMassa,
  type BroadcastState,
} from "@/lib/actions/admin-clientes";
import { Field } from "@/components/ui/Field";

export function BroadcastForm() {
  const [state, action, pending] = useActionState<BroadcastState, FormData>(
    emailEmMassa,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      <Field label="Assunto" name="assunto" required />
      <label className="block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-ink/45">
          Mensagem
        </span>
        <textarea
          name="mensagem"
          rows={5}
          required
          className="w-full border border-ink/20 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-ink"
        />
      </label>

      {state?.error ? (
        <p className="text-sm text-bordo">{state.error}</p>
      ) : null}
      {state?.sucesso ? (
        <p className="text-sm text-ink/70">{state.sucesso}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="bg-ink px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-bone transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Enviando…" : "Enviar a todos os clientes"}
      </button>
    </form>
  );
}
