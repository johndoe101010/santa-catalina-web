import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/products";
import { Stagger, staggerItem, Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { motion } from "framer-motion";

export function ReviewsSection() {
  return (
    <section id="resenas" className="section-anchor landing-section py-24 lg:py-32">
      <div className="mx-auto max-w-[1360px] px-5">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
          <Reveal direction="left">
            <div className="lg:sticky lg:top-28">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange mb-3">
                Reseñas reales · Google
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black leading-[0.95] text-balance mb-6">
                Lo que dicen <span className="text-orange">los clientes.</span>
              </h2>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display text-7xl font-black text-navy">
                  <CountUp to={4.3} decimals={1} />
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    >
                      <Star className="h-5 w-5 fill-orange text-orange" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Reseñas verificadas de clientes reales de Concepción.</p>
            </div>
          </Reveal>

          <Stagger className="grid items-stretch sm:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => (
              <motion.a
                key={r.name}
                href={r.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir reseña de ${r.name} en Google Maps`}
                variants={staggerItem}
                className="block h-full rounded-3xl bg-card border border-border shadow-soft p-6 hover:shadow-strong transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 overflow-hidden rounded-2xl bg-secondary ring-1 ring-border shadow-soft">
                    <img src={r.avatar} alt={r.name} loading="lazy" className="h-full w-full object-cover object-top" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.date}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-orange text-orange" />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">"{r.text}"</p>
              </motion.a>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
