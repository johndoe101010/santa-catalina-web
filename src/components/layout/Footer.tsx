import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { CATEGORIES } from "@/lib/products";
import { SITE, waUrl } from "@/lib/site";
import logoSantaCatalina from "@/assets/santa-catalina-logo-transparent.png";

export function Footer() {
  return (
    <footer className="bg-gradient-navy text-cream/90">
      <div className="mx-auto grid max-w-[1536px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.25fr_0.75fr_1fr_1.25fr] lg:px-10">
        <div>
          <div className="mb-5 flex items-center gap-4">
            <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-white p-1 shadow-strong">
              <img
                src={logoSantaCatalina}
                alt="Santa Catalina"
                className="h-full w-full object-contain"
              />
            </span>
            <span>
              <span className="block font-display text-2xl font-black text-white">
                {SITE.legalName}
              </span>
              <span className="block font-display text-sm font-black text-orange">
                {SITE.tagline}
              </span>
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/72">
            Más de 30 años acompañando a familias, constructores y productores
            de Concepción con todo lo necesario para construir, reparar y
            equipar.
          </p>
          <div className="mt-7 flex gap-3">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/8 transition-colors hover:bg-orange"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/8 transition-colors hover:bg-orange"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={waUrl()}
              target="_blank"
              rel="noopener"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/8 transition-colors hover:bg-whatsapp hover:text-navy-deep"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <FooterColumn title="Navegación">
          <li>
            <a href="/#inicio" className="hover:text-orange">
              Inicio
            </a>
          </li>
          <li>
            <Link to="/catalogo" className="hover:text-orange">
              Catálogo
            </Link>
          </li>
          <li>
            <a href="/#empresa" className="hover:text-orange">
              Empresa
            </a>
          </li>
          <li>
            <a href="/#marcas" className="hover:text-orange">
              Marcas
            </a>
          </li>
          <li>
            <a href="/#faq" className="hover:text-orange">
              FAQ
            </a>
          </li>
          <li>
            <a href="/#contacto" className="hover:text-orange">
              Contacto
            </a>
          </li>
          <li>
            <Link to="/carrito" className="hover:text-orange">
              Mi carrito
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title="Categorías">
          {CATEGORIES.slice(0, 9).map((category) => (
            <li key={category.slug}>
              <Link
                to="/categoria/$slug"
                params={{ slug: category.slug }}
                className="hover:text-orange"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <div>
          <h4 className="mb-4 font-display text-sm font-black uppercase tracking-[0.12em] text-white">
            Contacto
          </h4>
          <ul className="space-y-4 text-sm text-cream/72">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-orange" />
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="hover:text-orange"
              >
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-orange" />
              <a href={`mailto:${SITE.email}`} className="hover:text-orange">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
              <span>
                Lunes a Viernes: 07:00 - 18:00
                <br />
                Sábado: 07:00 - 16:00
                <br />
                Domingo: Cerrado
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="mx-auto flex max-w-[1536px] flex-col gap-2 px-5 py-6 text-xs text-cream/58 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span>
            © {new Date().getFullYear()} {SITE.legalName}. Todos los derechos
            reservados.
          </span>
          <span>Concepción, Paraguay</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-4 font-display text-sm font-black uppercase tracking-[0.12em] text-white">
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm text-cream/72">{children}</ul>
    </div>
  );
}
