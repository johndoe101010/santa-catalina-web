import { expect, test } from "@playwright/test";

const productSlug = "alicate-universal-stanley-8";
const productName = /Alicate universal Stanley 8/i;

async function waitForHydration(page: import("@playwright/test").Page) {
  await page.waitForFunction(() => {
    const state = window as typeof window & {
      $_TSR?: { hydrated?: boolean; streamEnded?: boolean };
    };
    return !state.$_TSR || state.$_TSR.hydrated;
  });
}

async function expectNoHorizontalOverflow(
  page: import("@playwright/test").Page,
) {
  const hasOverflow = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth > window.innerWidth + 1;
  });
  expect(hasOverflow).toBe(false);
}

test.describe("Santa Catalina marketplace", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.evaluate(() => localStorage.clear());
  });

  test("homepage carga y CTAs principales navegan", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /construir/i }),
    ).toBeVisible();

    const catalogCta = page.locator('section#inicio a[href^="/catalogo"]');
    await expect(catalogCta).toHaveAttribute("href", "/catalogo");
    await page.goto((await catalogCta.getAttribute("href")) ?? "/catalogo");
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/catalogo/);
    await expect(
      page.getByRole("heading", { name: /Cat[aá]logo/i }),
    ).toBeVisible();

    await page.goto("/");
    await waitForHydration(page);
    const categoriesCta = page
      .getByRole("link", { name: /Explorar categor/i })
      .first();
    await expect(categoriesCta).toHaveAttribute("href", "#categorias");
    await expect(page.locator("#categorias")).toBeVisible();
  });

  test("catálogo carga, busca, filtra y abre detalle de producto", async ({
    page,
  }) => {
    await page.goto("/catalogo");
    await waitForHydration(page);
    await expect(
      page.getByRole("heading", { name: /Cat[aá]logo/i }),
    ).toBeVisible();

    await page.getByPlaceholder(/Buscar por producto/i).fill("alicate stanley");
    await expect(
      page.getByRole("link", { name: productName }).first(),
    ).toBeVisible();

    await page.getByRole("button", { name: "Filtros", exact: true }).click();
    await page.getByLabel(/Ordenar productos/i).selectOption("precio-asc");
    await expect(page.getByText(/productos encontrados/i)).toBeVisible();

    await page.getByRole("link", { name: productName }).first().click();
    await expect(page).toHaveURL(new RegExp(`/producto/${productSlug}`));
    await expect(
      page.getByRole("heading", { name: productName }),
    ).toBeVisible();
  });

  test("producto agrega al carrito y WhatsApp del producto tiene URL válida", async ({
    page,
  }) => {
    await page.goto(`/producto/${productSlug}`);
    await waitForHydration(page);
    await page.getByRole("button", { name: /Agregar al carrito/i }).click();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("sc_cart_v1")))
      .toContain(productSlug);

    const whatsapp = page
      .getByRole("link", { name: /Consultar por\s*WhatsApp/i })
      .first();
    await expect(whatsapp).toHaveAttribute(
      "href",
      /https:\/\/wa\.me\/595986150330\?text=.*Alicate/i,
    );

    await page.goto("/carrito");
    await waitForHydration(page);
    await expect(page.getByText(productName).first()).toBeVisible();
    await expect(page.getByText(/Resumen del pedido/i)).toBeVisible();
  });

  test("carrito permite modificar cantidad, eliminar y persiste en localStorage", async ({
    page,
  }) => {
    await page.goto(`/producto/${productSlug}`);
    await waitForHydration(page);
    await page.getByRole("button", { name: /Agregar al carrito/i }).click();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("sc_cart_v1")))
      .toContain(productSlug);
    await page.goto("/carrito");
    await waitForHydration(page);

    await page
      .getByRole("button", { name: /Sumar unidad/i })
      .first()
      .click();
    await expect(page.locator("text=2").first()).toBeVisible();
    await page.reload();
    await waitForHydration(page);
    await expect(page.getByText(productName).first()).toBeVisible();
    await expect(page.locator("text=2").first()).toBeVisible();

    await page
      .getByRole("button", { name: /Restar unidad/i })
      .first()
      .click();
    await expect(page.locator("text=1").first()).toBeVisible();
    await page
      .getByRole("button", { name: /Quitar/i })
      .first()
      .click();
    await expect(page.getByText(/Tu carrito est/i)).toBeVisible();
  });

  test("WhatsApp del carrito incluye datos del pedido", async ({ page }) => {
    await page.goto(`/producto/${productSlug}`);
    await waitForHydration(page);
    await page.getByRole("button", { name: /Agregar al carrito/i }).click();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("sc_cart_v1")))
      .toContain(productSlug);
    await page.goto("/carrito");
    await waitForHydration(page);

    await page.getByLabel(/Nombre/i).fill("Cliente Test");
    await page.getByLabel(/Tel/i).fill("0986000000");
    await page.getByLabel(/Observaciones/i).fill("Retiro por la tarde");
    await page.getByLabel(/Coordinar env/i).check();

    const whatsapp = page.getByRole("link", {
      name: /Enviar pedido por WhatsApp/i,
    });
    const href = await whatsapp.getAttribute("href");
    expect(href).toContain("https://wa.me/595986150330?text=");
    expect(decodeURIComponent(href ?? "")).toContain("Cliente Test");
    expect(decodeURIComponent(href ?? "")).toContain(
      "Alicate universal Stanley",
    );
  });

  test("rutas principales responden sin error", async ({ page }) => {
    for (const route of [
      "/",
      "/catalogo",
      "/carrito",
      "/empresa",
      "/contacto",
      "/categoria/herramientas-manuales",
      `/producto/${productSlug}`,
    ]) {
      const response = await page.goto(route);
      await waitForHydration(page);
      expect(response?.ok(), route).toBeTruthy();
      await expect(page.locator("body")).not.toContainText(/Error:/i);
    }
  });

  test("mobile 390px no genera overflow horizontal en rutas clave", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });

    for (const route of [
      "/",
      "/catalogo",
      `/producto/${productSlug}`,
      "/carrito",
    ]) {
      await page.goto(route);
      await waitForHydration(page);
      await expectNoHorizontalOverflow(page);
    }
  });
});
