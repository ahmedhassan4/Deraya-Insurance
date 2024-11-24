import Image from "next/image";
import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Text, Title } from "rizzui";

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

      <Title className="text-white mt-5">{servicesDetailes.name}</Title>

      <div className="mt-5">
        {servicesDetailes.discrtiption.map((detailes, index) => (
          <div key={index} className="flex items-center gap-2">
            <IoCheckmarkCircleSharp color="white" />

            <Text className="text-white text-base  font-medium">
              {detailes}
            </Text>
          </div>
        ))}
      </div>

      <Text className="text-white mt-3 font-semibold italic">
        Compare prices
      </Text>
    </div>
  );
}

export default ServiceInfo;
