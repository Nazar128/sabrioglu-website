
import React from "react"; 
import { Eye, Target, LineChart } from "lucide-react";

export type IconName = "eye" | "target" | "lineChart" | "none";

export const getIcon = (name: IconName): React.ReactElement | null => {
  switch (name) {
    case "eye":
      return <Eye size={48} className="text-white mx-auto mb-4" />;
    case "target":
      return <Target size={48} className="text-white mx-auto mb-4" />;
    case "lineChart":
      return <LineChart size={48} className="text-white mx-auto mb-4" />;
    case "none":
    default:
      return null;
  }
};
