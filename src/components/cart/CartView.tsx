"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatBRL } from "@/lib/format";
import {
  FAIXAS_DESCONTO,
  getDescontoPercent,
  getProximaFaixa,
} from "@/lib/discount";
import { calcularFrete, FRETE_GRATIS_MIN } from "@/lib/frete";
import { useCart } from "./CartProvider";

export function CartView() {
  const { items, updateQty, removeItem, totalQuantidade, subtotal } = useCart();

  const [cepInput, setCepInput] = useState("");
  const [cepCalculado, setCepCalculado] = useState<string | null>(null);
  const [opcaoFrete, setOpcaoFrete] = useState<string | null>(null);
  const [erroCep, setErroCep] = useState(false);

  const descontoPercent = getDescontoPercent(totalQuantidade);
  const descontoValor = (subtotal * descontoPercent) / 100;
  const proxima = getProximaFaixa(totalQuantidade);

  const freteResult = cepCalculado ? calcularFrete(cepCalculado, subtotal) : null;
  const freteSelecionado =
    freteResult?.opcoes.find((o) => o.nome === opcaoFrete) ?? null;
  const freteValor = freteSelecionado ? freteSelecionado.preco : 0;

  const total = subtotal - descontoValor + freteValor;

  function handleCalcularFrete() {
    const r = calcularFrete(cepInput, subtotal);
    if (!r.cepValido) {
      setErroCep(true);
      setCepCalculado(null);
      return;
    }
    setErroCep(false);
    setCepCalculado(cepInput);
    setOpcaoFrete(r.opcoes[0]?.nome ?? null);
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
    <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
      {/* Itens + frete */}
      <div>
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {items.map((item) => (
            <li key={item.slug + item.tamanho} className="flex gap-4 py-5">
              <Link
                href={`/produto/${item.slug}`}
                className="relative block h-28 w-20 shrink-0 overflow-hidden bg-mist"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <Link
                    href={`/produto/${item.slug}`}
                    className="font-display text-lg leading-tight text-ink transition-colors hover:text-bordo"
                  >
                    {item.nome}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug, item.tamanho)}
                    aria-label="Remover item"
                    className="text-ink/40 transition-colors hover:text-bordo"
                  >
                    ✕
                  </button>
                </div>

                <span className="mt-1 text-xs uppercase tracking-[0.15em] text-ink/45">
                  Tam. {item.tamanho}
                </span>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center border border-ink/20">
                    <button
                      type="button"
                      onClick={() =>
                        updateQty(item.slug, item.tamanho, item.quantidade - 1)
                      }
                      className="px-2.5 py-1.5 text-ink/70 hover:text-ink"
                      aria-label="Diminuir"
                    >
                      −
                    </button>
                    <span className="w-9 text-center text-sm">
                      {item.quantidade}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQty(item.slug, item.tamanho, item.quantidade + 1)
                      }
                      className="px-2.5 py-1.5 text-ink/70 hover:text-ink"
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-ink/80">
                    {formatBRL(item.preco * item.quantidade)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Frete */}
        <div className="mt-8">
          <h2 className="font-display text-2xl font-light">Calcular entrega</h2>
          <p className="mt-2 text-xs text-ink/50">
            Frete econômico grátis acima de {formatBRL(FRETE_GRATIS_MIN)}.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <input
              value={cepInput}
              onChange={(e) => setCepInput(e.target.value)}
              inputMode="numeric"
              placeholder="Seu CEP"
              className="w-40 border border-ink/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-ink"
            />
            <button
              type="button"
              onClick={handleCalcularFrete}
              className="border border-ink px-6 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-bone"
            >
              Calcular
            </button>
          </div>

          {erroCep ? (
            <p className="mt-2 text-xs text-bordo">
              CEP inválido. Digite os 8 números.
            </p>
          ) : null}

          {freteResult ? (
            <div className="mt-4 space-y-2">
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
          ) : null}
        </div>
      </div>

      {/* Resumo */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        {/* Desconto progressivo */}
        <div className="border border-ink/10 p-5">
          <h2 className="font-display text-xl font-light">
            Compre mais, pague menos
          </h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {FAIXAS_DESCONTO.map((f) => {
              const ativa = descontoPercent === f.percent;
              return (
                <li
                  key={f.minPecas}
                  className={cn(
                    "flex justify-between",
                    ativa ? "font-medium text-ink" : "text-ink/50",
                  )}
                >
                  <span>
                    {f.label}
                    {ativa ? " · você está aqui" : ""}
                  </span>
                  <span>{f.percent}%</span>
                </li>
              );
            })}
          </ul>
          {proxima ? (
            <p className="mt-3 text-xs text-bordo">
              Faltam {proxima.minPecas - totalQuantidade}{" "}
              {proxima.minPecas - totalQuantidade === 1 ? "peça" : "peças"} para{" "}
              {proxima.percent}% de desconto.
            </p>
          ) : null}
        </div>

        {/* Totais */}
        <div className="mt-5 border border-ink/10 p-5">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between text-ink/70">
              <dt>
                Subtotal ({totalQuantidade}{" "}
                {totalQuantidade === 1 ? "peça" : "peças"})
              </dt>
              <dd>{formatBRL(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink/70">
              <dt>Desconto{descontoPercent > 0 ? ` (${descontoPercent}%)` : ""}</dt>
              <dd className={descontoValor > 0 ? "text-bordo" : undefined}>
                {descontoValor > 0 ? `− ${formatBRL(descontoValor)}` : formatBRL(0)}
              </dd>
            </div>
            <div className="flex justify-between text-ink/70">
              <dt>Frete</dt>
              <dd>
                {cepCalculado
                  ? freteSelecionado
                    ? freteValor === 0
                      ? "Grátis"
                      : formatBRL(freteValor)
                    : "Selecione"
                  : "—"}
              </dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-medium text-ink">
              <dt>Total</dt>
              <dd>{formatBRL(total)}</dd>
            </div>
          </dl>

          <Link
            href="/checkout"
            className="mt-5 block w-full bg-ink px-8 py-4 text-center text-xs uppercase tracking-[0.2em] text-bone transition-opacity hover:opacity-90"
          >
            Finalizar compra
          </Link>
          <p className="mt-2 text-center text-[11px] text-ink/45">
            Entre ou crie sua conta para finalizar.
          </p>
        </div>
      </aside>
    </div>
  );
}
