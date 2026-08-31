# Guía de la copia DEMADER para GitHub Pages

Esta es una copia independiente del sitio. Requiere Node.js 22 LTS (mínimo 22.13.0) y npm 10 o superior.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Compilación y exportación estática

```bash
npm run build
```

También puedes usar `npm run export`; ambos comandos generan la carpeta `out/`.

## Publicación futura en GitHub Pages

El archivo `.github/workflows/deploy-pages.yml` detecta el nombre del repositorio, compila el proyecto y ajusta automáticamente la subcarpeta de una URL `usuario.github.io/repositorio`.

Después de subir el código a GitHub, abre **Settings → Pages** y selecciona **GitHub Actions** como fuente. No se requiere servidor, base de datos ni secretos.

## Variable opcional

- `NEXT_PUBLIC_SITE_URL`: URL pública definitiva usada por metadatos, sitemap y datos estructurados. Si no se define, se conserva la URL actual de DEMADER en ChatGPT Sites; durante GitHub Actions se deduce la URL de GitHub Pages.

## Contenido

- `app/`: páginas, estilos y metadatos.
- `components/`: componentes.
- `data/`: datos de productos importados.
- `public/`: todas las imágenes, logotipos, iconos y recursos gráficos.
- `.github/workflows/`: flujo opcional de GitHub Pages.

Los archivos Vinext/Cloudflare heredados se conservan como referencia del proyecto original, pero esta copia portable utiliza los comandos nativos de Next.js para desarrollo y exportación.
