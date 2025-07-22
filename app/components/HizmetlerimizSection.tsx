import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const HizmetlerimizSection = () => {
  return (
    <section className="max-w-full mx-auto px-6 py-12 md:px-20 text-blue-950 font-inter">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 p-4 md:p-8">
        
        
        <div className="flex-1 text-center md:text-left order-2 md:order-1">
          <h2 className="text-4xl font-bold mb-2">Hizmetlerimiz</h2>

          <p className="text-blue-700 font-semibold mb-4">
            Tüm altyapı ve üstyapı çözümleri tek çatı altında
          </p>

          <p className="text-md leading-relaxed mb-6">
            Firmamız; altyapı ve üstyapı alanlarında geniş bir hizmet yelpazesi sunmaktadır. Kanalizasyon, taş duvar, parke, bordür, beton döküm, peyzaj düzenlemeleri, hafriyat ve dere ıslahı gibi işlerimizi titizlikle ve zamanında tamamlıyoruz. 
            Deneyimli ekibimiz, ihtiyaçlarınıza uygun pratik ve sağlam çözümlerle her projeyi başarılı şekilde sonuçlandırmaktadır. Müşteri memnuniyeti ve iş kalitesi bizim için her zaman önceliklidir.
          </p>

          <Link
            href="/hizmetlerimiz"
            className="inline-flex items-center justify-center gap-2 bg-blue-950 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition mx-auto md:mx-0"
          >
            Tüm Hizmetler <FaArrowRight />
          </Link>
        </div>

      
        <div className="w-3/4 max-w-sm md:max-w-md flex-shrink-0 order-1 md:order-2">
          <img
            src="/images/hizmetlerimiz.jpeg"
            alt="Hizmetlerimiz"
            className="w-full h-auto rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HizmetlerimizSection;
