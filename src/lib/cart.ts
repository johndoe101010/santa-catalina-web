import { useEffect, useState, useCallback } from "react";
import type { Product } from "./catalog";

export type CartItem = { slug: string; qty: number };

const KEY = "sc_cart_v1";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("sc-cart-change"));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(read());
    const refresh = () => setItems(read());
    window.addEventListener("sc-cart-change", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("sc-cart-change", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const add = useCallback((slug: string, qty = 1) => {
    const cur = read();
    const i = cur.findIndex((x) => x.slug === slug);
    if (i >= 0) cur[i].qty += qty;
    else cur.push({ slug, qty });
    write(cur);
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((x) => x.slug !== slug));
  }, []);

  const setQty = useCallback(
    (slug: string, qty: number) => {
      if (qty <= 0) return remove(slug);
      const cur = read();
      const i = cur.findIndex((x) => x.slug === slug);
      if (i >= 0) {
        cur[i].qty = qty;
        write(cur);
      }
    },
    [remove],
  );

  const clear = useCallback(() => write([]), []);

  const count = items.reduce((s, x) => s + x.qty, 0);
  return { items, add, remove, setQty, clear, count };
}

export function buildWhatsAppMessage(
  items: { product: Product; qty: number }[],
  total: number,
) {
  const lines = [
    "*Pedido — Santa Catalina*",
    "",
    ...items.map(
      (i) =>
        `• ${i.qty}× ${i.product.name} — Gs ${(i.product.price * i.qty).toLocaleString("es-PY")}`,
    ),
    "",
    `*Total: Gs ${total.toLocaleString("es-PY")}*`,
    "",
    "Hola, me gustaría confirmar este pedido. ¿Tienen todo en stock?",
  ];
  return lines.join("\n");
}
