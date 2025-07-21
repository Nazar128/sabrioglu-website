"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const turSirasi = [
  "Kilit ve Bordür Taşı Uygulamaları",
  "Dere Islahı",
  "Doğal Taş Uygulamaları",
  "Dekoratif Taş Duvar Yapımı",
  "Hafriyat ve Kazı Çalışmaları",
  "Üst Yapı ve Yol Açma Hizmetleri",
  "Yol Yapım ve Düzenleme",
  "Peyzaj ve Çevre Düzenleme",
  
];

type MediaItem = {
  id: string;
  title: string;
  tur: string;
  type: "image" | "video";
  media: string;
};

export default function Galeriler() {
  const [seciliTur, setSeciliTur] = useState<string>("Tümü");
  const [acikFoto, setAcikFoto] = useState<MediaItem | null>(null);
  const [fotograflar, setFotograflar] = useState<MediaItem[]>([]);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 4, spacing: 15 },
    mode: "free-snap",
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 8 },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const data: MediaItem[] = querySnapshot.docs.map((doc) => {
        const d = doc.data();

        const media = d.media || d.image || "";

        return {
          id: doc.id,
          title: d.title || "Başlıksız",
          tur: d.tur || "Bilinmiyor",
          type: d.type || (media.endsWith(".mp4") ? "video" : "image"), // Eğer 'type' yoksa dosya uzantısına göre tahmin
          media,
        };
      });
      setFotograflar(data);
    };

    fetchData();
  }, []);

  const filtrelenmisFotograflar =
    seciliTur === "Tümü"
      ? fotograflar
      : fotograflar.filter((foto) => foto.tur === seciliTur);

  return (
    <div className="min-h-screen py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Foto Galeri
      </h1>

      <div className="flex items-center justify-center gap-4 mb-10 max-w-7xl mx-auto relative">
        <button
          onClick={() => slider.current?.prev()}
          className="bg-white text-gray-800 rounded-full p-3 shadow hover:bg-gray-300"
        >
          <ChevronLeft size={40} />
        </button>

        <div ref={sliderRef} className="keen-slider flex w-[80%] px-5">
          {["Tümü", ...turSirasi].map((tur) => (
            <div key={tur} className="keen-slider__slide flex justify-center">
              <button
                onClick={() => setSeciliTur(tur)}
                className={`w-64 h-12 flex items-center justify-center rounded-full text-base border whitespace-nowrap transition-all ${
                  seciliTur === tur
                    ? "bg-blue-500 text-white"
                    : "text-white border-white hover:bg-blue-500 hover:text-white"
                }`}
              >
                {tur}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => slider.current?.next()}
          className="bg-white text-gray-800 rounded-full p-3 shadow hover:bg-gray-300"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      {filtrelenmisFotograflar.length === 0 ? (
        <p className="text-center text-white">Medya bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtrelenmisFotograflar.map((foto, index) => (
            <motion.div
              key={foto.id}
              className="rounded-lg shadow-lg overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              onClick={() => setAcikFoto(foto)}
            >
              <div className="overflow-hidden">
                {foto.media ? (
                  foto.type === "video" ? (
                    <video
                      src={foto.media}
                      className="w-full h-auto sm:h-60 object-contain "
                      controls
                    />
                  ) : (
                    <Image
                      src={foto.media}
                      alt={foto.title}
                      width={800}
                      height={400}
                      className="w-full h-60 object-contain "
                    />
                  )
                ) : (
                  <div className="w-full h-56 sm:h-60 bg-gray-800 text-white flex items-center justify-center">
                    Medya yok
                  </div>
                )}
              </div>

              <div className="p-4 text-center">
                <p className="font-medium text-white">{foto.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

     
      <AnimatePresence>
        {acikFoto && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-l from-[#000022] via-[#000044] to-[#000022] bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-4xl w-full p-4">
              <button
                onClick={() => setAcikFoto(null)}
                className="absolute top-4 right-4 text-white text-3xl"
              >
                <X size={32} />
              </button>

              {acikFoto.media ? (
                acikFoto.type === "video" ? (
                  <video
                    src={acikFoto.media}
                    controls
                    className="w-full max-h-[70vh] object-contain rounded"
                  />
                ) : (
                  <Image
                    src={acikFoto.media}
                    alt={acikFoto.title}
                    width={1200}
                    height={800}
                    className="w-full max-h-[70vh] object-contain rounded"
                  />
                )
              ) : (
                <p className="text-white text-center">Medya bulunamadı.</p>
              )}

              <p className="mt-4 text-center text-white text-lg">
                {acikFoto.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
