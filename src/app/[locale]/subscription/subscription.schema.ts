import { z } from "zod";
import { useTranslations } from "next-intl";

const fieldMapping: { [key: string]: string } = {
  name: "name",
  email: "email",
  phone: "phone",
  date_of_birth: "date_of_birth",
  country: "country",
  interested_in: "interestedIn",
  car_type: "car_type",
  model: "model",
  market_value: "market_value",
  production_year: "production_year",
  company_name: "company_name",
  employees_count: "employees_count",
  insurance_type: "insurance_type",
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
      case "date_of_birth":
        schemaObj[internalField] = z
          .date({
            required_error: t("errors.date"),
            invalid_type_error: t("errors.date"),
          })
          .nullable()
          .refine((val) => val !== null, { message: t("errors.date") });
        break;
      case "country":
        schemaObj[internalField] = z.string();
        break;
      case "interestedIn":
        schemaObj[internalField] = z.enum(
          ["Inpatient", "Inpatient & Outpatient"],
          {
            required_error: t("errors.interested_in"),
          }
        );
        break;
      case "car_type":
        schemaObj[internalField] = z.number({
          required_error: t("errors.car_brand"),
        });
        break;
      case "model":
        schemaObj[internalField] = z.string().nonempty({
          message: t("errors.car_model"),
        });
        break;
      case "market_value":
        schemaObj[internalField] = z.number({
          required_error: t("errors.car_value.empty"),
          invalid_type_error: t("errors.car_value.invalid"),
        });
        break;
      case "production_year":
        schemaObj[internalField] = z
          .number({
            required_error: t("errors.car_year.empty"),
            invalid_type_error: t("errors.car_year.invalid"),
          })
          .max(2018, t("errors.car_year.max"));
        break;
      case "company_name":
        schemaObj[internalField] = z.string().nonempty({
          message: t("errors.company_name"),
        });

        break;
      case "employees_count":
        schemaObj[internalField] = z
          .number({
            required_error: t("errors.employees_count.empty"),
            invalid_type_error: t("errors.employees_count.invalid"),
          })
          .min(1, t("errors.employees_count.min"));
        break;
      case "insurance_type":
        schemaObj[internalField] = z.string({
          required_error: t("errors.insurance_type"),
        });
        // .nonempty({ message: t("errors.insurance_type_required") });
        break;
      default:
        break;
    }
  });

  return z.object(schemaObj);
};

export type FormData = {
  name?: string;
  email?: string;
  phone?: string;
  date_of_birth?: Date | null;
  country?: string;
  interestedIn?: "Inpatient" | "Inpatient & Outpatient";
  car_type?: any;
  model?: any;
  market_value?: number;
  production_year?: number;
  company_name?: string;
  employees_count?: number;
  insurance_type?: string;
};
