import { ExternalLink, Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { REVIEWS } from "@/lib/products";

export function ReviewsSection() {
  return (
    <section
      id="resenas"
      className="section-anchor bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-10">
        <Reveal
          direction="tilt"
          className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end"
        >
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
        </Reveal>

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
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-border bg-white">
                  <GoogleMark small />
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
      className={`grid place-items-center rounded-full bg-white ${small ? "h-7 w-7" : "h-14 w-14 shadow-soft"}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className={small ? "h-5 w-5" : "h-9 w-9"}>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z"
        />
      </svg>
    </span>
  );
}
