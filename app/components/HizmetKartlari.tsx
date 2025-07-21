"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import { hizmetVerileri } from "../data/HizmetVerileri";
import hizmetIcons from "../utils/HizmetIcons";

const HizmetKartlari = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full px-6 mx-auto">
        {hizmetVerileri.map(({ id, iconName, title, text }) => {
          const key = iconName as keyof typeof hizmetIcons;
          const IconComponent = hizmetIcons[key];

          return (
            <Card
              key={id}
              className="
                flex flex-col items-center justify-center p-8 text-center rounded-xl
                bg-transparent shadow-lg
                transform transition
                duration-300
                cursor-pointer
                hover:shadow-2xl hover:scale-105
                motion-safe:animate-fadeIn
              "
            >
              {IconComponent ? (
                <div
                  className="
                    relative mb-6 flex items-center justify-center rounded-full bg-blue-950 w-20 h-20
                    transition-colors duration-500 hover:bg-yellow-300 hover:shadow-[0_0_15px_5px_rgba(255,255,100,0.7)]
                    cursor-pointer
                  "
                >
                  <IconComponent
                    className="text-blue-100 hover:text-blue-950 transition-colors duration-500 hover-grow-glow"
                    size={72}
                    aria-label={`${title} ikonu`}
                  />
                  <span className="absolute inset-0 rounded-full border-4 border-yellow-300 opacity-0 hover:opacity-100 transition-opacity duration-500"></span>
                </div>
              ) : (
                <div className="w-20 h-20 mb-6 bg-gray-300 rounded-full animate-pulse" />
              )}

              <CardContent>
                <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
                <p className="text-gray-100">{text}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default HizmetKartlari;
