import React from "react";
import Service from "./Service";

const services = [
  {
    name: "International Medical Insurance",
    image: "/International.svg",
  },
  {
    name: "Domestic Medical Insurance",
    image: "/Domestic.svg",
  },
  {
    name: "Car Insurance",
    image: "/car.svg",
  },
  {
    name: "Employees’ Medical Insurance",
    image: "/Employees.svg",
  },
  {
    name: "General Insurance",
    image: "/General.svg",
  },
  {
    name: "Life and Investment plans",
    image: "/Investment.svg",
  },
];
function Services() {
  return (
    <section className="h-full w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 h-full">
        {services.map((service) => (
          <Service key={service.name} service={service} />
        ))}
      </div>
    </section>
  );
}

export default Services;
