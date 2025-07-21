"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";


type Proje = {
  id: string;
  title: string;
  image: string;
  durum: "devam" | "bitmiş";
};

const ProjelerimizSection = () => {
  const [projeler, setProjeler] = useState<Proje[]>([]);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const data = querySnapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        title: String(d.title),
        image: String(d.image),
        durum: String(d.durum) as "devam" | "bitmiş",
      };
    });

    setProjeler(data.slice(0, 3)); 
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-full mx-auto px-16 py-12 bg-gradient-to-b from-[#000033] via-[#000022] to-[#000011]">
      <h2 className="text-4xl text-white font-bold mb-8 text-center">Projelerimiz</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        {projeler.map((project) => (
          <div
            key={project.id}
            className="relative group overflow-hidden shadow-lg bg-gray-900 rounded-2xl"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={500}
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
            />
            <div className="absolute top-4 left-4 text-white text-2xl font-bold drop-shadow-lg">
              {project.title}
            </div>
            <Link
              href={`/projelerimiz/${project.id}`}
              className="absolute bottom-4 right-4 flex items-center text-white text-lg cursor-pointer hover:underline drop-shadow-lg"
            >
              Keşfet <ArrowRight className="ml-2" />
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/projelerimiz">
          <button className="px-6 py-3 bg-blue-950 rounded-full text-white font-semibold hover:bg-blue-700 transition">
            Devamı
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjelerimizSection;
