"use client";

import { useActionState } from "react";
import Link from "next/link";
import { cadastrar, type FormState } from "@/lib/actions/auth";
import { Field } from "@/components/ui/Field";

export function CadastroForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    cadastrar,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      <Field label="Nome" name="nome" autoComplete="name" required />
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
        autoComplete="new-password"
        required
      />

      <label className="flex items-start gap-2 pt-1 text-xs leading-relaxed text-ink/70">
        <input type="checkbox" name="termos" className="mt-0.5 accent-bordo" />
        <span>
          Li e aceito os{" "}
          <Link href="/termos" className="underline hover:text-ink">
            Termos
          </Link>{" "}
          e a{" "}
          <Link href="/privacidade" className="underline hover:text-ink">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      {state?.error ? (
        <p className="text-sm text-bordo">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-ink px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-bone transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Criando…" : "Criar conta"}
      </button>

      <p className="text-center text-xs text-ink/55">
        Já tem conta?{" "}
        <Link href="/entrar" className="underline hover:text-ink">
          Entrar
        </Link>
      </p>
    </form>
  );
}
