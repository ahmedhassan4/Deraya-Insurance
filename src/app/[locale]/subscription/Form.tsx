import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Radio } from "rizzui";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ReactFlagsSelect from "react-flags-select";
import { useTranslations } from "next-intl";

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
          className="text-black"
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
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="mt-4 mb-2">
      <label className="block mb-1.5 text-sm font-medium text-gray-700">
        {t("date")}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              errors.date && "border-destructive"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{t("placeholder.date")}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setValue("date", selectedDate);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <input type="hidden" {...register("date")} />

      {errors.date && (
        <p className=" text-sm mt-2 text-red">
          {errors.date.message as string}
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