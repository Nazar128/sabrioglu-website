"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/images/anasayfa9.jpeg",
  "/images/Anasayfa.jpg",
  "/images/anasayfa4.jpeg",
  "/images/Anasayfa3.jpg",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
    
      <div className="absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center px-4 sm:px-6 md:px-8">
        <h2 className="font-inter text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug">
          SABRİOĞLU HAFRİYAT <br />
        </h2>
        <h3 className="font-body text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2">
          Güçlü Temeller, Güvenli Yarınlar
        </h3>
      </div>

      
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div className="min-w-full h-screen relative" key={idx}>
            <Image
              src={src}
              alt={`Slide ${idx + 1}`}
              fill
              className="object-fill z-0"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      
      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 
             bg-gradient text-white p-2 sm:p-3 rounded-full z-10
             hover:scale-110 hover:shadow-2xl
             backdrop-blur-md transition-transform duration-300"
      >
        &#8592;
      </button>

      
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 
             bg-gradient text-white p-2 sm:p-3 rounded-full z-10
             hover:scale-110 hover:shadow-2xl
             backdrop-blur-md transition-transform duration-300"
      >
        &#8594;
      </button>
    </div>
  );
}
