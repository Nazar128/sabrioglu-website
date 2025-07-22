"use client";

import ContactForm from "@/app/components/ContactForm";
import Image from "next/image";
import React from "react";

const ContactPage = () => {
  return (
    <div className=" flex items-center justify-center p-12 md:mt-16">
      <div className="w-full max-w-4xl lg:max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl  md:p-10 text-white">
        <div className="flex flex-col justify-center space-y-8 text-center md:text-left">
          <Image
            src="/images/logo-Photoroom.png"
            alt="logo"
            width={100}
            height={25}
            className="mx-auto md:ml-0"
          />
          <h2 className="text-2xl font-semibold">Bizimle İletişime Geçin</h2>
          <p className="text-lg">
            Formu doldurarak bize kolayca ulaşabilirsiniz. Size en kısa sürede
            dönüş sağlayacağız.
          </p>
          <div className="text-base space-y-2 mt-4">
            
            <p>+90 534 964 1178</p>
            <p>
              <strong></strong> +90 552 693 4812
            </p>


            <p>info@sabriogluhafriyat.com.tr</p>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
