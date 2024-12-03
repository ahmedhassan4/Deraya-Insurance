"use client";
import React from "react";
import Service from "./Service";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useLocale } from "next-intl";
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
  // const locale = useLocale();
  // const { data, isError, error } = useQuery({
  //   queryKey: ["services", locale],
  //   queryFn: async () => {
  //     const { data } = await axios.get(
  //       "https://insurance.incodehub.com/api/v2/services",
  //       {
  //         headers: {
  //           "X-LOCALE": locale,
  //         },
  //       }
  //     );
  //     return data;
  //   },
  // });

  // if (isError) return <div>Error: {error.message}</div>;

  // console.log("data fetching from the backend", data?.data);

  const data = {
    data: [
      {
        id: 1,
        title: "International Medical Insurance",
        inner_title: "International Medical Insurance",
        desc: "With International Medical Insurance, you are not limited to treatment in just one country, but have quick access to medical care from all over the world when it matters most, wherever you may be.",
        image:
          "https://insurance.incodehub.com/images/services/individuals/F83152F72.jpg",
        inner_image:
          "https://insurance.incodehub.com/images/services/individuals/7BE60C8F7.jpg",
        bullet_points: [
          "Eligible medical treatment at home and abroad.",
          "Annual limits starting from $1m.",
          "Comprehensive range of health plans available to suit your specific needs and budget.",
          "Full cover for eligible cancer treatment.",
          "Access to a second medical opinion at no extra cost.",
          "Your choice of doctors and hospitals.",
        ],
        hiddenInput: true,
        fields: [
          "name", "date" , "phone" , "country", "email", "interested_in" 
        ]
      },
      {
        id: 2,
        title: "Local Medical Insurance",
        inner_title: "Local/ Regional Medical Insurance",
        desc: "With the current health care inflation rate, health insurance today is a necessity. Health insurance provides you with a much needed financial backup at times of medical emergencies.",
        image:
          "https://insurance.incodehub.com/images/services/individuals/C5743703C.png",
        inner_image:
          "https://insurance.incodehub.com/images/services/individuals/C7EEAE732.jpg",
        bullet_points: [
          "Affordable insurance plans for the entire family.",
          "Comprehensive hospitalization and surgical cover.",
          "Easy & quick access to treatment.",
          "A range of secure online services related to your policy.",
          "Cover for your prescribed medications.",
          "24/7 customer service.",
        ],
        hiddenInput: false,
        fields: [
          "name", "date" , "phone" , "country"
        ]
      },
      {
        id: 3,
        title: "Car Insurance",
        inner_title: "Car Insurance",
        desc: "Plans offering you the essential help whenever you need it, with a variety of services to ensure your daily protection on the road.",
        image:
          "https://insurance.incodehub.com/images/services/individuals/8F24E3EE1.jpg",
        inner_image:
          "https://insurance.incodehub.com/images/services/individuals/5AB9CE1FB.jpg",
        bullet_points: [
          "Comprehensive programs that protect your car from a wide range of accidents.",
          "Transportation alternatives when your car is being fixed.",
          "Get your car fixed at the official service centers without worrying about the cost.",
          "Free roadside assistance.",
          "A professional and knowledgeable service team dedicated to assisting you.",
          "Guaranteed",
          "fast and efficient handling of all claims.",
        ],
        hiddenInput: false,
        fields: [
           "phone" , "country", "email", "interested_in" 
        ]
      },
      {
        id: 4,
        title: "Investment Plans",
        inner_title: "Investment Plans",
        desc: "Getting married, having a child, or planning for retirement - each of these brings extra responsibilities and also a change in your financial focus. Your long term financial planning should go hand in hand with making a plan to ensure availability of funds to meet periodic needs.",
        image:
          "https://insurance.incodehub.com/images/services/individuals/A2423AA6C.jpg",
        inner_image:
          "https://insurance.incodehub.com/images/services/individuals/1AAF4E024.jpg",
        bullet_points: [
          "Agreed upon amounts to be saved.",
          "Guaranteed return on investments.",
          "Plans can be tailored according to when you’d like to receive your savings.",
        ],
        hiddenInput: false,
        fields: [
          "name", "date" , "phone" , "email", "interested_in" 
        ]
      },
      {
        id: 5,
        title: "Life Insurance",
        inner_title: "Life Insurance",
        desc: "The future holds many surprises, some of which may be unpleasant. This is why it is important to provide protection coverage that will ensure financial security to your family.",
        image:
          "https://insurance.incodehub.com/images/services/individuals/193473A1E.jpg",
        inner_image:
          "https://insurance.incodehub.com/images/services/individuals/46A7B32D6.jpg",
        bullet_points: [
          "Maintain the standard of living for your loved ones in case of unfortunate events.",
          "The flexibility to tailor your policy to your needs.",
          "Your beneficiaries get a death benefit which can help cover funeral costs",
          "medical bills",
          "replace your income",
          "and even ensure the continuity of a business if you pass away.",
          "Loan facilitation.",
        ],
        hiddenInput: false,
        fields: [
          "name", "date" , "phone" , "country", "email"
        ]
      },
      {
        id: 6,
        title: "Travel Insurance",
        inner_title: "Travel Insurance",
        desc: "Plans designed to cover unexpected costs that may arise when you are traveling, wherever your destination is and no matter how long you stay.",
        image:
          "https://insurance.incodehub.com/images/services/individuals/41C8A1753.jpg",
        inner_image:
          "https://insurance.incodehub.com/images/services/individuals/1030C7B07.jpg",
        bullet_points: [
          "Emergency medical expenses and medical transportation coverage.",
          "Support in the case of losing personal baggage and/or passports.",
          "Coverage in the case of flight cancellation.",
          "Repatriation service.",
        ],
        hiddenInput: false,
        fields: [
          "name", "interested_in" 
        ]
      },
    ],
  };

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
