"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";

type GaleriItem = {
  id: string;
  title: string;
  media: string;
  type: "image" | "video";
};

const GaleriSection = () => {
  const [medyalar, setMedyalar] = useState<GaleriItem[]>([]);

  const fetchMedia = async () => {
    const snapshot = await getDocs(collection(db, "gallery"));
    const data = snapshot.docs.map((doc) => {
      const d = doc.data();
      const media = d.media || d.image || "";
      const type: "image" | "video" = d.type || (media.endsWith(".mp4") ? "video" : "image");

      return {
        id: doc.id,
        title: String(d.title),
        media,
        type,
      };
    });

    setMedyalar(data.slice(0, 3)); 
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div className="max-w-7xl mx-auto  px-4 py-12">
      <h2 className="text-blue-950 text-4xl font-bold mb-8 text-center">
        Galeri
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        {medyalar.map((item) => (
          <div
            key={item.id}
            className="relative group overflow-hidden shadow-lg  bg-gradient-to-l from-[#000022] via-[#000044] to-[#000022] rounded"
          >
            {item.type === "video" ? (
              <video
                src={item.media}
                controls
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <Image
                src={item.media}
                alt={item.title}
                width={500}
                height={250}
                className="w-full h-[250px] object-cover transition-transform duration-500 p-3 group-hover:scale-110"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/galeri">
          <button className="px-6 py-3 bg-blue-950 rounded-full text-white font-semibold hover:bg-blue-700 transition">
            Devamı
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GaleriSection;
