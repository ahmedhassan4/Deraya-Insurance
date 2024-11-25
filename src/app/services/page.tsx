import CardInfo from "@/components/CardInfo";
import CardLayout from "@/components/layouts/card-layout/CardLayout";
import { CardSection } from "@/components/layouts/card-layout/CardSection";
import DrayaServicesInfo from "./DrayaServicesInfo";
import Services from "./Services";

export default function MainPage() {
  return (
    <CardLayout>
      <CardSection className="bg-[#B5BE34] bg-[url('/Main.png')] bg-cover rounded-lg bg-center py-12 px-[72px] ">
        <CardInfo>
          <DrayaServicesInfo />
        </CardInfo>
      </CardSection>
      <CardSection className="px-6 py-12 flex items-center justify-center">
        <Services />
      </CardSection>
    </CardLayout>
  );
}
