import { CardInfoProps } from "@/types/cardInfo";
import Line from "@/ui/Line";
import Image from "next/image";
import React from "react";

const CardInfo: React.FC<CardInfoProps> = ({ children }) => {
  return (
    <div className="w-full h-full">
      <Image
        src="/deraya-logo-white.svg"
        alt="logo"
        width={200}
        height={65}
      ></Image>

      <Line color="#fff" />

      <div className="mt-8">{children}</div>
    </div>
  );
};

export default CardInfo;
