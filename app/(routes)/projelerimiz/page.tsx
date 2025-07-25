
import Proje from '@/app/components/Proje'
import React from 'react'


export const metadata = {
  title: "Projelerimiz | Sabrioğlu Hafriyat",
  description:
    "Sabrioğlu Hafriyat tarafından gerçekleştirilen yıkım, dolgu ve altyapı projelerini keşfedin.",
  openGraph: {
    title: "Projelerimiz | Sabrioğlu Hafriyat",
    description: "Projelerimiz hakkında bilgi alın.",
    url: "https://sabriogluhafriyat.com.tr/projelerimiz",
    siteName: "Sabrioğlu Hafriyat",

    locale: "tr_TR",
    type: "website",
  },
};


const page = () => {
  return (
    <div className='flex flex-col items-center  text-white justify-center min-h-screen  relative overflow-hidden mt-6'>
      <Proje/>
    </div>
  )
}

export default page