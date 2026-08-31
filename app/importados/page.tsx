import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "../../components/seo/StructuredData";
import { catalogoImportados } from "../../data/importados";
import { SITE_URL } from "../../lib/seo/site";

export const metadata: Metadata = {
  title: "Importados | China Collection",
  description: "Colección de sofás, sillas, mesas y butacos importados seleccionados por Demader.",
  alternates: { canonical: "/importados" },
  openGraph: {
    title: "Importados | China Collection | Demader",
    description: "Diseño contemporáneo para interiores y exteriores, seleccionado por Demader.",
    url: `${SITE_URL}/importados`,
    type: "website",
    images: [{ url: "/importados/hero.webp", alt: "China Collection de Demader" }],
  },
};

const WHATSAPP_NUMBER = "573044782128";

function whatsappUrl(modelo: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quiero recibir información y precio del modelo ${modelo} de la colección Importados.`)}`;
}

function formatMeasure(key: string, value: number) {
  const labels: Record<string, string> = {
    largo_cm: "Largo",
    ancho_cm: "Ancho",
    alto_cm: "Alto",
    altura_asiento_cm: "Altura asiento",
    diametro_cm: "Diámetro",
    diametro_base_cm: "Diámetro base",
    modulo_1p_largo_cm: "Módulo 1P largo",
    modulo_1p_ancho_cm: "Módulo 1P ancho",
    puff_largo_cm: "Puff largo",
    puff_ancho_cm: "Puff ancho",
  };
  return `${labels[key] ?? key}: ${value} cm`;
}

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Importados - China Collection",
  url: `${SITE_URL}/importados`,
  inLanguage: "es-CO",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: catalogoImportados.productos.length,
    itemListElement: catalogoImportados.productos.map((producto, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: producto.modelo,
        category: producto.categoria,
        brand: { "@type": "Brand", name: producto.marca },
        image: `${SITE_URL}${producto.imagen}`,
        description: producto.descripcion,
      },
    })),
  },
};

