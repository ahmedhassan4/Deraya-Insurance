import Line from "@/ui/Line";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Button, Text } from "rizzui";
import EmblaCarousel from "./Plans";
import { EmblaOptionsType } from "embla-carousel";
import Link from "next/link";
import { useLocale } from "next-intl";

const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };
// const SLIDE_COUNT = 8;
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const plans = [
  {
    title: "Bupa",
    pricing: "434",
    annualCeiling: "2.5M",
    services: [
      "Inpatient Treatment",
      "Advanced Imaging",
      "Cancer Treatment",
      "Childbirth",
      "Deductible of $8,500 will be applied to inpatient services",
    ],
    deductible: "8,500 will be applied to inpatient services",
  },
  {
    title: "Bupa",
    pricing: "434",
    annualCeiling: "2.5M",
    services: [
      "Inpatient Treatment",
      "Advanced Imaging",
      "Cancer Treatment",
      "Childbirth",
      "Deductible of $8,500 will be applied to inpatient services",
    ],
    deductible: "8,500 will be applied to inpatient services",
  },
  {
    title: "Bupa",
    pricing: "434",
    annualCeiling: "2.5M",
    services: [
      "Inpatient Treatment",
      "Advanced Imaging",
      "Cancer Treatment",
      "Childbirth",
      "Deductible of $8,500 will be applied to inpatient services",
    ],
    deductible: "8,500 will be applied to inpatient services",
  },
  {
    title: "Bupa",
    pricing: "434",
    annualCeiling: "2.5M",
    services: [
      "Inpatient Treatment",
      "Advanced Imaging",
      "Cancer Treatment",
      "Childbirth",
      "Deductible of $8,500 will be applied to inpatient services",
    ],
    deductible: "8,500 will be applied to inpatient services",
  },
  {
    title: "Bupa",
    pricing: "434",
    annualCeiling: "2.5M",
    services: [
      "Inpatient Treatment",
      "Advanced Imaging",
      "Cancer Treatment",
      "Childbirth",
      "Deductible of $8,500 will be applied to inpatient services",
    ],
    deductible: "8,500 will be applied to inpatient services",
  },
];

function SubscriptionPlan() {
  const local = useLocale();
  return (
    <div className="w-full h-full overflow-hidden">
      <Link href={`/${local}/services`}>
        <Button
          variant="text"
          className="text-[#111928] font-normal text-lg flex items-center"
        >
          <BsArrowLeft className="w-5 h-5 mr-2" />
          Back To Services
        </Button>
      </Link>
      <Line marginTop="10px" thickness=".5px" />

      <div className="my-6">
        <Text className="text-2xl font-bold mb-1">Thanks for Submitting</Text>
        <Text className="text-[#6B7280] ">
          Our team will contact you within 24 hours
        </Text>
      </div>

      <div className="plans">
        <Text className="text-[#6B7280] ">We found two offers for you</Text>
      </div>

      <div className="w-full h-full">
        <EmblaCarousel slides={plans} options={OPTIONS} />
      </div>
    </div>
  );
}

export default SubscriptionPlan;
