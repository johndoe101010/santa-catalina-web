# Santa Catalina Web

Proyecto web listo para subir a GitHub.

## Importante

Este repositorio **no incluye `node_modules`**. Eso es correcto: las dependencias se instalan con `npm ci` o `npm install` usando `package.json` y `package-lock.json`.

## Ejecutar en local

```bash
npm ci
npm run dev
```

## Compilar para producción

```bash
npm run build
```

## Subir a GitHub

```bash
git init
git add .
git commit -m "Subir Santa Catalina Web"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

## Deploy recomendado

Para verlo online sin tenerlo en local, lo más simple es:

1. Subir este proyecto a GitHub.
2. Entrar a Vercel o Netlify.
3. Importar el repositorio desde GitHub.
4. Usar:
   - Install command: `npm ci`
   - Build command: `npm run build`

No subas `node_modules` manualmente.
