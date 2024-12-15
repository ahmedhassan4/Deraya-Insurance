"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Text } from "rizzui";
import LoadingSpinner from "../spinner";
import { useServiceData } from "@/hooks/useServiceData";
import { ServiceType } from "@/types/service.type";

function ServiceInfo() {
  const t = useTranslations("subscription");
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service_id");

  const { data, isLoading } = useServiceData();

  console.log("is loading", isLoading);
  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  const service = data?.find((s: ServiceType) => s.id === Number(serviceId));

  if (!service) {
    return <Text className="text-red-500">Service not found</Text>;
  }

  return (
    <div>
      <Image
        src={service.inner_image}
        alt={service.title}
        width={100}
        height={100}
      />

      <Text className="text-white text-4xl mt-5 font-extrabold max-w-[500px]">{service.title}</Text>
      <div className="mt-5">
        {service.bullet_points.map((detailes: string, index: number) => (
          <div key={index} className="flex items-start gap-2 mt-1">
            <IoCheckmarkCircleSharp color="white" className="flex-0" />
            <Text className="text-white text-base  font-medium flex-1">
              {detailes}
            </Text>
          </div>
        ))}
      </div>
      <Text className="text-white mt-5 font-semibold italic">
        {t("compare_prices")}
      </Text>
    </div>
  );
}
export default ServiceInfo;
