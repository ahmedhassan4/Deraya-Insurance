"use client";
import Line from "@/ui/Line";
import React from "react";
import { Text } from "rizzui";
import EmblaCarousel from "./Plans";
import { EmblaOptionsType } from "embla-carousel";
import { useTranslations } from "next-intl";
import NavigationButton from "@/components/NavigationButton";

import { usePlanStore } from "@/store/planStore";

const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };

function SubscriptionPlan() {
  const t = useTranslations("plan");
  const planData = usePlanStore((state) => state.planData);

  if (!planData) {
    return <div>No plan data available. Please go back and fill the form.</div>;
  }

  console.log("planData", planData);

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
        {"data" in planData ? (
          <EmblaCarousel slides={planData.data} options={OPTIONS} />
        ) : (
          <div>No data available to display the plans.</div>
        )}
      </div>
    </div>
  );
}

export default SubscriptionPlan;
