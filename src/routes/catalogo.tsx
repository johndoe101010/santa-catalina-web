import { createFileRoute } from "@tanstack/react-router";
import { ProductCatalogView } from "@/components/catalog/ProductCatalogView";
import { absoluteUrl, canonicalUrl, SITE } from "@/lib/site";
import catalogoImageUrl from "@/assets/cat-herramientas.jpg";

export const Route = createFileRoute("/catalogo")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
    categoria:
      typeof search.categoria === "string" ? search.categoria : "todos",
  }),
  head: () => ({
    meta: [
      { title: "Catálogo de productos - Santa Catalina" },
      {
        name: "description",
        content:
          "Catálogo de Santa Catalina: herramientas, construcción, pinturas, hogar, campo, electricidad, iluminación, plomería, sanitarios, ferretería general y automotor.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      {
        property: "og:title",
        content: "Catálogo de productos - Santa Catalina",
      },
      {
        property: "og:description",
        content:
          "Explorá productos de ferretería, construcción, hogar y campo disponibles en Santa Catalina Concepción.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/catalogo") },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: SITE.locale },
      { property: "og:image", content: absoluteUrl(catalogoImageUrl) },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Catálogo de productos - Santa Catalina",
      },
      {
        name: "twitter:description",
        content:
          "Herramientas, construcción, electricidad, plomería, hogar y campo en Concepción.",
      },
      { name: "twitter:image", content: absoluteUrl(catalogoImageUrl) },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/catalogo") }],
  }),
  component: Catalogo,
});

function Catalogo() {
  const search = Route.useSearch();

  return (
    <ProductCatalogView
      initialQuery={search.q}
      initialCategory={search.categoria || "todos"}
      title="Catálogo"
      eyebrow="Productos"
      description="Filtra por categoría, marca, disponibilidad y precio para armar tu pedido con productos de ferretería, obra, hogar y campo."
    />
  );
}
