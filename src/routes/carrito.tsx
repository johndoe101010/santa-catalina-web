import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart, buildWhatsAppMessage } from "@/lib/cart";
import { PRODUCTS, formatGs } from "@/lib/products";
import { canonicalUrl, waUrl } from "@/lib/site";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Mi carrito — Santa Catalina" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/carrito") }],
  }),
  component: Cart,
});

function Cart() {
  const { items, setQty, remove, clear } = useCart();
  const detailed = items
    .map((i) => ({ product: PRODUCTS.find((p) => p.slug === i.slug)!, qty: i.qty }))
    .filter((x) => x.product);
  const total = detailed.reduce((s, x) => s + x.product.price * x.qty, 0);

  return (
    <div className="pt-12 pb-24 min-h-[60vh]">
      <div className="mx-auto max-w-[1100px] px-5">
        <h1 className="font-display text-4xl sm:text-5xl font-black mb-10">Mi carrito</h1>

        {detailed.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-card border border-border">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">Tu carrito está vacío.</p>
            <Link to="/catalogo" className="inline-flex items-center gap-2 rounded-full bg-gradient-orange text-white font-bold px-6 py-3 shadow-orange">
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8">
            <div className="space-y-3">
              {detailed.map(({ product, qty }) => (
                <div key={product.slug} className="flex gap-4 p-4 rounded-2xl bg-card border border-border shadow-soft transition-shadow hover:shadow-strong">
                  <Link to="/producto/$slug" params={{ slug: product.slug }} className="grid h-24 w-24 shrink-0 place-items-center bg-white p-0 transition-transform hover:scale-[1.02]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-contain bg-white" />
                  </Link>
                  <Link to="/producto/$slug" params={{ slug: product.slug }} className="flex-1 min-w-0 group">
                    <div className="text-[10px] uppercase tracking-widest text-orange font-bold">{product.brand}</div>
                    <div className="font-display font-bold text-sm leading-tight mb-2 group-hover:text-orange transition-colors">{product.name}</div>
                    <div className="font-display font-black">{formatGs(product.price * qty)}</div>
                    <div className="mt-2 text-[11px] font-bold text-muted-foreground group-hover:text-orange">Ver producto</div>
                  </Link>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => remove(product.slug)} className="text-muted-foreground hover:text-destructive" aria-label={`Quitar ${product.name}`}><Trash2 className="h-4 w-4" /></button>
                    <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
                      <button onClick={() => setQty(product.slug, qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-card" aria-label="Restar unidad"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-sm font-bold">{qty}</span>
                      <button onClick={() => setQty(product.slug, qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-card" aria-label="Sumar unidad"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={clear}
                className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-5 py-3 text-sm font-black text-destructive shadow-soft transition-all hover:-translate-y-0.5 hover:bg-destructive hover:text-white hover:shadow-strong"
              >
                <Trash2 className="h-4 w-4" /> Vaciar carrito
              </button>
            </div>

            <aside className="rounded-3xl bg-gradient-navy text-cream p-8 shadow-strong h-fit lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-black mb-6">Resumen</h2>
              <div className="space-y-2 text-sm pb-5 mb-5 border-b border-cream/15">
                <div className="flex justify-between"><span className="text-cream/70">Productos</span><span>{detailed.length}</span></div>
                <div className="flex justify-between"><span className="text-cream/70">Unidades</span><span>{detailed.reduce((s, x) => s + x.qty, 0)}</span></div>
              </div>
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-cream/70">Total</span>
                <span className="font-display text-3xl font-black">{formatGs(total)}</span>
              </div>
              <a
                href={waUrl(buildWhatsAppMessage(detailed, total))}
                target="_blank"
                rel="noopener"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp text-navy-deep font-bold px-6 py-4 shadow-strong hover:-translate-y-0.5 transition-transform"
              >
                <WhatsAppIcon className="h-5 w-5" /> Confirmar por WhatsApp
              </a>
              <p className="text-[11px] text-cream/60 text-center mt-4">Coordinás pago y entrega directamente con el local.</p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
