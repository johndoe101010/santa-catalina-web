import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { CompanySection } from "@/components/sections/CompanySection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { absoluteUrl, canonicalUrl, SITE } from "@/lib/site";
import heroFachadaUrl from "@/assets/hero-fachada.jpg";

const homeTitle = "Santa Catalina — Ferretería en Concepción, Paraguay";
const homeDescription =
  "Más de 30 años abasteciendo Concepción con herramientas, construcción, hogar, campo, electricidad, plomería, pinturas y atención directa por WhatsApp.";
const homeImage = absoluteUrl(heroFachadaUrl);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: homeTitle },
      { name: "description", content: homeDescription },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: homeTitle },
      { property: "og:description", content: "Tu ferretería de confianza en Concepción. Más de 8.000 productos en stock." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/") },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: SITE.locale },
      { property: "og:image", content: homeImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: homeTitle },
      { name: "twitter:description", content: homeDescription },
      { name: "twitter:image", content: homeImage },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/") }],
  }),
  component: Home,
});

function Home() {
  /* 
  useEffect(() => {
    const storedTarget = sessionStorage.getItem("santa-scroll-target");
    const hashTarget = window.location.hash.replace("#", "");
    const target = storedTarget || hashTarget;

    if (!target) return;

    sessionStorage.removeItem("santa-scroll-target");

    window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({
        behavior: "smooth",
        block: target === "inicio" ? "start" : "center",
      });
    }, 90);
  }, []); 
  */

  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <CompanySection />
      <BrandsSection />
      <ReviewsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
