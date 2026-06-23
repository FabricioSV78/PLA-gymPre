import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gym Rat Club | Donde empieza tu siguiente nivel",
  description:
    "Gimnasio de alto rendimiento con coaching, clases, zonas especializadas y una semana de experiencia gratuita.",
  openGraph: {
    title: "Gym Rat Club",
    description: "No vienes solo a entrenar. Vienes a superarte.",
    type: "website",
    locale: "es_PE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080907",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
