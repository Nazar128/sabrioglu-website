"use client";
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

import { hizmetVerileri } from "../data/HizmetVerileri";
import hizmetIcons from "../utils/HizmetIcons";

const HizmetlerimizSection = () => {
  const ilkUcHizmet = hizmetVerileri.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-950">Hizmetlerimiz</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {ilkUcHizmet.map(({ id, iconName, title, text }) => {
          const key = iconName as keyof typeof hizmetIcons;
          const IconComponent = hizmetIcons[key];

          return (
            <Card
              key={id}
              className="flex flex-col items-center justify-center p-8 text-center rounded-xl shadow-lg bg-gradient-to-l from-[#000022] via-[#000044] to-[#000022] hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              {IconComponent && (
                <IconComponent className="text-white" size={64} aria-label={`${title} ikonu`} />
              )}

              <CardContent>
                <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-100">{text}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/hizmetlerimiz"
          className="inline-block px-6 py-3 bg-blue-950 text-white font-semibold rounded-full hover:bg-blue-800 transition"
        >
          Devamı
        </Link>
      </div>
    </section>
  );
};

export default HizmetlerimizSection;
