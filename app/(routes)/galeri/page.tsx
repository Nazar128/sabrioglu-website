import Galeri from '@/app/components/Galeri'
import React from 'react'

export const metadata = {
  title: "Galeri | Sabrioğlu Hafriyat",
  description:
    "Gerçekleştirdiğimiz hafriyat ve altyapı projelerine ait görselleri galeri sayfamızda inceleyin.",
  openGraph: {
    title: "Galeri | Sabrioğlu Hafriyat",
    description: "Projelerimize ait görselleri görüntüleyin.",
    url: "https://sabriogluhafriyat.com.tr/galeri",
    siteName: "Sabrioğlu Hafriyat",

    locale: "tr_TR",
    type: "website",
  },
};


const page = () => {
  return (
    <div className='flex flex-col items-center  text-white justify-center min-h-screen  p-4 pt-20 relative overflow-hidden'>
        <Galeri/>
    </div>
  )
}

export default page