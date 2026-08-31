"use client";

import { useEffect, useState } from "react";
import { StructuredData } from "../components/seo/StructuredData";
import { SITE_URL } from "../lib/seo/site";
import { sanitizePlainText } from "../lib/security/input-validation";
import "./home.css";

const WHATSAPP_NUMBER = "";

type Product = {
  name: string;
  ref: string;
  collection: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  measures: string;
};

const products: Product[] = [
  {
    name: "Comedor Luxury",
    ref: "LUX01-03",
    collection: "Luxury",
    category: "Comedores",
    image: "/catalog/comedor-luxury.webp",
    images: [
      "/catalog/comedor-luxury.webp",
      "/catalog/gallery/comedor-luxury-02.webp",
      "/catalog/gallery/comedor-luxury-03.webp",
      "/catalog/gallery/comedor-luxury-04.webp",
    ],
    description: "Diseño moderno, líneas curvas y sillas tapizadas para espacios sofisticados.",
    measures: "4P 130 × 100 · 6P 170 × 100 · 8P 220 × 100 cm",
  },
  {
    name: "Butaco Luxury",
    ref: "LUX04",
    collection: "Luxury",
    category: "Sillas y butacos",
    image: "/catalog/butaco-luxury.webp",
    images: ["/catalog/butaco-luxury.webp"],
    description: "Forma contemporánea y asiento tapizado para combinar comodidad y carácter.",
    measures: "Asiento 68 · Espaldar 100 cm",
  },
  {
    name: "Silla Luxury tapizada",
    ref: "LUX05",
    collection: "Luxury",
    category: "Sillas y butacos",
    image: "/catalog/silla-luxury-tela.webp",
    images: ["/catalog/silla-luxury-tela.webp"],
    description: "Estructura elegante con asiento y espaldar tapizados.",
    measures: "Asiento 45 · Espaldar 88 cm",
  },
  {
    name: "Silla Luxury natural",
    ref: "LUX06",
    collection: "Luxury",
    category: "Sillas y butacos",
    image: "/catalog/silla-luxury-madera.webp",
    images: ["/catalog/silla-luxury-madera.webp"],
    description: "Espaldar en madera natural y asiento tapizado, resistente y elegante.",
    measures: "Asiento 45 · Espaldar 88 cm",
  },
  {
    name: "Mesa de centro rectangular",
    ref: "LUX07",
    collection: "Luxury",
    category: "Mesas de centro",
    image: "/catalog/mesa-centro-rectangular.webp",
    images: ["/catalog/mesa-centro-rectangular.webp", "/catalog/gallery/mesa-centro-rectangular-ambiente.webp"],
    description: "Formas suaves y un tallado característico que une funcionalidad y estilo.",
    measures: "50 × 70 × 45 cm",
  },
  {
    name: "Mesa de centro circular",
    ref: "LUX08",
    collection: "Luxury",
    category: "Mesas de centro",
    image: "/catalog/mesa-centro-circular.webp",
    images: ["/catalog/mesa-centro-circular.webp", "/catalog/gallery/mesa-centro-circular-ambiente.webp"],
    description: "Diseño orgánico y tallado superficial que resalta la madera natural.",
    measures: "Diámetro 50 · Alto 45 cm",
  },
  {
    name: "Mesa rectangular grande",
    ref: "LUX09",
    collection: "Luxury",
    category: "Mesas de centro",
    image: "/catalog/mesa-centro-grande.webp",
    images: ["/catalog/mesa-centro-grande.webp"],
    description: "Líneas curvas y detalle tallado central para salas amplias.",
    measures: "60 × 100 × 45 cm",
  },
  {
    name: "Mesa cuadrada Luxury",
    ref: "LUX10",
    collection: "Luxury",
    category: "Mesas de centro",
    image: "/catalog/mesa-centro-cuadrada.webp",
    images: ["/catalog/mesa-centro-cuadrada.webp", "/catalog/gallery/mesa-centro-cuadrada-ambiente.webp"],
    description: "Esquinas suavemente curvas y tallado central de gran presencia.",
    measures: "100 × 100 × 45 cm",
  },
  {
    name: "Comedor Tundra",
    ref: "TUN01-03",
    collection: "Tundra",
    category: "Comedores",
    image: "/catalog/comedor-tundra.webp",
    images: [
      "/catalog/comedor-tundra.webp",
      "/catalog/comedor-tundra-alt.webp",
      "/catalog/gallery/comedor-tundra-03.webp",
      "/catalog/gallery/comedor-tundra-04.webp",
    ],
    description: "Un comedor de líneas orgánicas y detalles curvos con personalidad.",
    measures: "4P 130 × 100 · 6P 170 × 100 · 8P 220 × 100 cm",
  },
  {
    name: "Silla Tundra",
    ref: "TUN04",
    collection: "Tundra",
    category: "Sillas y butacos",
    image: "/catalog/silla-tundra.webp",
    images: ["/catalog/silla-tundra.webp"],
    description: "Diseño escultural de líneas fluidas y asiento tapizado.",
    measures: "Asiento 45 · Espaldar 75 cm",
  },
  {
    name: "Mesa de centro Tundra",
    ref: "TUN05",
    collection: "Tundra",
    category: "Mesas de centro",
    image: "/catalog/mesa-centro-tundra.webp",
    images: ["/catalog/mesa-centro-tundra.webp"],
    description: "Diseño limpio y versátil que aporta calidez y armonía.",
    measures: "100 × 60 × 45 cm",
  },
  {
    name: "Poltrona Imperio",
    ref: "IMP01",
    collection: "Imperio",
    category: "Sillas y butacos",
    image: "/catalog/poltrona-imperio.webp",
    images: ["/catalog/poltrona-imperio.webp"],
    description: "Detalles calados en los apoyabrazos y tapizado acolchado.",
    measures: "Asiento 45 · Espaldar 84 cm",
  },
  {
    name: "Base cama Curve",
    ref: "CUR01-05",
    collection: "Curve",
    category: "Alcobas",
    image: "/catalog/base-cama-curve.webp",
    images: ["/catalog/base-cama-curve.webp"],
    description: "Estructura robusta y minimalista que resalta la belleza de la madera.",
    measures: "Sencilla, semidoble, doble, queen y king",
  },
  {
    name: "Cama Curve 4 cajones",
    ref: "CUR06-10",
    collection: "Curve",
    category: "Alcobas",
    image: "/catalog/alcoba-curve-cajones.webp",
    images: [
      "/catalog/alcoba-curve-cajones.webp",
      "/catalog/gallery/alcoba-curve-cajones-02.webp",
      "/catalog/gallery/alcoba-curve-cajones-03.webp",
      "/catalog/gallery/alcoba-curve-cajones-04.webp",
      "/catalog/gallery/cama-curve-cajones-producto.webp",
    ],
    description: "Cabecero exclusivo y cuatro cajones integrados para almacenamiento.",
    measures: "Sencilla, semidoble, doble, queen y king",
  },
  {
    name: "Cama Curve",
    ref: "CUR11-15",
    collection: "Curve",
    category: "Alcobas",
    image: "/catalog/cama-curve.webp",
    images: [
      "/catalog/cama-curve.webp",
      "/catalog/gallery/cama-curve-02.webp",
      "/catalog/gallery/cama-curve-03.webp",
      "/catalog/gallery/cama-curve-04.webp",
    ],
    description: "Cabecero redondeado con patrón geométrico tallado.",
    measures: "Sencilla, semidoble, doble, queen y king",
  },
  {
    name: "Mesa de noche Luxury",
    ref: "CUR16",
    collection: "Curve",
    category: "Alcobas",
    image: "/catalog/mesa-noche.webp",
    images: ["/catalog/mesa-noche.webp"],
    description: "Diseño compacto con detalles decorativos y almacenamiento funcional.",
    measures: "50 × 40 × 45 cm",
  },
  {
    name: "Silla Zaira",
    ref: "ZAI01",
    collection: "Zaira",
    category: "Sillas y butacos",
    image: "/catalog/silla-zaira.webp",
    images: ["/catalog/silla-zaira.webp"],
    description: "Espaldar curvo y tapizado envolvente que brinda comodidad y elegancia.",
    measures: "Asiento 45 · Espaldar 82 cm",
  },
];

