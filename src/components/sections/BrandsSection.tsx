import { BRANDS, type Brand } from "@/lib/products";
import { Reveal } from "@/components/motion/Reveal";

const brandCatalogQueries: Record<string, string> = {
  DEWALT: "DeWalt",
  STIHL: "Stihl",
  CORONA: "Corona",
  BAMBI: "Bambi",
  SUVINIL: "Suvinil",
  TRUPER: "Truper",
  HUSQVARNA: "Husqvarna",
  "BELGO ARAMES": "Belgo",
};

const brandCatalogHref = (brand: Brand) => {
  const query = brandCatalogQueries[brand.name] ?? brand.name;
  return `/catalogo?q=${encodeURIComponent(query)}#productos`;
};

export function BrandsSection() {
  return (
    <section
      id="marcas"
      className="section-anchor relative overflow-hidden bg-gradient-navy py-16 text-cream sm:py-20 lg:py-28"
    >
      <div className="relative mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-10">
        <Reveal direction="fade">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <span className="mb-3 inline-block text-xs font-black uppercase tracking-[0.24em] text-orange">
                Marcas colaboradoras
              </span>
              <h2 className="font-display text-balance text-3xl font-black leading-[0.95] sm:text-5xl lg:text-6xl">
                Trabajamos con marcas{" "}
                <span className="text-orange">confiables</span> para cada obra.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream/68 sm:text-base">
                Proveedores y marcas que forman parte del catálogo de Santa
                Catalina. Tocá sobre una marca para ver sus productos
              </p>
            </div>
          </div>
        </Reveal>

        <div
          id="marcas-lista"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
        >
          {BRANDS.map((brand) => (
            <BrandTile key={brand.name} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandTile({ brand }: { brand: Brand }) {
  return (
    <a
      href={brandCatalogHref(brand)}
      title={brand.name}
      aria-label={`Ver productos de ${brand.name}`}
      className="group grid h-[112px] place-items-center rounded-2xl border border-white/12 bg-white/[0.04] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-colors hover:border-orange/70 hover:bg-white/[0.08] sm:h-[136px]"
    >
      <img
        src={brand.logo}
        alt={brand.name}
        loading="lazy"
        className={`h-[76px] w-full object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-[96px] ${brand.imgClass ?? ""}`}
      />
    </a>
  );
}
