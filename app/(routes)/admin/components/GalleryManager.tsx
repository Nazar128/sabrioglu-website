"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { uploadFile } from "@/lib/firebaseUpload";

export const turler = [
 "Taş Duvar, Parke, Bordür",
  "Altyapı, Dere Islahı Uygulamaları",
  "Üst Yapı",
  "Hafriyat ve Kazı Çalışmaları",
  "Yol Yapım ve Düzenleme",
  "Peyzaj ve Çevre Düzenleme",
] as const;

export type FotoTur = typeof turler[number];

type Fotograf = {
  title: string;
  tur: FotoTur;
  image: string;
  id: string;
};

export default function GalleryManager() {
  const [gallery, setGallery] = useState<Fotograf[]>([]);
  const [title, setTitle] = useState("");
  const [tur, setTur] = useState<FotoTur>("Taş Duvar, Parke, Bordür");
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchGallery = async () => {
    const querySnapshot = await getDocs(collection(db, "gallery"));
    const data = querySnapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        title: String(d.title),
        tur: String(d.tur) as FotoTur,
        image: String(d.image),
      };
    });
    setGallery(data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!title) return alert("Başlık gerekli.");

    if (file && !file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      return alert("Sadece resim veya video yükleyebilirsiniz.");
    }

    let fileUrl = "";
    if (file) {
      fileUrl = await uploadFile(file, "gallery");
    }

    if (editingId) {
      const ref = doc(db, "gallery", editingId);
      await updateDoc(ref, {
        title,
        tur: String(tur),
        ...(fileUrl && { image: fileUrl }),
      });
      alert("Dosya güncellendi!");
    } else {
      await addDoc(collection(db, "gallery"), {
        title,
        tur: String(tur),
        image: fileUrl,
      });
      alert("Dosya eklendi!");
    }

    setTitle("");
    setTur("Taş Duvar, Parke, Bordür");
    setFile(null);
    setEditingId(null);
    fetchGallery();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "gallery", id));
    fetchGallery();
  };

  const handleEdit = (foto: Fotograf) => {
    setTitle(foto.title);
    setTur(foto.tur);
    setEditingId(foto.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-20 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold">Galeriyi Yönet</h1>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
          <input
            type="text"
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/10 placeholder-gray-300 border border-white/20 rounded px-4 py-2"
          />

          <select
            value={tur}
            onChange={(e) => {
              const selected = e.target.value;
              if (turler.includes(selected as FotoTur)) {
                setTur(selected as FotoTur);
              }
            }}
            className="w-full bg-white/10 text-gray-300 border border-white/20 rounded px-4 py-2"
          >
            {turler.map((t) => (
              <option key={t} value={String(t)}>
                {t}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full bg-white/10 text-gray-300 border border-white/20 rounded px-4 py-2 cursor-pointer"
          />

          <button
            onClick={handleAddOrUpdate}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
          >
            {editingId ? "Güncelle" : "Ekle"}
          </button>
        </div>

        <div className="space-y-4">
          {gallery.map((foto) => (
            <div
              key={foto.id}
              className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col gap-2"
            >
              <h3 className="text-xl font-semibold">{foto.title}</h3>
              <p className="text-sm italic text-gray-400">Kategori: {foto.tur}</p>

              {foto.image && (foto.image.includes(".mp4") ||
              foto.image.includes(".webm") ||
              foto.image.includes(".ogg") ? (
                <video
                  controls
                  src={foto.image}
                  className="w-full max-h-48 object-cover rounded"
                />
              ) : (
                <img
                  src={foto.image}
                  alt="galeri"
                  className="w-full max-h-48 object-cover rounded"
                />
              ))}

              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleEdit(foto)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(foto.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
