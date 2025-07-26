import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/layout/footer/Footer";
import NavbarWrapper from "./components/NavbarWrapper";

export const metadata: Metadata = {
  title: "Hafriyat, Yıkım ve Altyapı Hizmetleri | Sabrioğlu Hafriyat",
  description:
    "İstanbul ve çevresinde profesyonel hafriyat, kazı, dolgu, yıkım ve altyapı hizmetleri. Güvenilir ve deneyimli hafriyat firması Sabrioğlu Hafriyat.",
  keywords: [
    "Sabrioğlu Hafriyat",
    "hafriyat firması",
    "istanbul hafriyat",
    "kazı dolgu yıkım",
    "altyapı hizmetleri"
  ],
  icons: {
    icon: "favicon.ico",
  },
  openGraph: {
    title: "Hafriyat, Yıkım ve Altyapı Hizmetleri | Sabrioğlu Hafriyat",
    description:
      "İstanbul’un güvenilir hafriyat firması. Profesyonel kazı, dolgu, yıkım ve altyapı çözümleri.",
    url: "https://sabriogluhafriyat.com.tr",
    siteName: "Sabrioglu Hafriyat",
    images: [
      {
        url: "https://sabriogluhafriyat.com.tr/images/anasayfa9.jpeg",
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
