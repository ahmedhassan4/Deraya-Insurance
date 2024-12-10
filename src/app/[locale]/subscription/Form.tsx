import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Radio } from "rizzui";
import DatePicker from "react-datepicker";
import ReactFlagsSelect from "react-flags-select";
import { useTranslations } from "next-intl";

import "react-datepicker/dist/react-datepicker.css";

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
              <div className="rounded-lg border hover:border-[#B5BE34] p-4 mt-5">
                <Radio
                  {...field}
                  label={t("interest.Inpatient")}
                  value="Inpatient"
                  checked={field.value === "Inpatient"}
                />
              </div>
              <div className="rounded-lg border hover:border-[#B5BE34] p-4 mt-2">
                <Radio
                  {...field}
                  label={t("interest.Inpatient_Outpatient")}
                  value="InpatientAndOutpatient"
                  checked={field.value === "InpatientAndOutpatient"}
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

export const DateField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");

  return (
    <div className="mt-4 mb-2">
      <label className="block mb-1.5 text-sm font-medium text-gray-700">
        {t("date")}
      </label>
      <Controller
        name="date"
        control={control}
        // You can add validation rules if needed.
        // For example, if the date is required:
        // rules={{ required: t("error.required") }}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="yyyy-MM-dd"
            className=" border-gray-200 border-2 rounded-md  px-3 py-3 w-full focus:ring-[#B5BE34] focus:border-none"
            wrapperClassName="!w-full !focus:ring-0 !focus:outline-none "
            placeholderText={t("placeholder.date")}
          />
        )}
      />

      {errors.date && (
        <p className="text-sm mt-2 text-red-500">
          {String(errors.date.message)}
        </p>
      )}
    </div>
  );
};
export const CountryField = () => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const [selected, setSelected] = useState("");
  const t = useTranslations("subscription");
  return (
    <div>
      <label className="block mb-1.5 text-sm font-medium text-gray-700">
        {t("country")}
      </label>
      <ReactFlagsSelect
        selected={selected}
        onSelect={(code) => {
          setSelected(code);
          setValue("country", code);
        }}
        placeholder={t("placeholder.country")}
        searchable
        searchPlaceholder="Search countries"
      />
      {errors.country?.message && (
        <p className="mt-1 text-sm text-red-500">
          {String(errors.country.message)}
        </p>
      )}
    </div>
  );
};