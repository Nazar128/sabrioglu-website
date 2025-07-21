'use client';
import React, { useState, useEffect } from "react";
import { HakkimizdaResimler } from "../data/HakkimizdaResimler";
import Image from "next/image";

const HakkimizdaResimleri = () => {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    setShowImages(true);
  }, []);

  return (
    <div className="relative flex items-center justify-center mb-32 z-10 p-8 shadow-lg shadow-gray-50">
      {HakkimizdaResimler.map((img) => (
        <div
          key={img.id}
          style={{ width: img.width, height: img.height }}
          className={`
            relative z-20 mx-4 overflow-hidden
            shadow-lg transition-all duration-1000 ease-in-out transform
            ${showImages ? img.style + " opacity-100 scale-100" : img.initial + " opacity-0 scale-75"}
          `}
        >
          
          <div className="absolute -inset-4 bg-blue-300 opacity-20 blur-3xl z-0" />

          
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover relative z-10"
          />
        </div>
      ))}
    </div>
  );
};

export default HakkimizdaResimleri;
