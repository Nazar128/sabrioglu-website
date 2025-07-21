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

type Durum = "devam" | "bitmiş";

type Proje = {
  id: string;
  title: string;
  text: string;
  image: string;
  durum: Durum;
};

export default function ProjectManager() {
  const [projects, setProjects] = useState<Proje[]>([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [durum, setDurum] = useState<Durum>("devam");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const data = querySnapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        title: String(d.title),
        text: String(d.text),
        durum: String(d.durum) as Durum,
        image: String(d.image),
      };
    });
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!title || !text) return alert("Tüm alanları doldurun.");

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadFile(imageFile, "projects");
    }

    if (editingId) {
      const ref = doc(db, "projects", editingId);
      await updateDoc(ref, {
        title,
        text,
        durum: String(durum),
        ...(imageUrl && { image: imageUrl }),
      });
      alert("Proje güncellendi!");
    } else {
      await addDoc(collection(db, "projects"), {
        title,
        text,
        durum: String(durum),
        image: imageUrl,
      });
      alert("Proje eklendi!");
    }

    setTitle("");
    setText("");
    setDurum("devam");
    setImageFile(null);
    setEditingId(null);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
    fetchProjects();
  };

  const handleEdit = (proje: Proje) => {
    setTitle(proje.title);
    setText(proje.text);
    setDurum(proje.durum);
    setEditingId(proje.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-20 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold">Projeleri Yönet</h1>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
          <input
            type="text"
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded px-4 py-2"
          />
          <textarea
            placeholder="Açıklama"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded px-4 py-2"
          />
          <select
            value={durum}
            onChange={(e) => setDurum(e.target.value as Durum)}
            className="w-full bg-white/10 border border-white/20 rounded px-4 py-2"
          >
            <option value="devam">Devam</option>
            <option value="bitmiş">Bitmiş</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full bg-white/10 text-gray-300 border border-white/20 rounded px-4 py-2 cursor-pointer"
          />
          <button
            onClick={handleAddOrUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            {editingId ? "Güncelle" : "Ekle"}
          </button>
        </div>

        <div className="space-y-4">
          {projects.map((proje) => (
            <div
              key={proje.id}
              className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col gap-2"
            >
              <h3 className="text-xl font-semibold">{proje.title}</h3>
              <p className="text-gray-300 text-sm">{proje.text}</p>
              <p className="text-sm italic text-gray-400">Durum: {proje.durum}</p>
              {proje.image && (
                <img
                  src={proje.image}
                  alt="proje"
                  className="w-full max-h-48 object-cover rounded"
                />
              )}
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleEdit(proje)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(proje.id)}
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
