"use client";
import { CardInfoProps } from "@/types/cardInfo";
import Line from "@/ui/Line";
import Image from "next/image";
import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { PiInstagramLogo } from "react-icons/pi";
import DropdownAction from "./charts/dropdown-action";

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

const options = [
  {
    value: "english",
    label: "English",
  },
  {
    value: "arabic",
    label: "Arabic",
  },
];

const CardInfo: React.FC<CardInfoProps> = ({
  children,
  displaySocialIcons = true,
}) => {
  function handleChange(viewType: string) {
    console.log("viewType", viewType);
  }
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
      {displaySocialIcons && (
        <div className="flex items-center gap-4">
          <SocialLinks />
          <div className="h-6 w-px bg-gray-300"></div>
          <DropdownAction
            options={options}
            onChange={handleChange}
            dropdownClassName="!z-0"
          />
        </div>
      )}
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
