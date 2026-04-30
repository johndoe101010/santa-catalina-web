import { Link, useNavigate } from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  HelpCircle,
  Home,
  LayoutGrid,
  Menu,
  PackageSearch,
  Phone,
  Search,
  ShoppingCart,
  Tags,
  X,
} from "lucide-react";
import { type ComponentType, type KeyboardEvent, type MouseEvent, type WheelEvent, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useCart } from "@/lib/cart";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site";
import { motion, AnimatePresence } from "framer-motion";
import logoSantaCatalina from "@/assets/santa-catalina-logo-transparent.png";

type SectionItem = { label: string; href: string; icon: ComponentType<{ className?: string }> };

type CategoryGroup = {
  slug: string;
  name: string;
  description: string;
  subcategories: string[];
};

const SECTION_ITEMS: SectionItem[] = [
  { label: "Inicio", href: "/#inicio", icon: Home },
  { label: "Catálogo", href: "/catalogo", icon: LayoutGrid },
  { label: "Empresa", href: "/#empresa", icon: Building2 },
  { label: "Marcas", href: "/#marcas", icon: Tags },
  { label: "FAQ", href: "/#faq", icon: HelpCircle },
  { label: "Contacto", href: "/#contacto", icon: Phone },
];

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    slug: "herramientas-manuales",
    name: "Herramientas manuales",
    description: "Martillos, llaves, destornilladores y medición.",
    subcategories: ["Martillos y mazas", "Destornilladores", "Llaves", "Cintas y niveles", "Cajas de herramientas"],
  },
  {
    slug: "herramientas-electricas",
    name: "Herramientas eléctricas",
    description: "Taladros, amoladoras, sierras y equipos eléctricos.",
    subcategories: ["Taladros", "Amoladoras", "Sierras", "Caladoras", "Atornilladores", "Pistolas de calor", "Lijadoras"],
  },
  {
    slug: "construccion",
    name: "Construcción",
    description: "Materiales para obra gruesa y terminaciones.",
    subcategories: ["Cemento y cal", "Hierros y mallas", "Ladrillos", "Arena y piedra", "Alambres"],
  },
  {
    slug: "pinturas",
    name: "Pinturas",
    description: "Pinturas, rodillos, selladores y accesorios.",
    subcategories: ["Látex", "Esmaltes", "Rodillos y pinceles", "Siliconas y selladores", "Masillas e impermeabilizantes"],
  },
  {
    slug: "hogar-deco",
    name: "Hogar y deco",
    description: "Soluciones para casa, terminación y decoración.",
    subcategories: ["Cerámicas", "Espejos", "Accesorios de baño", "Repisas y organización", "Decoración"],
  },
  {
    slug: "campo-jardin",
    name: "Campo y jardín",
    description: "Herramientas para jardín, campo y mantenimiento.",
    subcategories: ["Machetes", "Palas y azadas", "Mangueras", "Motosierras", "Carretillas", "Rastrillos y regaderas"],
  },
  {
    slug: "electricidad",
    name: "Electricidad",
    description: "Cables, llaves, térmicas y accesorios eléctricos.",
    subcategories: ["Cables", "Llaves de luz", "Térmicas y disyuntores", "Tomacorrientes", "Cajas de embutir"],
  },
  {
    slug: "iluminacion",
    name: "Iluminación",
    description: "Focos, paneles, tubos y lámparas LED.",
    subcategories: ["Paneles LED", "Focos LED", "Tubos LED", "Lámparas colgantes", "Reflectores"],
  },
  {
    slug: "plomeria",
    name: "Plomería",
    description: "Caños, conexiones, pegamentos, flexibles y desagüe.",
    subcategories: ["Caños PVC", "Conexiones PVC", "Pegamento PVC", "Rejillas", "Flexibles", "Duchas", "Grifería"],
  },
  {
    slug: "sanitarios-griferia",
    name: "Sanitarios y grifería",
    description: "Inodoros, lavatorios, duchas, grifos y accesorios de baño.",
    subcategories: ["Inodoros", "Lavatorios", "Bachas", "Grifos", "Duchas", "Accesorios de baño"],
  },
  {
    slug: "ferreteria-general",
    name: "Ferretería general",
    description: "Tornillos, bisagras, candados, cerraduras y herrajes.",
    subcategories: ["Tornillos", "Tarugos", "Bisagras", "Candados", "Cerraduras", "Picaportes"],
  },
  {
    slug: "seguridad-industrial",
    name: "Seguridad industrial",
    description: "EPP para obra, taller y trabajo diario.",
    subcategories: ["Cascos", "Guantes", "Lentes", "Máscaras", "Chalecos", "Botines"],
  },
  {
    slug: "automotor",
    name: "Automotor",
    description: "Aceites, baterías, bidones y mantenimiento vehicular.",
    subcategories: ["Aceites", "Baterías", "Bidones", "Refrigerantes", "Líquido de frenos", "Escaleras"],
  },
];

