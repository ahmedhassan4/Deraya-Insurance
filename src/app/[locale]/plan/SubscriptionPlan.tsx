"use client";
import Line from "@/ui/Line";
import React from "react";
import { Text } from "rizzui";
import EmblaCarousel from "./Plans";
import { EmblaOptionsType } from "embla-carousel";
import { useTranslations } from "next-intl";
import NavigationButton from "@/components/NavigationButton";

// import { usePlanStore } from "@/store/planStore";

const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };
// const SLIDE_COUNT = 8;
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const plans = [
  {
    id: 1,
    name: "Bupa",
    partner: {
      id: 1,
      name: "Bupa",
      logo: "https://insurance.incodehub.com/images/partners/5DCAA30FE.jpg",
    },
    price: {
      amount: 452.06,
      currency: "USD",
      formatted: "452",
    },
    details: [
      {
        title: "Annual Ceiling of USD 2.55M",
        bullet: "Inpatient Treatment",
        is_included: 1,
        tooltip:
          "Treatment that is received while staying in a hospital, either overnight or as a day case.",
        order: 1,
      },
      {
        title: "Annual Ceiling of USD 2.55M",
        bullet: "Advanced Imaging",
        is_included: 1,
        tooltip: "MRI, CT & PET scans on an outpatient and inpatient basis.",
        order: 2,
      },
      {
        title: "Annual Ceiling of USD 2.55M",
        bullet: "Cancer Treatment",
        is_included: 1,
        tooltip:
          "Depending on the insurance company, either active treatment of the condition once diagnosed or to include follow up after recovery.",
        order: 3,
      },
      {
        title: "Annual Ceiling of USD 2.55M",
        bullet: "Childbirth",
        is_included: 1,
        tooltip: "Delivery of the child including different delivery methods.",
        order: 4,
      },
      {
        title: "Deductible of USD 8500 will be applied to inpatient services",
        bullet: "Deductible of USD 8500 will be applied to inpatient services",
        is_included: 1,
        tooltip:
          "contribution you make towards the cost of your treatment, in turn, it lowers your premium.",
        order: 5,
      },
    ],
    offer_type: "Standard",
    service_id: 1,
  },
  {
    id: 2,
    name: "AXA",
    partner: {
      id: 2,
      name: "AXA",
      logo: "https://insurance.incodehub.com/images/partners/D61387113.png",
    },
    price: {
      amount: 927.68,
      currency: "USD",
      formatted: "928",
    },
    details: [
      {
        title: "Annual Ceiling of USD 1.2M",
        bullet: "Inpatient Treatment",
        is_included: 1,
        tooltip:
          "Treatment that is received while staying in a hospital, either overnight or as a day case.",
        order: 1,
      },
      {
        title: "Annual Ceiling of USD 1.2M",
        bullet: "Advanced Imaging",
        is_included: 1,
        tooltip: "MRI, CT & PET scans on an outpatient and inpatient basis.",
        order: 2,
      },
      {
        title: "Annual Ceiling of USD 1.2M",
        bullet: "Cancer Treatment",
        is_included: 1,
        tooltip:
          "Depending on the insurance company, either active treatment of the condition once diagnosed or to include follow up after recovery.",
        order: 3,
      },
      {
        title: "Annual Ceiling of USD 1.2M",
        bullet: "Childbirth",
        is_included: 0,
        tooltip: "Delivery of the child including different delivery methods.",
        order: 4,
      },
      {
        title: "Deductible of USD 2000 will be applied to inpatient services",
        bullet: "Deductible of USD 2000 will be applied to inpatient services",
        is_included: 1,
        tooltip:
          "contribution you make towards the cost of your treatment, in turn, it lowers your premium.",
        order: 5,
      },
    ],
    offer_type: "Standard",
    service_id: 1,
  },
];

function SubscriptionPlan() {
  const t = useTranslations("plan");
  // const planData = usePlanStore((state) => state.planData);

  // if (!planData) {
  //   return <div>No plan data available. Please go back and fill the form.</div>;
  // }

  // console.log("planData", planData);

  return (
    <div className="w-full h-full overflow-hidden">
      <NavigationButton title="back_to_services" url="services" />
      <Line marginTop="10px" thickness=".5px" />

      <div className="my-6">
        <Text className="text-2xl font-bold mb-1">{t("thanks")}</Text>
        <Text className="text-[#6B7280] ">{t("message")}</Text>
      </div>

      <div className="plans">
        <Text className="text-[#6B7280] ">{t("offers")}</Text>
      </div>

      <div className="w-full h-full">
        <EmblaCarousel slides={plans} options={OPTIONS} />
      </div>
    </div>
  );
}

export default SubscriptionPlan;
