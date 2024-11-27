import CardInfo from "@/components/CardInfo";
import CardLayout from "@/components/layouts/card-layout/CardLayout";
import { CardSection } from "@/components/layouts/card-layout/CardSection";
import React from "react";
import ServiceInfo from "../subscription/ServiceInfo";
import Contact from "./Contact";

function PlanPage() {
  return (
    <CardLayout>
      <CardSection className="bg-[#B5BE34] bg-[url('/Main.png')] bg-cover rounded-lg bg-center py-12 px-[72px] ">
        <CardInfo displaySocialIcons={false}>
          <ServiceInfo />
        </CardInfo>
      </CardSection>
      <CardSection className=" px-6 py-12 flex items-start justify-center">
        <Contact />
      </CardSection>
    </CardLayout>
  );
}

export default PlanPage;
