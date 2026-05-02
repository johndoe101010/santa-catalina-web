import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Headphones,
  HelpCircle,
  LockKeyhole,
  Mail,
  MapPin,
  Maximize2,
  Minus,
  Phone,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Store,
  Truck,
  Users,
  X,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useCart } from "@/lib/cart";
import { absoluteUrl, canonicalUrl, SITE, waUrl } from "@/lib/site";
import {
  BRANDS,
  CATEGORIES,
  PRODUCTS,
  type Product,
  formatGs,
} from "@/lib/products";

const productAvailability = (stock: Product["stock"]) => {
  if (stock === "ultimas") return "https://schema.org/LimitedAvailability";
  if (stock === "consultar") return "https://schema.org/InStoreOnly";
  return "https://schema.org/InStock";
};

const stockLabel: Record<Product["stock"], string> = {
  disponible: "En stock",
  ultimas: "Últimas unidades",
  consultar: "Consultar stock",
};

const normalizeBrand = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");

const productCode = (slug: string) => {
  const hash = slug
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return `ST-${String(hash).padStart(5, "0")}`;
};

export const Route = createFileRoute("/producto/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find(
      (candidate) => candidate.slug === params.slug,
    );
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} - Santa Catalina` },
          {
            name: "description",
            content: `${loaderData.product.description} Disponible en Santa Catalina S.A., ferretería en Concepción, Paraguay.`,
          },
          { name: "robots", content: "index, follow, max-image-preview:large" },
          {
            property: "og:title",
            content: `${loaderData.product.name} - Santa Catalina`,
          },
          {
            property: "og:description",
            content: loaderData.product.description,
          },
          { property: "og:type", content: "product" },
          {
            property: "og:url",
            content: canonicalUrl(`/producto/${loaderData.product.slug}`),
          },
          { property: "og:site_name", content: SITE.name },
          { property: "og:locale", content: SITE.locale },
          {
            property: "og:image",
            content: absoluteUrl(loaderData.product.image),
          },
          {
            property: "product:price:amount",
            content: String(loaderData.product.price),
          },
          { property: "product:price:currency", content: "PYG" },
          { name: "twitter:card", content: "summary_large_image" },
          {
            name: "twitter:title",
            content: `${loaderData.product.name} - Santa Catalina`,
          },
          {
            name: "twitter:description",
            content: loaderData.product.description,
          },
          {
            name: "twitter:image",
            content: absoluteUrl(loaderData.product.image),
          },
        ]
      : [],
    links: loaderData
      ? [
          {
            rel: "canonical",
            href: canonicalUrl(`/producto/${loaderData.product.slug}`),
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="font-display mb-4 text-4xl font-black">
        Producto no encontrado
      </h1>
      <Link to="/catalogo" className="font-bold text-orange">
        Volver
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="py-32 text-center">Error: {error.message}</div>
  ),
  component: ProductoPage,
});

function ProductoPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("descripcion");
  const [openQuestion, setOpenQuestion] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const category = CATEGORIES.find(
    (candidate) => candidate.slug === product.categorySlug,
  );
  const categoryName = category?.name ?? product.category;
  const code = productCode(product.slug);
  const brand = BRANDS.find(
    (candidate) =>
      normalizeBrand(candidate.name) === normalizeBrand(product.brand),
  );
  const message = `Hola, me interesa el producto: *${product.name}* (${formatGs(product.price)}). Cantidad: ${quantity}. ¿Está disponible?`;

  const gallery = useMemo(
    () => [
      { label: "Vista principal", src: product.image, className: "scale-100" },
      {
        label: "Detalle del producto",
        src: product.image,
        className: "scale-110 rotate-[-8deg]",
      },
      {
        label: "Agarre y terminación",
        src: product.image,
        className: "scale-100",
      },
      {
        label: "Empaque de referencia",
        src: product.image,
        className: "scale-90",
      },
    ],
    [product.image],
  );

  const relatedProducts = PRODUCTS.filter(
    (candidate) =>
      candidate.categorySlug === product.categorySlug &&
      candidate.slug !== product.slug,
  ).slice(0, 4);
  const productFeatures = product.features
    .concat([
      "Diseño práctico para trabajos frecuentes",
      "Material resistente para uso profesional y doméstico",
    ])
    .slice(0, 6);
  const productSpecs = [
    ["Marca", product.brand],
    ["Modelo", code.replace("ST-", "AL-")],
    ["Tipo", categoryName],
    ["Medida", "Consultar según presentación"],
    ["Material", "Material resistente"],
    ["Uso recomendado", "Profesional y doméstico"],
  ];
  const productQuestions = [
    {
      q: "¿Este producto sirve para uso profesional?",
      a: "Sí. Confirmamos la recomendación exacta según el uso que nos indiques y la disponibilidad del modelo.",
    },
    {
      q: "¿Puedo retirar en tienda?",
      a: "Sí. Podés sumar el producto al carrito y coordinar retiro en Santa Catalina.",
    },
    {
      q: "¿Hacen envíos?",
      a: "Sí. Coordinamos envío según ubicación, volumen del pedido y disponibilidad del producto.",
    },
  ];
  const tabs = [
    { id: "descripcion", label: "Descripción", icon: FileText },
    { id: "caracteristicas", label: "Características", icon: Check },
    { id: "especificaciones", label: "Especificaciones", icon: PackageCheck },
    { id: "garantia", label: "Garantía", icon: ShieldCheck },
    { id: "preguntas", label: "Preguntas frecuentes", icon: HelpCircle },
  ];

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = "/catalogo";
  };

  const handleAdd = () => {
    add(product.slug, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1250);
    toast.success(`${quantity} x ${product.name} agregado al carrito`, {
      icon: <CheckCircle className="h-7 w-7 text-whatsapp" />,
      duration: 2600,
      className: "cart-success-toast",
    });
  };

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
        name: categoryName,
        item: canonicalUrl(`/categoria/${product.categorySlug}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: canonicalUrl(`/producto/${product.slug}`),
      },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: absoluteUrl(product.image),
    description: product.description,
    sku: code,
    category: product.category,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      url: canonicalUrl(`/producto/${product.slug}`),
      priceCurrency: "PYG",
      price: product.price,
      availability: productAvailability(product.stock),
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "HardwareStore", name: SITE.legalName },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, productJsonLd]).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <div className="bg-background pb-20">
        <section className="border-b border-border bg-white">
          <div className="mx-auto max-w-[1536px] px-5 py-5 sm:px-8 lg:px-10">
            <nav
              aria-label="Migas de pan"
              className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
            >
              <Link
                to="/"
                className="font-medium transition-colors hover:text-orange"
              >
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to="/categoria/$slug"
                params={{ slug: product.categorySlug }}
                className="font-medium transition-colors hover:text-orange"
              >
                {categoryName}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {product.name}
              </span>
            </nav>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1536px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(430px,0.95fr)] lg:px-10 lg:py-14">
          <div>
            <button
              type="button"
              onClick={handleBack}
              className="mb-6 inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-white px-4 font-display text-sm font-black text-muted-foreground transition-colors hover:border-orange hover:text-orange"
            >
              <ArrowLeft className="h-4 w-4" /> Volver
            </button>

            <div className="grid gap-4 lg:grid-cols-[86px_1fr]">
              <div className="order-2 grid grid-cols-4 gap-3 lg:order-1 lg:grid-cols-1">
                {gallery.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`grid aspect-square overflow-hidden rounded-lg border bg-white p-2 transition-colors ${
                      activeImage === index
                        ? "border-[#0b5cff] ring-2 ring-[#0b5cff]/15"
                        : "border-border hover:border-orange/60"
                    }`}
                    aria-label={`Ver ${item.label}`}
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className={`h-full w-full object-contain ${item.className}`}
                    />
                  </button>
                ))}
              </div>

              <div className="order-1 grid aspect-square overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-soft lg:order-2">
                <img
                  src={gallery[activeImage].src}
                  alt={product.name}
                  className={`h-full w-full object-contain transition-transform duration-300 ${gallery[activeImage].className}`}
                />
              </div>
            </div>
          </div>

          <div className="pt-12 lg:pt-20">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-[#f6d300] px-3 py-1 font-display text-sm font-black uppercase text-navy-deep shadow-sm">
                {brand?.name ?? product.brand}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                Código: {code}
              </span>
            </div>

            <h1 className="font-display text-balance text-4xl font-black leading-tight text-navy-deep sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-0.5 text-orange">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    className="h-5 w-5 fill-orange text-orange"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#0b5cff]">
                Consulta técnica disponible
              </span>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 font-display text-base font-black text-emerald-700">
              <CheckCircle className="h-5 w-5 fill-emerald-700 text-white" />
              {stockLabel[product.stock]}
            </div>

            <div className="mt-5 border-b border-border pb-7">
              <div className="font-display text-5xl font-black text-orange">
                {formatGs(product.price)}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Precio con IVA incluido
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-[148px_1fr] sm:items-end">
              <div>
                <label className="mb-2 block font-display text-sm font-black text-navy-deep">
                  Cantidad
                </label>
                <div className="flex h-12 overflow-hidden rounded-lg border border-input bg-white">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    className="grid w-12 place-items-center transition-colors hover:bg-secondary hover:text-orange"
                    aria-label="Restar unidad"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="grid flex-1 place-items-center border-x border-input font-display text-lg font-black">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    className="grid w-12 place-items-center transition-colors hover:bg-secondary hover:text-orange"
                    aria-label="Sumar unidad"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className={`inline-flex h-14 items-center justify-center gap-3 rounded-lg px-6 font-display text-lg font-black shadow-orange transition-colors ${
                  added
                    ? "bg-whatsapp text-navy-deep"
                    : "bg-[#f6b800] text-navy-deep hover:bg-orange hover:text-white"
                }`}
              >
                {added ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <ShoppingCart className="h-6 w-6" />
                )}
                {added ? "Agregado" : "Agregar al carrito"}
              </button>
            </div>

            <a
              href={waUrl(message)}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex h-13 w-full items-center justify-center gap-3 rounded-lg border border-navy bg-white px-6 font-display text-base font-black text-navy-deep transition-colors hover:border-whatsapp hover:bg-whatsapp hover:text-navy-deep"
            >
              <WhatsAppIcon className="h-6 w-6 text-whatsapp" /> Consultar por
              WhatsApp
            </a>

            <div className="mt-6 grid gap-5 border-y border-border py-6 sm:grid-cols-2">
              <InfoLine
                icon={<Store className="h-6 w-6" />}
                title="Retiro en tienda"
                text="Retirá tu pedido en nuestra sucursal."
                link="Ver ubicación"
                href="/contacto"
              />
              <InfoLine
                icon={<Truck className="h-6 w-6" />}
                title="Envíos a coordinar"
                text="Coordinamos el envío según tu ubicación."
                link="Consultar envío"
                href={waUrl(
                  `Hola, quiero consultar envío para: ${product.name}.`,
                )}
              />
            </div>

            <div className="mt-5 grid rounded-lg border border-border bg-white p-3 sm:grid-cols-4">
              <MiniTrust
                icon={<LockKeyhole className="h-5 w-5" />}
                title="Compra segura"
                text="Protegemos tus datos"
              />
              <MiniTrust
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Productos originales"
                text="Calidad garantizada"
              />
              <MiniTrust
                icon={<BadgeCheck className="h-5 w-5" />}
                title="Garantía oficial"
                text="Respaldo de fábrica"
              />
              <MiniTrust
                icon={<Users className="h-5 w-5" />}
                title="Atención personalizada"
                text="Estamos para ayudarte"
              />
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mx-auto max-w-[1536px] px-5 pb-12 sm:px-8 lg:px-10">
            <h2 className="font-display mb-5 text-2xl font-black text-navy-deep">
              Productos relacionados
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <RelatedProduct key={related.slug} product={related} />
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto grid max-w-[1536px] gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_320px] lg:px-10">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <div className="grid border-b border-border bg-background sm:grid-cols-2 lg:grid-cols-5">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex min-h-14 items-center justify-center gap-3 border-b border-r border-border px-4 py-4 font-display text-sm font-black last:border-r-0 lg:border-b-0 ${
                      isActive
                        ? "bg-navy text-white"
                        : "bg-white text-navy-deep hover:text-orange"
                    }`}
                    aria-selected={isActive}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              className={`${activeTab === "descripcion" ? "grid" : "hidden"} gap-8 p-6 lg:grid-cols-[1fr_460px] lg:p-8`}
            >
              <div>
                <h2 className="font-display text-2xl font-black text-navy-deep">
                  Descripción
                </h2>
                <div className="mt-2 h-0.5 w-16 bg-orange" />
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/78">
                  {product.description}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/78">
                  Pensado para responder bien en trabajos frecuentes, con una
                  terminación pensada para uso profesional y doméstico.
                </p>
              </div>
              <div className="overflow-hidden rounded-xl border border-border bg-white">
                <div className="grid aspect-[16/9] p-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setImageModalOpen(true)}
                  className="inline-flex h-14 w-full items-center justify-center gap-3 bg-navy font-display text-sm font-black text-white transition-colors hover:bg-orange focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/20"
                >
                  <Maximize2 className="h-5 w-5 text-orange" />
                  Ver imagen ampliada
                </button>
              </div>
            </div>

            <div
              className={`${activeTab === "caracteristicas" || activeTab === "especificaciones" ? "grid" : "hidden"} border-t border-border`}
            >
              <div
                className={`${activeTab === "caracteristicas" ? "block" : "hidden"} border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8`}
              >
                <h3 className="font-display text-xl font-black text-navy-deep">
                  Características
                </h3>
                <div className="mt-2 h-0.5 w-14 bg-orange" />
                <ul className="mt-5 grid gap-4">
                  {productFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`${activeTab === "especificaciones" ? "block" : "hidden"} p-6 lg:p-8`}
              >
                <h3 className="font-display text-xl font-black text-navy-deep">
                  Especificaciones
                </h3>
                <div className="mt-2 h-0.5 w-14 bg-orange" />
                <div className="mt-5 divide-y divide-border text-sm">
                  {productSpecs.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[150px_1fr] py-2"
                    >
                      <span className="font-display font-black text-navy-deep">
                        {label}
                      </span>
                      <span className="text-foreground/76">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`${activeTab === "garantia" || activeTab === "preguntas" ? "grid" : "hidden"} border-t border-border`}
            >
              <div
                className={`${activeTab === "garantia" ? "block" : "hidden"} border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8`}
              >
                <h3 className="font-display text-xl font-black text-navy-deep">
                  Garantía
                </h3>
                <div className="mt-2 h-0.5 w-14 bg-orange" />
                <div className="mt-5 flex gap-5">
                  <ShieldCheck
                    className="h-16 w-16 shrink-0 text-orange"
                    strokeWidth={1.6}
                  />
                  <p className="text-sm leading-relaxed text-foreground/78">
                    Producto nuevo y original. La garantía depende de la marca y
                    del tipo de producto. Confirmamos condiciones, factura y
                    disponibilidad por WhatsApp antes de cerrar el pedido.
                  </p>
                </div>
              </div>

              <div
                className={`${activeTab === "preguntas" ? "block" : "hidden"} p-6 lg:p-8`}
              >
                <h3 className="font-display text-xl font-black text-navy-deep">
                  Preguntas frecuentes
                </h3>
                <div className="mt-2 h-0.5 w-14 bg-orange" />
                <div className="mt-5 divide-y divide-border">
                  {productQuestions.map((item, index) => (
                    <div key={item.q}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenQuestion((current) =>
                            current === index ? -1 : index,
                          )
                        }
                        className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm font-semibold text-navy-deep"
                        aria-expanded={openQuestion === index}
                      >
                        {item.q}
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                            openQuestion === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openQuestion === index && (
                        <p className="pb-4 text-sm leading-relaxed text-muted-foreground">
                          {item.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="grid h-fit gap-4 lg:sticky lg:top-36">
            <div className="rounded-2xl bg-gradient-navy p-7 text-white shadow-strong">
              <Headphones className="h-10 w-10 text-orange" />
              <h2 className="font-display mt-5 text-3xl font-black leading-tight">
                ¿Necesitás ayuda para elegir?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/76">
                Nuestro equipo está listo para asesorarte.
              </p>
              <a
                href={waUrl(message)}
                target="_blank"
                rel="noopener"
                className="mt-7 inline-flex h-13 w-full items-center justify-center gap-3 rounded-lg bg-[#f6b800] px-5 font-display text-sm font-black text-navy-deep transition-colors hover:bg-orange hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5" /> Chatear por WhatsApp
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <h3 className="font-display text-xl font-black text-navy-deep">
                Otras formas de contacto
              </h3>
              <div className="mt-2 h-0.5 w-14 bg-orange" />
              <div className="mt-5 grid gap-5 text-sm">
                <ContactRow
                  icon={<Phone className="h-6 w-6" />}
                  title="Llamar"
                  text={SITE.phone}
                />
                <ContactRow
                  icon={<Mail className="h-6 w-6" />}
                  title="Email"
                  text={SITE.email}
                />
                <ContactRow
                  icon={<MapPin className="h-6 w-6" />}
                  title="Dirección"
                  text={SITE.address}
                />
                <ContactRow
                  icon={<Clock className="h-6 w-6" />}
                  title="Horarios de atención"
                  text={SITE.hours
                    .map((hour) => `${hour.day}: ${hour.time}`)
                    .join(" · ")}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-secondary p-6">
              <Truck className="h-8 w-8 text-orange" />
              <h3 className="font-display mt-3 text-lg font-black text-navy-deep">
                Envíos a todo el país
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Consultá costos y tiempos de entrega en tu zona.
              </p>
            </div>
          </aside>
        </section>

        {imageModalOpen && (
          <div
            className="fixed inset-0 z-[90] grid place-items-center bg-navy-deep/82 px-4 py-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Imagen ampliada de ${product.name}`}
          >
            <div className="relative grid max-h-[90vh] w-full max-w-5xl rounded-lg bg-white p-5 shadow-strong">
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-md bg-navy text-white transition-colors hover:bg-orange focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/20"
                aria-label="Cerrar imagen ampliada"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[78vh] w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function InfoLine({
  icon,
  title,
  text,
  link,
  href,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  link: string;
  href: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="text-navy">{icon}</span>
      <span>
        <span className="block font-display text-base font-black text-navy-deep">
          {title}
        </span>
        <span className="mt-1 block text-sm text-muted-foreground">{text}</span>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener" : undefined}
          className="mt-2 block text-sm font-bold text-[#0b5cff] transition-colors hover:text-orange"
        >
          {link}
        </a>
      </span>
    </div>
  );
}

