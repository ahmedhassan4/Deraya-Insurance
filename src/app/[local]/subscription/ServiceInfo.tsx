"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Text } from "rizzui";

interface ServiceProps {
  id: number;
  title: string;
  inner_title: string;
  desc: string;
  image: string;
  bullet_points: string[];
}

function ServiceInfo() {
  const t = useTranslations("subscription");

  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service_id");
  // console.log("my service id", paramValue);

  const locale = useLocale();
  const { data: services, isLoading } = useQuery({
    queryKey: ["services", locale],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://insurance.incodehub.com/api/v2/services",
        {
          headers: {
            "X-LOCALE": locale,
          },
        }
      );
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const service = services?.data.find(
    (s: ServiceProps) => s.id === Number(serviceId)
  );

  console.log("service", service);

  return (
    <div>
      <Image
        src={service.image}
        alt={service.title}
        width={100}
        height={100}
      ></Image>

      <Text className="text-white text-3xl mt-5">{service.title}</Text>

      <div className="mt-5">
        {service.bullet_points.map((detailes: string, index: number) => (
          <div key={index} className="flex items-start gap-2 mt-1">
            <IoCheckmarkCircleSharp color="white" className="flex-0" />
            <Text className="text-white text-sm  font-medium flex-1">
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
