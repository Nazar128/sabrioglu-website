import HizmetKartlari from '@/app/components/HizmetKartlari'
import React from 'react'

export const metadata = {
  title: "Hizmetlerimiz | Sabrioğlu Hafriyat",
  description:
    "Kazı, dolgu, yıkım ve altyapı alanlarında sunduğumuz profesyonel hizmetleri detaylıca inceleyin.",
  openGraph: {
    title: "Hizmetlerimiz | Sabrioğlu Hafriyat",
    description:
      "Profesyonel hafriyat, dolgu ve yıkım hizmetlerimiz hakkında detaylı bilgi edinin.",
    url: "https://sabriogluhafriyat.com.tr/hizmetlerimiz",
    siteName: "Sabrioğlu Hafriyat",
 
    
    locale: "tr_TR",
    type: "website",
  },
};


const Page = () => {
  return (
    <div className="flex flex-col items-center  text-white justify-center min-h-screen  p-4 pt-32 relative overflow-hidden">
        <h1 className="text-4xl font-bold font-inter mb-12  text-gray-50">HİZMETLERİMİZ</h1>
        <HizmetKartlari/>
    </div>
  )
}

export default Page;