import React from "react";
import { Plane, Bed, MapPin, Globe } from "lucide-react";

const TravelPackageLogo = ({ packageType }) => {
  const getLogo = (type) => {
    switch (type.toLowerCase()) {
      case "flight":
        return <Plane size={40} className="text-blue-500" />;
      case "hotel":
        return <Bed size={40} className="text-green-500" />;
      case "tour":
        return <MapPin size={40} className="text-red-500" />;
      default:
        return <Globe size={40} className="text-gray-500" />;
    }
  };

  return <div className="flex items-center justify-center">{getLogo(packageType)}</div>;
};

export default TravelPackageLogo;
