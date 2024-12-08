// subscription.schema.ts
import { z } from "zod";
import { useTranslations } from "next-intl";

const fieldMapping: { [key: string]: string } = {
  name: "name",
  email: "email",
  phone: "phone",
  date: "date",
  country: "country",
  interested_in: "interestedIn",
};

export const useSubscriptionSchema = (fields: string[]) => {
  const t = useTranslations("subscription");

  const schemaObj: { [key: string]: z.ZodTypeAny } = {};

  fields.forEach((field) => {
    const internalField = fieldMapping[field] || field;

    switch (internalField) {
      case "name":
        schemaObj[internalField] = z
          .string()
          .min(2, { message: t("errors.name.min") })
          .nonempty({ message: t("errors.name.empty") });
        break;
      case "email":
        schemaObj[internalField] = z
          .string()
          .email({ message: t("errors.email") })
          .nonempty({ message: t("errors.email") });
        break;
      case "phone":
        schemaObj[internalField] = z
          .string()
          .regex(/^\+?[\d\s-]{10,}$/, { message: t("errors.phone") })
          .nonempty({ message: t("errors.phone") });
        break;
      case "date":
        schemaObj[internalField] = z
          .date({
            required_error: t("errors.date"),
            invalid_type_error: t("errors.date"),
          })
          .nullable()
          .refine((val) => val !== null, { message: t("errors.date") });
        break;
      case "country":
        schemaObj[internalField] = z
          .string()
          .nonempty({ message: t("errors.country") });
        break;
      case "interestedIn":
        schemaObj[internalField] = z.enum(
          ["Inpatient", "InpatientAndOutpatient"],
          {
            required_error: t("errors.interested_in"),
          }
        );
        break;
      default:
        break;
    }
  });

  return z.object(schemaObj);
};

// Define FormData with all possible fields as optional
export type FormData = {
  name?: string;
  email?: string;
  phone?: string;
  date?: Date | null;
  country?: string;
  interestedIn?: "Inpatient" | "InpatientAndOutpatient";
};