function MiniTrust({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-2 px-2 py-2">
      <span className="text-navy">{icon}</span>
      <span>
        <span className="block text-xs font-black text-navy-deep">{title}</span>
        <span className="block text-[11px] text-muted-foreground">{text}</span>
      </span>
    </div>
  );
}

function RelatedProduct({ product }: { product: Product }) {
  return (
    <Link
      to="/producto/$slug"
      params={{ slug: product.slug }}
      className="grid grid-cols-[116px_1fr] items-center gap-4 rounded-xl border border-border bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-orange/50"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-24 w-full object-contain"
      />
      <span>
        <span className="block font-display text-sm font-black leading-snug text-navy-deep">
          {product.name}
        </span>
        <span className="mt-1 block text-xs font-bold text-muted-foreground">
          {product.brand}
        </span>
        <span className="mt-2 block font-display text-base font-black text-orange">
          {formatGs(product.price)}
        </span>
        <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
          <CheckCircle className="h-3.5 w-3.5" /> En stock
        </span>
      </span>
    </Link>
  );
}

function ContactRow({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="text-orange">{icon}</span>
      <span>
        <span className="block font-display font-black text-navy-deep">
          {title}
        </span>
        <span className="mt-1 block leading-relaxed text-foreground/78">
          {text}
        </span>
      </span>
    </div>
  );
}
