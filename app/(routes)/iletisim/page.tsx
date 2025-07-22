"use client";

import ContactForm from "@/app/components/ContactForm";
import Image from "next/image";
import React from "react";

const ContactPage = () => {
  return (
    <div className="flex items-center justify-center px-4 py-24 md:mt-16">
      <div className="w-full max-w-xl sm:max-w-4xl lg:max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10  backdrop-blur-md border-2 border-white/20 shadow-2xl rounded-2xl md:p-10 text-white">
        
        
        <div className="flex flex-col justify-center space-y-6 text-center md:text-left px-4 md:px-0">
          <Image
            src="/images/logo-Photoroom.png"
            alt="logo"
            width={100}
            height={25}
            className="mx-auto md:mx-0"
          />
          <h2 className="text-2xl font-semibold">Bizimle İletişime Geçin</h2>
          <p className="text-base leading-relaxed">
            Formu doldurarak bize kolayca ulaşabilirsiniz. Size en kısa sürede
            dönüş sağlayacağız.
          </p>
          <div className="text-base space-y-2 mt-4">
            <p>+90 534 964 1178</p>
            <p>+90 552 693 4812</p>
            <p>info@sabriogluhafriyat.com.tr</p>
          </div>
        </div>

      
        <div className="px-4 md:px-0">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
