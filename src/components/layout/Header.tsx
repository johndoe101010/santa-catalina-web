import { Link, useNavigate } from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  HelpCircle,
  Home,
  LayoutGrid,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  Tags,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { useCart } from "@/lib/cart";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site";
import logoSantaCatalina from "@/assets/santa-catalina-logo-transparent.png";

type SectionItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const SECTION_ITEMS: SectionItem[] = [
  { label: "Inicio", href: "/#inicio", icon: Home },
  { label: "Catálogo", href: "/catalogo", icon: LayoutGrid },
  { label: "Empresa", href: "/#empresa", icon: Building2 },
  { label: "Marcas", href: "/#marcas", icon: Tags },
  { label: "FAQ", href: "/#faq", icon: HelpCircle },
  { label: "Contacto", href: "/#contacto", icon: Phone },
];

const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const searchScore = (product: (typeof PRODUCTS)[number], query: string) => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return 0;

  const haystack = normalizeSearchText(
    `${product.name} ${product.brand} ${product.category} ${product.description} ${product.features.join(" ")}`,
  );
  const name = normalizeSearchText(product.name);
  const brand = normalizeSearchText(product.brand);
  const tokens = normalizedQuery.split(" ").filter(Boolean);

  let score = 0;
  if (name.includes(normalizedQuery)) score += 80;
  if (brand.includes(normalizedQuery)) score += 30;

  for (const token of tokens) {
    if (name.includes(token)) score += 14;
    else if (haystack.includes(token)) score += 5;
  }

  return score;
};

