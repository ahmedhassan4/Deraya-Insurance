"use client";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Button } from "rizzui";

interface BackButtonProps {
  title: string;
  url?: string;
  backOneStep?: boolean;
}

function NavigationButton({ title, url, backOneStep }: BackButtonProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("plan");

  const handleGoBack = () => {
    if (backOneStep === true) {
      router.back();
    } else {
      router.push(`/${locale}/${url}`);
    }
  };
  return (
    <Button
      variant="text"
      onClick={handleGoBack}
      className="text-[#111928] font-normal text-lg flex items-center"
    >
      {locale === "en" ? (
        <BsArrowLeft className="w-5 h-5 mr-2" />
      ) : (
        <BsArrowRight className="w-5 h-5 ml-3" />
      )}
      {t(`${title}`)}
    </Button>
  );
}

export default NavigationButton;
