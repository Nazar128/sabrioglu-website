'use client';


import HakkimizdaOzellikler from '@/app/components/HakkimizdaOzellikler';
import HakkimizdaKartlar from '@/app/components/HakkimizdaKartlar';
import HakkimizdaResimleri from '@/app/components/HakkimizdaResimleri';


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
