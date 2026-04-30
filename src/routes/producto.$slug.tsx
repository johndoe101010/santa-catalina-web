import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CATEGORIES, PRODUCTS, PRICE_CONFIRMATION_NOTICE, formatGs } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ArrowLeft, ShoppingCart, Check, CheckCircle } from "lucide-react";
import { absoluteUrl, canonicalUrl, SITE, waUrl } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const productAvailability = (stock: (typeof PRODUCTS)[number]["stock"]) => {
  if (stock === "ultimas") return "https://schema.org/LimitedAvailability";
  if (stock === "consultar") return "https://schema.org/InStoreOnly";
  return "https://schema.org/InStock";
};

export const Route = createFileRoute("/producto/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Santa Catalina` },
          { name: "description", content: `${loaderData.product.description} Disponible en Santa Catalina S.A., ferretería en Concepción, Paraguay.` },
          { name: "robots", content: "index, follow, max-image-preview:large" },
          { property: "og:title", content: `${loaderData.product.name} — Santa Catalina` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:type", content: "product" },
          { property: "og:url", content: canonicalUrl(`/producto/${loaderData.product.slug}`) },
          { property: "og:site_name", content: SITE.name },
          { property: "og:locale", content: SITE.locale },
          { property: "og:image", content: absoluteUrl(loaderData.product.image) },
          { property: "product:price:amount", content: String(loaderData.product.price) },
          { property: "product:price:currency", content: "PYG" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: `${loaderData.product.name} — Santa Catalina` },
          { name: "twitter:description", content: loaderData.product.description },
          { name: "twitter:image", content: absoluteUrl(loaderData.product.image) },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: canonicalUrl(`/producto/${loaderData.product.slug}`) }] : [],
  }),
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="font-display text-4xl font-black mb-4">Producto no encontrado</h1>
      <Link to="/catalogo" className="text-orange font-bold">Volver</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="py-32 text-center">Error: {error.message}</div>,
  component: ProductoPage,
});

function ProductoPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [relatedAddedSlug, setRelatedAddedSlug] = useState<string | null>(null);
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = "/catalogo";
  };
  const category = CATEGORIES.find((candidate) => candidate.slug === product.categorySlug);
  const categoryName = category?.name ?? product.category;
  const message = `Hola, me interesa el producto: *${product.name}* (${formatGs(product.price)}). ¿Está disponible?`;
  const relatedProducts = PRODUCTS.filter(
    (candidate) => candidate.categorySlug === product.categorySlug && candidate.slug !== product.slug,
  ).slice(0, 4);
  const handleAddRelated = (related: (typeof PRODUCTS)[number]) => {
    add(related.slug);
    setRelatedAddedSlug(related.slug);
    window.setTimeout(() => {
      setRelatedAddedSlug((current) => (current === related.slug ? null : current));
    }, 1250);
    toast.success(`${related.name} agregado al carrito`, {
      icon: <CheckCircle className="h-7 w-7 text-whatsapp" />,
      duration: 2600,
      className: "cart-success-toast",
    });
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: "Catálogo", item: canonicalUrl("/catalogo") },
      { "@type": "ListItem", position: 3, name: categoryName, item: canonicalUrl(`/categoria/${product.categorySlug}`) },
      { "@type": "ListItem", position: 4, name: product.name, item: canonicalUrl(`/producto/${product.slug}`) },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: absoluteUrl(product.image),
    description: product.description,
    sku: product.slug,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: canonicalUrl(`/producto/${product.slug}`),
      priceCurrency: "PYG",
      price: product.price,
      availability: productAvailability(product.stock),
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "HardwareStore",
        name: SITE.legalName,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, productJsonLd]).replace(/</g, "\\u003c") }}
      />
      <div className="pt-10 pb-24">
        <div className="mx-auto max-w-[1360px] px-5">
          <nav aria-label="Migas de pan" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="font-bold transition-colors hover:text-orange">Inicio</Link>
            <span>/</span>
            <Link to="/catalogo" className="font-bold transition-colors hover:text-orange">Catálogo</Link>
            <span>/</span>
            <Link to="/categoria/$slug" params={{ slug: product.categorySlug }} className="font-bold transition-colors hover:text-orange">{categoryName}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-orange mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Volver
          </button>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <Reveal direction="left">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-strong">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain p-4 bg-white" />
              </div>
            </Reveal>
            <Reveal direction="right">
              <div className="text-[11px] uppercase tracking-widest text-orange font-bold mb-3">{product.brand} · {product.category}</div>
              <h1 className="font-display text-3xl sm:text-5xl font-black leading-tight mb-5">{product.name}</h1>
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-black">{formatGs(product.price)}</span>
                  {product.oldPrice && <span className="text-base text-muted-foreground line-through">{formatGs(product.oldPrice)}</span>}
                </div>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground">{PRICE_CONFIRMATION_NOTICE}</p>
              </div>
              <p className="text-base text-foreground/80 leading-relaxed mb-8">{product.description}</p>
              <ul className="grid grid-cols-2 gap-2 mb-8">
                {product.features.map((f: string) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="h-4 w-4 text-orange shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    add(product.slug);
                    setAdded(true);
                    window.setTimeout(() => setAdded(false), 1250);
                    toast.success(`${product.name} agregado al carrito`, {
                      icon: <CheckCircle className="h-7 w-7 text-whatsapp" />,
                      duration: 2600,
                      className: "cart-success-toast",
                    });
                  }}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full font-black px-6 py-4 shadow-orange transition-all hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.97] ${
                    added ? "bg-whatsapp text-navy-deep" : "bg-gradient-orange text-white"
                  }`}
                >
                  {added ? <CheckCircle className="h-5 w-5" /> : <ShoppingCart className="h-4 w-4" />}
                  {added ? "Agregado" : "Agregar al carrito"}
                </button>
                <a href={waUrl(message)} target="_blank" rel="noopener" className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-whatsapp text-navy-deep font-black px-6 py-4 shadow-strong transition-all hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.97]">
                  <WhatsAppIcon className="h-5 w-5" /> Consultar por WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-orange">
                    Productos relacionados
                  </span>
                  <h2 className="font-display mt-2 text-2xl font-black text-foreground sm:text-3xl">
                    También puede interesarte
                  </h2>
                </div>
                <Link
                  to="/categoria/$slug"
                  params={{ slug: product.categorySlug }}
                  className="hidden text-sm font-bold text-muted-foreground transition-colors hover:text-orange sm:inline-flex"
                >
                  Ver más
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                {relatedProducts.map((related) => (
                  <article
                    key={related.slug}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white text-navy shadow-soft transition-all hover:-translate-y-1 hover:border-orange/30 hover:shadow-strong sm:rounded-3xl"
                  >
                    <Link to="/producto/$slug" params={{ slug: related.slug }} className="block aspect-square bg-white">
                      <img
                        src={related.image}
                        alt={related.name}
                        loading="lazy"
                        className="h-full w-full object-contain bg-white p-3 transition-transform duration-500 group-hover:scale-105 sm:p-4"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-3 sm:p-5">
                      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-orange sm:mb-2">
                        {related.brand}
                      </div>
                      <Link
                        to="/producto/$slug"
                        params={{ slug: related.slug }}
                        className="font-display mb-3 min-h-[2.6em] line-clamp-2 text-sm font-bold leading-tight transition-colors hover:text-orange sm:text-base"
                      >
                        {related.name}
                      </Link>
                      <span className="font-display text-base font-black sm:text-xl">
                        {formatGs(related.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddRelated(related)}
                        className={`mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-black transition-all duration-300 active:scale-[0.97] ${
                          relatedAddedSlug === related.slug
                            ? "bg-whatsapp/10 text-whatsapp"
                            : "bg-secondary text-foreground hover:bg-navy-deep hover:text-white"
                        }`}
                      >
                        {relatedAddedSlug === related.slug ? <CheckCircle className="h-4 w-4" /> : <ShoppingCart className="h-3.5 w-3.5" />}
                        {relatedAddedSlug === related.slug ? "Agregado" : "Agregar"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
