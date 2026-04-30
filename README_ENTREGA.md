# Santa Catalina Web — entrega limpia

Proyecto demo de tienda/catálogo para Santa Catalina S.A.

## Instalación

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notas comerciales

- Los precios del catálogo son demo. En la web se muestra el aviso: "Precio y disponibilidad sujetos a confirmación por WhatsApp."
- Cuando se confirme el dominio final, actualizarlo en `src/lib/site.ts`, `public/robots.txt` y `public/sitemap.xml`.
- Las páginas SEO por categoría están creadas en `/categoria/:slug`.
- Las reseñas enlazan a los comentarios reales de Google Maps proporcionados.

## Panel administrativo futuro

El panel administrativo puede implementarse dentro de esta misma web, no como otra página separada obligatoriamente. La forma recomendada es crear una zona privada en `/admin` con login, donde el dueño pueda:

1. Crear productos.
2. Subir imágenes.
3. Cambiar precios.
4. Editar stock.
5. Modificar descripciones.
6. Activar/desactivar productos destacados.

Para hacerlo bien se necesita una base de datos y almacenamiento de imágenes. Opciones viables:

- Servicio administrado: rápido para login, base de datos y subida de imágenes.
- Firebase: simple para paneles pequeños.
- Backend propio: más flexible, pero más caro y más lento de desarrollar.

Para esta demo se dejó el catálogo en código porque es más simple, rápido y barato. Para edición en tiempo real, el catálogo debe moverse a una base de datos.
