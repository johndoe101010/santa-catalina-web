import { Clock, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SITE, waUrl } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contacto" className="section-anchor bg-background">
      <div className="grid lg:grid-cols-[1fr_1fr]">
        <div className="min-h-[420px] border-y border-border bg-white lg:min-h-[500px]">
          <iframe
            src={SITE.mapsEmbed}
            title="Ubicación Santa Catalina"
            className="h-full min-h-[420px] w-full lg:min-h-[500px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="bg-gradient-navy px-5 py-10 text-white sm:px-8 lg:px-12 lg:py-14">
          <div className="mx-auto max-w-xl">
            <ContactItem
              icon={<MapPin className="h-9 w-9" />}
              title="Dirección"
              content={SITE.address}
            />
            <ContactItem
              icon={<WhatsAppIcon className="h-9 w-9" />}
              title="Teléfono / WhatsApp"
              content={SITE.phone}
            >
              <a
                href={waUrl("Hola, quiero hacer una consulta.")}
                target="_blank"
                rel="noopener"
                className="inline-flex h-13 items-center justify-center gap-3 rounded-lg bg-whatsapp px-7 font-display text-base font-black text-navy-deep shadow-strong transition-colors hover:bg-[#f6b800]"
              >
                <WhatsAppIcon className="h-6 w-6" />
                Chatear ahora
              </a>
            </ContactItem>
            <ContactItem
              icon={<Mail className="h-9 w-9" />}
              title="Email"
              content={SITE.email}
            />
            <div className="grid grid-cols-[58px_1fr] gap-6 border-t border-white/14 py-7">
              <Clock className="h-9 w-9 text-orange" />
              <div>
                <h3 className="font-display text-lg font-black uppercase tracking-[0.14em] text-white">
                  Horarios
                </h3>
                <div className="mt-4 grid gap-2">
                  {SITE.hours.map((hour) => (
                    <div
                      key={hour.day}
                      className="grid grid-cols-[1fr_auto] gap-5 text-base"
                    >
                      <span className="text-white/78">{hour.day}</span>
                      <span className="font-display font-black">
                        {hour.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  title,
  content,
  children,
}: {
  icon: ReactNode;
  title: string;
  content: string;
  children?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[58px_1fr] gap-6 border-t border-white/14 py-7 first:border-t-0">
      <span className="text-orange">{icon}</span>
      <div>
        <h3 className="font-display text-lg font-black uppercase tracking-[0.14em] text-white">
          {title}
        </h3>
        <p className="mt-2 font-display text-2xl font-black leading-snug text-white">
          {content}
        </p>
        {children && <div className="mt-5">{children}</div>}
      </div>
    </div>
  );
}
