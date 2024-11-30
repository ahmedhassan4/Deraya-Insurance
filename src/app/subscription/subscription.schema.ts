import { z } from "zod";

export const subscriptionSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .nonempty({ message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  phone: z
    .string()
    .regex(/^\+?[\d\s-]{10,}$/, { message: "Invalid phone number" })
    .nonempty({ message: "Phone number is required" }),
  interestedIn: z.enum(["Inpatient", "InpatientAndOutpatient"], {
    required_error: "Please select your interest level",
  }),
  date: z
    .date({
      required_error: "Date is required",
      invalid_type_error: "Date is required",
    })
    .nullable()
    .refine((val) => val !== null, { message: "Date is required" }),
  country: z.string().nonempty({ message: "Country is required" }),
});

export type FormData = z.infer<typeof subscriptionSchema>;
