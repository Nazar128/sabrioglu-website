"use client";

import React, { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

type Message = {
  id: string;
  username?: string;
  email?: string;
  message?: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


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

  
  useEffect(() => {
    if (loading) return; 

    const fetchMessages = async () => {
      try {
        const snapshot = await getDocs(collection(db, "gelenKutusu"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];

        setMessages(data);
      } catch (error) {
        console.error("Mesajları alma hatası:", error);
      }
    };

    fetchMessages();
  }, [loading]); 



  return (
    <div className="p-6 max-w-4xl mx-auto mt-20 text-white">
      <h1 className="text-3xl font-bold mb-6">Gelen Kutusu</h1>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : messages.length === 0 ? (
        <p>Henüz mesaj yok.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg.id} className="p-4 border rounded-lg shadow">
              <p>
                <strong>İsim:</strong> {msg.username || "—"}
              </p>
              <p>
                <strong>Email:</strong> {msg.email || "—"}
              </p>
              <p>
                <strong>Mesaj:</strong> {msg.message || "—"}
              </p>
              <p className="text-sm text-gray-400">
                {msg.createdAt?.seconds
                  ? new Date(msg.createdAt.seconds * 1000).toLocaleString()
                  : "Tarih yok"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
