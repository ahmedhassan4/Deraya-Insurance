import { useTranslations } from "next-intl";
import React from "react";
import { Text, Title } from "rizzui";

function DrayaServicesInfo() {
  const t = useTranslations("services");
  return (
    <div>
      <Title className="text-white"> {t("title")}</Title>
      <Text className="text-white mt-4">{t("desc")}</Text>
    </div>
  );
}

export default DrayaServicesInfo;