export function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && shellRef.current?.contains(target)) return;
      setSearchOpen(false);
      setMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim();
    if (q.length < 2) return [];

    return PRODUCTS.map((product) => ({
      product,
      score: searchScore(product, q),
    }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.product)
      .slice(0, 8);
  }, [searchQuery]);

  const submitSearch = (event?: React.FormEvent) => {
    event?.preventDefault();
    const q = searchQuery.trim();

    if (!q) {
      setSearchOpen(true);
      return;
    }

    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/catalogo", search: { q, categoria: "todos" } });
  };

  const handleSectionNav = (href: string) => {
    setMenuOpen(false);

    if (!href.startsWith("/#")) return;
    const id = href.split("#")[1];
    if (!id || typeof window === "undefined") return;

    if (window.location.pathname !== "/") {
      sessionStorage.setItem("santa-scroll-target", id);
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: id === "inicio" ? "start" : "center",
      });
    });
  };

  return (
    <header
      ref={shellRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background shadow-[0_8px_28px_rgba(6,22,79,0.08)]"
    >
      <div className="bg-card">
        <div className="mx-auto grid max-w-[1536px] grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:grid-cols-[52px_minmax(0,1fr)_auto] sm:px-6 lg:grid-cols-[430px_minmax(360px,640px)_300px] lg:gap-8 lg:py-4">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 -ml-2 justify-self-start items-center justify-center rounded-lg border border-border bg-white text-navy shadow-soft transition-colors hover:border-orange hover:text-orange focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/20 sm:h-12 sm:w-12 lg:col-start-1 lg:row-start-1 lg:ml+10 lg:w-auto lg:px-5"
            aria-expanded={menuOpen}
            aria-label="Abrir menú de categorías"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="ml-2 hidden font-display text-sm font-black lg:inline">
              Menú
            </span>
          </button>

          <Link
            to="/"
            className="group flex min-w-0 justify-self-start items-center gap-2 sm:gap-3 lg:col-start-1 lg:row-start-1 lg:ml-[112px] lg:w-fit lg:justify-start"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center bg-white transition-transform group-hover:-rotate-2 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
              <img
                src={logoSantaCatalina}
                alt="Santa Catalina"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-[15px] font-black text-navy-deep sm:text-xl lg:text-[25px]">
                {SITE.legalName}
              </span>
              <span className="block whitespace-nowrap text-[9px] font-black text-orange sm:text-xs lg:text-sm">
                {SITE.tagline}
              </span>
            </span>
          </Link>

          <form
            onSubmit={submitSearch}
            className="relative col-span-3 row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1"
          >
            <div className="flex h-12 overflow-hidden rounded-lg border border-input bg-white shadow-soft focus-within:border-orange focus-within:ring-4 focus-within:ring-orange/10 lg:h-14">
              <span className="grid w-12 shrink-0 place-items-center text-muted-foreground">
                <Search className="h-5 w-5" />
              </span>
              <input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder="Buscar producto"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="min-w-[88px] bg-[#f6b800] px-5 font-display text-sm font-black text-navy-deep transition-colors hover:bg-orange hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/20 sm:min-w-[110px] lg:min-w-[132px]"
              >
                Buscar
              </button>
            </div>

            {searchOpen && searchQuery.trim().length > 1 && (
              <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-[80] overflow-hidden rounded-xl border border-border bg-white shadow-strong">
                {searchResults.length > 0 ? (
                  <div className="max-h-[360px] overflow-auto p-2">
                    {searchResults.map((product) => (
                      <Link
                        key={product.slug}
                        to="/producto/$slug"
                        params={{ slug: product.slug }}
                        onClick={() => setSearchOpen(false)}
                        className="grid grid-cols-[58px_1fr_auto] items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-14 w-14 object-contain"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-[10px] font-black uppercase tracking-[0.16em] text-orange">
                            {product.brand}
                          </span>
                          <span className="block truncate text-sm font-black text-navy-deep">
                            {product.name}
                          </span>
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 text-sm text-muted-foreground">
                    No encontramos productos con esa búsqueda.
                  </div>
                )}
              </div>
            )}
          </form>

          <div className="flex items-center justify-end gap-2 lg:col-start-3 lg:row-start-1 lg:gap-3">
            <Link
              to="/"
              className="inline-flex h-11 w-11 items-center justify-center gap-2 rounded-lg border border-border bg-white font-display text-sm font-black text-navy shadow-soft transition-colors hover:border-orange hover:text-orange focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/20 sm:h-12 sm:w-12 lg:w-auto lg:px-5"
              aria-label="Inicio"
            >
              <Home className="h-5 w-5" />
              <span className="hidden lg:inline">Inicio</span>
            </Link>
            <Link
              to="/carrito"
              className="relative inline-flex h-11 w-11 items-center justify-center gap-2 rounded-lg border border-border bg-white font-display text-sm font-black text-navy shadow-soft transition-colors hover:border-orange hover:text-orange focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/20 sm:h-12 sm:w-12 lg:w-auto lg:px-5"
              aria-label="Carrito"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden lg:inline">Carrito</span>
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-6 min-w-6 place-items-center rounded-full bg-orange px-1 text-[11px] font-black text-white shadow-orange">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full z-[70] border-t border-border bg-white shadow-strong">
          <div className="mx-auto grid max-w-[1536px] gap-6 px-5 py-6 lg:grid-cols-[1fr_360px] lg:px-6">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-2xl font-black text-navy-deep">
                  Categorías
                </h2>
                <Link
                  to="/catalogo"
                  search={{ q: "", categoria: "todos" }}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-black text-orange"
                >
                  Ver catálogo <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    to="/categoria/$slug"
                    params={{ slug: category.slug }}
                    onClick={() => setMenuOpen(false)}
                    className="group grid grid-cols-[78px_1fr_auto] items-center gap-3 rounded-xl border border-border bg-background p-2 transition-colors hover:border-orange hover:bg-orange/5"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-16 w-20 rounded-lg object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-sm font-black text-navy-deep">
                        {category.name}
                      </span>
                      <span className="mt-1 block line-clamp-1 text-xs text-muted-foreground">
                        {category.blurb}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-orange" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-navy p-5 text-cream lg:p-6">
              <div className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-orange">
                Navegación
              </div>
              <div className="grid gap-2">
                {SECTION_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => handleSectionNav(item.href)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-cream/80 transition-colors hover:bg-white/10 hover:text-orange"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
