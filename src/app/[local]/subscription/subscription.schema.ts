import { z } from "zod";
import { useTranslations } from "next-intl";

export const useSubscriptionSchema = (hiddenInput: boolean = false) => {
  const t = useTranslations("subscription");

  let subscriptionSchema = z.object({
    name: z
      .string()
      .min(2, { message: t("errors.name.min") })
      .nonempty({ message: t("errors.name.empty") }),
    email: z
      .string()
      .email({ message: t("errors.email") })
      .nonempty({ message: t("errors.email") }),
    phone: z
      .string()
      .regex(/^\+?[\d\s-]{10,}$/, { message: t("errors.phone") })
      .nonempty({ message: t("errors.phone") }),
  });

  if (hiddenInput) {
    subscriptionSchema = subscriptionSchema.extend({
      interestedIn: z.enum(["Inpatient", "InpatientAndOutpatient"], {
        required_error: t("errors.interested_in"),
      }),
      date: z
        .date({
          required_error: t("errors.date"),
          invalid_type_error: t("errors.date"),
        })
        .nullable()
        .refine((val) => val !== null, { message: t("errors.date") }),
      country: z.string().nonempty({ message: t("errors.country") }),
    });
  }

  return subscriptionSchema;
};

export type FormData = z.infer<ReturnType<typeof useSubscriptionSchema>>;
