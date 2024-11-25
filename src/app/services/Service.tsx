import Image from "next/image";
import React from "react";

interface ServiceProps {
  service: {
    name: string;
    image: string;
  };
}

function Service({ service: { name, image } }: ServiceProps) {
  return (
    <div className="group cursor-pointer">
      <div className=" rounded-lg sm:rounded-xl h-full w-full p-3 sm:p-4 lg:p-3 xl:p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col  border border-gray-100 hover:border-[#B5BE34]">
        <div className="relative flex items-center justify-center mb-2 sm:mb-3">
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-32 2xl:h-32  object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="text-center">
          <h3 className="font-semibold text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-lg text-gray-800 group-hover:text-[#B5BE34] transition-colors duration-300 line-clamp-2">
            {name}
          </h3>
          <div className="mt-1 sm:mt-2 h-[1px] w-12 bg-[#B5BE34] mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}

export default Service;
