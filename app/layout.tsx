import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { site } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  title: {
    default: "Bansal Tech | Technology Solutions",
    template: "%s | Bansal Tech",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Bansal Tech | Technology Solutions",
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: "Bansal Tech | Technology Solutions",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f8f7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${bricolage.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#top"
          className="sr-only z-[60] rounded-md bg-pine px-4 py-2 text-sm text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
