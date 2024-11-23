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
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between border border-gray-100 hover:border-blue-100">
        {/* Icon Container */}
        <div className="relative flex items-center justify-center mb-2 sm:mb-4">
          <Image
            src={image}
            alt={name}
            width={120}
            height={80}
            className="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Text Content */}
        <div className="text-center">
          <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h3>
          <div className="mt-1 sm:mt-2 h-0.5 w-8 sm:w-12 bg-blue-500 mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}

export default Service;
