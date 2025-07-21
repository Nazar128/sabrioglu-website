'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Hammer, ShieldCheck, Clock3, Eye, Target, LineChart } from 'lucide-react';
import HakkimizdaOzellikler from '@/app/components/HakkimizdaOzellikler';
import HakkimizdaKartlar from '@/app/components/HakkimizdaKartlar';
import HakkimizdaResimleri from '@/app/components/HakkimizdaResimleri';


const Hakkimda = () => {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    setShowImages(true);
  }, []);

  return (
    <div className="flex flex-col items-center  text-white justify-center min-h-screen  p-4 pt-32 relative overflow-hidden">

    <HakkimizdaResimleri/>
    <HakkimizdaOzellikler/>
    <HakkimizdaKartlar/>

    </div>
  );
};

export default Hakkimda;
