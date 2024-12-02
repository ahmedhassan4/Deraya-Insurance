"use client";
import React from "react";
import Service from "./Service";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocale } from "next-intl";
// import Loading from "@/app/loading";

interface ServiceData {
  id: number;
  title: string;
  inner_title: string;
  desc: string;
  image: string;
  bullet_points: string[];
}

function Services() {
  const locale = useLocale();
  const { data, isError, error } = useQuery({
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

  if (isError) return <div>Error: {error.message}</div>;

  console.log("data fetching from the backend", data?.data);

  return (
    <section className="h-full w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 h-full">
        {data?.data?.map((service: ServiceData) => (
          <Service key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

export default Services;
