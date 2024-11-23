import CardContent from "@/components/CardContent";
import CardInfo from "@/components/CardInfo";
import CardLayout from "@/components/layouts/card-layout/CardLayout";
import { CardSection } from "@/components/layouts/card-layout/CardSection";
import DrayaServicesInfo from "./DrayaServicesInfo";

export default function ProfilePage() {
  return (
    <CardLayout>
      <CardSection className="bg-[#B5BE34] py-12 px-20">
        <CardInfo>
          <DrayaServicesInfo />
        </CardInfo>
      </CardSection>
      <CardSection className="p-8 bg-white">
        <CardContent />
      </CardSection>
    </CardLayout>
  );
}
