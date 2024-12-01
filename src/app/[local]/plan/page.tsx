import CardInfo from "@/components/CardInfo";
import CardLayout from "@/components/layouts/card-layout/CardLayout";
import { CardSection } from "@/components/layouts/card-layout/CardSection";
import React from "react";
import ServiceInfo from "../subscription/ServiceInfo";
import SubscriptionPlan from "./SubscriptionPlan";
import { LeftSection } from "@/components/layouts/card-layout/LeftSection";

function PlanPage() {
  return (
    <CardLayout>
      <LeftSection>
        <CardInfo displaySocialIcons={false}>
          <ServiceInfo />
        </CardInfo>
      </LeftSection>
      <CardSection className=" px-6 py-12 flex items-start justify-center">
        <SubscriptionPlan />
      </CardSection>
    </CardLayout>
  );
}

export default PlanPage;
