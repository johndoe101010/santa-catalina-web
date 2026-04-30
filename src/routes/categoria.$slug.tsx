import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/Reveal";
import { useCart } from "@/lib/cart";
import { absoluteUrl, canonicalUrl, SITE } from "@/lib/site";
import { CATEGORIES, PRODUCTS, formatGs } from "@/lib/products";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const category = CATEGORIES.find((candidate) => candidate.slug === params.slug);
    if (!category) throw notFound();
    const products = PRODUCTS.filter((product) => product.categorySlug === category.slug);
    return { category, products };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `${loaderData.category.name} — Santa Catalina`;
    const description = `${loaderData.category.blurb}. Productos de ${loaderData.category.name.toLowerCase()} disponibles para consultar por WhatsApp en Santa Catalina S.A., Concepción.`;
    const url = canonicalUrl(`/categoria/${loaderData.category.slug}`);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: SITE.name },
        { property: "og:locale", content: SITE.locale },
        { property: "og:image", content: absoluteUrl(loaderData.category.image) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: absoluteUrl(loaderData.category.image) },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="font-display text-4xl font-black mb-4">Categoría no encontrada</h1>
      <Link to="/catalogo" className="text-orange font-bold">Volver</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData();
  const { add } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = "/catalogo";
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: "Catálogo", item: canonicalUrl("/catalogo") },
      { "@type": "ListItem", position: 3, name: category.name, item: canonicalUrl(`/categoria/${category.slug}`) },
    ],
  };

  const handleAdd = (product: (typeof PRODUCTS)[number]) => {
    add(product.slug);
    setAddedSlug(product.slug);
    window.setTimeout(() => setAddedSlug((current) => (current === product.slug ? null : current)), 1250);
    toast.success(`${product.name} agregado al carrito`, {
      icon: <CheckCircle className="h-7 w-7 text-whatsapp" />,
      duration: 2600,
      className: "cart-success-toast",
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="pt-12 pb-24">
        <div className="mx-auto max-w-[1360px] px-5">
          <Reveal>
            <nav aria-label="Migas de pan" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="font-bold transition-colors hover:text-orange">Inicio</Link>
              <span>/</span>
              <Link to="/catalogo" className="font-bold transition-colors hover:text-orange">Catálogo</Link>
              <span>/</span>
              <span className="text-foreground">{category.name}</span>
            </nav>
            <span className="text-[11px] font-black uppercase tracking-widest text-orange">Categoría</span>
            <h1 className="font-display mt-2 text-4xl sm:text-5xl font-black mb-3">{category.name}</h1>
            <p className="max-w-2xl text-muted-foreground mb-8">{category.blurb}. {products.length} productos disponibles para consultar por WhatsApp.</p>
          </Reveal>

          <button
            type="button"
            onClick={handleBack}
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-orange"
          >
            <ArrowLeft className="h-4 w-4" /> Volver
          </button>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((p) => (
              <article
                key={p.slug}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-[0_2px_12px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-orange/20 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
              >
                <Link to="/producto/$slug" params={{ slug: p.slug }} className="block aspect-square overflow-hidden bg-white">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-contain bg-white p-4 transition-transform duration-500 group-hover:scale-105" />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-orange">{p.brand}</div>
                  <Link to="/producto/$slug" params={{ slug: p.slug }} className="font-display min-h-[2.6em] line-clamp-2 text-sm font-bold leading-tight transition-colors hover:text-orange">{p.name}</Link>
                  <div className="mb-3 mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-black">{formatGs(p.price)}</span>
                      {p.oldPrice && <span className="text-xs text-muted-foreground line-through">{formatGs(p.oldPrice)}</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAdd(p)}
                    className={`mt-auto inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-black transition-all duration-300 active:scale-[0.97] ${
                      addedSlug === p.slug ? "bg-whatsapp/10 text-whatsapp" : "bg-secondary text-foreground hover:bg-navy-deep hover:text-white"
                    }`}
                  >
                    {addedSlug === p.slug ? <CheckCircle className="h-4 w-4" /> : <ShoppingCart className="h-3.5 w-3.5" />}
                    {addedSlug === p.slug ? "Agregado" : "Agregar"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
