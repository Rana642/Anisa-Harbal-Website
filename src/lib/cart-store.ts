import type { CartLine } from "./cart";

/**
 * The cart lives in localStorage, which makes it an external store rather than
 * React state. Modelling it as one (rather than syncing it in an effect) means
 * the server renders an empty cart, hydration matches, and React swaps in the
 * real contents on its own — no flash, no mismatch, no cascading render.
 */

const STORAGE_KEY = "anisa-cart-v1";

/** Stable empty reference — getSnapshot must not return a new array each call. */
const EMPTY: CartLine[] = [];

let snapshot: CartLine[] | null = null;
const listeners = new Set<() => void>();

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null) return false;
  const line = value as Record<string, unknown>;
  return (
    (line.size === "100ml" || line.size === "150ml") &&
    typeof line.qty === "number" &&
    Number.isFinite(line.qty) &&
    line.qty > 0
  );
}

function read(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const lines = parsed.filter(isCartLine);
    return lines.length > 0 ? lines : EMPTY;
  } catch {
    // Private mode, blocked storage, corrupt value — start empty.
    return EMPTY;
  }
}

function notify() {
  for (const listener of listeners) listener();
}

export function getSnapshot(): CartLine[] {
  if (snapshot === null) snapshot = read();
  return snapshot;
}

export function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  // Keep two open tabs in step with each other.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    snapshot = read();
    notify();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function updateLines(updater: (previous: CartLine[]) => CartLine[]): void {
  const next = updater(getSnapshot());
  snapshot = next.length > 0 ? next : EMPTY;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Storage unavailable — the cart still works for this page session.
  }
  notify();
}
