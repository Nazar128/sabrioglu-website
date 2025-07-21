import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {  Menu } from "lucide-react";
import Link  from "next/link";
import Image from "next/image";

const MobileMenu = () => {
  return (
    <Sheet>
        <SheetTrigger asChild className="bg-gradient-to-b from-[#000033] via-[#000022] to-[#000011]">
          <Button variant="secondary" className="lg:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-gradient-to-b from-[#000033] via-[#000022] to-[#000011] text-center text-white space-y-10 ">
          <SheetHeader>
            <SheetTitle className="flex justify-center items-center">
                 <Image
                                    src= "/images/logo-Photoroom.png"
                                    alt="logo"
                                    width={100}
                                    height={25}
                                    className="p-2 "
                                  />
              
            </SheetTitle>
            <SheetDescription>
              
            </SheetDescription>
                      <Link href="/" className="text-white font-bold hover:underline">
                        Ana Sayfa
                      </Link>
                      <Link
                        href="/hakkimizda"
                        className="text-white font-bold hover:underline"
                      >
                        Hakkımızda
                      </Link>
                      <Link
                        href="/hizmetlerimiz"
                        className="text-white font-bold hover:underline"
                      >
                        Hizmetlerimiz
                      </Link>
                      <Link
                        href="/projelerimiz"
                        className="text-white font-bold hover:underline"
                      >
                        Projelerimiz
                      </Link>
                      <Link
                        href="/galeri"
                        className="text-white font-bold hover:underline"
                      >
                        Foto Galeri
                      </Link>
                      <Link
                        href="/iletisim"
                        className="text-white font-bold hover:underline"
                      >
                        İletişim
                      </Link>
          </SheetHeader>
        </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
