import Line from "@/ui/Line";
import React from "react";
import { Text } from "rizzui";
import EmblaCarousel from "./Plans";
import { EmblaOptionsType } from "embla-carousel";
import { useTranslations } from "next-intl";
import NavigationButton from "@/components/NavigationButton";

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
  const t = useTranslations("plan");
  return (
    <div className="w-full h-full overflow-hidden">
      <NavigationButton title="back_to_services" url="services" />
      <Line marginTop="10px" thickness=".5px" />

      <div className="my-6">
        <Text className="text-2xl font-bold mb-1">{t("thanks")}</Text>
        <Text className="text-[#6B7280] ">{t("message")}</Text>
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