const categories = ["Todos", "Comedores", "Sillas y butacos", "Mesas de centro", "Alcobas"];

const catalogSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Catálogo de muebles Demader",
  description: "Muebles colombianos en madera flor morado para comedores, salas y alcobas.",
  url: SITE_URL,
  inLanguage: "es-CO",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        sku: product.ref,
        image: `${SITE_URL}${product.image}`,
        description: product.description,
        category: product.category,
        brand: { "@type": "Brand", name: "Demader" },
      },
    })),
  },
};

function whatsappUrl(product?: Product) {
  if (!WHATSAPP_NUMBER) return "#contacto";
  const message = product
    ? `Hola, quiero recibir información y precio de ${sanitizePlainText(product.name, 120)}, referencia ${sanitizePlainText(product.ref, 40)}.`
    : "Hola, quiero recibir asesoría sobre los muebles de Demader.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [filter, setFilter] = useState("Todos");
  const [galleryProduct, setGalleryProduct] = useState<Product | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const filtered = filter === "Todos" ? products : products.filter((product) => product.category === filter);

  const chooseCategory = (category: string) => {
    setFilter(category);
    window.setTimeout(() => document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  const openGallery = (product: Product) => {
    setGalleryProduct(product);
    setGalleryIndex(0);
  };

  const closeGallery = () => setGalleryProduct(null);
  const previousImage = () => galleryProduct && setGalleryIndex((current) => (current - 1 + galleryProduct.images.length) % galleryProduct.images.length);
  const nextImage = () => galleryProduct && setGalleryIndex((current) => (current + 1) % galleryProduct.images.length);

  useEffect(() => {
    if (!galleryProduct) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") previousImage();
      if (event.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryProduct]);

  return (
    <main className="home-page" id="contenido-principal" tabIndex={-1}>
      <a className="skip-link" href="#inicio">Saltar al contenido principal</a>
      <StructuredData data={catalogSchema} />
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Demader - Inicio">
          <img className="brand-logo" src="/demader-mark.png" alt="Demader" decoding="async" />
          <span className="brand-tagline">tu hogar de diseñador con alma de madera</span>
        </a>
        <nav className="nav-links" aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#catalogo">Catálogo</a>
          <a href="/arte-y-madera">Arte y madera</a>
          <a href="/importados">Importados</a>
          <a href="#nosotros">Nosotros</a>
          <a className="nav-cta" href={whatsappUrl()} target={WHATSAPP_NUMBER ? "_blank" : undefined} rel="noreferrer">WhatsApp</a>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Abrir menú de navegación"><span /><span /><span /></summary>
          <nav aria-label="Navegación móvil">
            <a href="#inicio">Inicio</a>
            <a href="#catalogo">Catálogo</a>
            <a href="/arte-y-madera">Arte y madera</a>
            <a href="/importados">Importados</a>
            <a href="#nosotros">Nosotros</a>
            <a className="mobile-menu-cta" href={whatsappUrl()}>WhatsApp</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Colección 2026 · Madera flor morado</p>
          <h1>Muebles que nacen de la madera, hechos para quedarse.</h1>
          <p className="hero-text">
            Diseño colombiano, líneas orgánicas y el carácter único de la madera
            natural en piezas creadas para acompañar tu hogar.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#productos">Explorar colección</a>
            <a className="text-link" href={whatsappUrl()} target={WHATSAPP_NUMBER ? "_blank" : undefined} rel="noreferrer">
              Cotizar por WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img className="hero-image" src="/catalog/hero-luxury.webp" alt="Comedor Luxury en madera flor morado en un ambiente natural" fetchPriority="high" decoding="async" />
          <div className="hero-badge"><span>100 %</span><small>madera flor morado</small></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Características de Demader">
        <span>Diseño artesanal</span><i aria-hidden="true" />
        <span>Madera natural</span><i aria-hidden="true" />
        <span>Hecho en Colombia</span>
      </section>

      <section className="collections" id="catalogo">
        <div className="section-heading">
          <div><p className="eyebrow">Nuestras colecciones</p><h2>Una pieza para cada espacio</h2></div>
          <p>Comedores, mesas y alcobas diseñados para resaltar las vetas y los tonos naturales de la madera.</p>
        </div>
        <div className="collection-grid">
          <button type="button" className="collection-card collection-card-large" onClick={() => chooseCategory("Comedores")} aria-controls="productos">
            <img src="/catalog/comedor-luxury.webp" alt="Comedor de la colección Luxury" loading="lazy" decoding="async" />
            <span className="collection-overlay"><small>Comedores y mesas</small><strong>Luxury</strong><em>Ver colección →</em></span>
          </button>
          <button type="button" className="collection-card" onClick={() => chooseCategory("Sillas y butacos")} aria-controls="productos">
            <img src="/catalog/comedor-tundra.webp" alt="Comedor de la colección Tundra" loading="lazy" decoding="async" />
            <span className="collection-overlay"><small>Líneas orgánicas</small><strong>Tundra</strong><em>Ver colección →</em></span>
          </button>
          <button type="button" className="collection-card" onClick={() => chooseCategory("Alcobas")} aria-controls="productos">
            <img src="/catalog/alcoba-curve.webp" alt="Alcoba de la colección Curve" loading="lazy" decoding="async" />
            <span className="collection-overlay"><small>Dormitorios</small><strong>Curve</strong><em>Ver colección →</em></span>
          </button>
        </div>
      </section>

      <section className="catalog-section" id="productos">
        <div className="catalog-top">
          <div><p className="eyebrow">Catálogo de mobiliario</p><h2>Elige tu próxima pieza</h2></div>
          <p>Cada mueble se elabora en madera flor morado. Solicita el precio y las opciones de acabado directamente por WhatsApp.</p>
        </div>
        <div className="filters" role="group" aria-label="Filtrar productos">
          {categories.map((category) => (
            <button type="button" key={category} className={filter === category ? "filter active" : "filter"} onClick={() => setFilter(category)} aria-pressed={filter === category} aria-controls="lista-productos">
              {category}
            </button>
          ))}
        </div>
        <p className="results-count" aria-live="polite" aria-atomic="true">{filtered.length} {filtered.length === 1 ? "producto" : "productos"}</p>
        <div className="product-grid" id="lista-productos" aria-label="Productos disponibles">
          {filtered.map((product) => (
            <article className="product-card product-card-gallery" key={product.ref}>
              <button type="button" className="home-product-button" onClick={() => openGallery(product)} aria-label={`Ver galería de ${product.name}, ${product.images.length} ${product.images.length === 1 ? "fotografía" : "fotografías"}`}>
              <div className="product-image-wrap">
                <img src={product.image} alt={`${product.name} de Demader`} loading="lazy" decoding="async" />
                <span className="product-collection">{product.collection}</span>
                {product.images.length > 1 && <span className="gallery-count"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v10h16V7H4Zm2 8 3.2-3.7 2.4 2.7 2.8-3.4L18 15H6Zm2-6.5A1.5 1.5 0 1 1 8 11a1.5 1.5 0 0 1 0-3Z" /></svg>{product.images.length} fotos</span>}
              </div>
              </button>
              <div className="product-content">
                <div className="product-title-row"><h3>{product.name}</h3><span>{product.ref}</span></div>
                <p>{product.description}</p>
                <small>{product.measures}</small>
                <a className="product-link" href={whatsappUrl(product)} target={WHATSAPP_NUMBER ? "_blank" : undefined} rel="noreferrer">
                  Solicitar precio <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {galleryProduct && (
        <div className="product-gallery" role="dialog" aria-modal="true" aria-label={`Galería de ${galleryProduct.name}`} onMouseDown={(event) => event.target === event.currentTarget && closeGallery()}>
          <div className="product-gallery-stage">
            <button type="button" className="gallery-close" onClick={closeGallery} aria-label="Cerrar galería">×</button>
            {galleryProduct.images.length > 1 && <button type="button" className="gallery-nav gallery-nav-prev" onClick={previousImage} aria-label="Fotografía anterior">‹</button>}
            <figure className="product-gallery-figure">
              <img src={galleryProduct.images[galleryIndex]} alt={`${galleryProduct.name}, fotografía ${galleryIndex + 1} de ${galleryProduct.images.length}`} decoding="async" />
            </figure>
            {galleryProduct.images.length > 1 && <button type="button" className="gallery-nav gallery-nav-next" onClick={nextImage} aria-label="Fotografía siguiente">›</button>}
            <div className="product-gallery-caption"><strong>{galleryProduct.name}</strong><span>{galleryIndex + 1} / {galleryProduct.images.length} · {galleryProduct.ref}</span></div>
          </div>
        </div>
      )}

      <section className="about" id="nosotros">
        <div className="about-image"><img src="/catalog/alcoba-curve-cajones.webp" alt="Alcoba Curve con cuatro cajones en madera flor morado" loading="lazy" decoding="async" /></div>
        <div className="about-copy">
          <p className="eyebrow">Nosotros</p>
          <h2>La madera guía cada diseño.</h2>
          <p>En Demader creamos mobiliario para el hogar con una mirada contemporánea y el respeto que merece la madera natural. Cada curva, unión y tallado busca conservar su carácter.</p>
          <div className="about-values">
            <div><strong>01</strong><span>Material honesto</span><p>Madera flor morado seleccionada por su resistencia y belleza.</p></div>
            <div><strong>02</strong><span>Diseño consciente</span><p>Piezas funcionales con identidad, pensadas para perdurar.</p></div>
            <div><strong>03</strong><span>Atención cercana</span><p>Te acompañamos para elegir referencia, medida y acabado.</p></div>
          </div>
        </div>
      </section>

      <section className="contact" id="contacto">
        <div className="contact-intro"><p className="eyebrow">Hablemos de tu espacio</p><h2>Tu próxima pieza empieza aquí.</h2></div>
        <div className="contact-details">
          <p>Cuéntanos qué referencia te gustó y recibe asesoría personalizada sobre precios, medidas, acabados y tiempo de entrega.</p>
          <a className="button button-light" href="https://wa.me/573044782128" target="_blank" rel="noreferrer">Escribir por WhatsApp <span aria-hidden="true">↗</span></a>
          <div className="contact-steps"><span><b>1</b> Elige tu mueble</span><span><b>2</b> Envía la referencia</span><span><b>3</b> Recibe tu cotización</span></div>
        </div>
      </section>

      <footer className="footer">
        <div className="brand brand-footer"><img className="brand-logo" src="/demader-mark.png" alt="Demader" loading="lazy" decoding="async" /><span className="brand-tagline">tu hogar de diseñador con alma de madera</span></div>
        <address className="footer-company">
          <strong>DEMADER S.A.S</strong>
          <span>NIT 901981556</span>
          <a href="mailto:demadermuebles@gmail.com">demadermuebles@gmail.com</a>
          <span>Calle 38 Sur # 72K-43, Bogotá</span>
          <a href="https://wa.me/573044782128" target="_blank" rel="noreferrer">WhatsApp: +57 304 4782128</a>
        </address>
        <div className="footer-actions">
          <div className="footer-links"><a href="#inicio">Inicio</a><a href="#catalogo">Catálogo</a><a href="/arte-y-madera">Arte y madera</a><a href="/importados">Importados</a><a href="#nosotros">Nosotros</a></div>
          <div className="social-links" aria-label="Redes sociales de Demader">
            <a href="https://www.facebook.com/100063636772577" target="_blank" rel="noreferrer" aria-label="Visitar Facebook de Demader" title="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4.5c-.5-.1-2.2-.2-4.1-.2-3.9 0-6.6 2.4-6.6 6.8V15H2v4h4.3v10h5.2V19h4.3l.7-4h-5v-3.5c0-1.2.3-2 2.5-2Z" /></svg>
            </a>
            <a href="https://www.instagram.com/mueblesdemader/" target="_blank" rel="noreferrer" aria-label="Visitar Instagram de Demader" title="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></svg>
            </a>
          </div>
        </div>
        <small>DEMADER — 2026 · Derechos reservados</small>
      </footer>
    </main>
  );
}
