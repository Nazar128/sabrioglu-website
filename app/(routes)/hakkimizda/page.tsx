'use client';


import HakkimizdaOzellikler from '@/app/components/HakkimizdaOzellikler';
import HakkimizdaKartlar from '@/app/components/HakkimizdaKartlar';
import HakkimizdaResimleri from '@/app/components/HakkimizdaResimleri';


export const metadata = {
  title: "Hakkımızda | Sabrioğlu Hafriyat",
  description:
    "İstanbul ve çevresinde hizmet veren Sabrioğlu Hafriyat hakkında detaylı bilgi alın.",
  openGraph: {
    title: "Hakkımızda | Sabrioğlu Hafriyat",
    description: "Firmamızın vizyonu, misyonu ve tecrübesi hakkında bilgi edinin.",
    url: "https://sabriogluhafriyat.com.tr/hakkimizda",
    siteName: "Sabrioğlu Hafriyat",
    images: [
      {
        url: "https://sabriogluhafriyat.com.tr/images/hakkimizda.jpg",
        width: 1200,
        height: 630,
        alt: "Hakkımızda",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};



const Hakkimda = () => {
  return (
    <div className="flex flex-col items-center  text-white justify-center min-h-screen  p-4 pt-32 relative overflow-hidden">

    <HakkimizdaResimleri/>
    <HakkimizdaOzellikler/>
    <HakkimizdaKartlar/>

    </div>
  );
};

export default Hakkimda;
