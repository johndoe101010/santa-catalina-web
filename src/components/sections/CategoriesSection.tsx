import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/products";
import { Stagger, staggerItem, Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";

export function CategoriesSection() {
  return (
    <section id="categorias" className="section-anchor landing-section py-20 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-5">
        <Reveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange mb-3">
                Categorías
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] text-balance">
                Explorá por <span className="text-orange">categoría.</span>
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-orange transition-colors group"
            >
              Ver catálogo completo
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CATEGORIES.slice(0, 12).map((c) => (
            <motion.div key={c.slug} variants={staggerItem}>
              <Link
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="group relative block overflow-hidden rounded-[1.35rem] border border-navy/10 bg-card shadow-soft outline-none transition-all duration-300 hover:-translate-y-1 hover:border-orange/45 hover:shadow-strong focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <div className="relative h-[235px] sm:h-[270px] lg:h-[255px] xl:h-[285px]">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/82 via-navy-deep/22 to-transparent" />
                  <div className="pointer-events-none absolute inset-2 rounded-[1rem] border border-cream/45 shadow-[inset_0_0_0_1px_hsl(var(--navy-deep)/0.2)]" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 text-cream sm:p-5">
                    <div className="flex items-start justify-end gap-3">
                      <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/35 bg-cream/12 backdrop-blur transition-all group-hover:bg-orange group-hover:border-orange group-hover:rotate-45 sm:grid">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="max-w-[92%] rounded-[1.25rem] bg-[linear-gradient(90deg,rgba(2,10,42,0.50)_0%,rgba(2,10,42,0.34)_62%,rgba(2,10,42,0.08)_100%)] px-3 py-2 shadow-[0_14px_34px_rgba(2,10,42,0.18)] sm:max-w-[88%] sm:bg-[linear-gradient(90deg,rgba(2,10,42,0.40)_0%,rgba(2,10,42,0.24)_64%,rgba(2,10,42,0.04)_100%)] sm:px-4 sm:py-3">
                      <h3 className="font-display text-xl font-black leading-tight sm:text-2xl">
                        {c.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-cream/80 sm:text-sm">
                        {c.blurb}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
