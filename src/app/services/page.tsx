import CardContent from "@/components/CardContent";
import CardInfo from "@/components/CardInfo";
import CardLayout from "@/components/layouts/card-layout/CardLayout";
import { CardSection } from "@/components/layouts/card-layout/CardSection";
import DrayaServicesInfo from "./DrayaServicesInfo";
import Services from "./Services";

export default function MainPage() {
  return (
    <CardLayout>
      <CardSection className="bg-[#B5BE34] bg-[url('/Main.png')] rounded-lg bg-cover bg-center py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8 col-span-4">
        <CardInfo>
          <DrayaServicesInfo />
        </CardInfo>
      </CardSection>
      <CardSection className="bg-white py-4 px-3 sm:py-6 sm:px-4 lg:py-8 lg:px-6 col-span-5">
        <CardContent>
          <Services />
        </CardContent>
      </CardSection>
    </CardLayout>
  );
}