const SUBCATEGORY_TARGETS: Record<string, { q: string; categoria?: string }> = {
  "Martillos y mazas": { q: "martillo maza" },
  "Destornilladores": { q: "destornillador" },
  "Llaves": { q: "llave" },
  "Cintas y niveles": { q: "cinta nivel" },
  "Cajas de herramientas": { q: "caja herramientas" },
  "Taladros": { q: "taladro rotomartillo" },
  "Amoladoras": { q: "amoladora" },
  "Sierras": { q: "sierra" },
  "Caladoras": { q: "caladora" },
  "Atornilladores": { q: "atornillador" },
  "Pistolas de calor": { q: "pistola calor" },
  "Lijadoras": { q: "lijadora" },
  "Cemento y cal": { q: "cemento cal" },
  "Hierros y mallas": { q: "hierro malla" },
  "Ladrillos": { q: "ladrillo" },
  "Arena y piedra": { q: "arena piedra" },
  "Alambres": { q: "alambre" },
  "Látex": { q: "latex pintura" },
  "Esmaltes": { q: "esmalte" },
  "Rodillos y pinceles": { q: "rodillo pincel" },
  "Siliconas y selladores": { q: "silicona sellador" },
  "Masillas e impermeabilizantes": { q: "masilla impermeabilizante" },
  "Cerámicas": { q: "ceramica" },
  "Espejos": { q: "espejo" },
  "Accesorios de baño": { q: "toallas portarrollo baño asiento" },
  "Repisas y organización": { q: "repisa organizador" },
  "Decoración": { q: "cuadro alfombra cortinero" },
  "Machetes": { q: "machete" },
  "Palas y azadas": { q: "pala azada" },
  "Mangueras": { q: "manguera" },
  "Motosierras": { q: "motosierra" },
  "Carretillas": { q: "carretilla" },
  "Rastrillos y regaderas": { q: "rastrillo regadera" },
  "Cables": { q: "cable" },
  "Llaves de luz": { q: "llave luz" },
  "Térmicas y disyuntores": { q: "termica disyuntor" },
  "Tomacorrientes": { q: "tomacorriente" },
  "Cajas de embutir": { q: "caja embutir" },
  "Paneles LED": { q: "panel led" },
  "Focos LED": { q: "foco led" },
  "Tubos LED": { q: "tubo led" },
  "Lámparas colgantes": { q: "lampara colgante" },
  "Reflectores": { q: "reflector" },
  "Caños PVC": { q: "caño pvc" },
  "Conexiones PVC": { q: "conexion pvc" },
  "Pegamento PVC": { q: "pegamento pvc" },
  "Rejillas": { q: "rejilla" },
  "Flexibles": { q: "flexible" },
  "Grifería": { q: "grifo griferia", categoria: "sanitarios-griferia" },
  "Inodoros": { q: "inodoro" },
  "Lavatorios": { q: "lavatorio" },
  "Bachas": { q: "bacha" },
  "Grifos": { q: "grifo" },
  "Duchas": { q: "ducha", categoria: "sanitarios-griferia" },
  "Tornillos": { q: "tornillo" },
  "Tarugos": { q: "tarugo" },
  "Bisagras": { q: "bisagra" },
  "Candados": { q: "candado" },
  "Cerraduras": { q: "cerradura" },
  "Picaportes": { q: "picaporte" },
  "Cascos": { q: "casco" },
  "Guantes": { q: "guante" },
  "Lentes": { q: "lente" },
  "Máscaras": { q: "mascara" },
  "Chalecos": { q: "chaleco" },
  "Botines": { q: "botin" },
  "Aceites": { q: "aceite" },
  "Baterías": { q: "bateria" },
  "Bidones": { q: "bidon" },
  "Refrigerantes": { q: "refrigerante" },
  "Líquido de frenos": { q: "frenos" },
  "Escaleras": { q: "escalera" },
};

