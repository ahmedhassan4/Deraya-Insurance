"use client";
import { CardInfoProps } from "@/types/cardInfo";
import Line from "@/ui/Line";
import Image from "next/image";
import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { PiInstagramLogo } from "react-icons/pi";
// import DropdownAction from "./charts/dropdown-action";
import { Select } from "rizzui";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

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

const CardInfo: React.FC<CardInfoProps> = ({
  children,
  displaySocialIcons = true,
}) => {
  const pathname = usePathname();
  const currentLocale = useLocale();

  const options = [
    {
      value: "en",
      label: "English",
    },
    {
      value: "ar",
      label: "اللغة العربية",
    },
  ];

  const handleLanguageChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    const newLocale = selectedOption.value;

    const cleanPathname = pathname
      .replace(/^\/[a-z]{2}/, "")
      .replace(/^\//, "");

    const newPath = `/${newLocale}/${cleanPathname}`;

    window.location.href = newPath;
  };

  const currentLocaleOption =
    options.find((option) => option.value === currentLocale) || options[0];

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
          <Select
            options={options}
            value={currentLocaleOption}
            onChange={handleLanguageChange}
            className="w-28 border border-white rounded-lg hover:border-white hover:rounded-lg  text-white"
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
