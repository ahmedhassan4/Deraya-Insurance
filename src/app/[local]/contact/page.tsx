import CardInfo from "@/components/CardInfo";
import CardLayout from "@/components/layouts/card-layout/CardLayout";
import { CardSection } from "@/components/layouts/card-layout/CardSection";
import React from "react";
import Contact from "./Contact";
import ContactInfo from "./ContactInfo";
import { LeftSection } from "@/components/layouts/card-layout/LeftSection";

function PlanPage() {
  return (
    <CardLayout>
      <LeftSection>
        <CardInfo displaySocialIcons={false}>
          <ContactInfo />
        </CardInfo>
      </LeftSection>
      <CardSection className=" px-6 py-12 flex items-start justify-center">
        <Contact />
      </CardSection>
    </CardLayout>
  );
}

export default PlanPage;
