import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Radio } from "rizzui";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useTranslations } from "next-intl";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export const NameField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");
  return (
    <div className="space-y-4">
      <div>
        <Input
          label={t("name")}
          size="lg"
          placeholder={t("placeholder.name")}
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.name.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export const EmailField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");
  return (
    <div className="space-y-4">
      <div>
        <Input
          label={t("email")}
          type="email"
          size="lg"
          placeholder={t("placeholder.email")}
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.email.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export const PhoneField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");
  return (
    <div className="space-y-4">
      <div>
        <Input
          label={t("phone")}
          type="tel"
          size="lg"
          placeholder={t("placeholder.phone")}
          {...register("phone")}
        />
        {errors.phone?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.phone.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export const InterestedInField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("interested_in")}
        </label>
        <Controller
          name="interestedIn"
          control={control}
          render={({ field }) => (
            <div>
              <div className="rounded-lg border-2 hover:border-[#B5BE34] p-4 mt-5">
                <Radio
                  {...field}
                  label={t("interest.Inpatient")}
                  value="Inpatient"
                  checked={field.value === "Inpatient"}
                />
              </div>
              <div className="rounded-lg border-2 hover:border-[#B5BE34] p-4 mt-2">
                <Radio
                  {...field}
                  label={t("interest.Inpatient_Outpatient")}
                  value="Inpatient & Outpatient"
                  checked={field.value === "Inpatient & Outpatient"}
                />
              </div>
            </div>
          )}
        />

        {errors.interestedIn?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.interestedIn.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export function DateField() {
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1.5 text-sm font-medium text-gray-700">
          {t("date")}
        </label>
        <Controller
          name="date_of_birth"
          control={control}
          // Optional: Add validation rules here
          // rules={{ required: "Date of birth is required" }}
          render={({ field }) => {
            // field.value is a Date or undefined.
            // Convert it to a dayjs object for the DatePicker.
            const dayjsValue = field.value ? dayjs(field.value) : null;

            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <div
                    className="w-full"
                    // onClick={() => setOpenDatePicker(true)}
                    >
                    <MobileDatePicker
                      // open={openDatePicker}
                      // onClose={() => setOpenDatePicker(false)}
                      // onAccept={() => setOpenDatePicker(false)}
                      value={dayjsValue}
                      key={openDatePicker?.toString()}
                      className="w-full"
                      onChange={newValue => {
                        field.onChange(newValue ? newValue.toDate() : null);
                        console.log("newValue");
                        setOpenDatePicker(false);
                        console.log("newValue 2");
                      }}
                      views={["year", "month", "day"]}
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            );
          }}
        />
        {errors.date_of_birth && (
          <p className="text-sm mt-2 text-red-500">
            {String(errors.date_of_birth.message)}
          </p>
        )}
      </div>
    </div>
  );
}

export const CountryField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");
  return (
    <div className="space-y-4">
      <div>
        <Input label={t("country")} size="lg" value={"Egypt"} disabled />
        {/* Hidden input to ensure value is part of the form data */}
        <input type="hidden" value="Egypt" {...register("country")} />
        {errors.country?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.country.message)}
          </p>
        )}
      </div>
    </div>
  );
};
