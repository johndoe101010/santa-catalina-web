import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import { PRODUCTS, formatGs } from "@/lib/products";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturedProducts() {
  const featured = PRODUCTS.filter((p) => p.featured);

  return (
    <section id="destacados" className="section-anchor landing-section py-16 sm:py-20 lg:py-32 bg-gradient-navy text-cream relative overflow-hidden">
      <div className="relative mx-auto max-w-[1360px] px-5">
        <Reveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange mb-3">
                Destacados
              </span>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black leading-[0.95] text-cream text-balance">
                Lo que más <span className="text-orange">se mueve esta semana.</span>
              </h2>
            </div>
            <Link to="/catalogo" className="inline-flex items-center gap-2 text-sm font-bold text-cream hover:text-orange transition-colors group">
              Ver todo el catálogo
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {featured.map((p, index) => (
            <Link key={p.slug} to="/producto/$slug" params={{ slug: p.slug }} className="group block rounded-2xl bg-white text-navy overflow-hidden shadow-strong transition-transform hover:-translate-y-1 sm:rounded-3xl">
                <div className="relative aspect-square overflow-hidden bg-white">
                  <img
                    src={`/products/featured/${p.slug}.jpg`}
                    alt={p.name}
                    loading={index < 4 ? "eager" : "lazy"}
                    fetchPriority={index < 4 ? "high" : "low"}
                    decoding="async"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-full w-full object-contain bg-white p-3 transition-transform duration-500 group-hover:scale-105 sm:p-4"
                  />
                  {p.oldPrice && (
                    <span className="absolute left-2 top-2 rounded-full bg-orange px-2 py-1 text-[9px] font-black text-white shadow-orange sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">
                      OFERTA
                    </span>
                  )}
                  {p.stock === "ultimas" && (
                    <span className="absolute right-2 top-2 rounded-full bg-navy px-2 py-1 text-[9px] font-bold text-cream sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">
                      Últimas unidades
                    </span>
                  )}
                </div>
                <div className="p-3 sm:p-5">
                  <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-orange sm:mb-2">{p.brand}</div>
                  <h3 className="font-display mb-2 min-h-[2.6em] line-clamp-2 text-sm font-bold leading-tight sm:mb-3 sm:text-base">{p.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display text-base font-black sm:text-xl">{formatGs(p.price)}</span>
                    {p.oldPrice && <span className="text-xs text-muted-foreground line-through">{formatGs(p.oldPrice)}</span>}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-navy transition-colors group-hover:text-orange sm:gap-2 sm:text-xs">
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Ver producto
                  </span>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
