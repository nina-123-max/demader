import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "../../components/seo/StructuredData";
import { SITE_URL } from "../../lib/seo/site";
import { sanitizePlainText } from "../../lib/security/input-validation";

export const metadata: Metadata = {
  title: "Arte y madera",
  description: "Tallados y marcos elaborados en madera flor morado con precisión CNC y acabado Demader.",
  alternates: { canonical: "/arte-y-madera" },
  openGraph: {
    title: "Arte y madera | Demader",
    description: "Piezas talladas en madera flor morado que convierten tradición, arte y diseño en objetos para conservar.",
    url: `${SITE_URL}/arte-y-madera`,
    type: "website",
    images: [{ url: "/arte/ultima-cena.webp", alt: "Tallado La Última Cena en madera" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arte y madera | Demader",
    description: "Colección de tallados y marcos en madera flor morado.",
    images: ["/arte/ultima-cena.webp"],
  },
};

const WHATSAPP_NUMBER = "573044782128";

const pieces = [
  {
    name: "La Última Cena",
    ref: "CRI01",
    image: "/arte/ultima-cena.webp",
    detail: "Tallado de gran formato con relieve profundo y una composición rica en detalles.",
    measures: "137 × 70 cm",
    className: "art-piece art-piece-wide",
  },
  {
    name: "Virgen de Guadalupe",
    ref: "ART03",
    image: "/arte/virgen-guadalupe.jpeg",
    detail: "Imagen religiosa tallada en madera, con manto, rayos y detalles cuidadosamente definidos.",
    measures: "Medidas por confirmar",
    className: "art-piece art-piece-tall",
  },
  {
    name: "Sagrado Corazón natural",
    ref: "ART02",
    image: "/arte/sagrado-corazon-natural.jpeg",
    detail: "Relieve en estado natural que revela la precisión del tallado y la textura de la madera.",
    measures: "Medidas por confirmar",
    className: "art-piece art-piece-tall",
  },
  {
    name: "Colección Rostro de Cristo",
    ref: "CRI02",
    image: "/arte/coleccion-cristo.webp",
    detail: "Retratos tallados de expresión profunda, creados para componer una galería con carácter.",
    measures: "Pieza principal: 34 × 45 cm",
    className: "art-piece art-piece-wide",
  },
  {
    name: "Espejo circular tallado",
    ref: "ESP01",
    image: "/arte/espejo-circular.webp",
    detail: "Marco circular con detalles tallados que realzan la veta natural de la madera.",
    measures: "Diámetro: 90 cm",
    className: "art-piece",
  },
  {
    name: "Espejo rectangular tallado",
    ref: "ESP02",
    image: "/arte/espejo-horizontal.webp",
    detail: "Marco horizontal de proporciones elegantes, pensado para salas y espacios amplios.",
    measures: "100 × 160 cm",
    className: "art-piece",
  },
  {
    name: "Espejo vertical tallado",
    ref: "ESP03",
    image: "/arte/espejo-rectangular.webp",
    detail: "Marco vertical con patrón orgánico tallado para aportar profundidad y movimiento.",
    measures: "70 × 180 cm",
    className: "art-piece art-piece-tall",
  },
];

const artCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Arte y madera | Demader",
  description: "Tallados y marcos en madera flor morado elaborados con precisión CNC.",
  url: `${SITE_URL}/arte-y-madera`,
  inLanguage: "es-CO",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: pieces.length,
    itemListElement: pieces.map((piece, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: piece.name,
        sku: piece.ref,
        image: `${SITE_URL}${piece.image}`,
        description: piece.detail,
        material: "Madera flor morado",
        brand: { "@type": "Brand", name: "Demader" },
      },
    })),
  },
};

