import Link from "next/link";
import React from "react";
import HakkimizdaVeriler from "../data/HakkimizdaVeriler";

const HakkimizdaSection = () => {
  const { title, text } = HakkimizdaVeriler[0];

  return (
    <section className="max-w-full mx-auto px-16 py-12  md:px-20 text-blue-950 font-inter">
      <div className=" max-w-4xl mx-auto text-center flex flex-col items-center md:flex-row md:items-start gap-8 p-8  ">
        <div className="hidden md:block w-40 h-40 rounded-full  items-center">
            <img src="/images/logohakkimizda.png" className="rounded-full "  />
        </div>

        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg leading-relaxed mb-6 text-blue-950">{text}</p>

          <Link
            href="/hakkimizda"
            className="inline-block bg-blue-950 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
          >
            Devamı →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HakkimizdaSection;
