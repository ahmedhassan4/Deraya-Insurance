import { useTranslations } from "next-intl";
import React from "react";
import { Text, Title } from "rizzui";

function ContactInfo() {
  const t = useTranslations("get_in_touch");
  return (
    <div>
      <Title className="text-white">{t("title")}</Title>
      <Text className="text-white mt-4"> {t("description")}</Text>
    </div>
  );
}

export default ContactInfo;
