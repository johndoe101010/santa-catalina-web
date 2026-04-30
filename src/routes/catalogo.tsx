import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PRODUCTS, CATEGORIES, formatGs } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import { absoluteUrl, canonicalUrl, SITE } from "@/lib/site";
import catalogoImageUrl from "@/assets/cat-herramientas.jpg";


const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n");

const searchTokens = (query: string) => {
  const normalized = normalizeSearchText(query);
  const base = normalized
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);

  const expanded = base.flatMap((token) => {
    const forms = [token];
    if (token.endsWith("es") && token.length > 4) forms.push(token.slice(0, -2));
    if (token.endsWith("s") && token.length > 3) forms.push(token.slice(0, -1));
    return forms;
  });

  return Array.from(new Set(expanded));
};

const productSearchScore = (product: (typeof PRODUCTS)[number], query: string) => {
  const normalizedQuery = normalizeSearchText(query);
  const tokens = searchTokens(query);
  if (!normalizedQuery || !tokens.length) return 1;

  const name = normalizeSearchText(product.name);
  const brand = normalizeSearchText(product.brand);
  const category = normalizeSearchText(product.category);
  const categorySlug = normalizeSearchText(product.categorySlug);
  const slug = normalizeSearchText(product.slug);
  const details = normalizeSearchText(`${product.description} ${product.features.join(" ")}`);
  const haystack = `${name} ${brand} ${category} ${categorySlug} ${slug} ${details}`;

  let score = 0;
  if (name.includes(normalizedQuery)) score += 90;
  if (slug.includes(normalizedQuery)) score += 80;
  if (brand.includes(normalizedQuery)) score += 45;
  if (category.includes(normalizedQuery) || categorySlug.includes(normalizedQuery)) score += 35;

  for (const token of tokens) {
    if (name.includes(token)) score += 18;
    else if (slug.includes(token)) score += 14;
    else if (brand.includes(token) || category.includes(token) || categorySlug.includes(token)) score += 10;
    else if (haystack.includes(token)) score += 4;
  }

  return score;
};

export const Route = createFileRoute("/catalogo")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
    categoria: typeof search.categoria === "string" ? search.categoria : "todos",
  }),
  head: () => ({
    meta: [
      { title: "Catálogo de productos — Santa Catalina" },
      { name: "description", content: "Catálogo de Santa Catalina: herramientas, construcción, pinturas, hogar, campo, electricidad, iluminación, plomería, sanitarios, ferretería general y automotor." },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "Catálogo de productos — Santa Catalina" },
      { property: "og:description", content: "Explorá productos de ferretería, construcción, hogar y campo disponibles en Santa Catalina Concepción." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/catalogo") },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: SITE.locale },
      { property: "og:image", content: absoluteUrl(catalogoImageUrl) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Catálogo de productos — Santa Catalina" },
      { name: "twitter:description", content: "Herramientas, construcción, electricidad, plomería, hogar y campo en Concepción." },
      { name: "twitter:image", content: absoluteUrl(catalogoImageUrl) },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/catalogo") }],
  }),
  component: Catalogo,
});

function Catalogo() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q);
  const [cat, setCat] = useState<string>(search.categoria || "todos");
  const { add } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  useEffect(() => {
    setQ(search.q || "");
    setCat(search.categoria || "todos");
  }, [search.q, search.categoria]);

  const handleAdd = (product: (typeof PRODUCTS)[number]) => {
    add(product.slug);
    setAddedSlug(product.slug);
    window.setTimeout(() => {
      setAddedSlug((current) => (current === product.slug ? null : current));
    }, 1250);
    toast.success(`${product.name} agregado al carrito`, {
      icon: <CheckCircle className="h-7 w-7 text-whatsapp" />,
      duration: 2600,
      className: "cart-success-toast",
    });
  };

  const filtered = PRODUCTS.map((product) => ({ product, score: productSearchScore(product, q) }))
    .filter(({ product, score }) => {
      if (cat !== "todos" && product.categorySlug !== cat) return false;
      if (q.trim() && score <= 0) return false;
      return true;
    })
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product);

  return (
    <div className="pt-12 pb-24">
      <div className="mx-auto max-w-[1360px] px-5">
        <Reveal>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3">Catálogo</h1>
          <p className="text-muted-foreground mb-8">{filtered.length} productos disponibles</p>
        </Reveal>

        <div className="mb-10">
          <div className="flex flex-wrap gap-2">
            <Link to="/catalogo" search={{ q: "", categoria: "todos" }} className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${cat === "todos" ? "bg-navy text-cream" : "bg-card border border-border hover:border-orange"}`}>Todos</Link>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} to="/categoria/$slug" params={{ slug: c.slug }} className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${cat === c.slug ? "bg-navy text-cream" : "bg-card border border-border hover:border-orange"}`}>{c.name}</Link>
            ))}
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
        >
          {filtered.map((p) => (
            <motion.article 
              key={p.slug} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              className="group flex flex-col rounded-3xl bg-white border border-border shadow-[0_2px_12px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:border-orange/20"
            >
              <Link to="/producto/$slug" params={{ slug: p.slug }} className="block aspect-square overflow-hidden bg-white">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-contain p-4 bg-white transition-transform duration-500 group-hover:scale-105" />
              </Link>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-widest text-orange font-bold mb-1.5">{p.brand}</div>
                <Link to="/producto/$slug" params={{ slug: p.slug }} className="font-display font-bold text-sm leading-tight line-clamp-2 min-h-[2.6em] hover:text-orange transition-colors">{p.name}</Link>
                <div className="mt-3 mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black">{formatGs(p.price)}</span>
                    {p.oldPrice && <span className="text-xs text-muted-foreground line-through">{formatGs(p.oldPrice)}</span>}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleAdd(p)}
                  className={`mt-auto w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl text-xs font-black py-3 px-4 transition-all duration-300 active:scale-[0.97] ${
                    addedSlug === p.slug 
                      ? "bg-whatsapp/10 text-whatsapp" 
                      : "bg-secondary text-foreground hover:bg-navy-deep hover:text-white"
                  }`}
                >
                  {addedSlug === p.slug ? <CheckCircle className="h-4 w-4" /> : <ShoppingCart className="h-3.5 w-3.5" />}
                  {addedSlug === p.slug ? "Agregado" : "Agregar"}
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
