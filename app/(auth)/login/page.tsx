"use client";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Giriş başarısız: " + err.message);
      } else {
        alert("Bilinmeyen bir hata oluştu.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-8 text-white space-y-6">
        <h1 className="text-2xl font-semibold text-center">Admin Girişi</h1>

        <div>
          <label className="text-sm font-medium mb-1 block">Email</label>
          <input
            type="email"
            placeholder="ornek@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Şifre</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-2 rounded-lg shadow-md"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
