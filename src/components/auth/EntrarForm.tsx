"use client";

import { useActionState } from "react";
import Link from "next/link";
import { entrar, type FormState } from "@/lib/actions/auth";
import { Field } from "@/components/ui/Field";

export function EntrarForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    entrar,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      <Field
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <Field
        label="Senha"
        name="senha"
        type="password"
        autoComplete="current-password"
        required
      />

      {state?.error ? (
        <p className="text-sm text-bordo">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-ink px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-bone transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>

      <p className="text-center text-xs text-ink/55">
        Não tem conta?{" "}
        <Link href="/cadastro" className="underline hover:text-ink">
          Criar conta
        </Link>
      </p>
    </form>
  );
}
