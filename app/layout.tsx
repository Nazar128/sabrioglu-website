import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/layout/footer/Footer";
import NavbarWrapper from "./components/NavbarWrapper";

export const metadata: Metadata = {
  title: "Sabrioglu Hafriyat | Hafriyat, Yıkım ve Altyapı Hizmetleri",
  description:
    "Sabrioğlu Hafriyat, profesyonel hafriyat, kazı, dolgu, yıkım ve altyapı hizmetleri sunar. İstanbul ve çevresinde güvenilir hafriyat firması.",
  keywords: [
    "Sabrioğlu Hafriyat İnşaat Sanayi Ticaret Limited Şirketi",
    "Sabrioglu Hafriyat",
    "hafriyat",
    "yıkım",
    "altyapı",
    "kazı",
    "dolgu",
    "hafriyat firması",
    "istanbul hafriyat",
    "hafriyat hizmeti",
    "hafriyat şirketi",
  ],
  icons: {
    icon: "/images/O (7).ico",
  },
  openGraph: {
    title: "Sabrioglu Hafriyat",
    description:
      "Profesyonel hafriyat, yıkım ve altyapı hizmetleri. İstanbul'un güvenilir hafriyat firması.",
    url: "https://sabriogluhafriyat.com.tr",
    siteName: "Sabrioglu Hafriyat",
    images: [
      {
        url: "/images/anasayfa9.jpeg", 
        width: 1200,
        height: 630,
        alt: "Sabrioglu Hafriyat",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NavbarWrapper>{children}</NavbarWrapper>
        <Footer />
      </body>
    </html>
  );
}
