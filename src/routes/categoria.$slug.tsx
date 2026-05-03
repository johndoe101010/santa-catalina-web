import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCatalogView } from "@/components/catalog/ProductCatalogView";
import { absoluteUrl, canonicalUrl, SITE } from "@/lib/site";
import { CATEGORIES } from "@/lib/catalog";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const category = CATEGORIES.find(
      (candidate) => candidate.slug === params.slug,
    );
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `${loaderData.category.name} - Santa Catalina`;
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
        {
          property: "og:image",
          content: absoluteUrl(loaderData.category.image),
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        {
          name: "twitter:image",
          content: absoluteUrl(loaderData.category.image),
        },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="font-display mb-4 text-4xl font-black">
        Categoría no encontrada
      </h1>
      <Link to="/catalogo" className="font-bold text-orange">
        Volver
      </Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catálogo",
        item: canonicalUrl("/catalogo"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: canonicalUrl(`/categoria/${category.slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductCatalogView
        initialCategory={category.slug}
        title={category.name}
        eyebrow="Categoría"
        description={`${category.blurb}. Filtra dentro de esta categoría o cambia rápidamente a otra sección del catálogo.`}
      />
    </>
  );
}
