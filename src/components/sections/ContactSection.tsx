import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SITE, waUrl } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";

export function ContactSection() {
  return (
    <section id="contacto" className="section-anchor landing-section py-24 lg:py-32">
      <div className="mx-auto max-w-[1360px] px-5">
        <Reveal direction="up">
          <div className="max-w-2xl mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange mb-3">
              Contacto
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] text-balance">
              Visitanos o <span className="text-orange">consultanos.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-8">
          <Reveal direction="left">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full rounded-3xl overflow-hidden shadow-strong border border-border">
              <iframe
                src={SITE.mapsEmbed}
                title="Ubicación Santa Catalina"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="rounded-3xl bg-gradient-navy text-cream p-8 sm:p-10 shadow-strong h-full flex flex-col gap-6">
              <Item icon={<MapPin className="h-5 w-5" />} title="Dirección" content={SITE.address} />
              <Item icon={<WhatsAppIcon className="h-5 w-5" />} title="Teléfono / WhatsApp" content={SITE.phone} href={waUrl()} />
              <Item icon={<Mail className="h-5 w-5" />} title="Email" content={SITE.email} href={`mailto:${SITE.email}`} />
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange/15 text-orange">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div className="text-xs uppercase tracking-widest text-cream/60 font-bold">Horarios</div>
                </div>
                <ul className="space-y-2 text-sm sm:text-base ml-13">
                  {SITE.hours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between gap-4">
                      <span className="text-cream/60">{h.day}</span>
                      <span className="font-bold text-cream/90">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={waUrl("Hola, quiero hacer una consulta.")}
                target="_blank"
                rel="noopener"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp text-navy-deep font-bold px-6 py-4 shadow-strong hover:-translate-y-0.5 transition-transform"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chatear ahora
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Item({ icon, title, content, href }: { icon: React.ReactNode; title: string; content: string; href?: string }) {
  const inner = (
    <>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange/15 text-orange shrink-0">{icon}</span>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-widest text-cream/60 font-bold mb-0.5">{title}</div>
        <div className="font-display font-bold text-base sm:text-lg">{content}</div>
      </div>
    </>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="flex items-center gap-3 hover:text-orange transition-colors">{inner}</a>
  ) : (
    <div className="flex items-center gap-3">{inner}</div>
  );
}
