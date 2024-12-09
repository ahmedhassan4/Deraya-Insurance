"use client";
import React from "react";
import { ServiceType } from "@/types/service.type";
import Service from "./Service";
import { useServiceData } from "@/hooks/useServiceData";
import Spinner from "../spinner";

function Services() {
  const { isError, data, error, isLoading } = useServiceData();

  if (isError) return <div>Error: {error?.message}</div>;
  if (isLoading) {
    return <Spinner />;
  }

  console.log("data fetching from the backend", data);

  return (
    <section className="h-full w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 h-full">
        {data?.map((service: ServiceType) => (
          <Service key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

export default Services;
