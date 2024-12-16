import CardInfo from "@/components/CardInfo";
import CardLayout from "@/components/layouts/card-layout/CardLayout";
import { CardSection } from "@/components/layouts/card-layout/CardSection";
import React from "react";
import ServiceInfo from "./ServiceInfo";
import MultiStepForm from "./MultiStepForm";
import { LeftSection } from "@/components/layouts/card-layout/LeftSection";

function SubscriptionPage() {
  return (
    <CardLayout>
      <LeftSection>
        <CardInfo displaySocialIcons={false}>
          <ServiceInfo />
        </CardInfo>
      </LeftSection>
      <CardSection className=" px-6 flex items-center justify-center">
        <MultiStepForm />
      </CardSection>
    </CardLayout>
  );
}

export default SubscriptionPage;
