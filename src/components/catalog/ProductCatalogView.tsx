import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle,
  Grid3X3,
  Headphones,
  List,
  LockKeyhole,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
} from "lucide-react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { useCart } from "@/lib/cart";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/products";
import { waUrl } from "@/lib/site";

type CatalogViewProps = {
  initialQuery?: string;
  initialCategory?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
};

type SortMode =
  | "relevancia"
  | "recientes"
  | "precio-asc"
  | "precio-desc"
  | "nombre";
type ViewMode = "grid" | "list";
type Availability = "todos" | Product["stock"];

const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const searchTokens = (query: string) =>
  Array.from(
    new Set(
      normalizeSearchText(query)
        .split(" ")
        .map((token) => token.trim())
        .filter((token) => token.length > 1)
        .flatMap((token) => {
          const forms = [token];
          if (token.endsWith("es") && token.length > 4)
            forms.push(token.slice(0, -2));
          if (token.endsWith("s") && token.length > 3)
            forms.push(token.slice(0, -1));
          return forms;
        }),
    ),
  );

const productSearchScore = (product: Product, query: string) => {
  const normalizedQuery = normalizeSearchText(query);
  const tokens = searchTokens(query);
  if (!normalizedQuery || tokens.length === 0) return 1;

  const name = normalizeSearchText(product.name);
  const brand = normalizeSearchText(product.brand);
  const category = normalizeSearchText(product.category);
  const slug = normalizeSearchText(product.slug);
  const details = normalizeSearchText(
    `${product.description} ${product.features.join(" ")}`,
  );
  const haystack = `${name} ${brand} ${category} ${slug} ${details}`;

  let score = 0;
  if (name.includes(normalizedQuery)) score += 90;
  if (slug.includes(normalizedQuery)) score += 80;
  if (brand.includes(normalizedQuery)) score += 45;
  if (category.includes(normalizedQuery)) score += 35;

  for (const token of tokens) {
    if (name.includes(token)) score += 18;
    else if (slug.includes(token)) score += 14;
    else if (brand.includes(token) || category.includes(token)) score += 10;
    else if (haystack.includes(token)) score += 4;
  }

  return score;
};

const productIndex = new Map(
  PRODUCTS.map((product, index) => [product.slug, index]),
);

const trustItems = [
  {
    label: "Productos 100% originales",
    text: "Calidad garantizada",
    icon: ShieldCheck,
  },
  { label: "Envíos a todo el país", text: "Rápido y seguro", icon: Truck },
  {
    label: "Asesoramiento experto",
    text: "Estamos para ayudarte",
    icon: Headphones,
  },
  {
    label: "Pagos seguros",
    text: "Múltiples medios de pago",
    icon: LockKeyhole,
  },
];

