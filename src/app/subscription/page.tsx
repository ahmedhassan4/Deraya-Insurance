import CardInfo from "@/components/CardInfo";
import CardLayout from "@/components/layouts/card-layout/CardLayout";
import { CardSection } from "@/components/layouts/card-layout/CardSection";
import React from "react";
import ServiceInfo from "./ServiceInfo";
import MultiStepForm from "./MultiStepForm";

function SubscriptionPage() {
  return (
    <CardLayout>
      <CardSection className="bg-[#B5BE34] bg-[url('/Main.png')] rounded-lg bg-cover bg-center py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8 col-span-4">
        <CardInfo>
          <ServiceInfo />
        </CardInfo>
      </CardSection>
      <CardSection className="col-span-5 flex px-10  justify-center items-center">
        <MultiStepForm />
      </CardSection>
    </CardLayout>
  );
}

export default SubscriptionPage;
