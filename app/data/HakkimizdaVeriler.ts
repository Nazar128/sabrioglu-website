export type HakkimizdaVeri = {
  id: number;
  iconName: "none" | "eye" | "target" | "lineChart";
  title: string;
  text: string;
};

export const HakkimizdaVeriler: HakkimizdaVeri[] = [
  {
    id: 1,
    iconName: "none",
    title: "Hakkımızda",
    text: "Sabrioğlu Hafriyat, sektör deneyimi uzun yıllara dayanan bir kurucunun liderliğinde kurulmuş yeni bir firmadır. Deneyim, kalite ve güveni bir araya getirerek kalıcı yapılar inşa ediyoruz.",
  },
  {
    id: 2,
    iconName: "eye",
    title: "Vizyonumuz",
    text: " Geleceğin modern yapılarını inşa ederek sektörde yenilikçi ve öncü bir firma olmak. Çevreye duyarlı, estetik ve sağlam projeler üretmek.",
  },
  {
    id: 3,
    iconName: "target",
    title: "Misyonumuz",
    text: "Müşteri memnuniyetini ön planda tutarak güvenilir, kaliteli ve sürdürülebilir yapılar inşa etmek. Her projede iş sağlığı ve güvenliğine öncelik vermek.",
  },
  {
    id: 4,
    iconName: "lineChart",
    title: "Gelişim Hedeflerimiz",
    text: "Sürekli gelişen teknolojiyi takip ederek projelerimizde inovatif çözümler üretmek ve her geçen gün daha iyi hizmetler sunmak.",
  },
];

export default HakkimizdaVeriler;