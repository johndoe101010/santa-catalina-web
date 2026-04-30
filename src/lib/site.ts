// Configuración global del sitio Santa Catalina
export const SITE = {
  name: "Santa Catalina",
  legalName: "Santa Catalina S.A.",
  url: "https://santacatalina.py",
  locale: "es_PY",
  tagline: "Logramos tu mejor manera de vivir",
  description:
    "Ferretería Santa Catalina en Concepción, Paraguay. Materiales, herramientas, hogar y campo con atención directa por WhatsApp.",
  city: "Concepción, Paraguay",
  address: "Av. Pinedo c/ Estigarribia, Concepción",
  phone: "+595 986 150 330",
  whatsapp: "595986150330",
  email: "ventas@santacatalina.py",
  hours: [
    { day: "Lunes a Viernes", time: "07:00 – 18:00" },
    { day: "Sábado", time: "07:00 – 16:00" },
    { day: "Domingo", time: "Cerrado" },
  ],
  mapsEmbed:
    "https://www.google.com/maps?q=Ferreteria+Santa+Catalina+Concepcion+Paraguay&output=embed",
  social: {
    instagram: "https://www.instagram.com/santacatalina_sa/",
    facebook: "https://www.facebook.com/santa.catalinapy?locale=es_LA",
  },
  proof: [
    { value: "20+", label: "Años en Concepción" },
    { value: "14.000+", label: "Productos" },
    { value: "120+", label: "Marcas" },
    { value: "4.3★", label: "Reseñas Google" },
  ],
};

export const absoluteUrl = (path?: string) => {
  if (!path) return SITE.url;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
};

export const canonicalUrl = (path = "/") => absoluteUrl(path);

export const waUrl = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
