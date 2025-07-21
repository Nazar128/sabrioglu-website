import { IconType } from "react-icons";
import { FaHardHat, FaBuilding, FaTruckLoading, FaTools, FaTree, FaRoute } from "react-icons/fa";
import { FaWater } from "react-icons/fa";
import { MdLayers } from "react-icons/md";
import { GiMountainCave } from "react-icons/gi";

export const hizmetIcons: Record<string, IconType> = {
  bordur: FaHardHat,
  parke: MdLayers,
  dogalTas: GiMountainCave,
  tasDuvar: FaBuilding,
  hafriyat: FaTruckLoading,
  yolAcma: FaRoute,
  yolYapimi: FaTools,
  peyzaj: FaTree,
  dereIslahi: FaWater,
};

export default hizmetIcons;