export function ProductCatalogView({
  initialQuery = "",
  initialCategory = "todos",
  title = "Catálogo",
  eyebrow = "Productos",
  description = "Explorá productos de ferretería, obra, hogar y campo con filtros rápidos para armar tu pedido.",
}: CatalogViewProps) {
  const { add } = useCart();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory || "todos");
  const [brand, setBrand] = useState("todas");
  const [availability, setAvailability] = useState<Availability>("todos");
  const [sort, setSort] = useState<SortMode>("relevancia");
  const [view, setView] = useState<ViewMode>("grid");
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => setQuery(initialQuery), [initialQuery]);
  useEffect(() => setCategory(initialCategory || "todos"), [initialCategory]);

  const brands = useMemo(
    () =>
      Array.from(new Set(PRODUCTS.map((product) => product.brand))).sort(
        (a, b) => a.localeCompare(b, "es"),
      ),
    [],
  );

  const filtered = useMemo(() => {
    return PRODUCTS.map((product) => ({
      product,
      score: productSearchScore(product, query),
    }))
      .filter(({ product, score }) => {
        if (category !== "todos" && product.categorySlug !== category)
          return false;
        if (brand !== "todas" && product.brand !== brand) return false;
        if (availability !== "todos" && product.stock !== availability)
          return false;
        if (query.trim() && score <= 0) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === "precio-asc") return a.product.price - b.product.price;
        if (sort === "precio-desc") return b.product.price - a.product.price;
        if (sort === "nombre")
          return a.product.name.localeCompare(b.product.name, "es");
        if (sort === "recientes")
          return (
            (productIndex.get(b.product.slug) ?? 0) -
            (productIndex.get(a.product.slug) ?? 0)
          );
        return b.score - a.score;
      })
      .map(({ product }) => product);
  }, [availability, brand, category, query, sort]);

  const handleAdd = (product: Product, quantity = 1) => {
    add(product.slug, quantity);
    setAddedSlug(product.slug);
    window.setTimeout(
      () =>
        setAddedSlug((current) => (current === product.slug ? null : current)),
      1250,
    );
    toast.success(`${quantity} x ${product.name} agregado al carrito`, {
      icon: <CheckCircle className="h-7 w-7 text-whatsapp" />,
      duration: 2600,
      className: "cart-success-toast",
    });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("todos");
    setBrand("todas");
    setAvailability("todos");
    setSort("relevancia");
  };

  return (
    <div className="bg-background pb-16">
      <section className="mx-auto max-w-[1536px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.24em] text-orange">
              {eyebrow}
            </span>
            <h1 className="font-display mt-3 text-5xl font-black leading-none text-navy-deep sm:text-7xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="grid gap-3">
            <a
              href={waUrl(
                "Hola, quiero recibir asesoramiento para elegir productos del catálogo.",
              )}
              target="_blank"
              rel="noopener"
              className="inline-flex h-13 items-center justify-between rounded-lg bg-orange px-5 font-display text-sm font-black text-white transition-colors hover:bg-navy"
            >
              Pedir asesoramiento <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-3">
          <button
            type="button"
            onClick={() => setCategory("todos")}
            className={`h-11 shrink-0 rounded-lg px-5 font-display text-sm font-black transition-colors ${
              category === "todos"
                ? "bg-orange text-white shadow-orange"
                : "border border-border bg-white text-navy-deep hover:border-orange hover:text-orange"
            }`}
          >
            Todos
          </button>
          {CATEGORIES.slice(0, 9).map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setCategory(item.slug)}
              className={`h-11 shrink-0 rounded-lg px-5 font-display text-sm font-black transition-colors ${
                category === item.slug
                  ? "bg-orange text-white shadow-orange"
                  : "border border-border bg-white text-navy-deep hover:border-orange hover:text-orange"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-border bg-white p-4 shadow-soft">
          <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_120px_96px]">
            <label className="relative block">
              <span className="sr-only">Buscar productos</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-12 w-full rounded-md border border-input bg-background pl-11 pr-4 text-sm font-semibold outline-none transition-colors placeholder:text-muted-foreground focus:border-orange"
                placeholder="Buscar por producto, marca o uso"
                type="search"
              />
            </label>

            <button
              type="button"
              onClick={() => setFiltersOpen((value) => !value)}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-md border font-display text-sm font-black transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/20 ${
                filtersOpen
                  ? "border-orange bg-orange text-white"
                  : "border-navy bg-white text-navy-deep hover:border-orange hover:text-orange"
              }`}
              aria-expanded={filtersOpen}
            >
              <SlidersHorizontal className="h-4 w-4" /> Filtros
            </button>

            <div className="flex h-12 overflow-hidden rounded-md border border-input bg-background">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`grid w-12 place-items-center transition-colors ${view === "grid" ? "bg-navy text-white" : "hover:text-orange"}`}
                aria-label="Ver en recuadros"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`grid w-12 place-items-center border-l border-input transition-colors ${
                  view === "list" ? "bg-navy text-white" : "hover:text-orange"
                }`}
                aria-label="Ver en lista"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <div
              className={`${filtersOpen ? "grid" : "hidden"} col-span-full gap-3 lg:grid lg:grid-cols-[minmax(180px,1fr)_minmax(170px,1fr)_minmax(160px,1fr)_minmax(180px,1fr)]`}
            >
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 rounded-md border border-input bg-background px-4 text-sm font-bold outline-none focus:border-orange"
                aria-label="Filtrar por categoría"
              >
                <option value="todos">Todas las categorías</option>
                {CATEGORIES.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                className="h-12 rounded-md border border-input bg-background px-4 text-sm font-bold outline-none focus:border-orange"
                aria-label="Filtrar por marca"
              >
                <option value="todas">Todas las marcas</option>
                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={availability}
                onChange={(event) =>
                  setAvailability(event.target.value as Availability)
                }
                className="h-12 rounded-md border border-input bg-background px-4 text-sm font-bold outline-none focus:border-orange"
                aria-label="Filtrar por disponibilidad"
              >
                <option value="todos">Disponibilidad</option>
                <option value="disponible">En stock</option>
                <option value="ultimas">Últimas unidades</option>
                <option value="consultar">Consultar stock</option>
              </select>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
                className="h-12 rounded-md border border-input bg-background px-4 text-sm font-bold outline-none focus:border-orange"
                aria-label="Ordenar productos"
              >
                <option value="relevancia">Más relevante</option>
                <option value="recientes">Más reciente</option>
                <option value="precio-asc">Precio: bajo a alto</option>
                <option value="precio-desc">Precio: alto a bajo</option>
                <option value="nombre">Nombre A-Z</option>
              </select>
            </div>

          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4 text-orange" />
              {filtered.length} productos encontrados
            </div>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-black text-orange transition-colors hover:text-navy"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div
            id="productos"
            className={
              view === "grid"
                ? "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                : "mt-8 grid gap-4"
            }
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                view={view}
                added={addedSlug === product.slug}
                onAdd={handleAdd}
              />
            ))}
          </div>
        ) : (
          <div
            id="productos"
            className="mt-8 rounded-2xl border border-border bg-white p-10 text-center shadow-soft"
          >
            <h2 className="font-display text-2xl font-black text-navy-deep">
              No encontramos productos con esos filtros.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Probá con otra categoría, marca o búsqueda. También podés
              consultarnos directo por WhatsApp.
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-10">
        <div className="grid rounded-2xl bg-gradient-navy px-6 py-5 text-cream shadow-strong sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-4 border-white/10 py-4 sm:px-5 lg:border-l first:border-l-0"
              >
                <Icon
                  className="h-9 w-9 shrink-0 text-orange"
                  strokeWidth={1.8}
                />
                <div>
                  <div className="font-display text-sm font-black">
                    {item.label}
                  </div>
                  <div className="mt-1 text-xs text-cream/62">{item.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