function whatsappUrl(name: string, ref: string) {
  const safeName = sanitizePlainText(name, 120);
  const safeRef = sanitizePlainText(ref, 40);
  const message = `Hola, quiero recibir información sobre ${safeName}, referencia ${safeRef}, de la colección Arte y madera.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.48 14.8L2 22l5.35-1.5A9.98 9.98 0 1 0 12.04 2Zm0 17.95a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.17.88.85-3.1-.2-.32a8.12 8.12 0 1 1 6.95 3.85Zm4.45-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.25-.63.8-.77.96-.14.17-.28.19-.53.07-.24-.12-1.03-.38-1.96-1.21a7.36 7.36 0 0 1-1.35-1.68c-.14-.24-.02-.37.1-.5.11-.11.25-.28.37-.43.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.46c-.16 0-.42.06-.64.3-.22.25-.85.83-.85 2.03 0 1.2.87 2.36 1 2.52.12.16 1.72 2.62 4.16 3.68.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export default function ArtAndWoodPage() {
  return (
    <main className="art-page" id="contenido-principal" tabIndex={-1}>
      <a className="skip-link" href="#coleccion">Saltar al contenido principal</a>
      <StructuredData data={artCollectionSchema} />
      <header className="site-header art-header">
        <Link className="brand" href="/" aria-label="Demader - Inicio">
          <img className="brand-logo" src="/demader-mark.png" alt="Demader" decoding="async" />
          <span className="brand-tagline">tu hogar de diseñador con alma de madera</span>
        </Link>
        <nav className="nav-links" aria-label="Navegación principal">
          <Link href="/">Inicio</Link>
          <Link href="/#catalogo">Catálogo</Link>
          <span className="nav-current" aria-current="page">Arte y madera</span>
          <Link href="/importados">Importados</Link>
          <Link className="nav-cta" href="/#contacto">Contacto</Link>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Abrir menú de navegación"><span /><span /><span /></summary>
          <nav aria-label="Navegación móvil">
            <Link href="/">Inicio</Link>
            <Link href="/#catalogo">Catálogo</Link>
            <Link href="/arte-y-madera">Arte y madera</Link>
            <Link href="/importados">Importados</Link>
            <Link className="mobile-menu-cta" href="/#contacto">Contacto</Link>
          </nav>
        </details>
      </header>

      <section className="art-hero">
        <div className="art-hero-copy">
          <p className="eyebrow">Colección Demader · Tallado CNC</p>
          <h1>Arte que permanece en la madera.</h1>
          <p>Piezas creadas en madera flor morado, donde la precisión de nuestros equipos CNC se encuentra con el oficio, el detalle y la expresión artística.</p>
          <a className="art-scroll" href="#coleccion">Descubrir la colección <span aria-hidden="true">↓</span></a>
        </div>
        <div className="art-hero-gallery" aria-label="Selección de tallados Demader">
          <figure className="art-hero-main"><img src="/arte/virgen-guadalupe.jpeg" alt="Tallado de la Virgen de Guadalupe en madera" fetchPriority="high" decoding="async" /></figure>
          <figure><img src="/arte/sagrado-corazon-natural.jpeg" alt="Tallado natural del Sagrado Corazón" loading="lazy" decoding="async" /></figure>
          <div className="art-hero-note"><span>Precisión</span><strong>CNC</strong><small>Acabado con alma artesanal</small></div>
        </div>
      </section>

      <section className="art-manifesto">
        <p>De una pieza de madera nace una obra con volumen, luz y memoria.</p>
        <div><span>01 · Diseño</span><span>02 · Tallado</span><span>03 · Acabado</span></div>
      </section>

      <section className="art-collection" id="coleccion">
        <div className="art-section-heading">
          <div><p className="eyebrow">Piezas disponibles</p><h2>Tallados para contemplar.</h2></div>
          <p>Cada obra conserva las variaciones naturales de la madera. Consulta opciones de acabado, medidas y disponibilidad directamente con nuestro equipo.</p>
        </div>
        <div className="art-grid">
          {pieces.map((piece) => (
            <article className={piece.className} key={piece.ref}>
              <div className="art-image-wrap">
                <img src={piece.image} alt={`${piece.name} tallado en madera por Demader`} loading="lazy" decoding="async" />
                <span>{piece.ref}</span>
              </div>
              <div className="art-piece-content">
                <h3>{piece.name}</h3>
                <p>{piece.detail}</p>
                <small>{piece.measures}</small>
                <a className="art-whatsapp" href={whatsappUrl(piece.name, piece.ref)} target="_blank" rel="noreferrer" aria-label={`Consultar ${piece.name} por WhatsApp`}>
                  <WhatsappIcon /> Consultar por WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="art-closing">
        <p className="eyebrow">Hecho en Colombia</p>
        <h2>Una idea también puede convertirse en madera.</h2>
        <p>Conoce la colección o consúltanos por una pieza especial.</p>
        <a className="button button-light" href={whatsappUrl("una pieza personalizada", "PERSONALIZADA")} target="_blank" rel="noreferrer"><WhatsappIcon /> Hablar con Demader</a>
      </section>

      <footer className="footer art-footer">
        <div className="brand brand-footer"><img className="brand-logo" src="/demader-mark.png" alt="Demader" loading="lazy" decoding="async" /><span className="brand-tagline">tu hogar de diseñador con alma de madera</span></div>
        <address className="footer-company"><strong>DEMADER S.A.S</strong><span>NIT 901981556</span><a href="mailto:demadermuebles@gmail.com">demadermuebles@gmail.com</a><span>Calle 38 Sur # 72K-43, Bogotá</span><a href="https://wa.me/573044782128" target="_blank" rel="noreferrer">WhatsApp: +57 304 4782128</a></address>
        <div className="footer-actions"><div className="footer-links"><Link href="/">Inicio</Link><Link href="/#catalogo">Catálogo</Link><Link href="/arte-y-madera">Arte y madera</Link><Link href="/importados">Importados</Link></div></div>
        <small>DEMADER — 2026 · Derechos reservados</small>
      </footer>
    </main>
  );
}