const getSubcategoryTarget = (groupSlug: string, subcategory: string) => {
  const target = SUBCATEGORY_TARGETS[subcategory] ?? { q: subcategory };
  return { q: target.q, categoria: target.categoria ?? groupSlug };
};

const categoryName = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const searchTokens = (query: string) => {
  const base = normalizeSearchText(query)
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length > 1);

  const expanded = base.flatMap((token) => {
    const forms = [token];
    if (token.endsWith("es") && token.length > 4) forms.push(token.slice(0, -2));
    if (token.endsWith("s") && token.length > 3) forms.push(token.slice(0, -1));
    return forms;
  });

  return Array.from(new Set(expanded));
};

const productSearchScore = (product: (typeof PRODUCTS)[number], query: string) => {
  const normalizedQuery = normalizeSearchText(query);
  const tokens = searchTokens(query);
  if (!normalizedQuery || tokens.length === 0) return 0;

  const name = normalizeSearchText(product.name);
  const brand = normalizeSearchText(product.brand);
  const category = normalizeSearchText(product.category);
  const categorySlug = normalizeSearchText(product.categorySlug);
  const slug = normalizeSearchText(product.slug);
  const details = normalizeSearchText(`${product.description} ${product.features.join(" ")}`);
  const haystack = `${name} ${brand} ${category} ${categorySlug} ${slug} ${details}`;

  let score = 0;
  if (name.includes(normalizedQuery)) score += 90;
  if (slug.includes(normalizedQuery)) score += 80;
  if (brand.includes(normalizedQuery)) score += 45;
  if (category.includes(normalizedQuery) || categorySlug.includes(normalizedQuery)) score += 35;

  for (const token of tokens) {
    if (name.includes(token)) score += 18;
    else if (slug.includes(token)) score += 14;
    else if (brand.includes(token) || category.includes(token) || categorySlug.includes(token)) score += 10;
    else if (haystack.includes(token)) score += 4;
  }

  return score;
};

