import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { SITE, waUrl } from "@/lib/site";
import logoSantaCatalina from "@/assets/santa-catalina-logo-transparent.png";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-navy text-cream/90 overflow-hidden">
      <div className="relative mx-auto max-w-[1360px] px-5 py-20 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_14px_34px_rgba(0,0,0,.24)] ring-1 ring-white/60">
              <img src={logoSantaCatalina} alt="Santa Catalina" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="font-display font-extrabold text-lg text-cream">{SITE.name}</div>
              <div className="text-xs font-black text-orange">{SITE.tagline}</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-cream/70 max-w-sm">
            Más de 30 años acompañando a familias, constructores y productores de Concepción con todo lo
            necesario para construir, reparar y equipar.
          </p>
          <div className="flex gap-3 mt-6">
            <a href={SITE.social.instagram} target="_blank" rel="noopener" className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 hover:bg-orange transition-colors" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SITE.social.facebook} target="_blank" rel="noopener" className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 hover:bg-orange transition-colors" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-cream mb-4 text-sm uppercase tracking-wider">Navegar</h4>
          <ul className="space-y-2.5 text-sm text-cream/70">
            <li><a href="/#inicio" className="hover:text-orange transition-colors">Inicio</a></li>
            <li><Link to="/catalogo" className="hover:text-orange transition-colors">Catálogo</Link></li>
            <li><a href="/#empresa" className="hover:text-orange transition-colors">Empresa</a></li>
            <li><a href="/#marcas" className="hover:text-orange transition-colors">Marcas</a></li>
            <li><a href="/#faq" className="hover:text-orange transition-colors">FAQ</a></li>
            <li><a href="/#contacto" className="hover:text-orange transition-colors">Contacto</a></li>
            <li><Link to="/carrito" className="hover:text-orange transition-colors">Mi carrito</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-cream mb-4 text-sm uppercase tracking-wider">Horarios</h4>
          <ul className="space-y-2.5 text-sm text-cream/70">
            {SITE.hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between gap-3">
                <span>{h.day}</span>
                <span className="text-cream/90 font-medium">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-cream mb-4 text-sm uppercase tracking-wider">Contacto</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-orange shrink-0" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <WhatsAppIcon className="h-4 w-4 text-orange shrink-0" />
              <a href={waUrl()} className="hover:text-orange transition-colors">{SITE.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-orange shrink-0" />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-orange transition-colors">Llamar</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-orange shrink-0" />
              <a href={`mailto:${SITE.email}`} className="hover:text-orange transition-colors">{SITE.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="mx-auto max-w-[1360px] px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/50">
          <span>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</span>
          <span>Concepción, Paraguay.</span>
        </div>
      </div>
    </footer>
  );
}
