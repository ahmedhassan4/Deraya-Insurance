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
    <div className="group relative w-full">
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between border border-gray-100 hover:border-blue-100">
        {/* Icon Container */}
        <div className="relative flex items-center justify-center mb-2">
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Text Content */}
        <div className="text-center">
          <h3 className="font-semibold text-xs sm:text-sm lg:text-base text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h3>
          <div className="mt-1 h-0.5 w-8 bg-blue-500 mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}

export default Service;
