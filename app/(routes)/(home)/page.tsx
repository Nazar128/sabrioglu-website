import GaleriSection from "@/app/components/GaleriSection";
import HakkimizdaSection from "@/app/components/HakkimizdaSection";
import HizmetKartlari from "@/app/components/HizmetKartlari";
import HizmetlerimizSection from "@/app/components/HizmetlerimizSection";
import ProjelerimizSection from "@/app/components/ProjelerimizSection";
import Carousel from "@/components/carousel/Carousel";

import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Carousel />
      <br /> <br /> <br />
      <HakkimizdaSection/>
      <br />
      <HizmetlerimizSection/>
      <br />
      <ProjelerimizSection/>
      <br />
      <GaleriSection/>
    </div>
  );
};

export default page;
