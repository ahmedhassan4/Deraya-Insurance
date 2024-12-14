import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Radio } from "rizzui";

import { Calendar as CalendarIcon } from "lucide-react";
import { format, getYear, setMonth, setYear } from "date-fns";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
}

export function DateField({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
}: DatePickerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("subscription");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const [viewMode, setViewMode] = useState<"year" | "month" | "day">("year");
  const [tempDate, setTempDate] = useState<Date | null>(null);

  return (
    <div className="mt-4 mb-2">
      <label className="block mb-1.5 text-sm font-medium text-gray-700">
        {t("date")}
      </label>
      <Controller
        name="date_of_birth"
        control={control}
        render={({ field }) => {
          const { value, onChange } = field;

          const handleYearSelect = (year: number) => {
            const newDate = setYear(value || new Date(), year);
            setTempDate(newDate);
            setViewMode("month");
          };

          const handleMonthSelect = (monthIndex: number) => {
            if (!tempDate) return;
            const newDate = setMonth(tempDate, monthIndex);
            setTempDate(newDate);
            setViewMode("day");
          };

          const handleDaySelect = (selectedDate: Date | undefined) => {
            if (selectedDate) {
              onChange(selectedDate);
            }
          };

          const handleOpen = () => {
            setTempDate(value || new Date());
            setViewMode("year");
          };

          return (
            <>
              <Popover onOpenChange={(open) => open && handleOpen()}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full py-[23px] justify-start text-left font-normal ${
                      !value ? "text-gray-500" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? (
                      format(value, "PPP")
                    ) : (
                      <span>{t("placeholder.date")}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-4 bg-white rounded-md shadow-md"
                  align="start"
                >
                  {viewMode === "year" && (
                    <div className="grid grid-cols-4 gap-2 max-h-64 overflow-auto p-2">
                      {years.map((year) => (
                        <button
                          type="button"
                          key={year}
                          onClick={() => handleYearSelect(year)}
                          className="w-14 h-10 flex items-center justify-center border border-gray-300 rounded-md transition-colors duration-200 cursor-pointer hover:bg-[#B5BE34] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#B5BE34]"
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  )}

                  {viewMode === "month" && tempDate && (
                    <div className="grid grid-cols-3 gap-2 min-h-64 overflow-auto p-2">
                      {months.map((month, index) => (
                        <button
                          type="button"
                          key={month}
                          onClick={() => handleMonthSelect(index)}
                          className="w-20 h-12 flex items-center justify-center border border-gray-300 rounded-md transition-colors duration-200 cursor-pointer hover:bg-[#B5BE34] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#B5BE34]"
                        >
                          {month.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  )}

                  {viewMode === "day" && tempDate && (
                    <div className="p-2">
                      <Calendar
                        mode="single"
                        selected={tempDate}
                        onSelect={(selectedDate) =>
                          handleDaySelect(selectedDate)
                        }
                        initialFocus
                        month={tempDate}
                        onMonthChange={(newDate) => setTempDate(newDate)}
                      />
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              {errors.date_of_birth && (
                <p className="text-sm mt-2 text-red-500">
                  {String(errors.date_of_birth.message)}
                </p>
              )}
            </>
          );
        }}
      />
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