export function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORY_GROUPS[0].slug);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchShellRef = useRef<HTMLDivElement | null>(null);
  const searchScrollSnapshot = useRef<{ x: number; y: number } | null>(null);
  const searchScrollLockRaf = useRef<number | null>(null);
  const searchScrollLockTimer = useRef<number | null>(null);
  const searchScrollBehavior = useRef<string | null>(null);
  const searchScrollLockUntil = useRef(0);
  const searchPointerSelecting = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);

  const activeGroup = CATEGORY_GROUPS.find((group) => group.slug === activeCategory) ?? CATEGORY_GROUPS[0];

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (menuButtonRef.current?.contains(target)) return;
      if (menuPanelRef.current?.contains(target)) return;
      setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim();
    if (q.length < 2) return [];
    return PRODUCTS.map((product) => ({ product, score: productSearchScore(product, q) }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((result) => result.product)
      .slice(0, 8);
  }, [searchQuery]);

  const restoreSearchScroll = (snapshot: { x: number; y: number }) => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;

    if (searchScrollBehavior.current === null) {
      searchScrollBehavior.current = html.style.scrollBehavior;
    }

    if (searchScrollLockRaf.current !== null) {
      cancelAnimationFrame(searchScrollLockRaf.current);
      searchScrollLockRaf.current = null;
    }

    if (searchScrollLockTimer.current !== null) {
      window.clearTimeout(searchScrollLockTimer.current);
      searchScrollLockTimer.current = null;
    }

    const keepScrollStable = () => {
      const target = searchScrollSnapshot.current ?? snapshot;
      html.style.scrollBehavior = "auto";

      if (window.scrollX !== target.x || window.scrollY !== target.y) {
        window.scrollTo(target.x, target.y);
      }

      if (performance.now() < searchScrollLockUntil.current || searchPointerSelecting.current) {
        searchScrollLockRaf.current = requestAnimationFrame(keepScrollStable);
        return;
      }

      searchScrollLockRaf.current = null;
      html.style.scrollBehavior = searchScrollBehavior.current ?? "";
      searchScrollBehavior.current = null;
      searchScrollSnapshot.current = null;
    };

    keepScrollStable();
  };

  const startSearchScrollLock = (options?: { reset?: boolean; duration?: number }) => {
    if (typeof window === "undefined") return null;

    if (options?.reset || searchScrollSnapshot.current === null) {
      searchScrollSnapshot.current = { x: window.scrollX, y: window.scrollY };
    }

    const snapshot = searchScrollSnapshot.current;
    searchScrollLockUntil.current = Math.max(
      searchScrollLockUntil.current,
      performance.now() + (options?.duration ?? 900),
    );

    restoreSearchScroll(snapshot);
    return snapshot;
  };

  const releaseSearchScrollLock = () => {
    if (typeof window === "undefined") return;

    searchScrollLockUntil.current = 0;
    searchPointerSelecting.current = false;

    if (searchScrollLockRaf.current !== null) {
      cancelAnimationFrame(searchScrollLockRaf.current);
      searchScrollLockRaf.current = null;
    }

    if (searchScrollLockTimer.current !== null) {
      window.clearTimeout(searchScrollLockTimer.current);
      searchScrollLockTimer.current = null;
    }

    document.documentElement.style.scrollBehavior = searchScrollBehavior.current ?? "";
    searchScrollBehavior.current = null;
    searchScrollSnapshot.current = null;
  };

  const scheduleSearchScrollRelease = () => {
    if (typeof window === "undefined") return;

    if (searchScrollLockTimer.current !== null) {
      window.clearTimeout(searchScrollLockTimer.current);
    }

    searchScrollLockTimer.current = window.setTimeout(() => {
      const activeElement = document.activeElement;
      const isSearchStillActive = activeElement instanceof HTMLElement && searchShellRef.current?.contains(activeElement);

      if (!isSearchStillActive && !searchPointerSelecting.current) {
        releaseSearchScrollLock();
      }
    }, 180);
  };

  const runSearchUpdateWithoutScroll = (update: () => void, resetSnapshot = false) => {
    if (typeof window === "undefined") {
      update();
      return;
    }

    const snapshot = startSearchScrollLock({ reset: resetSnapshot, duration: 1000 });
    flushSync(update);

    if (snapshot) {
      searchScrollSnapshot.current = snapshot;
      startSearchScrollLock({ duration: 1000 });
    }
  };

  const handleSearchPointerDown = () => {
    if (typeof window === "undefined") return;

    searchPointerSelecting.current = true;
    startSearchScrollLock({ reset: true, duration: 1200 });

    window.addEventListener(
      "pointerup",
      () => {
        searchPointerSelecting.current = false;
        startSearchScrollLock({ duration: 260 });
        scheduleSearchScrollRelease();
      },
      { capture: true, once: true },
    );
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    startSearchScrollLock({ duration: 1000 });

    if (event.key === "Enter") {
      event.preventDefault();
      submitSearch(event);
    }
  };

  const submitSearch = (event?: { preventDefault: () => void }) => {
    event?.preventDefault();
    const q = searchQuery.trim();

    if (!q) {
      runSearchUpdateWithoutScroll(() => setSearchOpen(true));
      return;
    }

    releaseSearchScrollLock();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({
      to: "/catalogo",
      search: { q, categoria: "todos" },
    });
  };

  const handleSearchWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!searchOpen || searchQuery.trim().length === 0) return;

    const target = event.target as HTMLElement | null;
    if (target?.closest('[data-search-results-scroll="true"]')) return;

    event.preventDefault();
    event.stopPropagation();
    startSearchScrollLock({ duration: 500 });
  };

  const handleSearchResultsWheel = (event: WheelEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const canScroll = element.scrollHeight > element.clientHeight;
    const isAtTop = element.scrollTop <= 0;
    const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

    event.stopPropagation();
    startSearchScrollLock({ duration: 500 });

    if (!canScroll || (event.deltaY < 0 && isAtTop) || (event.deltaY > 0 && isAtBottom)) {
      event.preventDefault();
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const handleHomeNav = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();

    if (window.location.pathname !== "/") return;

    event.preventDefault();

    requestAnimationFrame(() => {
      document.getElementById("inicio")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleSectionNav = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) {
      closeMenu();
      return;
    }

    event.preventDefault();
    closeMenu();

    const id = href.split("#")[1];
    if (!id) return;

    if (window.location.pathname !== "/") {
      sessionStorage.setItem("santa-scroll-target", id);
      window.location.href = "/";
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
    <header ref={searchShellRef} className="sticky top-0 z-50 border-b border-border bg-background/96 shadow-soft [overflow-anchor:none]">
      <div className="mx-auto grid min-h-20 w-full max-w-[1360px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 sm:gap-3 sm:px-5 md:grid-cols-[auto_1fr_auto] lg:grid-cols-[420px_minmax(220px,1fr)_auto] lg:gap-4 xl:grid-cols-[470px_minmax(280px,540px)_260px]">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-card p-0 text-sm font-black text-foreground shadow-soft transition-colors hover:border-orange hover:text-orange min-[430px]:h-10 min-[430px]:w-10 sm:h-11 sm:w-auto sm:px-4"
            aria-expanded={menuOpen}
            aria-label="Abrir menú de categorías"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="hidden sm:inline">Menú</span>
          </button>

          <Link
            to="/"
            onClick={handleHomeNav}
            className="flex min-w-0 items-center gap-1 group min-[430px]:gap-2 sm:gap-3"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-transparent p-0 transition-transform group-hover:-rotate-3 min-[430px]:h-12 min-[430px]:w-12 sm:h-14 sm:w-14">
              <img src={logoSantaCatalina} alt="Santa Catalina" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 max-w-[190px] flex-1 leading-tight min-[390px]:max-w-[220px] sm:max-w-none">
              <div className="font-display whitespace-nowrap text-[15px] font-extrabold tracking-tight text-foreground sm:text-lg">{SITE.name}</div>
              <div className="whitespace-nowrap text-[10px] font-black leading-none text-orange sm:text-[11px] md:text-xs">{SITE.tagline}</div>
            </div>
          </Link>
        </div>

        <div
          onKeyDown={handleSearchKeyDown}
          onWheelCapture={handleSearchWheel}
          className="relative mx-auto hidden w-full max-w-[560px] md:block"
        >
          <div className="flex h-12 overflow-hidden rounded-md border border-input bg-card shadow-soft focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/15">
            <div className="grid w-12 place-items-center text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <input
              value={searchQuery}
              onPointerDown={handleSearchPointerDown}
              onSelect={() => startSearchScrollLock({ duration: 650 })}
              onBlur={scheduleSearchScrollRelease}
              onChange={(event) => {
                const value = event.target.value;
                runSearchUpdateWithoutScroll(() => {
                  setSearchQuery(value);
                  setSearchOpen(true);
                });
              }}
              onFocus={() => runSearchUpdateWithoutScroll(() => setSearchOpen(true), true)}
              type="text"
              autoComplete="off"
              spellCheck={false}
              placeholder="Estoy buscando..."
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onPointerDown={handleSearchPointerDown}
              onClick={submitSearch}
              className="bg-[#f6b800] px-7 text-sm font-black text-foreground transition-colors hover:bg-orange hover:text-white"
            >
              Buscar
            </button>
          </div>

          <AnimatePresence>
            {searchOpen && searchQuery.trim().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 right-0 top-[calc(100%+10px)] z-[70] overflow-hidden overscroll-contain rounded-2xl border border-border bg-card shadow-strong [overflow-anchor:none]"
              >
                <div className="flex items-center justify-between border-b border-border px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  <span>Resultados</span>
                  <button type="button" onClick={() => setSearchOpen(false)} className="text-orange hover:text-foreground">
                    Cerrar
                  </button>
                </div>
                {searchResults.length > 0 ? (
                  <div data-search-results-scroll="true" onWheelCapture={handleSearchResultsWheel} className="max-h-[390px] overflow-auto overscroll-contain p-2 [overflow-anchor:none]">
                    {searchResults.map((product) => (
                      <Link
                        key={product.slug}
                        to="/producto/$slug"
                        params={{ slug: product.slug }}
                        onClick={() => setSearchOpen(false)}
                        className="grid grid-cols-[56px_1fr_auto] items-center gap-3 rounded-xl p-2 transition-colors hover:bg-secondary"
                      >
                        <img src={product.image} alt={product.name} className="h-14 w-14 object-contain p-0" />
                        <span className="min-w-0">
                          <span className="block truncate text-[10px] font-black uppercase tracking-widest text-orange">{product.brand}</span>
                          <span className="block truncate text-sm font-bold text-foreground">{product.name}</span>
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 text-sm text-muted-foreground">No encontré productos con esa búsqueda.</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 justify-end gap-1.5 min-[430px]:gap-2">
          <Link
            to="/"
            onClick={handleHomeNav}
            className="inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-border bg-card p-0 font-black text-foreground shadow-soft transition-colors hover:border-orange hover:text-orange min-[430px]:h-10 min-[430px]:w-10 sm:h-11 sm:w-auto sm:px-4"
            aria-label="Volver al inicio"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Inicio</span>
          </Link>

          <Link
            to="/carrito"
            className="relative inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-border bg-card p-0 font-black text-foreground shadow-soft transition-colors hover:border-orange hover:text-orange min-[430px]:h-10 min-[430px]:w-10 sm:h-11 sm:w-auto sm:px-4"
            aria-label="Carrito"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Carrito</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-orange px-1 text-[10px] font-black text-white shadow-orange">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div
        onKeyDown={handleSearchKeyDown}
        onWheelCapture={handleSearchWheel}
        className="relative mx-auto block w-full max-w-[1360px] px-5 pb-4 md:hidden"
      >
        <div className="flex h-12 overflow-hidden rounded-md border border-input bg-card shadow-soft focus-within:border-orange">
          <input
            value={searchQuery}
            onPointerDown={handleSearchPointerDown}
            onSelect={() => startSearchScrollLock({ duration: 650 })}
            onBlur={scheduleSearchScrollRelease}
            onChange={(event) => {
              const value = event.target.value;
              runSearchUpdateWithoutScroll(() => {
                setSearchQuery(value);
                setSearchOpen(true);
              });
            }}
            onFocus={() => runSearchUpdateWithoutScroll(() => setSearchOpen(true), true)}
            type="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="Estoy buscando..."
            className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
          />
          <button
            type="button"
            onPointerDown={handleSearchPointerDown}
            onClick={submitSearch}
            className="bg-[#f6b800] px-5 text-sm font-black text-foreground"
          >
            Buscar
          </button>
        </div>

        <AnimatePresence>
          {searchOpen && searchQuery.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute left-5 right-5 top-[calc(100%-0.75rem)] z-[70] overflow-hidden overscroll-contain rounded-2xl border border-border bg-card shadow-strong [overflow-anchor:none]"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                <span>Resultados</span>
                <button type="button" onClick={() => setSearchOpen(false)} className="text-orange hover:text-foreground">
                  Cerrar
                </button>
              </div>
              {searchResults.length > 0 ? (
                <div data-search-results-scroll="true" onWheelCapture={handleSearchResultsWheel} className="max-h-[320px] overflow-auto overscroll-contain p-2 [overflow-anchor:none]">
                  {searchResults.map((product) => (
                    <Link
                      key={product.slug}
                      to="/producto/$slug"
                      params={{ slug: product.slug }}
                      onClick={() => setSearchOpen(false)}
                      className="grid grid-cols-[56px_1fr_auto] items-center gap-3 rounded-xl p-2 transition-colors hover:bg-secondary"
                    >
                      <img src={product.image} alt={product.name} className="h-14 w-14 object-contain p-0" />
                      <span className="min-w-0">
                        <span className="block truncate text-[10px] font-black uppercase tracking-widest text-orange">{product.brand}</span>
                        <span className="block truncate text-sm font-bold text-foreground">{product.name}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-5 text-sm text-muted-foreground">No encontré productos con esa búsqueda.</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {menuOpen && (
        <div
          className="absolute inset-x-0 top-full z-[60] h-[calc(100vh-80px)] overflow-auto bg-navy-deep/34"
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal de categorías"
        >
          <div ref={menuPanelRef} className="mx-auto max-w-[1360px] px-5 py-4">
              <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-strong lg:grid-cols-[330px_1fr]">
                <div className="border-b border-border bg-secondary/60 p-3 lg:border-b-0 lg:border-r">
                  <div className="mb-2 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Categorías</div>
                  <div className="grid gap-1">
                    {CATEGORY_GROUPS.map((group) => (
                      <Link
                        key={group.slug}
                        to="/categoria/$slug"
                        params={{ slug: group.slug }}
                        onMouseEnter={() => setActiveCategory(group.slug)}
                        onFocus={() => setActiveCategory(group.slug)}
                        onClick={closeMenu}
                        className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                          activeCategory === group.slug ? "bg-orange text-white" : "hover:bg-card hover:text-orange"
                        }`}
                      >
                        <span>{group.name}</span>
                        <ChevronRight className="h-4 w-4 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 p-5 lg:grid-cols-[1fr_280px] lg:p-7">
                  <div>
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-widest text-orange">{categoryName(activeGroup.slug)}</div>
                        <h3 className="font-display text-2xl font-black text-foreground">{activeGroup.name}</h3>
                        <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">{activeGroup.description}</p>
                      </div>
                      <Link
                        to="/categoria/$slug"
                        params={{ slug: activeGroup.slug }}
                        onClick={closeMenu}
                        className="hidden rounded-full bg-gradient-orange px-5 py-2.5 text-sm font-black text-white shadow-orange transition-transform hover:-translate-y-0.5 sm:inline-flex"
                      >
                        Ver categoría
                      </Link>
                    </div>

                    <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                      {activeGroup.subcategories.map((sub) => {
                        const target = getSubcategoryTarget(activeGroup.slug, sub);
                        return (
                          <Link
                            key={sub}
                            to="/catalogo"
                            search={target}
                            onClick={closeMenu}
                            className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm font-semibold transition-colors hover:border-orange hover:text-orange"
                          >
                            {sub}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-gradient-navy p-5 text-cream shadow-strong">
                    <div className="mb-4 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-orange">
                      <PackageSearch className="h-4 w-4" /> Secciones
                    </div>
                    <div className="grid gap-1">
                      {SECTION_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={(event) => handleSectionNav(event, item.href)}
                            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-cream/80 transition-colors hover:bg-cream/10 hover:text-orange"
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            {item.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}
    </header>
  );
}