export default function ImportadosPage() {
  return (
    <main className="imports-page" id="contenido-principal" tabIndex={-1}>
      <a className="skip-link" href="#coleccion-importados">Saltar al contenido principal</a>
      <StructuredData data={collectionSchema} />
      <header className="site-header imports-header">
        <Link className="brand" href="/" aria-label="Demader - Inicio">
          <img className="brand-logo" src="/demader-mark.png" alt="Demader" decoding="async" />
          <span className="brand-tagline">tu hogar de diseñador con alma de madera</span>
        </Link>
        <nav className="nav-links" aria-label="Navegación principal">
          <Link href="/">Inicio</Link>
          <Link href="/#catalogo">Catálogo</Link>
          <Link href="/arte-y-madera">Arte y madera</Link>
          <span className="nav-current" aria-current="page">Importados</span>
          <Link className="nav-cta" href="/#contacto">Contacto</Link>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Abrir menú de navegación"><span /><span /><span /></summary>
          <nav aria-label="Navegación móvil">
            <Link href="/">Inicio</Link>
            <Link href="/#catalogo">Catálogo</Link>
            <Link href="/arte-y-madera">Arte y madera</Link>
            <Link href="/importados" aria-current="page">Importados</Link>
            <Link className="mobile-menu-cta" href="/#contacto">Contacto</Link>
          </nav>
        </details>
      </header>

      <section className="imports-hero">
        <div className="imports-hero-copy">
          <p className="eyebrow">Demader · China Collection</p>
          <h1>Diseño que viaja para transformar tus espacios.</h1>
          <p>Sofás modulares, sillas, mesas y butacos contemporáneos seleccionados por su comodidad, versatilidad y carácter.</p>
          <a className="button button-primary" href="#coleccion-importados">Explorar importados</a>
        </div>
        <figure className="imports-hero-image">
          <img src="/importados/hero-silla-verde.jpg" alt="Ambiente de la colección de muebles importados Demader" fetchPriority="high" decoding="async" />
        </figure>
      </section>

      <section className="imports-intro" id="coleccion-importados">
        <div><p className="eyebrow">Colección completa</p><h2>Formas actuales, posibilidades reales.</h2></div>
        <p>Consulta cada modelo con sus referencias, acabados y medidas oficiales. Las fotografías conservan los ambientes y composiciones originales del catálogo.</p>
      </section>

      <section className="imports-grid" aria-label="Productos importados">
        {catalogoImportados.productos.map((producto) => (
          <article className="import-card" key={producto.modelo}>
            <div className="import-card-image">
              <img src={producto.imagen} alt={`${producto.modelo}, ${producto.categoria} de la colección Importados`} loading="lazy" decoding="async" />
              <span>{producto.categoria}</span>
            </div>
            <div className="import-card-content">
              <div className="import-card-title"><div><small>{producto.marca}</small><h2>{producto.modelo}</h2></div><b>{producto.variantes.length.toString().padStart(2, "0")}</b></div>
              <p>{producto.descripcion}</p>
              <div className="import-variants">
                {producto.variantes.map((variante, index) => (
                  <div className="import-variant" key={`${variante.sku ?? "sin-sku"}-${index}`}>
                    <div className="import-variant-head"><strong>{variante.nombre}</strong><span>{variante.sku ?? "Referencia no indicada"}</span></div>
                    <p>{variante.materiales} · {variante.acabado_color}{variante.codigo_color ? ` · ${variante.codigo_color}` : ""}</p>
                    <div className="import-measures">
                      {Object.entries(variante.medidas).map(([key, value]) => <span key={key}>{formatMeasure(key, value)}</span>)}
                    </div>
                  </div>
                ))}
              </div>
              <a className="import-cta" href={whatsappUrl(producto.modelo)} target="_blank" rel="noreferrer">Consultar modelo <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </section>

      <section className="unpack-section" aria-labelledby="unpack-title">
        <div className="unpack-heading"><p className="eyebrow">London y Paris</p><h2 id="unpack-title">Cómo abrir tu nuevo sofá.</h2><p>Herramienta requerida: {catalogoImportados.instrucciones_desempaque.herramientas_requeridas[0]}.</p></div>
        <ol className="unpack-steps">
          {catalogoImportados.instrucciones_desempaque.pasos.map((paso, index) => <li key={paso}><span>{String(index + 1).padStart(2, "0")}</span><p>{paso}</p></li>)}
        </ol>
        <div className="unpack-warning"><strong>Precaución</strong><p>{catalogoImportados.instrucciones_desempaque.precauciones.join(" ")}</p></div>
      </section>

      <section className="palette-section" aria-labelledby="palette-title">
        <div className="palette-heading"><p className="eyebrow">Carta de colores</p><h2 id="palette-title">Once tonos para combinar.</h2></div>
        <div className="palette-grid">
          {catalogoImportados.paleta_global.map((color) => (
            <div className="color-card" key={color.codigo}><span style={{ backgroundColor: color.muestra }} aria-hidden="true" /><strong>{color.nombre}</strong><small>{color.codigo}</small></div>
          ))}
        </div>
      </section>

      <section className="imports-closing">
        <p className="eyebrow">Asesoría Demader</p>
        <h2>Encuentra la referencia indicada para tu espacio.</h2>
        <a className="button button-light" href={whatsappUrl("Importados")} target="_blank" rel="noreferrer">Hablar por WhatsApp <span aria-hidden="true">↗</span></a>
      </section>

      <footer className="footer imports-footer">
        <div className="brand brand-footer"><img className="brand-logo" src="/demader-mark.png" alt="Demader" loading="lazy" decoding="async" /><span className="brand-tagline">tu hogar de diseñador con alma de madera</span></div>
        <address className="footer-company"><strong>DEMADER S.A.S</strong><span>NIT 901981556</span><a href="mailto:demadermuebles@gmail.com">demadermuebles@gmail.com</a><span>Calle 38 Sur # 72K-43, Bogotá</span><a href="https://wa.me/573044782128" target="_blank" rel="noreferrer">WhatsApp: +57 304 4782128</a></address>
        <div className="footer-actions"><div className="footer-links"><Link href="/">Inicio</Link><Link href="/arte-y-madera">Arte y madera</Link><Link href="/importados">Importados</Link></div></div>
        <small>DEMADER — 2026 · Derechos reservados</small>
      </footer>
    </main>
  );
}
