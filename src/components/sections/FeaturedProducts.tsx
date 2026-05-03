import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { useCart } from "@/lib/cart";
import { PRODUCTS, type Product } from "@/lib/products";

export function FeaturedProducts() {
  const { add } = useCart();
  const featured = PRODUCTS.filter((product) => product.featured).slice(0, 8);
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const handleAdd = (product: Product, quantity = 1) => {
    add(product.slug, quantity);
    setAddedSlug(product.slug);
    window.setTimeout(
      () =>
        setAddedSlug((current) => (current === product.slug ? null : current)),
      1250,
    );
    toast.success(`${quantity} x ${product.name} agregado al carrito`, {
      icon: <CheckCircle className="h-7 w-7 text-whatsapp" />,
      duration: 2600,
      className: "cart-success-toast",
    });
  };

  return (
    <section
      id="destacados"
      className="section-anchor relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-10">
        <Reveal direction="zoom">
          <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="mb-3 inline-block text-xs font-black uppercase tracking-[0.24em] text-orange">
                Destacados
              </span>
              <h2 className="font-display text-balance text-4xl font-black leading-[0.95] text-navy-deep sm:text-6xl">
                Productos listos para{" "}
                <span className="text-orange">sumar al pedido.</span>
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="group inline-flex h-12 w-fit items-center gap-3 rounded-md border border-navy bg-white px-5 text-sm font-black text-navy-deep transition-colors hover:border-orange hover:text-orange focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/20"
            >
              Ver todo el catálogo
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              added={addedSlug === product.slug}
              onAdd={handleAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
