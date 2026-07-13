import type { Metadata } from "next";
import { Raleway, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import "./globals.css";

// Títulos: sans fina e elegante.
const display = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

// Interface/corpo: sans limpa.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://monaco-club.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Monaco Club",
    template: "%s · Monaco Club",
  },
  description:
    "Monaco Club — marca de moda clássica fina, para ela e para ele. Tudo em pronta entrega.",
  openGraph: {
    title: "Monaco Club",
    description: "Moda clássica fina — para ela e para ele.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col bg-bone font-sans text-ink antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
