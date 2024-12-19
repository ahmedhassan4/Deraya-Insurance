import React, { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Radio } from "rizzui";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTranslations } from "next-intl";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { uniqBy } from "lodash";
import { carsApi } from "@/services/carsApi";
import SelectReact from "@/components/ui/SelectReact";

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
                      onChange={(newValue) => {
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

type ModelOption = {
  label: string;
  value: string;
};

type OptionType = {
  label: string;
  value: number;
  models?: ModelOption[];
};

export const CarTypeField = () => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const t = useTranslations("subscription");

  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [meta, setMeta] = useState<any>({});
  const [searchParam, setSearchParam] = useState("");

  // Watch current values
  const carMakeValue = watch("car_type");
  const modelValue = watch("model");

  useEffect(() => {
    setPage(1);
  }, [searchParam]);

  // Fetch car makes from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await carsApi(page, searchParam);
        setMeta(data?.meta);

        setOptions((prevOptions) => {
          const newItems =
            data?.data?.map(
              (item: { name: string; id: number; models: any[] }) => ({
                label: item.name,
                value: item.id,
                models: item?.models?.map((model: { name: string }) => ({
                  label: model.name,
                  value: model.name,
                })),
              })
            ) || [];
          return uniqBy([...prevOptions, ...newItems], "value");
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [page, searchParam]);

  // Find the selected car make object to populate its models
  const selectedCarMake = useMemo(
    () => options.find((opt) => opt.value === carMakeValue),
    [options, carMakeValue]
  );

  // Find the currently selected car_type option object
  const selectedCarTypeOption = useMemo(
    () => options.find((opt) => opt.value === carMakeValue) || null,
    [options, carMakeValue]
  );

  // Find the currently selected model option object
  const selectedModelOption = useMemo(() => {
    if (!selectedCarMake || !selectedCarMake.models) return null;
    return selectedCarMake.models.find((m) => m.value === modelValue) || null;
  }, [selectedCarMake, modelValue]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("car_brand")}
        </label>
        <Controller
          name="car_type"
          control={control}
          render={({ field }) => {
            const oldCarMakeValue = watch("car_type");
            return (
              <SelectReact
                {...field}
                options={options}
                value={selectedCarTypeOption} // Control the selected value
                hasMore={options.length < (meta?.total || 0)}
                onLoadMore={() => setPage((prev) => prev + 1)}
                onInputChange={setSearchParam}
                onChange={(newValue: any) => {
                  field.onChange(newValue?.value || "");
                  if (newValue?.value !== oldCarMakeValue) {
                    setValue("model", "");
                  }
                }}
              />
            );
          }}
        />
        {errors.car_type?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.car_type.message)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("car_model")}
        </label>
        <Controller
          name="model"
          control={control}
          render={({ field }) => (
            <SelectReact
              {...field}
              isDisabled={!Boolean(selectedCarMake)}
              options={selectedCarMake?.models || []}
              value={selectedModelOption} // Control the selected model
              onChange={(newValue: any) =>
                field.onChange(newValue?.value || "")
              }
            />
          )}
        />
        {errors.model?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.model.message)}
          </p>
        )}
      </div>
    </div>
  );
};
export const MarketValueField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");

  return (
    <div className="space-y-4">
      <div>
        <Input
          label={t("car_value")}
          type="number"
          size="lg"
          placeholder={t("placeholder.car_value")}
          {...register("market_value", { valueAsNumber: true })}
        />
        {errors.market_value?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.market_value.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export const ProductionYearField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");

  return (
    <div className="space-y-4">
      <div>
        <Input
          label={t("car_year")}
          type="number"
          size="lg"
          placeholder={t("placeholder.car_year")}
          {...register("production_year", { valueAsNumber: true })}
        />
        {errors.production_year?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.production_year.message)}
          </p>
        )}
      </div>
    </div>
  );
};


export const CompanyNameField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");

  return (
    <div className="space-y-4">
      <div>
        <Input
          label={t("company_name")}
          type="text"
          size="lg"
          placeholder={t("placeholder.company_name")}
          {...register("company_name")}
        />
        {errors.company_name?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.company_name.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export const EmployeesCountField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");

  return (
    <div className="space-y-4">
      <div>
        <Input
          label={t("employees_count")}
          type="number"
          size="lg"
          placeholder={t("placeholder.employees_count")}
          {...register("employees_count", { valueAsNumber: true })}
        />
        {errors.employees_count?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.employees_count.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export const InsuranceTypeField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");

  const insuranceOptions = useMemo(
    () => [
      { value: "Property", label: "Property" },
      { value: "Home", label: "Home" },
      { value: "Marine", label: "Marine" },
      { value: "Liability", label: "Liability" },
      { value: "Engineering", label: "Engineering" },
      { value: "Machinery breakdown", label: "Machinery breakdown" },
      { value: "Motor fleet", label: "Motor fleet" },
      { value: "Small business", label: "Small business" },
      { value: "Cyber risk", label: "Cyber risk" },
      { value: "Hull- Yacht", label: "Hull- Yacht" },
      { value: "Cash transit", label: "Cash transit" },
      { value: "Personal accident", label: "Personal accident" },
      { value: "Business interruption", label: "Business interruption" },
      { value: "Loss of profit", label: "Loss of profit" },
      { value: "Credit insurance", label: "Credit insurance" },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("insurance_type")}
        </label>
        <Controller
          name="insurance_type"
          control={control}
          render={({ field }) => (
            <SelectReact
              value={
                insuranceOptions.find((opt) => opt.value === field.value) ||
                null
              }
              options={insuranceOptions}
              onChange={(newValue: any) => {
                // Extract just the value from the selected option
                field.onChange(newValue?.value || "");
              }}
            />
          )}
        />
        {errors.insurance_type?.message && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.insurance_type.message)}
          </p>
        )}
      </div>
    </div>
  );
};
