import HizmetKartlari from '@/app/components/HizmetKartlari'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center  text-white justify-center min-h-screen  p-4 pt-32 relative overflow-hidden">
        <h1 className="text-4xl font-bold font-inter mb-12  text-[silver]">HİZMETLERİMİZ</h1>
        <HizmetKartlari/>
    </div>
  )
}

export default page;