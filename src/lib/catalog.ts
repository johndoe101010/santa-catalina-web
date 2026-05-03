import { PRODUCTS as BASE_PRODUCTS, type Product } from "@/lib/products";

export * from "@/lib/products";

type ProductStock = Product["stock"];
type ProductTuple = [
  name: string,
  brand: string,
  price: number,
  category: string,
  categorySlug: string,
  stock: ProductStock,
  features: string[],
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const categoryUseText: Record<string, string> = {
  "herramientas-manuales": "trabajos de instalación, reparación, mantenimiento y uso frecuente en obra o taller",
  "herramientas-electricas": "perforación, corte, desbaste, montaje y trabajos exigentes de obra o taller",
  construccion: "obras, estructuras, cerramientos, reparaciones y trabajos de construcción general",
  pinturas: "terminaciones, repintado, protección de superficies y mantenimiento residencial o profesional",
  "hogar-y-deco": "equipamiento del hogar, organización, confort y uso cotidiano",
  "campo-y-jardin": "jardinería, mantenimiento de espacios verdes, poda, limpieza y tareas rurales",
  electricidad: "instalaciones eléctricas, mantenimiento, protección y armado de circuitos",
  iluminacion: "iluminación interior, exterior, decorativa y funcional",
  plomeria: "instalaciones sanitarias, conducción de agua, reparaciones y mantenimiento",
  "sanitarios-y-griferia": "baños, cocinas, lavaderos y terminaciones sanitarias",
  "ferreteria-general": "sujeción, fijación, armado, reposición y trabajos generales de ferretería",
  "seguridad-industrial": "protección personal, seguridad laboral y tareas de obra o mantenimiento",
};

const toProduct = ([name, brand, price, category, categorySlug, stock, features]: ProductTuple): Product => {
  const slug = slugify(name);
  return {
    slug,
    name,
    brand,
    price,
    image: `/products/${slug}.webp`,
    category,
    categorySlug,
    stock,
    features,
    description: `${name} de ${brand}, seleccionado para ${categoryUseText[categorySlug] ?? "trabajos generales de ferretería"}. Producto incorporado al catálogo de Santa Catalina para consulta, presupuesto y coordinación por WhatsApp.`,
  };
};

const PRODUCT_ROWS: ProductTuple[] = [
  ["Taladro percutor DeWalt DCD778 20V", "DeWalt", 1450000, "Herramientas eléctricas", "herramientas-electricas", "disponible", ["20V", "Percutor", "DeWalt", "Uso profesional"]],
  ["Taladro atornillador DeWalt DCD794 20V Atomic", "DeWalt", 1320000, "Herramientas eléctricas", "herramientas-electricas", "disponible", ["20V", "Brushless", "Compacto", "DeWalt"]],
  ["Amoladora DeWalt DCG413B 4-1/2 pulgadas 20V", "DeWalt", 1580000, "Herramientas eléctricas", "herramientas-electricas", "disponible", ["20V", "4-1/2 pulgadas", "Brushless", "DeWalt"]],
  ["Sierra caladora DeWalt DCS331B 20V", "DeWalt", 1390000, "Herramientas eléctricas", "herramientas-electricas", "consultar", ["20V", "Caladora", "Corte preciso", "DeWalt"]],
  ["Sierra circular DeWalt DCS570B 7-1/4 pulgadas", "DeWalt", 1780000, "Herramientas eléctricas", "herramientas-electricas", "consultar", ["7-1/4 pulgadas", "Circular", "Corte madera", "DeWalt"]],
  ["Rotomartillo SDS Plus DeWalt DCH133B 20V", "DeWalt", 2250000, "Herramientas eléctricas", "herramientas-electricas", "consultar", ["SDS Plus", "20V", "Hormigón", "DeWalt"]],
  ["Lijadora orbital DeWalt DWE6423 5 pulgadas", "DeWalt", 690000, "Herramientas eléctricas", "herramientas-electricas", "disponible", ["5 pulgadas", "Orbital", "Terminación", "DeWalt"]],
  ["Cepillo eléctrico DeWalt D26676 3-1/4 pulgadas", "DeWalt", 980000, "Herramientas eléctricas", "herramientas-electricas", "consultar", ["3-1/4 pulgadas", "Cepillado", "Madera", "DeWalt"]],
  ["Multiherramienta oscilante DeWalt DCS356B 20V", "DeWalt", 1280000, "Herramientas eléctricas", "herramientas-electricas", "ultimas", ["20V", "Oscilante", "Corte y lijado", "DeWalt"]],
  ["Set puntas DeWalt Maxfit 35 piezas", "DeWalt", 145000, "Herramientas manuales", "herramientas-manuales", "disponible", ["35 piezas", "Puntas", "Atornillado", "DeWalt"]],

  ["Motosierra STIHL MS 170", "STIHL", 1850000, "Campo y jardín", "campo-y-jardin", "disponible", ["Motosierra", "Uso doméstico", "Poda", "STIHL"]],
  ["Motosierra STIHL MS 180", "STIHL", 2150000, "Campo y jardín", "campo-y-jardin", "consultar", ["Motosierra", "Corte madera", "Liviana", "STIHL"]],
  ["Desmalezadora STIHL FS 55", "STIHL", 2450000, "Campo y jardín", "campo-y-jardin", "disponible", ["Desmalezadora", "Jardín", "Rural", "STIHL"]],
  ["Desmalezadora STIHL FS 120", "STIHL", 3850000, "Campo y jardín", "campo-y-jardin", "consultar", ["Desmalezadora", "Alto rendimiento", "Profesional", "STIHL"]],
  ["Soplador STIHL BG 50", "STIHL", 1650000, "Campo y jardín", "campo-y-jardin", "disponible", ["Soplador", "Limpieza", "Jardín", "STIHL"]],
  ["Hidrolavadora STIHL RE 90", "STIHL", 2450000, "Campo y jardín", "campo-y-jardin", "consultar", ["Hidrolavadora", "Limpieza", "Alta presión", "STIHL"]],
  ["Cortasetos STIHL HS 45", "STIHL", 2850000, "Campo y jardín", "campo-y-jardin", "consultar", ["Cortasetos", "Poda", "Jardín", "STIHL"]],
  ["Pulverizador STIHL SG 51", "STIHL", 650000, "Campo y jardín", "campo-y-jardin", "disponible", ["Pulverizador", "Agrícola", "Manual", "STIHL"]],
  ["Aceite STIHL HP 2 tiempos 1L", "STIHL", 95000, "Ferretería general", "ferreteria-general", "disponible", ["2 tiempos", "1L", "Lubricación", "STIHL"]],
  ["Cadena STIHL Oilomatic 3/8 pulgadas", "STIHL", 185000, "Ferretería general", "ferreteria-general", "disponible", ["Cadena", "3/8 pulgadas", "Reposición", "STIHL"]],

  ["Pala punta huevo Corona", "CORONA", 115000, "Campo y jardín", "campo-y-jardin", "disponible", ["Pala", "Jardín", "Obra", "Corona"]],
  ["Pala ancha Corona mango madera", "CORONA", 125000, "Campo y jardín", "campo-y-jardin", "disponible", ["Pala", "Mango madera", "Tierra", "Corona"]],
  ["Azada Corona 2.5 lb", "CORONA", 98000, "Campo y jardín", "campo-y-jardin", "disponible", ["Azada", "Jardinería", "Cultivo", "Corona"]],
  ["Rastrillo metálico Corona 14 dientes", "CORONA", 85000, "Campo y jardín", "campo-y-jardin", "disponible", ["Rastrillo", "14 dientes", "Limpieza", "Corona"]],
  ["Tijera de podar Corona bypass 8 pulgadas", "CORONA", 155000, "Campo y jardín", "campo-y-jardin", "ultimas", ["Poda", "Bypass", "8 pulgadas", "Corona"]],
  ["Serrucho de poda Corona 13 pulgadas", "CORONA", 185000, "Campo y jardín", "campo-y-jardin", "consultar", ["Serrucho", "Poda", "13 pulgadas", "Corona"]],
  ["Escardillo Corona mango madera", "CORONA", 76000, "Campo y jardín", "campo-y-jardin", "disponible", ["Escardillo", "Jardinería", "Mango madera", "Corona"]],
  ["Barreta Corona hexagonal 1.50 m", "CORONA", 245000, "Construcción", "construccion", "consultar", ["Barreta", "1.50 m", "Acero", "Corona"]],
  ["Horquilla Corona 4 dientes", "CORONA", 135000, "Campo y jardín", "campo-y-jardin", "consultar", ["Horquilla", "4 dientes", "Jardín", "Corona"]],
  ["Carretilla Corona reforzada 90 L", "CORONA", 520000, "Construcción", "construccion", "consultar", ["90 L", "Reforzada", "Obra", "Corona"]],

  ["Termo Bambi acero inoxidable 1L", "BAMBI", 145000, "Hogar y deco", "hogar-y-deco", "disponible", ["1L", "Acero inoxidable", "Hogar", "Bambi"]],
  ["Conservadora Bambi 20L", "BAMBI", 285000, "Hogar y deco", "hogar-y-deco", "disponible", ["20L", "Conservadora", "Camping", "Bambi"]],
  ["Conservadora Bambi 34L", "BAMBI", 395000, "Hogar y deco", "hogar-y-deco", "consultar", ["34L", "Conservadora", "Exterior", "Bambi"]],
  ["Bidón térmico Bambi 5L", "BAMBI", 210000, "Hogar y deco", "hogar-y-deco", "disponible", ["5L", "Térmico", "Agua", "Bambi"]],
  ["Jarra térmica Bambi 2L", "BAMBI", 125000, "Hogar y deco", "hogar-y-deco", "disponible", ["2L", "Jarra", "Térmica", "Bambi"]],
  ["Caja organizadora Bambi 30L", "BAMBI", 95000, "Hogar y deco", "hogar-y-deco", "disponible", ["30L", "Organización", "Plástico", "Bambi"]],
  ["Caja organizadora Bambi 60L", "BAMBI", 145000, "Hogar y deco", "hogar-y-deco", "consultar", ["60L", "Organización", "Hogar", "Bambi"]],
  ["Cesto multiuso Bambi 45L", "BAMBI", 78000, "Hogar y deco", "hogar-y-deco", "disponible", ["45L", "Multiuso", "Plástico", "Bambi"]],
  ["Baldes plásticos Bambi 12L", "BAMBI", 32000, "Hogar y deco", "hogar-y-deco", "disponible", ["12L", "Balde", "Limpieza", "Bambi"]],
  ["Set hermético Bambi cocina x3", "BAMBI", 68000, "Hogar y deco", "hogar-y-deco", "disponible", ["x3", "Hermético", "Cocina", "Bambi"]],

  ["Pintura látex Suvinil interior 18L", "SUVINIL", 485000, "Pinturas", "pinturas", "disponible", ["18L", "Interior", "Látex", "Suvinil"]],
  ["Pintura látex Suvinil exterior 18L", "SUVINIL", 565000, "Pinturas", "pinturas", "disponible", ["18L", "Exterior", "Látex", "Suvinil"]],
  ["Suvinil Toque de Seda 3.6L", "SUVINIL", 245000, "Pinturas", "pinturas", "consultar", ["3.6L", "Satinado", "Interior", "Suvinil"]],
  ["Suvinil Acrílico Premium 18L", "SUVINIL", 685000, "Pinturas", "pinturas", "consultar", ["18L", "Premium", "Acrílico", "Suvinil"]],
  ["Suvinil Esmalte sintético brillante 3.6L", "SUVINIL", 185000, "Pinturas", "pinturas", "disponible", ["3.6L", "Esmalte", "Brillante", "Suvinil"]],
  ["Suvinil Fondo preparador 18L", "SUVINIL", 430000, "Pinturas", "pinturas", "consultar", ["18L", "Fondo", "Preparador", "Suvinil"]],
  ["Suvinil Sellador acrílico 18L", "SUVINIL", 365000, "Pinturas", "pinturas", "disponible", ["18L", "Sellador", "Acrílico", "Suvinil"]],
  ["Suvinil Masa corrida interior 25kg", "SUVINIL", 165000, "Pinturas", "pinturas", "disponible", ["25kg", "Masa corrida", "Interior", "Suvinil"]],
  ["Suvinil Barniz marítimo 3.6L", "SUVINIL", 215000, "Pinturas", "pinturas", "consultar", ["3.6L", "Barniz", "Madera", "Suvinil"]],
  ["Suvinil Impermeabilizante manta líquida 18L", "SUVINIL", 620000, "Pinturas", "pinturas", "consultar", ["18L", "Impermeabilizante", "Techos", "Suvinil"]],

  ["Taladro percutor Truper 1/2 pulgadas 650W", "Truper", 365000, "Herramientas eléctricas", "herramientas-electricas", "disponible", ["650W", "1/2 pulgadas", "Percutor", "Truper"]],
  ["Amoladora angular Truper 4-1/2 pulgadas 900W", "Truper", 420000, "Herramientas eléctricas", "herramientas-electricas", "disponible", ["900W", "4-1/2 pulgadas", "Corte", "Truper"]],
  ["Sierra circular Truper 7-1/4 pulgadas 1400W", "Truper", 580000, "Herramientas eléctricas", "herramientas-electricas", "consultar", ["1400W", "7-1/4 pulgadas", "Madera", "Truper"]],
  ["Hidrolavadora Truper 1600 PSI", "Truper", 780000, "Campo y jardín", "campo-y-jardin", "consultar", ["1600 PSI", "Limpieza", "Agua", "Truper"]],
  ["Compresor Truper 25L 2HP", "Truper", 1350000, "Herramientas eléctricas", "herramientas-electricas", "consultar", ["25L", "2HP", "Compresor", "Truper"]],
  ["Juego de dados Truper 40 piezas", "Truper", 210000, "Herramientas manuales", "herramientas-manuales", "disponible", ["40 piezas", "Dados", "Mecánica", "Truper"]],
  ["Pinza amperimétrica Truper digital", "Truper", 245000, "Electricidad", "electricidad", "disponible", ["Digital", "Medición", "Electricidad", "Truper"]],
  ["Escalera aluminio Truper tijera 6 peldaños", "Truper", 485000, "Ferretería general", "ferreteria-general", "consultar", ["6 peldaños", "Aluminio", "Tijera", "Truper"]],
  ["Soldadora inversora Truper 130A", "Truper", 720000, "Herramientas eléctricas", "herramientas-electricas", "consultar", ["130A", "Inversora", "Soldadura", "Truper"]],
  ["Caja organizadora Truper 19 pulgadas", "Truper", 155000, "Herramientas manuales", "herramientas-manuales", "disponible", ["19 pulgadas", "Organización", "Herramientas", "Truper"]],

  ["Motosierra Husqvarna 120 Mark II", "HUSQVARNA", 1950000, "Campo y jardín", "campo-y-jardin", "disponible", ["Motosierra", "Uso doméstico", "Corte", "Husqvarna"]],
  ["Motosierra Husqvarna 365", "HUSQVARNA", 4850000, "Campo y jardín", "campo-y-jardin", "consultar", ["Motosierra", "Profesional", "Forestal", "Husqvarna"]],
  ["Desmalezadora Husqvarna 143R-II", "HUSQVARNA", 3950000, "Campo y jardín", "campo-y-jardin", "consultar", ["Desmalezadora", "Profesional", "Rural", "Husqvarna"]],
  ["Soplador Husqvarna 125B", "HUSQVARNA", 1850000, "Campo y jardín", "campo-y-jardin", "disponible", ["Soplador", "Hojas", "Jardín", "Husqvarna"]],
  ["Cortacésped Husqvarna LC 140P", "HUSQVARNA", 3250000, "Campo y jardín", "campo-y-jardin", "consultar", ["Cortacésped", "Empuje", "Jardín", "Husqvarna"]],
  ["Cortasetos Husqvarna 122HD60", "HUSQVARNA", 2950000, "Campo y jardín", "campo-y-jardin", "consultar", ["Cortasetos", "Poda", "Jardín", "Husqvarna"]],
  ["Podadora de altura Husqvarna 525P5S", "HUSQVARNA", 4950000, "Campo y jardín", "campo-y-jardin", "consultar", ["Altura", "Poda", "Profesional", "Husqvarna"]],
  ["Aceite Husqvarna XP 2 tiempos 1L", "HUSQVARNA", 98000, "Ferretería general", "ferreteria-general", "disponible", ["1L", "2 tiempos", "Lubricación", "Husqvarna"]],
  ["Cadena Husqvarna X-Cut 18 pulgadas", "HUSQVARNA", 210000, "Ferretería general", "ferreteria-general", "consultar", ["18 pulgadas", "Cadena", "Reposición", "Husqvarna"]],
  ["Casco forestal Husqvarna Classic", "HUSQVARNA", 385000, "Seguridad industrial", "seguridad-industrial", "disponible", ["Casco", "Forestal", "Protección", "Husqvarna"]],

  ["Alambre ovalado Belgo Fort 500m", "BELGO ARAMES", 485000, "Construcción", "construccion", "disponible", ["500m", "Ovalado", "Cercado", "Belgo"]],
  ["Alambre galvanizado Belgo 14 BWG", "BELGO ARAMES", 285000, "Construcción", "construccion", "disponible", ["14 BWG", "Galvanizado", "Cercado", "Belgo"]],
  ["Alambre galvanizado Belgo 16 BWG", "BELGO ARAMES", 245000, "Construcción", "construccion", "disponible", ["16 BWG", "Galvanizado", "Ataduras", "Belgo"]],
  ["Malla electrosoldada Belgo 15x15", "BELGO ARAMES", 395000, "Construcción", "construccion", "consultar", ["15x15", "Malla", "Hormigón", "Belgo"]],
  ["Malla hexagonal Belgo gallinero 1m", "BELGO ARAMES", 185000, "Construcción", "construccion", "disponible", ["1m", "Hexagonal", "Cercado", "Belgo"]],
  ["Clavo Belgo con cabeza 2.5 pulgadas", "BELGO ARAMES", 18000, "Ferretería general", "ferreteria-general", "disponible", ["2.5 pulgadas", "Clavo", "Fijación", "Belgo"]],
  ["Grapa galvanizada Belgo para cerco", "BELGO ARAMES", 32000, "Ferretería general", "ferreteria-general", "disponible", ["Grapa", "Galvanizada", "Cercos", "Belgo"]],
  ["Varilla trefilada Belgo 4.2mm", "BELGO ARAMES", 65000, "Construcción", "construccion", "consultar", ["4.2mm", "Trefilada", "Obra", "Belgo"]],
  ["Rollo de alambre recocido Belgo N18", "BELGO ARAMES", 95000, "Construcción", "construccion", "disponible", ["N18", "Recocido", "Ataduras", "Belgo"]],
  ["Malla ganadera Belgo galvanizada", "BELGO ARAMES", 320000, "Construcción", "construccion", "consultar", ["Malla", "Galvanizada", "Campo", "Belgo"]],

  ["Interruptor simple Fascy línea modular", "FASCY", 18000, "Electricidad", "electricidad", "disponible", ["Modular", "Interruptor", "Instalación", "Fascy"]],
  ["Tomacorriente 10A Fascy modular", "FASCY", 22000, "Electricidad", "electricidad", "disponible", ["10A", "Toma", "Modular", "Fascy"]],
  ["Tomacorriente doble Fascy 10A", "FASCY", 32000, "Electricidad", "electricidad", "disponible", ["Doble", "10A", "Instalación", "Fascy"]],
  ["Placa Fascy 2 módulos blanca", "FASCY", 12000, "Electricidad", "electricidad", "disponible", ["2 módulos", "Placa", "Blanca", "Fascy"]],
  ["Disyuntor Fascy 2x25A", "FASCY", 68000, "Electricidad", "electricidad", "consultar", ["2x25A", "Protección", "Tablero", "Fascy"]],
  ["Llave térmica Fascy 1x20A", "FASCY", 38000, "Electricidad", "electricidad", "disponible", ["1x20A", "Térmica", "Tablero", "Fascy"]],
  ["Caja exterior Fascy estanca", "FASCY", 45000, "Electricidad", "electricidad", "consultar", ["Estanca", "Exterior", "Caja", "Fascy"]],
  ["Canaleta Fascy PVC 20x10mm", "FASCY", 18000, "Electricidad", "electricidad", "disponible", ["20x10mm", "PVC", "Canaleta", "Fascy"]],
  ["Portalámpara Fascy E27", "FASCY", 15000, "Iluminación", "iluminacion", "disponible", ["E27", "Portalámpara", "Iluminación", "Fascy"]],
  ["Prolongador Fascy 3 tomas 5m", "FASCY", 78000, "Electricidad", "electricidad", "disponible", ["5m", "3 tomas", "Prolongador", "Fascy"]],

  ["Disco de corte Fibrac 115mm metal", "FIBRAC", 8500, "Herramientas manuales", "herramientas-manuales", "disponible", ["115mm", "Metal", "Corte", "Fibrac"]],
  ["Disco de corte Fibrac 180mm metal", "FIBRAC", 18000, "Herramientas manuales", "herramientas-manuales", "disponible", ["180mm", "Metal", "Corte", "Fibrac"]],
  ["Disco de desbaste Fibrac 115mm", "FIBRAC", 15000, "Herramientas manuales", "herramientas-manuales", "disponible", ["115mm", "Desbaste", "Acero", "Fibrac"]],
  ["Disco diamantado Fibrac segmentado 110mm", "FIBRAC", 42000, "Herramientas manuales", "herramientas-manuales", "consultar", ["110mm", "Diamantado", "Cerámica", "Fibrac"]],
  ["Lija Fibrac grano 80 madera", "FIBRAC", 4500, "Pinturas", "pinturas", "disponible", ["Grano 80", "Madera", "Lijado", "Fibrac"]],
  ["Lija Fibrac grano 120 pared", "FIBRAC", 4500, "Pinturas", "pinturas", "disponible", ["Grano 120", "Pared", "Terminación", "Fibrac"]],
  ["Rollo de lija Fibrac tela esmeril", "FIBRAC", 95000, "Pinturas", "pinturas", "consultar", ["Rollo", "Tela esmeril", "Metal", "Fibrac"]],
  ["Cepillo copa Fibrac alambre trenzado", "FIBRAC", 38000, "Herramientas manuales", "herramientas-manuales", "disponible", ["Copa", "Alambre", "Limpieza", "Fibrac"]],
  ["Piedra de afilar Fibrac doble grano", "FIBRAC", 32000, "Herramientas manuales", "herramientas-manuales", "disponible", ["Doble grano", "Afilado", "Manual", "Fibrac"]],
  ["Disco flap Fibrac grano 60 115mm", "FIBRAC", 22000, "Herramientas manuales", "herramientas-manuales", "disponible", ["Grano 60", "115mm", "Terminación", "Fibrac"]],

  ["General Paint látex interior 18L", "GENERAL PAINT", 395000, "Pinturas", "pinturas", "disponible", ["18L", "Interior", "Látex", "General Paint"]],
  ["General Paint látex exterior 18L", "GENERAL PAINT", 455000, "Pinturas", "pinturas", "disponible", ["18L", "Exterior", "Látex", "General Paint"]],
  ["General Paint esmalte sintético 3.6L", "GENERAL PAINT", 165000, "Pinturas", "pinturas", "disponible", ["3.6L", "Esmalte", "Metal", "General Paint"]],
  ["General Paint fondo antióxido 3.6L", "GENERAL PAINT", 145000, "Pinturas", "pinturas", "consultar", ["3.6L", "Antióxido", "Metal", "General Paint"]],
  ["General Paint sellador acrílico 18L", "GENERAL PAINT", 320000, "Pinturas", "pinturas", "disponible", ["18L", "Sellador", "Acrílico", "General Paint"]],
  ["General Paint barniz madera 3.6L", "GENERAL PAINT", 175000, "Pinturas", "pinturas", "consultar", ["3.6L", "Barniz", "Madera", "General Paint"]],
  ["General Paint impermeabilizante 18L", "GENERAL PAINT", 545000, "Pinturas", "pinturas", "consultar", ["18L", "Impermeabilizante", "Techos", "General Paint"]],
  ["General Paint enduido plástico 25kg", "GENERAL PAINT", 135000, "Pinturas", "pinturas", "disponible", ["25kg", "Enduido", "Pared", "General Paint"]],
  ["General Paint pintura para piso 3.6L", "GENERAL PAINT", 185000, "Pinturas", "pinturas", "consultar", ["3.6L", "Piso", "Alto tránsito", "General Paint"]],
  ["General Paint diluyente sintético 1L", "GENERAL PAINT", 42000, "Pinturas", "pinturas", "disponible", ["1L", "Diluyente", "Sintético", "General Paint"]],

  ["Cerradura Pennsylvania exterior cromada", "PENNSYLVANIA", 115000, "Ferretería general", "ferreteria-general", "disponible", ["Exterior", "Cromada", "Puerta", "Pennsylvania"]],
  ["Cerradura Pennsylvania baño", "PENNSYLVANIA", 95000, "Ferretería general", "ferreteria-general", "disponible", ["Baño", "Puerta", "Instalación", "Pennsylvania"]],
  ["Cerradura Pennsylvania dormitorio", "PENNSYLVANIA", 98000, "Ferretería general", "ferreteria-general", "disponible", ["Dormitorio", "Puerta", "Llave", "Pennsylvania"]],
  ["Manija Pennsylvania roseta acero", "PENNSYLVANIA", 85000, "Ferretería general", "ferreteria-general", "consultar", ["Roseta", "Acero", "Puerta", "Pennsylvania"]],
  ["Bisagra Pennsylvania 3x3 pulgadas x3 unidades", "PENNSYLVANIA", 38000, "Ferretería general", "ferreteria-general", "disponible", ["3x3 pulgadas", "x3", "Bisagra", "Pennsylvania"]],
  ["Pasador Pennsylvania zincado 4 pulgadas", "PENNSYLVANIA", 26000, "Ferretería general", "ferreteria-general", "disponible", ["4 pulgadas", "Zincado", "Seguridad", "Pennsylvania"]],
  ["Candado Pennsylvania 40mm", "PENNSYLVANIA", 45000, "Ferretería general", "ferreteria-general", "disponible", ["40mm", "Candado", "Seguridad", "Pennsylvania"]],
  ["Candado Pennsylvania 50mm reforzado", "PENNSYLVANIA", 68000, "Ferretería general", "ferreteria-general", "consultar", ["50mm", "Reforzado", "Seguridad", "Pennsylvania"]],
  ["Picaporte Pennsylvania embutir", "PENNSYLVANIA", 52000, "Ferretería general", "ferreteria-general", "disponible", ["Embutir", "Puerta", "Repuesto", "Pennsylvania"]],
  ["Cilindro Pennsylvania doble llave", "PENNSYLVANIA", 62000, "Ferretería general", "ferreteria-general", "disponible", ["Doble llave", "Cilindro", "Seguridad", "Pennsylvania"]],

  ["Cemento Cecon CPII 50kg", "CECON", 72000, "Construcción", "construccion", "disponible", ["50kg", "Cemento", "Obra", "Cecon"]],
  ["Cal hidratada Cecon 20kg", "CECON", 28000, "Construcción", "construccion", "disponible", ["20kg", "Cal", "Revoque", "Cecon"]],
  ["Mortero adhesivo Cecon AC-I 20kg", "CECON", 38000, "Construcción", "construccion", "disponible", ["20kg", "Adhesivo", "Cerámica", "Cecon"]],
  ["Mortero adhesivo Cecon porcelanato 20kg", "CECON", 58000, "Construcción", "construccion", "consultar", ["20kg", "Porcelanato", "Adhesivo", "Cecon"]],
  ["Pastina Cecon blanca 1kg", "CECON", 12000, "Construcción", "construccion", "disponible", ["1kg", "Pastina", "Juntas", "Cecon"]],
  ["Pastina Cecon gris 1kg", "CECON", 12000, "Construcción", "construccion", "disponible", ["1kg", "Pastina", "Gris", "Cecon"]],
  ["Impermeabilizante cementicio Cecon 18kg", "CECON", 185000, "Construcción", "construccion", "consultar", ["18kg", "Impermeabilizante", "Cementicio", "Cecon"]],
  ["Revoque proyectable Cecon 30kg", "CECON", 65000, "Construcción", "construccion", "consultar", ["30kg", "Revoque", "Obra", "Cecon"]],
  ["Nivelador de piso Cecon 20kg", "CECON", 95000, "Construcción", "construccion", "consultar", ["20kg", "Nivelador", "Piso", "Cecon"]],
  ["Mezcla lista Cecon albañilería 25kg", "CECON", 42000, "Construcción", "construccion", "disponible", ["25kg", "Mezcla lista", "Albañilería", "Cecon"]],

  ["Caño PVC Syopar 20mm x 3m", "SYOPAR", 18000, "Plomería", "plomeria", "disponible", ["20mm", "PVC", "3m", "Syopar"]],
  ["Caño PVC Syopar 25mm x 3m", "SYOPAR", 24000, "Plomería", "plomeria", "disponible", ["25mm", "PVC", "3m", "Syopar"]],
  ["Codo PVC Syopar 90 grados 25mm", "SYOPAR", 5500, "Plomería", "plomeria", "disponible", ["25mm", "90 grados", "PVC", "Syopar"]],
  ["Tee PVC Syopar 25mm", "SYOPAR", 6500, "Plomería", "plomeria", "disponible", ["25mm", "Tee", "PVC", "Syopar"]],
  ["Unión PVC Syopar 25mm", "SYOPAR", 5200, "Plomería", "plomeria", "disponible", ["25mm", "Unión", "PVC", "Syopar"]],
  ["Llave de paso Syopar 1/2 pulgadas", "SYOPAR", 28000, "Plomería", "plomeria", "disponible", ["1/2 pulgadas", "Llave", "Agua", "Syopar"]],
  ["Tubo desagüe Syopar 50mm", "SYOPAR", 32000, "Plomería", "plomeria", "consultar", ["50mm", "Desagüe", "PVC", "Syopar"]],
  ["Tubo desagüe Syopar 100mm", "SYOPAR", 68000, "Plomería", "plomeria", "consultar", ["100mm", "Desagüe", "PVC", "Syopar"]],
  ["Sifón Syopar flexible universal", "SYOPAR", 22000, "Sanitarios y grifería", "sanitarios-y-griferia", "disponible", ["Flexible", "Universal", "Sifón", "Syopar"]],
  ["Rejilla Syopar cromada 10x10", "SYOPAR", 18000, "Sanitarios y grifería", "sanitarios-y-griferia", "disponible", ["10x10", "Cromada", "Desagüe", "Syopar"]],

  ["Taladro percutor Total 850W", "TOTAL", 385000, "Herramientas eléctricas", "herramientas-electricas", "disponible", ["850W", "Percutor", "Total", "Uso profesional"]],
  ["Amoladora Total 4-1/2 pulgadas 750W", "TOTAL", 295000, "Herramientas eléctricas", "herramientas-electricas", "disponible", ["750W", "4-1/2 pulgadas", "Corte", "Total"]],
  ["Atornillador inalámbrico Total 20V", "TOTAL", 620000, "Herramientas eléctricas", "herramientas-electricas", "consultar", ["20V", "Inalámbrico", "Montaje", "Total"]],
  ["Sierra caladora Total 800W", "TOTAL", 420000, "Herramientas eléctricas", "herramientas-electricas", "disponible", ["800W", "Caladora", "Madera", "Total"]],
  ["Sierra circular Total 1400W 7-1/4 pulgadas", "TOTAL", 520000, "Herramientas eléctricas", "herramientas-electricas", "consultar", ["1400W", "7-1/4 pulgadas", "Circular", "Total"]],
  ["Rotomartillo Total SDS Plus 1500W", "TOTAL", 880000, "Herramientas eléctricas", "herramientas-electricas", "consultar", ["1500W", "SDS Plus", "Hormigón", "Total"]],
  ["Lijadora orbital Total 320W", "TOTAL", 285000, "Herramientas eléctricas", "herramientas-electricas", "disponible", ["320W", "Orbital", "Terminación", "Total"]],
  ["Hidrolavadora Total 1800W", "TOTAL", 750000, "Campo y jardín", "campo-y-jardin", "consultar", ["1800W", "Alta presión", "Limpieza", "Total"]],
  ["Compresor Total 24L 2HP", "TOTAL", 1180000, "Herramientas eléctricas", "herramientas-electricas", "consultar", ["24L", "2HP", "Compresor", "Total"]],
  ["Multímetro digital Total TMT460012", "TOTAL", 95000, "Electricidad", "electricidad", "disponible", ["Digital", "Medición", "Electricidad", "Total"]],
];

export const ADDITIONAL_BRAND_PRODUCTS: Product[] = PRODUCT_ROWS.map(toProduct);

const productBySlug = new Map<string, Product>();
for (const product of [...BASE_PRODUCTS, ...ADDITIONAL_BRAND_PRODUCTS]) {
  productBySlug.set(product.slug, product);
}

export const PRODUCTS: Product[] = Array.from(productBySlug.values());
