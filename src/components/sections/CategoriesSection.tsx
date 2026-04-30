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
                className="relative block overflow-hidden rounded-3xl bg-card shadow-soft hover:shadow-strong transition-shadow group"
              >
                <div className="relative h-56 sm:h-60 lg:h-52 xl:h-56">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                  <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between text-cream">
                    <div className="flex justify-end">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 backdrop-blur border border-cream/20 transition-all group-hover:bg-orange group-hover:border-orange group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="rounded-2xl bg-navy-deep/42 p-3 ring-1 ring-white/10 backdrop-blur-[2px]">
                      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-cream/60 mb-1.5">
                        {c.count}+ productos
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-black leading-tight">
                        {c.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-cream/70 mt-1">{c.blurb}</p>
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
