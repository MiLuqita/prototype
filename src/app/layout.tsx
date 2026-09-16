import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi Luquita — Beta",
  description: "Prototipo beta del marketplace peruano de cachuelos Mi Luquita.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
