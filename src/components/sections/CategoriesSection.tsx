import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/products";

export function CategoriesSection() {
  return (
    <section
      id="categorias"
      className="section-anchor bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-10">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="mb-4 block text-xs font-black uppercase tracking-[0.22em] text-orange">
              Categorías
            </span>
            <h2 className="font-display text-balance text-4xl font-black leading-[0.95] text-navy-deep sm:text-6xl">
              Explorá por <span className="text-orange">categoría</span>
            </h2>
          </div>
          <Link
            to="/catalogo"
            search={{ q: "", categoria: "todos" }}
            className="inline-flex w-fit items-center gap-3 font-display text-sm font-black text-navy-deep transition-colors hover:text-orange"
          >
            Ver catálogo completo <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.slice(0, 9).map((category) => (
            <Link
              key={category.slug}
              to="/categoria/$slug"
              params={{ slug: category.slug }}
              className="group relative block h-[220px] overflow-hidden bg-navy-deep shadow-soft outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-orange/30 sm:h-[250px] lg:h-[235px] xl:h-[255px]"
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 h-[44%] bg-[linear-gradient(0deg,rgba(2,10,42,.94)_0%,rgba(2,10,42,.68)_55%,rgba(2,10,42,0)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,42,.10)_0%,rgba(2,10,42,0)_42%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <h3 className="font-display text-2xl font-black leading-tight text-white drop-shadow-[0_10px_24px_rgba(0,0,0,.45)]">
                  {category.name}
                </h3>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-transparent text-[#f6b800] transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
