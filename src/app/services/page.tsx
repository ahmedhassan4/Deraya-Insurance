import CardContent from "@/components/CardContent";
import CardInfo from "@/components/CardInfo";
import CardLayout from "@/components/layouts/card-layout/CardLayout";
import { CardSection } from "@/components/layouts/card-layout/CardSection";
import DrayaServicesInfo from "./DrayaServicesInfo";
import Services from "./Services";

export default function ProfilePage() {
  return (
    <CardLayout>
      <CardSection className="bg-[#B5BE34] py-12 px-20 col-span-2">
        <CardInfo>
          <DrayaServicesInfo />
        </CardInfo>
      </CardSection>
      <CardSection className=" bg-white py-12 px-10 col-span-3">
        <CardContent>
          <Services />
        </CardContent>
      </CardSection>
    </CardLayout>
  );
}
