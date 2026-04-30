import { createFileRoute } from "@tanstack/react-router";
import { CompanySection } from "@/components/sections/CompanySection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { absoluteUrl, canonicalUrl, SITE } from "@/lib/site";
import empresaImageUrl from "@/assets/empresa-interior.jpg";

export const Route = createFileRoute("/empresa")({
  head: () => ({
    meta: [
      { title: "La empresa — Santa Catalina S.A." },
      { name: "description", content: "Santa Catalina S.A., ferretería en Concepción con más de 30 años acompañando a familias, constructores y productores con materiales de calidad." },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "La empresa — Santa Catalina S.A." },
      { property: "og:description", content: "Más de 30 años en Concepción acompañando a familias, constructores y productores." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/empresa") },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: SITE.locale },
      { property: "og:image", content: absoluteUrl(empresaImageUrl) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "La empresa — Santa Catalina S.A." },
      { name: "twitter:description", content: "Ferretería en Concepción, Paraguay, con más de 30 años de trayectoria." },
      { name: "twitter:image", content: absoluteUrl(empresaImageUrl) },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/empresa") }],
  }),
  component: () => (
    <div className="pt-0">
      <CompanySection />
      <BrandsSection />
      <ReviewsSection />
    </div>
  ),
});
