import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { canonicalUrl, SITE } from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Santa Catalina Concepción" },
      { name: "description", content: "Contactá con Santa Catalina S.A. en Concepción, Paraguay. Consultas por WhatsApp, ubicación, horarios de atención y datos de contacto." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Contacto — Santa Catalina Concepción" },
      { property: "og:description", content: "WhatsApp, ubicación, horarios y datos de contacto de Santa Catalina S.A. en Concepción." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/contacto") },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: SITE.locale },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/contacto") }],
  }),
  component: () => (
    <div className="pt-12">
      <ContactSection />
      <FaqSection />
    </div>
  ),
});
