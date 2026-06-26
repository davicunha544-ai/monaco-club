"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  slug: string;
  nome: string;
  preco: number;
  imagem: string;
  tamanho: string;
  quantidade: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, tamanho: string) => void;
  updateQty: (slug: string, tamanho: string, quantidade: number) => void;
  clear: () => void;
  totalQuantidade: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "monaco-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Carrega do localStorage no mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // ignora dados corrompidos
    }
    setHydrated(true);
  }, []);

  // Persiste a cada mudança (depois de hidratar).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // armazenamento indisponível
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const i = prev.findIndex(
        (x) => x.slug === item.slug && x.tamanho === item.tamanho,
      );
      if (i >= 0) {
        const copia = [...prev];
        copia[i] = {
          ...copia[i],
          quantidade: copia[i].quantidade + item.quantidade,
        };
        return copia;
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((slug: string, tamanho: string) => {
    setItems((prev) =>
      prev.filter((x) => !(x.slug === slug && x.tamanho === tamanho)),
    );
  }, []);

  const updateQty = useCallback(
    (slug: string, tamanho: string, quantidade: number) => {
      setItems((prev) =>
        prev.map((x) =>
          x.slug === slug && x.tamanho === tamanho
            ? { ...x, quantidade: Math.max(1, quantidade) }
            : x,
        ),
      );
    },
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const totalQuantidade = useMemo(
    () => items.reduce((soma, x) => soma + x.quantidade, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((soma, x) => soma + x.preco * x.quantidade, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      totalQuantidade,
      subtotal,
    }),
    [items, addItem, removeItem, updateQty, clear, totalQuantidade, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>.");
  return ctx;
}
