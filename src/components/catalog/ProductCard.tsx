import { Link } from "@tanstack/react-router";
import { CheckCircle, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { type Product, formatGs } from "@/lib/catalog";

type ProductCardProps = {
  product: Product;
  view?: "grid" | "list";
  added?: boolean;
  onAdd?: (product: Product, quantity: number) => void;
};

const stockLabel: Record<Product["stock"], string> = {
  disponible: "En stock",
  ultimas: "Últimas unidades",
  consultar: "Consultar stock",
};

const stockTone: Record<Product["stock"], string> = {
  disponible: "text-emerald-700",
  ultimas: "text-orange",
  consultar: "text-muted-foreground",
};

function Stock({ stock }: { stock: Product["stock"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold ${stockTone[stock]}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${stock === "disponible" ? "bg-emerald-600" : stock === "ultimas" ? "bg-orange" : "bg-muted-foreground"}`}
      />
      {stockLabel[stock]}
    </span>
  );
}

function QuantityControl({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="flex h-9 w-[78px] shrink-0 overflow-hidden rounded-md border border-input bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="grid w-6 place-items-center text-navy-deep transition-colors hover:bg-secondary hover:text-orange"
        aria-label="Restar unidad"
      >
        <Minus className="h-3 w-3" />
      </button>
      <span className="grid flex-1 place-items-center border-x border-input font-display text-sm font-black text-navy-deep">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className="grid w-6 place-items-center text-navy-deep transition-colors hover:bg-secondary hover:text-orange"
        aria-label="Sumar unidad"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}

export function ProductCard({
  product,
  view = "grid",
  added = false,
  onAdd,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  if (view === "list") {
    return (
      <article className="group grid gap-5 rounded-lg border border-border bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-orange/50 sm:grid-cols-[220px_1fr_auto]">
        <Link
          to="/producto/$slug"
          params={{ slug: product.slug }}
          className="relative grid aspect-[4/3] overflow-hidden rounded-md bg-white p-4"
          aria-label={`Ver ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </Link>

        <div className="min-w-0">
          <div className="text-[11px] font-black uppercase tracking-[0.12em] text-orange">
            {product.category}
          </div>
          <Link
            to="/producto/$slug"
            params={{ slug: product.slug }}
            className="font-display mt-1 block text-xl font-black leading-tight text-navy-deep transition-colors group-hover:text-orange"
          >
            {product.name}
          </Link>
          <div className="mt-1 text-sm font-bold text-muted-foreground">
            {product.brand}
          </div>
          <p className="mt-4 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-4 sm:min-w-[210px] sm:items-end">
          <div className="sm:text-right">
            <div className="font-display text-2xl font-black text-navy-deep">
              {formatGs(product.price)}
            </div>
            <div className="mt-2">
              <Stock stock={product.stock} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
            <QuantityControl quantity={quantity} onChange={setQuantity} />
            <button
              type="button"
              onClick={() => onAdd?.(product, quantity)}
              className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#f6b800] px-4 font-display text-xs font-black text-navy-deep transition-colors hover:bg-orange hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/20"
            >
              {added ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
              {added ? "Agregado" : "Agregar"}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border bg-white shadow-soft transition-all hover:-translate-y-0.5 hover:border-orange/50 hover:shadow-strong">
      <Link
        to="/producto/$slug"
        params={{ slug: product.slug }}
        className="grid aspect-[1.08] overflow-hidden rounded-t-lg bg-white p-5"
        aria-label={`Ver ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4">
        <div className="text-[10px] font-black uppercase tracking-[0.12em] text-orange">
          {product.category}
        </div>
        <Link
          to="/producto/$slug"
          params={{ slug: product.slug }}
          className="font-display mt-1 line-clamp-2 min-h-[2.55em] text-base font-black leading-tight text-navy-deep transition-colors group-hover:text-orange"
        >
          {product.name}
        </Link>
        <div className="mt-1 text-xs font-bold text-muted-foreground">
          {product.brand}
        </div>

        <div className="mt-4">
          <div className="font-display text-xl font-black text-navy-deep">
            {formatGs(product.price)}
          </div>
          {product.oldPrice && (
            <div className="text-xs font-semibold text-muted-foreground line-through">
              {formatGs(product.oldPrice)}
            </div>
          )}
          <div className="mt-1">
            <Stock stock={product.stock} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 min-[380px]:flex-nowrap">
          <QuantityControl quantity={quantity} onChange={setQuantity} />
          <button
            type="button"
            onClick={() => onAdd?.(product, quantity)}
            className={`inline-flex h-9 min-w-[118px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-2 font-display text-[11px] font-black transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/20 ${
              added
                ? "bg-whatsapp/15 text-emerald-700"
                : "bg-[#f6b800] text-navy-deep hover:bg-orange hover:text-white"
            }`}
          >
            {added ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
            {added ? "Agregado" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </article>
  );
}
