"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { SizeId } from "@/lib/brand";
import { cartCount, cartSaving, cartSubtotal, type CartLine } from "@/lib/cart";
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
  updateLines,
} from "@/lib/cart-store";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  saving: number;
  /** False during SSR and the first hydration pass. */
  ready: boolean;
  isOpen: boolean;
  add: (size: SizeId, qty: number) => void;
  setQty: (size: SizeId, qty: number) => void;
  remove: (size: SizeId) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const noopSubscribe = () => () => {};

/** True only after hydration, without touching state in an effect. */
function useIsHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useIsHydrated();
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((size: SizeId, qty: number) => {
    if (qty <= 0) return;
    updateLines((prev) => {
      const existing = prev.find((l) => l.size === size);
      if (!existing) return [...prev, { size, qty }];
      return prev.map((l) => (l.size === size ? { ...l, qty: l.qty + qty } : l));
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((size: SizeId, qty: number) => {
    updateLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.size !== size)
        : prev.map((l) => (l.size === size ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((size: SizeId) => {
    updateLines((prev) => prev.filter((l) => l.size !== size));
  }, []);

  const clear = useCallback(() => updateLines(() => []), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: cartCount(lines),
      subtotal: cartSubtotal(lines),
      saving: cartSaving(lines),
      ready,
      isOpen,
      add,
      setQty,
      remove,
      clear,
      open,
      close,
    }),
    [lines, ready, isOpen, add, setQty, remove, clear, open, close],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
