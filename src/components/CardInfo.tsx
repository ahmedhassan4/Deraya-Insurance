import { CardInfoProps } from "@/types/cardInfo";
import Line from "@/ui/Line";
import Image from "next/image";
import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { PiInstagramLogo } from "react-icons/pi";

const socialLinks = [
  {
    title: "Facebook",
    link: "https://www.facebook.com",
    icon: <FaFacebookF className="h-auto w-5 text-white" />,
  },

  {
    title: "Instagram",
    link: "https://www.instagram.com",
    icon: <PiInstagramLogo className="h-auto w-5 text-white" />,
  },
  {
    title: "Linkedin",
    link: "https://www.linkedin.com",
    icon: <FaLinkedinIn className="h-auto w-5 text-white" />,
  },
];

const CardInfo: React.FC<CardInfoProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <Image
          src="/deraya-logo-white.svg"
          alt="logo"
          width={200}
          height={65}
        ></Image>
        <Line color="#fff" />

        <div className="mt-8">{children}</div>
      </div>

      <div className="flex items-center gap-4">
        <SocialLinks />
        <div className="h-6 w-px bg-gray-300"></div>
        <select className="bg-transparent border-none px-2 py-1  text-white font-medium text-md">
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
      </div>
    </div>
  );
};

interface SocialLinksProps {
  className?: string;
}

function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={`flex gap-3 ${className} `}>
      {socialLinks.map((item) => (
        <a
          href={item.link}
          key={item.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

export default CardInfo;
