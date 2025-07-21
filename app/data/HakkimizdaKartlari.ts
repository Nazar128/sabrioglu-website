export type HakkimizdaKart = {
  id: number;
  iconName: "shield" | "clock" | "hammer";
  title: string;
  text: string;
};

export const HakkimizdaKartlari: HakkimizdaKart[] = [
  {
    id: 1,
    iconName: "shield",
    title: "Güvenlik Önceliğimiz",
    text: "Projelerimizde iş sağlığı ve güvenliğini en üst seviyede tutuyoruz.",
  },
  {
    id: 2,
    iconName: "clock",
    title: "Zamanında Teslim",
    text: "Tüm projelerimizi planlanan zamanda eksiksiz teslim ediyoruz.",
  },
  {
    id: 3,
    iconName: "hammer",
    title: "Kaliteli İşçilik",
    text: "Yüksek kaliteli malzeme ve uzman işçilikle sağlam yapılar sunuyoruz.",
  },
];
