"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from "@/lib/firebase";

export default function AdminHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Çıkış hatası:", error);
    }
  };

  if (loading) {
    return <div className="text-white text-center p-10">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center gap-6  p-6">
      <div className="w-full max-w-xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-medium transition"
          >
            Çıkış Yap
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/admin/projeler")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold"
          >
            Projeleri Yönet
          </button>
          <button
            onClick={() => router.push("/admin/galeri")}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold"
          >
            Galeriyi Yönet
          </button>
          <button
            onClick={() => router.push("/admin/mesaj")}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold"
          >
            Gelen Kutusu
          </button>
        </div>
      </div>
    </div>
  );
}
