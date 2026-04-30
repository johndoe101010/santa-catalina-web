import { BRANDS, type Brand } from "@/lib/products";
import { Reveal } from "@/components/motion/Reveal";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const cleanUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");

export function BrandsSection() {
  return (
    <section id="marcas" className="section-anchor landing-section relative overflow-hidden bg-gradient-navy py-16 text-cream sm:py-20 lg:py-32">
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative w-full">
        <div className="relative mx-auto max-w-[1360px] px-5">
        <Reveal direction="up">
          <div className="max-w-3xl mb-8 sm:mb-14">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-orange mb-3">
              Marcas colaboradoras
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black leading-[0.95] text-balance">
              Trabajamos con marcas <span className="text-orange">confiables</span> para cada obra.
            </h2>
            <p className="mt-5 hidden max-w-2xl text-sm sm:block sm:text-base leading-relaxed text-cream/68">
              Proveedores y marcas que forman parte del catálogo de Santa Catalina. Pasá el cursor por cada logo para visitar su sitio oficial.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream/68 sm:hidden">
              Proveedores y marcas que forman parte del catalogo de Santa Catalina. Toca cada logo para visitar su sitio oficial.
            </p>
          </div>
        </Reveal>
      </div>

        <div className="relative mt-6 sm:mt-8">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-navy-deep to-transparent sm:w-40" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-navy-deep to-transparent sm:w-40" />
        
        <div className="flex overflow-hidden py-3 sm:py-4">
          <motion.div
            className="flex w-max"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            <BrandStrip brands={BRANDS} />
            <BrandStrip brands={BRANDS} ariaHidden />
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
}

function BrandStrip({ brands, ariaHidden = false }: { brands: Brand[]; ariaHidden?: boolean }) {
  return (
    <div className="brand-strip flex shrink-0 gap-3 pr-3 sm:gap-6 sm:pr-6" aria-hidden={ariaHidden}>
      {brands.map((brand) => (
        <a
          key={`${brand.name}-${ariaHidden ? "clone" : "main"}`}
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${brand.name} — ${brand.url}`}
          aria-label={`Abrir sitio oficial de ${brand.name}`}
          className="group relative grid h-[104px] w-[176px] shrink-0 place-items-center overflow-hidden rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-[0_8px_40px_0_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange sm:h-[140px] sm:w-[260px] sm:rounded-[24px] sm:p-5"
        >
          {/* Subtle lighting reflection */}
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
          
          <img
            src={brand.logo}
            alt={brand.name}
            loading="lazy"
            className={`relative z-[1] h-[78px] w-[148px] object-contain object-center opacity-85 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0 sm:h-[110px] sm:w-[220px] sm:opacity-40 sm:grayscale ${brand.imgClass || 'group-hover:scale-[1.08]'}`}
          />
          <span className="absolute inset-x-3 bottom-3 z-[2] hidden translate-y-3 items-center justify-center gap-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[10px] font-black tracking-wide text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
            <span className="truncate">{cleanUrl(brand.url)}</span>
            <ExternalLink className="h-3 w-3 shrink-0" />
          </span>
        </a>
      ))}
    </div>
  );
}
