import React from "react";
import { Clock3, Hammer, ShieldCheck } from "lucide-react";
export type IconName = "shield" | "clock" | "hammer" | "none";

export const getCardIcon = (name: IconName): React.ReactElement | null => {
  switch (name) {
    case "shield":
      return <ShieldCheck size={48} className="text-white mx-auto mb-4" />;
    case "clock":
      return <Clock3 size={48} className="text-white mx-auto mb-4" />;
    case "hammer":
      return <Hammer size={48} className="text-white mx-auto mb-4" />;
    default:
      return null;
  }
};


