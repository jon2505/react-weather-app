import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clima — Tiempo en Tiempo Real",
  description:
    "Aplicación meteorológica interactiva impulsada por la API Open-Meteo. Busca cualquier ciudad o usa tu ubicación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
