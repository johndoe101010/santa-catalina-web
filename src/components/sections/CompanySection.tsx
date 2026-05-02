import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import interior from "@/assets/empresa-interior.png";
import { waUrl } from "@/lib/site";

const STATS = [
  { value: 20, suffix: "+", label: "Años de experiencia" },
  { value: 14000, suffix: "+", label: "Productos en stock" },
  { value: 120, suffix: "+", label: "Marcas trabajadas" },
  { value: 12000, suffix: "+", label: "Clientes" },
];

export function CompanySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="empresa"
      ref={ref}
      className="section-anchor flex min-h-[calc(100vh-80px)] items-center overflow-hidden py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1360px] px-5 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <div className="relative aspect-[4/5] max-h-[620px] overflow-hidden border border-border shadow-strong lg:h-[min(68vh,620px)] lg:aspect-auto">
          <motion.img
            style={{ y: imgY }}
            src={interior}
            alt="Interior de Santa Catalina"
            loading="lazy"
            className="absolute inset-0 h-[115%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-cream">
            <div className="text-xs uppercase tracking-widest opacity-70 mb-1">
              Nuestro local
            </div>
            <div className="font-display font-bold text-xl">
              Av. Pinedo, Concepción
            </div>
          </div>
        </div>

        <div>
          <Reveal direction="right">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange mb-3">
              La empresa
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] text-balance mb-6">
              Una tienda local con{" "}
              <span className="text-orange">presencia real.</span>
            </h2>
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed mb-10 text-pretty">
              Desde hace más de 20 años acompañamos a familias, constructores y
              productores de Concepción. Somos un equipo que conoce a sus
              clientes por nombre y que recomienda lo que realmente sirve para
              cada trabajo.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {STATS.map((s, i) => (
              <Reveal key={s.label} direction="up" delay={i * 0.1}>
                <div className="relative pl-5">
                  <span className="absolute bottom-2 left-0 top-2 w-1 bg-gradient-orange" />
                  <div className="font-display text-3xl sm:text-4xl font-black text-navy">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1 uppercase tracking-wider font-medium">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/catalogo"
              className="inline-flex h-12 items-center justify-center border border-navy bg-navy px-6 text-sm font-black text-white transition-colors hover:border-orange hover:bg-orange"
            >
              Ver catalogo
            </Link>
            <a
              href={waUrl("Hola, quiero contactar con Santa Catalina.")}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center justify-center border border-orange bg-orange px-6 text-sm font-black text-white transition-colors hover:border-navy hover:bg-navy"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
