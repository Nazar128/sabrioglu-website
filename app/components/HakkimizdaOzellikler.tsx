import React from "react";
import HakkimizdaVeriler from "../data/HakkimizdaVeriler";
import { getIcon } from "../utils/getIcon"; 

const HakkimizdaOzellikler = () => {
  return (
    <section className="flex flex-col items-center px-4 py-12 bg-transparent">
      {HakkimizdaVeriler.map((section) => (
        <div key={section.id} className="text-center max-w-3xl mb-16 z-10">
          {getIcon(section.iconName)}
          <h2 className="text-4xl font-bold text-white mb-4">{section.title}</h2>
          <p className="text-white font-medium text-lg leading-relaxed">
            {section.text}
          </p>
        </div>
      ))}
    </section>
  );
};

export default HakkimizdaOzellikler;
