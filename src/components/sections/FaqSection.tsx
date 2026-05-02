import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/products";
import { Reveal } from "@/components/motion/Reveal";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-anchor landing-section py-24 lg:py-32 bg-secondary/40"
    >
      <div className="mx-auto max-w-3xl px-5">
        <Reveal direction="up">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange mb-3">
              Preguntas frecuentes
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-balance">
              Antes de armar <span className="text-orange">tu carrito.</span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} direction="left" delay={i * 0.06}>
                <div
                  className={`border bg-card ${isOpen ? "border-orange shadow-orange" : "border-border shadow-soft"} overflow-hidden transition-all`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  >
                    <span className="font-display font-bold text-base sm:text-lg">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center border border-border bg-secondary transition-transform ${isOpen ? "rotate-45 border-orange bg-orange text-white" : ""}`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 0.61, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-foreground/70 leading-relaxed">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
