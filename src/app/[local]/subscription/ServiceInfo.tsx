import Image from "next/image";
import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Text } from "rizzui";

const servicesDetailes = {
  name: "International Medical Insurance",
  image: "/service.svg",
  discrtiption: [
    "Eligible medical treatment at home and abroad.",
    "Annual limits starting from $1m.",
    "Comprehensive range of health plans available to suit your specific needs and budget.",
    "Full cover for eligible cancer treatment.",
    "Access to a second medical opinion at no extra cost.",
    "Your choice of doctors and hospitals.",
  ],
};

function ServiceInfo() {
  return (
    <div>
      <Image
        src={servicesDetailes.image}
        alt={servicesDetailes.name}
        width={100}
        height={100}
      ></Image>

      <Text className="text-white text-3xl mt-5">{servicesDetailes.name}</Text>

      <div className="mt-5">
        {servicesDetailes.discrtiption.map((detailes, index) => (
          <div key={index} className="flex items-start gap-2 mt-1">
            <IoCheckmarkCircleSharp color="white" className="flex-0" />
            <Text className="text-white text-sm  font-medium flex-1">
              {detailes}
            </Text>
          </div>
        ))}
      </div>

      <Text className="text-white mt-5 font-semibold italic">
        Compare prices
      </Text>
    </div>
  );
}

export default ServiceInfo;
