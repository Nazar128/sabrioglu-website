"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Proje = {
  title: string;
  image: string;
  text: string;
};

export default function ProjeDetayPage({ id }: { id: string }) {
  const router = useRouter();
  const [proje, setProje] = useState<Proje | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const ref = doc(db, "projects", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProje(snap.data() as Proje);
      }
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  if (loading) return <p className="text-white p-4">Yükleniyor...</p>;
  if (!proje) return <p className="text-red-400 p-4">Proje bulunamadı.</p>;

  return (
    <div className="text-white p-6 text-center mt-20">
      <h1 className="text-3xl mb-4">{proje.title}</h1>
      <div
        style={{ width: "100%", height: 500, position: "relative" }}
        className="p-2 mt-6"
      >
        <Image
          src={proje.image}
          alt={proje.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="mt-4">{proje.text}</p>
      <button
        onClick={() => router.back()}
        className="mt-6 bg-blue-700 px-4 py-2 rounded"
      >
        Geri Dön
      </button>
    </div>
  );
}
