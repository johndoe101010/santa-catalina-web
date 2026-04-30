import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";
import { absoluteUrl, canonicalUrl, SITE } from "@/lib/site";
import logoUrl from "@/assets/santa-catalina-logo.png";

import appCss from "../styles.css?url";

const siteTitle = "Santa Catalina S.A. — Ferretería en Concepción, Paraguay";
const siteDescription =
  "Ferretería Santa Catalina S.A. en Concepción, Paraguay. Herramientas, materiales de construcción, pinturas, electricidad, plomería, hogar y campo con atención por WhatsApp.";
const siteImage = absoluteUrl(logoUrl);

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["HardwareStore", "LocalBusiness", "Store"],
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  image: siteImage,
  logo: siteImage,
  description: siteDescription,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Pinedo c/ Estigarribia",
    addressLocality: "Concepción",
    addressCountry: "PY",
  },
  areaServed: ["Concepción", "Paraguay"],
  hasMap: SITE.mapsEmbed,
  paymentAccepted: ["Efectivo", "Transferencia bancaria", "Tarjeta de débito", "Tarjeta de crédito", "Tigo Money", "Personal Pay", "Billetera Personal"],
  currenciesAccepted: "PYG",
  priceRange: "$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:00",
      closes: "16:00",
    },
  ],
  sameAs: [SITE.social.facebook, SITE.social.instagram],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.phone,
    contactType: "customer service",
    areaServed: "PY",
    availableLanguage: ["es"],
  },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscás no existe o fue movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteTitle },
      { name: "description", content: siteDescription },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: SITE.legalName },
      { name: "keywords", content: "ferretería en Concepción, Santa Catalina, herramientas, materiales de construcción, pinturas, electricidad, plomería, hogar, campo, Paraguay" },
      { name: "theme-color", content: "#0f172a" },
      { property: "og:title", content: siteTitle },
      { property: "og:description", content: siteDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE.url },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: SITE.locale },
      { property: "og:image", content: siteImage },
      { property: "og:image:alt", content: "Santa Catalina S.A. Ferretería en Concepción, Paraguay" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: siteTitle },
      { name: "twitter:description", content: siteDescription },
      { name: "twitter:image", content: siteImage },
      { name: "twitter:image:alt", content: "Santa Catalina S.A. Ferretería en Concepción, Paraguay" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "canonical",
        href: canonicalUrl("/"),
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "1024x1024",
        href: "/favicon.png?v=3",
      },
      {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: "/favicon.ico?v=3",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon.png?v=3",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PY">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* <SmoothScroll /> -- Disabled to fix auto-scroll bug in search */}
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <StickyWhatsApp />
      <Toaster />
    </div>
  );
}
