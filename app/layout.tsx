import type { Metadata } from "next";
import { StructuredData } from "../components/seo/StructuredData";
import { organizationSchema, SITE_URL } from "../lib/seo/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Demader Muebles | Mobiliario en madera flor morado",
    template: "%s | Demader Muebles",
  },
  description:
    "Muebles elaborados en madera flor morado. Diseño artesanal colombiano para comedores, salas y alcobas.",
  alternates: { canonical: "/" },
  keywords: ["muebles en madera", "madera flor morado", "muebles Bogotá", "comedores", "alcobas", "Demader"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Demader Muebles | Mobiliario en madera flor morado",
    description: "Naturaleza que inspira. Mobiliario colombiano en madera flor morado.",
    type: "website",
    url: SITE_URL,
    siteName: "Demader Muebles",
    locale: "es_CO",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Demader Muebles - Naturaleza que inspira" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Demader Muebles | Mobiliario en madera flor morado",
    description: "Naturaleza que inspira. Mobiliario colombiano en madera flor morado.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body><StructuredData data={organizationSchema} />{children}</body>
    </html>
  );
}
