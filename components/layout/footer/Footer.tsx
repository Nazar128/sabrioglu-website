"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#000033] via-[#000022] to-[#000011] text-white py-10 font-inter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Logo + Açıklama */}
          <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <Image
              src="/images/logo-Photoroom.png"
              alt="logo"
              width={60}
              height={30}
              className="p-2"
            />
            <p className="text-[13px] md:text-sm text-gray-300 max-w-xs">
              Kalıcı yapılar, sağlam temel. Sabrioğlu Hafriyat olarak
              tecrübemizle geleceği inşa ediyoruz.
            </p>
          </div>

          {/* Linkler */}
          <div className="grid grid-cols-2 gap-6 text-[13px] md:text-sm text-center md:text-left justify-center md:justify-start pt-6 md:pt-14">
            <div className="space-y-2">
              <Link href="/" className="hover:underline block font-semibold">
                Ana Sayfa
              </Link>
              <Link href="/hakkimizda" className="hover:underline block">
                Hakkımızda
              </Link>
              <Link href="/hizmetlerimiz" className="hover:underline block">
                Hizmetlerimiz
              </Link>
            </div>
            <div className="space-y-2">
              <Link href="/projelerimiz" className="hover:underline block">
                Projelerimiz
              </Link>
              <Link href="/galeri" className="hover:underline block">
                Foto Galeri
              </Link>
              <Link href="/iletisim" className="hover:underline block">
                İletişim
              </Link>
            </div>
          </div>

          {/* İletişim */}
          <div className="text-[13px] md:text-sm space-y-2 text-center md:text-right pt-6 md:pt-14">
            <p>+90 534 964 1178</p>
            <p>+90 552 693 4812</p>
            <p>info@sabriogluhafriyat.com.tr</p>
          </div>
        </div>

        {/* Alt bilgi */}
        <div className="text-center text-xs text-gray-500 mt-10">
          © {new Date().getFullYear()} Sabrioğlu Hafriyat. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
