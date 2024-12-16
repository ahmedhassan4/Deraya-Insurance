import CardInfo from "@/components/CardInfo";
import CardLayout from "@/components/layouts/card-layout/CardLayout";
import { CardSection } from "@/components/layouts/card-layout/CardSection";
import DrayaServicesInfo from "./DrayaServicesInfo";
import Services from "./Services";
import { LeftSection } from "@/components/layouts/card-layout/LeftSection";

export default function MainPage() {
  return (
    <CardLayout>
      <LeftSection>
        <CardInfo>
          <DrayaServicesInfo />
        </CardInfo>
      </LeftSection>
      <CardSection className="px-6 flex items-center justify-center">
        <Services />
      </CardSection>
    </CardLayout>
  );
}
