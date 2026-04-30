import { motion } from "framer-motion";
import heroImg from "@/assets/hero-fachada.jpg";
import { CountUp } from "@/components/motion/CountUp";

const ROTATE = ["construir.", "reparar.", "equipar."];

export function Hero() {
  return (
    <section id="inicio" className="section-anchor landing-section relative isolate min-h-[calc(100vh-80px)] overflow-hidden bg-navy-deep text-white">
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="Fachada de Santa Catalina" className="h-full w-full scale-[1.04] object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,42,.96)_0%,rgba(6,22,79,.84)_44%,rgba(6,22,79,.36)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,10,42,.90)_0%,rgba(2,10,42,.22)_56%,rgba(2,10,42,.50)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[1360px] flex-col justify-center px-5 pb-28 pt-24 lg:pt-28">
        <h1 className="font-display max-w-5xl text-[clamp(3.2rem,7.2vw,7.4rem)] font-black leading-[0.88] tracking-[-0.06em] text-balance drop-shadow-[0_20px_48px_rgba(0,0,0,.35)]">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.08 }}
            className="block text-white"
          >
            Todo para
          </motion.span>
          <span className="relative mt-1 block min-h-[0.98em] overflow-hidden text-orange">
            {ROTATE.map((word, i) => (
              <motion.span
                key={word}
                className="absolute inset-x-0 top-0 block"
                initial={{ y: "-110%", opacity: 0 }}
                animate={{
                  y: ["-110%", "0%", "0%", "110%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: ROTATE.length * 2.55,
                  times: [0, 0.1, 0.28, 0.38],
                  delay: i * 2.55 + 0.3,
                  repeat: Infinity,
                  repeatDelay: 0,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="mt-8 max-w-xl text-base sm:text-lg text-white/78 leading-relaxed"
        >
          Ferretería, obra, hogar, campo y herramientas con un catálogo amplio para armar tu pedido por categoría.
        </motion.p>

      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-navy-deep/62 backdrop-blur-md">
        <div className="mx-auto max-w-[1360px] px-5 grid grid-cols-2 sm:grid-cols-4">
          {[
            { value: "30+", label: "Años en Concepción" },
            { value: "8.000+", label: "Productos" },
            { value: "120+", label: "Marcas" },
            { value: "4.3★", label: "Reseñas Google" },
          ].map((p, i) => (
            <div key={p.label} className={`py-5 sm:py-6 px-3 ${i > 0 ? "border-l border-white/10" : ""}`}>
              <div className="font-display text-xl sm:text-2xl font-black text-white">
                {p.value.includes("+") || p.value.includes("★") ? p.value : <CountUp to={parseInt(p.value)} />}
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-1">{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
