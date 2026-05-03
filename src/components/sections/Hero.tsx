import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Award,
  MapPinned,
  Package,
  Star,
} from "lucide-react";
import heroImg from "@/assets/hero-fachada.jpg";
import { Reveal } from "@/components/motion/Reveal";

const stats = [
  {
    value: "20+",
    label: "Años en Concepción",
    text: "Acompañando a familias, constructores y productores desde hace más de 20 años.",
    icon: MapPinned,
  },
  {
    value: "14.000+",
    label: "Productos en stock",
    text: "Todo lo que necesitás, disponible para tu proyecto.",
    icon: Package,
  },
  {
    value: "120+",
    label: "Marcas trabajadas",
    text: "Trabajamos con marcas confiables para garantizar calidad.",
    icon: Award,
  },
  {
    value: "4.3★",
    label: "Reseñas Google",
    text: "La opinión de nuestros clientes nos impulsa a seguir mejorando.",
    icon: Star,
  },
];

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["construir", "reparar", "equipar"], []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setTitleNumber((current) =>
        current === titles.length - 1 ? 0 : current + 1,
      );
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section
      id="inicio"
      className="section-anchor relative isolate overflow-hidden bg-navy-deep text-white"
    >
      <div className="relative min-h-[calc(100svh-360px)] lg:min-h-[calc(100svh-240px)]">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Fachada de Santa Catalina"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,42,.96)_0%,rgba(2,10,42,.78)_33%,rgba(2,10,42,.16)_70%,rgba(2,10,42,.02)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,10,42,.52)_0%,rgba(2,10,42,.18)_46%,rgba(2,10,42,.08)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-360px)] max-w-[1536px] flex-col justify-center px-5 pb-12 pt-10 sm:px-8 lg:min-h-[calc(100svh-240px)] lg:px-12">
          <Reveal direction="left" className="max-w-3xl">
            <h1 className="font-display text-balance text-5xl font-black leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-8xl">
              <span className="block">Todo para</span>
              <span className="relative block h-[1em] overflow-hidden text-orange">
                {titles.map((title, index) => (
                  <motion.span
                    key={title}
                    className="absolute inset-0 block"
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={
                      titleNumber === index
                        ? { opacity: 1, y: 0 }
                        : {
                            opacity: 0,
                            y: titleNumber > index ? "-150%" : "150%",
                          }
                    }
                    transition={{ type: "spring", stiffness: 50 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/84 sm:text-xl">
              Ferretería, obra, hogar, campo y herramientas con un catálogo
              amplio para armar tu pedido por categoría.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/catalogo"
                onClick={(event) => {
                  event.preventDefault();
                  window.location.assign("/catalogo");
                }}
                className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-[#f6b800] px-8 font-display text-sm font-black text-navy-deep shadow-orange transition-colors hover:bg-orange hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/30"
              >
                Ver catálogo <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#categorias"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-lg border border-white/28 bg-white/8 px-8 font-display text-sm font-black text-white transition-colors hover:border-orange hover:bg-orange hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/30"
              >
                Explorar categorías <ArrowDown className="h-5 w-5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="bg-navy-deep">
        <div className="mx-auto grid max-w-[1536px] grid-cols-2 divide-x divide-y divide-white/10 px-5 lg:grid-cols-4 lg:divide-y-0">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="grid grid-cols-[40px_1fr] gap-3 px-2 py-4 sm:grid-cols-[48px_1fr] sm:px-6 lg:gap-4 lg:px-8"
              >
                <Icon
                  className="mt-1 h-9 w-9 text-orange sm:h-10 sm:w-10"
                  strokeWidth={1.8}
                />
                <div>
                  <div className="font-display text-2xl font-black leading-none text-white sm:text-3xl">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs font-black uppercase tracking-[0.08em] text-white">
                    {item.label}
                  </div>
                  <p className="mt-1 max-w-[28ch] text-xs leading-snug text-white/60 sm:text-sm">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
