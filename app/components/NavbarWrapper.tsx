"use client";

import Navbar from "@/components/layout/navbar/Navbar";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";

export default function NavbarWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const layoutBg = isHome
    ? "bg-white"
    : "bg-gradient-to-l from-[#000022] via-[#000044] to-[#000022]";

  return (
    <div className={`min-h-screen flex flex-col ${layoutBg}`}>
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
