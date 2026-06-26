"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useCart } from "./CartProvider";

export function CartButton({ className }: { className?: string }) {
  const { totalQuantidade } = useCart();

  return (
    <Link
      href="/carrinho"
      aria-label={`Sacola, ${totalQuantidade} ${totalQuantidade === 1 ? "item" : "itens"}`}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center text-bone transition-colors hover:text-bone/70",
        className,
      )}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <path d="M6 7h12l-1 13H7L6 7Z" strokeLinejoin="round" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      {totalQuantidade > 0 ? (
        <span className="absolute -right-1 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-bordo px-1 text-[10px] font-medium text-bone">
          {totalQuantidade}
        </span>
      ) : null}
    </Link>
  );
}
