import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, buildWhatsAppMessage } from "@/lib/cart";
import { PRODUCTS, formatGs } from "@/lib/catalog";
import { canonicalUrl, SITE, waUrl } from "@/lib/site";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Carrito - Santa Catalina" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/carrito") }],
  }),
  component: Cart,
});

function Cart() {
  const { items, setQty, remove, clear } = useCart();
  const [delivery, setDelivery] = useState("Retiro en tienda");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const detailed = items
    .map((item) => ({
      product: PRODUCTS.find((product) => product.slug === item.slug),
      qty: item.qty,
    }))
    .filter(
      (item): item is { product: (typeof PRODUCTS)[number]; qty: number } =>
        Boolean(item.product),
    );
  const total = detailed.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );
  const units = detailed.reduce((sum, item) => sum + item.qty, 0);
  const whatsappMessage = [
    buildWhatsAppMessage(detailed, total),
    "",
    "*Datos de contacto*",
    `Nombre: ${customerName.trim() || "A completar"}`,
    `Teléfono: ${customerPhone.trim() || "A completar"}`,
    `Entrega: ${delivery}`,
    `Observaciones: ${notes.trim() || "Sin observaciones"}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="min-h-[60vh] pb-24">
      <section className="border-b border-border bg-cream py-10 sm:py-14">
        <div className="mx-auto max-w-[1360px] px-5">
          <span className="text-xs font-black uppercase tracking-[0.24em] text-orange">
            Tu pedido
          </span>
          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-4xl font-black leading-none text-foreground sm:text-6xl">
                Carrito
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Revisá cantidades, coordiná retiro o envío y finalizá el pedido
                por WhatsApp con el local.
              </p>
            </div>
            <Link
              to="/catalogo"
              className="inline-flex h-12 items-center justify-center border border-navy bg-navy px-5 text-sm font-black text-white transition-colors hover:border-orange hover:bg-orange"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1360px] px-5 py-10">
        {detailed.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-soft">
            <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-6 text-muted-foreground">Tu carrito está vacío.</p>
            <Link
              to="/catalogo"
              className="inline-flex h-12 items-center justify-center border border-orange bg-orange px-6 text-sm font-black text-white shadow-orange transition-colors hover:border-navy hover:bg-navy"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <div className="grid grid-cols-[1fr_120px_140px_120px_48px] border-b border-border bg-secondary px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-muted-foreground max-lg:hidden">
                <span>Producto</span>
                <span>Precio</span>
                <span>Cantidad</span>
                <span>Subtotal</span>
                <span />
              </div>

              {detailed.map(({ product, qty }) => (
                <div
                  key={product.slug}
                  className="grid gap-4 border-b border-border p-4 last:border-b-0 lg:grid-cols-[1fr_120px_140px_120px_48px] lg:items-center lg:px-5"
                >
                  <div className="grid min-w-0 grid-cols-[92px_1fr] gap-4">
                    <Link
                      to="/producto/$slug"
                      params={{ slug: product.slug }}
                      className="grid h-24 overflow-hidden rounded-xl border border-border bg-white p-2"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full rounded-lg object-contain"
                      />
                    </Link>
                    <div className="min-w-0">
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-orange">
                        {product.category}
                      </div>
                      <Link
                        to="/producto/$slug"
                        params={{ slug: product.slug }}
                        className="font-display mt-1 block line-clamp-2 font-black leading-tight transition-colors hover:text-orange"
                      >
                        {product.name}
                      </Link>
                      <div className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        {product.brand}
                      </div>
                    </div>
                  </div>

                  <div className="font-display font-black text-foreground lg:text-sm">
                    {formatGs(product.price)}
                  </div>

                  <div className="flex h-10 w-36 overflow-hidden rounded-xl border border-input bg-background">
                    <button
                      onClick={() => setQty(product.slug, qty - 1)}
                      className="grid w-10 place-items-center border-r border-input hover:text-orange"
                      aria-label="Restar unidad"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="grid flex-1 place-items-center text-sm font-black">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(product.slug, qty + 1)}
                      className="grid w-10 place-items-center border-l border-input hover:text-orange"
                      aria-label="Sumar unidad"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="font-display font-black text-orange">
                    {formatGs(product.price * qty)}
                  </div>

                  <button
                    onClick={() => remove(product.slug)}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                    aria-label={`Quitar ${product.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
                <button
                  onClick={clear}
                  className="inline-flex h-11 items-center justify-center gap-2 border border-destructive bg-destructive px-5 text-sm font-black text-white transition-colors hover:border-navy hover:bg-navy"
                >
                  <Trash2 className="h-4 w-4" /> Vaciar carrito
                </button>
                <Link
                  to="/catalogo"
                  className="text-sm font-black text-orange transition-colors hover:text-navy"
                >
                  Agregar más productos
                </Link>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-black text-foreground">
                Resumen del pedido
              </h2>

              <div className="mt-6 space-y-3 border-b border-border pb-5 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Productos</span>
                  <span className="font-bold">{detailed.length}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Unidades</span>
                  <span className="font-bold">{units}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold">{formatGs(total)}</span>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <label className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-bold">
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === "Retiro en tienda"}
                    onChange={() => setDelivery("Retiro en tienda")}
                    className="accent-orange"
                  />
                  Retiro en tienda
                </label>
                <label className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-bold">
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === "Coordinar envío"}
                    onChange={() => setDelivery("Coordinar envío")}
                    className="accent-orange"
                  />
                  Coordinar envío
                </label>
              </div>

              <div className="mt-5 grid gap-3">
                <label className="grid gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">
                  Nombre
                  <input
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    className="h-12 rounded-xl border border-input bg-background px-4 text-sm font-semibold normal-case tracking-normal text-foreground outline-none focus:border-orange"
                    placeholder="Nombre y apellido"
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">
                  Teléfono
                  <input
                    value={customerPhone}
                    onChange={(event) => setCustomerPhone(event.target.value)}
                    className="h-12 rounded-xl border border-input bg-background px-4 text-sm font-semibold normal-case tracking-normal text-foreground outline-none focus:border-orange"
                    placeholder="0986 000 000"
                    inputMode="tel"
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">
                  Observaciones
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    className="min-h-24 resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm font-semibold normal-case tracking-normal text-foreground outline-none focus:border-orange"
                    placeholder="Ej.: necesito retirar por la tarde, confirmar stock o coordinar envío."
                  />
                </label>
                <p className="rounded-xl border border-border bg-secondary/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  Si tenés una promoción vigente, mencionála al enviar el pedido
                  por WhatsApp para que el equipo la confirme.
                </p>
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                <span className="text-sm font-bold text-muted-foreground">
                  Total
                </span>
                <span className="font-display text-3xl font-black text-orange">
                  {formatGs(total)}
                </span>
              </div>

              <a
                href={waUrl(whatsappMessage)}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 border border-whatsapp bg-whatsapp px-6 text-sm font-black text-navy-deep shadow-strong transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5" /> Enviar pedido por WhatsApp
              </a>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
                Coordinás pago, stock y entrega directamente con {SITE.name}.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
