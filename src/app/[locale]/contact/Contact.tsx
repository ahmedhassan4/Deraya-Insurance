"use client";
import Line from "@/ui/Line";
import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Button, Input, Radio, Text } from "rizzui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import SubmitModal from "./SubmitModal";
import useModal from "@/components/modal-views/use-madal";
import { useLocale, useTranslations } from "next-intl";
import { useGetInTouch } from "@/hooks/useGetInTouch";

function Contact() {
  const t = useTranslations("Form");
  const { mutate, isPending, isError, error } = useGetInTouch();

  const contactFormSchema = z.object({
    name: z.string().min(2, { message: t("errors.name") }),
    email: z.string().email({ message: t("errors.email") }),
    phone: z.string().regex(/^^(\+?\d{1,4})?\s?(\(?\d{1,4}\)?)?\s?\d{4,10}$/, {
      message: t("errors.phone"),
    }),
    registered: z.boolean(),
  });

  type ContactFormProps = z.infer<typeof contactFormSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormProps>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      registered: false,
    },
  });

  const locale = useLocale();
  const { openModal, closeModal } = useModal();

  const onSubmit = (data: ContactFormProps) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      fra_registered_broker: data.registered,
    };

    mutate(payload, {
      onSuccess: () => {
        openModal({
          view: <SubmitModal closeModal={closeModal} />,
          customSize: "420px",
        });
      },
      onError: (error) => {
        console.error("Submission failed:", error);
      },
    });
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <Link href="/services">
        <Button
          variant="text"
          className={`text-[#111928] font-normal text-lg flex items-center ${
            locale === "ar" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <BsArrowLeft className="w-5 h-5 mx-2" />
          {t("back")}
        </Button>
      </Link>
      <Line marginTop="10px" thickness=".5px" />

      <div className="my-6">
        <Text className="text-2xl font-bold mb-1">{t("header")}</Text>
        <Text className="text-[#6B7280] ">{t("sub_header")}</Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="text"
            size="lg"
            label={t("name.label")}
            placeholder={t("name.placeholder")}
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        <div>
          <Input
            type="email"
            size="lg"
            label={t("email.label")}
            placeholder={t("email.label")}
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div>
          <Input
            type="tel"
            size="lg"
            label={t("phone.label")}
            placeholder={t("phone.label")}
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("fra_broker.label")}
          </label>
          <Controller
            name="registered"
            control={control}
            render={({ field }) => (
              <div className="flex w-full gap-4">
                <div className="rounded-lg border hover:border-[#B5BE34] p-4 mt-5 w-full">
                  <Radio
                    label={t("fra_broker.options.yes")}
                    value="true"
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                  />
                </div>
                <div className="rounded-lg border hover:border-[#B5BE34] p-4 mt-5 w-full">
                  <Radio
                    label={t("fra_broker.options.no")}
                    value="false"
                    checked={field.value === false}
                    onChange={() => field.onChange(false)}
                  />
                </div>
              </div>
            )}
          />
        </div>

        <Button
          type="submit"
          color="primary"
          className="w-full hover:bg-[#aab239]"
          disabled={isPending}
        >
          {t("submit")}
        </Button>

        {isError && (
          <Text className="text-red-500 text-sm mt-2">
            {error instanceof Error ? error.message : "An error occurred"}
          </Text>
        )}
      </form>
    </div>
  );
}

export default Contact;