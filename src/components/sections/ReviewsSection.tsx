import { ExternalLink, Star } from "lucide-react";
import { REVIEWS } from "@/lib/products";

export function ReviewsSection() {
  return (
    <section
      id="resenas"
      className="section-anchor bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-10">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-orange">
              Reseñas reales - Google
            </span>
            <h2 className="font-display text-balance text-4xl font-black leading-[0.95] text-navy-deep sm:text-6xl">
              Lo que dicen <span className="text-orange">los clientes</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <GoogleMark />
            <div>
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl font-black text-navy-deep">
                  4.3
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map((item) => (
                    <Star
                      key={item}
                      className="h-5 w-5 fill-orange text-orange"
                    />
                  ))}
                  <Star className="h-5 w-5 text-orange" />
                </div>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Más de 150 reseñas en Google
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {REVIEWS.map((review) => (
            <a
              key={review.name}
              href={review.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir reseña de ${review.name} en Google Maps`}
              className="group relative rounded-xl border border-border bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-orange/55 hover:shadow-strong"
            >
              <ExternalLink className="absolute right-5 top-5 h-4 w-4 text-orange opacity-80" />
              <div className="mb-4 flex items-center gap-3 pr-7">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                  <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-white shadow-soft">
                    <GoogleMark small />
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-sm font-black text-navy-deep">
                    {review.name}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </span>
              </div>
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-orange text-orange"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/78">
                "{review.text}"
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoogleMark({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`grid place-items-center rounded-full bg-white ${small ? "h-4 w-4 text-[10px]" : "h-14 w-14 text-4xl shadow-soft"}`}
      aria-hidden="true"
    >
      <span className="font-display font-black">
        <span className="text-[#4285f4]">G</span>
      </span>
    </span>
  );
}
