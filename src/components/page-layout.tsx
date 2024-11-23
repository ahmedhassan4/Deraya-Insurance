// SplitCard.types.ts

// SplitCard.tsx
import React from "react";
import { CardProps } from "@/types/card";
import CardInfo from "./CardInfo";
import CardContent from "./CardContent";

const Card: React.FC<CardProps> = ({}) => {
  return (
    <div className={`w-screen h-screen p-4`}>
      <div className="w-full h-full grid md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left section*/}
        <div className="bg-[#B5BE34] py-12 px-20">
          <CardInfo />
        </div>

        {/* Right section */}
        <div className={`p-8 bg-white`}>
          <CardContent />
        </div>
      </div>
    </div>
  );
};

export default Card;
