"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 650);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const navbarBg =
    pathname === "/"
      ? isScrolled
        ? "bg-gradient-to-b from-[#000033] via-[#000022] to-[#000011]"
        : "bg-transparent"
      : "bg-transparent";

  return (
    <div className={`text-white fixed w-full z-50 transition-colors duration-500 ${navbarBg}`}>
      <div className="container mx-auto flex items-center justify-between px-5">
        <Image
          src="/images/logo-Photoroom.png"
          alt="logo"
          width={100}
          height={25}
          className="p-3"
        />

        <nav className="font-inter hidden md:flex space-x-10 text-lg font-bold">
          <div className="p-2 pt-0.5 border-2 border-transparent hover:rounded-2xl hover:border-2 z-50 hover:border-white">
            <Link href="/" className="text-white m-2 font-extrabold z-50">
              ANA SAYFA
            </Link>
          </div>
          <div className="p-2 pt-0.5 border-2 border-transparent hover:rounded-2xl hover:border-2 hover:border-white">
            <Link href="/hakkimizda" className="text-white m-2 font-extrabold">
              HAKKIMIZDA
            </Link>
          </div>
          <div className="p-2 pt-0.5 border-2 border-transparent hover:rounded-2xl hover:border-2 hover:border-white">
            <Link href="/hizmetlerimiz" className="text-white m-2 font-extrabold">
              HİZMETLERİMİZ
            </Link>
          </div>
          <div className="p-2 pt-0.5 border-2 border-transparent hover:rounded-2xl hover:border-2 hover:border-white">
            <Link href="/projelerimiz" className="text-white m-2 font-extrabold">
              PROJELERİMİZ
            </Link>
          </div>
          <div className="p-2 pt-0.5 border-2 border-transparent hover:rounded-2xl hover:border-2 hover:border-white">
            <Link href="/galeri" className="text-white m-2 font-extrabold">
              FOTO GALERİ
            </Link>
          </div>
          <div className="p-2 pt-0.5 border-2 border-transparent hover:rounded-2xl hover:border-2 hover:border-white">
            <Link href="/iletisim" className="text-white m-2 font-extrabold">
              İLETİŞİM
            </Link>
          </div>
        </nav>

        <div className="flex items-center space-x-2">
          {/* <Button>
            <Search />
          </Button> */}
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
