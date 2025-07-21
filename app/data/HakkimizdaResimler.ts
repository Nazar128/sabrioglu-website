export type HakkimizdaResim = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  style: string;
  initial: string;
};

export const HakkimizdaResimler: HakkimizdaResim[] = [
    {
    id: "1",
    src: "/images/hakkimizda3.jpg",
    alt: "Sol Resim",
    style: "translate-x-0 translate-y-4 rotate-[-3deg]",
    initial: "-translate-x-60",
    width: 300,
    height: 220, },

  {
    id: "2",
    src: "/images/hakkimizda.jpg",
    alt: "Orta Resim",
    style: "scale-100",
    initial: "scale-75",
    width: 500,
    height: 320,
  },
    {
    id: "right",
    src: "/images/hakkimizda2.jpg",
    alt: "Sağ Resim",
    style: "translate-x-0 translate-y-4 rotate-[3deg]",
    initial: "translate-x-60",
    width: 300,
    height: 220,
  },
];
