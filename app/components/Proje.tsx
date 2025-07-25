"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export type Proje = {
  id: string;
  title: string;
  image: string;
  durum: "devam" | "bitmiş";
};

const Proje = () => {
  const [projeler, setProjeler] = useState<Proje[]>([]);
  const [activeTab, setActiveTab] = useState<"tum" | "devam" | "bitmis">("tum");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projelerData: Proje[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Proje, "id">),
      }));
      setProjeler(projelerData);
    };
    fetchData();
  }, []);

  const devamEdenProjeler = projeler.filter(
    (project) => project.durum === "devam"
  );
  const tamamlananProjeler = projeler.filter(
    (project) => project.durum === "bitmiş"
  );

  const renderProjeler = (liste: Proje[]) => (
    <div className="w-full mx-1 grid grid-cols-1 lg:grid-cols-2 gap-6 px-7">
      {liste.map((project) => (
        <div
          key={project.id}
          className="relative group overflow-hidden shadow-xl bg-gray-200 "
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={700}
              height={600}
              placeholder="empty"
              priority
              className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-[500px] bg-gray-400 flex items-center justify-center text-white text-xl italic">
              Görsel Yok
            </div>
          )}

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
  );

  return (
    <div className="flex flex-col items-center text-white pt-28  relative overflow-hidden">
      <div className="flex space-x-6 mb-10">
        <button
          onClick={() => setActiveTab("tum")}
          className={`px-2 py-2 rounded-full font-semibold transition border-2 border-white ${activeTab === "tum" ? "bg-blue-950 text-white" : "bg-gray-400 hover:bg-blue-650"}`}
        >
          Tümü
        </button>
        <button
          onClick={() => setActiveTab("devam")}
          className={`px-2 py-2 rounded-full font-semibold transition border-2 border-white ${activeTab === "devam" ? "bg-blue-950 text-white" : "bg-gray-400 hover:bg-blue-650"}`}
        >
          Devam Eden Projeler
        </button>
        <button
          onClick={() => setActiveTab("bitmis")}
          className={`px-2 py-2 rounded-full font-semibold transition border-2 border-white ${activeTab === "bitmis" ? "bg-blue-950 text-white" : "bg-gray-400 hover:bg-blue-650"}`}
        >
          Tamamlanmış Projeler
        </button>
      </div>

      <div className="w-full max-w-5xl text-white">
        {activeTab === "devam" && (
          <>
            <h1 className="text-3xl mb-4 text-gray-200"></h1>
            {renderProjeler(devamEdenProjeler)}
          </>
        )}
        {activeTab === "bitmis" && (
          <>
            <h1 className="text-3xl mb-4 text-gray-200"></h1>
            {renderProjeler(tamamlananProjeler)}
          </>
        )}
        {activeTab === "tum" && (
          <>
            <h1 className="text-3xl mb-4 text-gray-200"></h1>
            {renderProjeler(projeler)}
          </>
        )}
      </div>
    </div>
  );
};

export default Proje;
