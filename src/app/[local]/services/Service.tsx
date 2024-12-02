"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ServiceProps {
  service: {
    id: number;
    title: string;
    inner_title: string;
    desc: string;
    image: string;
    bullet_points: string[];
  };
}
function Service({ service }: ServiceProps) {
  const router = useRouter();

  const locale = useLocale();
  const handleClick = () => {
    router.push(`/${locale}/subscription`);
  };

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className=" rounded-lg sm:rounded-xl h-full w-full p-3 sm:p-4 lg:p-3 xl:p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col  border border-gray-100 hover:border-[#B5BE34]">
        <div className="relative flex items-center justify-center mb-2 sm:mb-3">
          <Image
            src={service.image}
            alt={service.title}
            width={200}
            height={200}
            className="w-28 h-28 2xl:w-32 2xl:h-32  object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="text-center">
          <h3 className="font-semibold text-base 2xl:text-lg text-gray-800 group-hover:text-[#B5BE34] transition-colors duration-300 line-clamp-2">
            {service.title}
          </h3>
          <div className="mt-1 sm:mt-2 h-[1px] w-12 bg-[#B5BE34] mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}

export default Service;
