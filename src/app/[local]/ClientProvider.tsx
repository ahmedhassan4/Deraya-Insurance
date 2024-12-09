"use client";
import GlobalModal from "@/components/modal-views/container";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import Providers from "./providers";
import { useSearchParams } from "next/navigation";

const ClientProvider = ({
  children,
  localeLang,
  messages,
}: {
  children: any;
  localeLang: string;
  messages: any;
}) => {
  const params: any = useSearchParams();
  return (
    <html lang={params?.locale} dir={localeLang === "ar" ? "rtl" : "ltr"}>
      <body>
        <GlobalModal />
        <NextIntlClientProvider
          locale={params?.locale || localeLang}
          messages={messages}
        >
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default ClientProvider;
