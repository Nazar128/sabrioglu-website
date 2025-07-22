import GaleriSection from "@/app/components/GaleriSection";
import HakkimizdaSection from "@/app/components/HakkimizdaSection";
import HizmetlerimizSection from "@/app/components/HizmetlerimizSection";
import ProjelerimizSection from "@/app/components/ProjelerimizSection";
import Carousel from "@/components/carousel/Carousel";


import React from "react";

const page = () => {
  return (
    <div>
      <Carousel />
      <br /> <br /> <br />
      <HakkimizdaSection/>
      <br /> <br /> <br />
      <HizmetlerimizSection/>
      <br /> <br /> <br />
      <ProjelerimizSection/>
      <br /> <br /> <br />
      <GaleriSection/>
      <br /> <br /> <br />
    </div>
  );
};

export default page;
