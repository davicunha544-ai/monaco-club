"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { Field } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import { formatBRL } from "@/lib/format";
import { getDescontoPercent } from "@/lib/discount";
import { calcularFrete } from "@/lib/frete";
import {
  finalizarPedido,
  type EnderecoEntrega,
} from "@/lib/actions/checkout";

const ENDERECO_VAZIO: EnderecoEntrega = {
  nome: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
};

export function CheckoutForm() {
  const { items, totalQuantidade, subtotal, clear } = useCart();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [erro, setErro] = useState<string | null>(null);
  const [endereco, setEndereco] = useState<EnderecoEntrega>(ENDERECO_VAZIO);
  const [opcaoFrete, setOpcaoFrete] = useState<string | null>(null);

  const descontoPercent = getDescontoPercent(totalQuantidade);
  const descontoValor = (subtotal * descontoPercent) / 100;

  const cepDigits = endereco.cep.replace(/\D/g, "");
  const freteResult = useMemo(
    () => (cepDigits.length === 8 ? calcularFrete(cepDigits, subtotal) : null),
    [cepDigits, subtotal],
  );
  const freteSel =
    freteResult?.opcoes.find((o) => o.nome === opcaoFrete) ?? null;
  const freteValor = freteSel ? freteSel.preco : 0;
  const total = subtotal - descontoValor + freteValor;

  function set<K extends keyof EnderecoEntrega>(k: K, v: string) {
    setEndereco((e) => ({ ...e, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    startTransition(async () => {
      const res = await finalizarPedido(
        items.map((i) => ({
          slug: i.slug,
          tamanho: i.tamanho,
          quantidade: i.quantidade,
        })),
        endereco,
        freteSel ? { nome: freteSel.nome, valor: freteSel.preco } : null,
      );
      if (res.ok) {
        clear();
        router.push(`/conta/pedidos/${res.orderId}`);
      } else {
        setErro(res.error);
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-2xl font-light text-ink">
          Sua sacola está vazia.
        </p>
        <Link
          href="/loja"
          className="mt-6 inline-block bg-ink px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-bone transition-opacity hover:opacity-90"
        >
          Ver a loja
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16"
    >
      {/* Entrega */}
      <div>
        <h2 className="font-display text-2xl font-light">Entrega</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="Nome completo"
            name="nome"
            className="sm:col-span-2"
            value={endereco.nome}
            onChange={(e) => set("nome", e.target.value)}
            required
          />
          <Field
            label="CEP"
            name="cep"
            inputMode="numeric"
            value={endereco.cep}
            onChange={(e) => set("cep", e.target.value)}
            required
          />
          <Field
            label="Estado (UF)"
            name="estado"
            value={endereco.estado}
            onChange={(e) => set("estado", e.target.value)}
            required
          />
          <Field
            label="Logradouro"
            name="logradouro"
            className="sm:col-span-2"
            value={endereco.logradouro}
            onChange={(e) => set("logradouro", e.target.value)}
            required
          />
          <Field
            label="Número"
            name="numero"
            value={endereco.numero}
            onChange={(e) => set("numero", e.target.value)}
            required
          />
          <Field
            label="Complemento"
            name="complemento"
            value={endereco.complemento ?? ""}
            onChange={(e) => set("complemento", e.target.value)}
          />
          <Field
            label="Bairro"
            name="bairro"
            value={endereco.bairro}
            onChange={(e) => set("bairro", e.target.value)}
            required
          />
          <Field
            label="Cidade"
            name="cidade"
            value={endereco.cidade}
            onChange={(e) => set("cidade", e.target.value)}
            required
          />
        </div>

        {/* Frete */}
        <div className="mt-8">
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-ink/45">
            Frete
          </h3>
          {!freteResult ? (
            <p className="mt-3 text-sm text-ink/50">
              Informe um CEP válido (8 dígitos) para ver as opções de entrega.
            </p>
          ) : (
            <div className="mt-3 space-y-2">
              {freteResult.opcoes.map((o) => (
                <label
                  key={o.nome}
                  className={cn(
                    "flex cursor-pointer items-center justify-between border px-4 py-3 text-sm transition-colors",
                    opcaoFrete === o.nome
                      ? "border-ink"
                      : "border-ink/15 hover:border-ink/40",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="frete"
                      checked={opcaoFrete === o.nome}
                      onChange={() => setOpcaoFrete(o.nome)}
                      className="accent-bordo"
                    />
                    <span>
                      <span className="block">{o.nome}</span>
                      <span className="block text-xs text-ink/45">
                        até {o.prazoDias} dias úteis
                      </span>
                    </span>
                  </span>
                  <span>{o.preco === 0 ? "Grátis" : formatBRL(o.preco)}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Resumo */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-ink/10 p-5">
          <h2 className="font-display text-xl font-light">Resumo</h2>

          <ul className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <li
                key={item.slug + item.tamanho}
                className="flex justify-between gap-3 text-ink/70"
              >
                <span>
                  {item.nome}
                  <span className="text-ink/40">
                    {" "}
                    · {item.tamanho} · {item.quantidade}x
                  </span>
                </span>
                <span className="shrink-0">
                  {formatBRL(item.preco * item.quantidade)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm">
            <div className="flex justify-between text-ink/70">
              <dt>Subtotal</dt>
              <dd>{formatBRL(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink/70">
              <dt>Desconto{descontoPercent > 0 ? ` (${descontoPercent}%)` : ""}</dt>
              <dd className={descontoValor > 0 ? "text-bordo" : undefined}>
                {descontoValor > 0
                  ? `− ${formatBRL(descontoValor)}`
                  : formatBRL(0)}
              </dd>
            </div>
            <div className="flex justify-between text-ink/70">
              <dt>Frete</dt>
              <dd>
                {freteSel
                  ? freteValor === 0
                    ? "Grátis"
                    : formatBRL(freteValor)
                  : "—"}
              </dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-medium text-ink">
              <dt>Total</dt>
              <dd>{formatBRL(total)}</dd>
            </div>
          </dl>

          {erro ? <p className="mt-4 text-sm text-bordo">{erro}</p> : null}

          <button
            type="submit"
            disabled={pending || !freteSel}
            className="mt-5 w-full bg-ink px-8 py-4 text-xs uppercase tracking-[0.2em] text-bone transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Finalizando…" : "Finalizar compra"}
          </button>
          <p className="mt-2 text-center text-[11px] text-ink/45">
            Pagamento será integrado a um gateway. O pedido fica como “aguardando
            pagamento”.
          </p>
        </div>
      </aside>
    </form>
  );
}
