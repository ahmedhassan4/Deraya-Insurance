import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Radio, RadioGroup } from "rizzui";

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

export const NameField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <Input
          label="Name"
          size="lg"
          placeholder="Enter your first name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
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

  return (
    <div className="space-y-4">
      <div>
        <Input
          label="Email"
          type="email"
          size="lg"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
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

  return (
    <div className="space-y-4">
      <div>
        <Input
          label="Phone"
          type="tel"
          size="lg"
          placeholder="Enter your phone number"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+?[\d\s-]{10,}$/,
              message: "Invalid phone number",
            },
          })}
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
    register,
    formState: { errors },
  } = useFormContext();

  const [value, setValue] = useState("apple");

  return (
    <div className="space-y-4">
      <div>
        <RadioGroup
          value={value}
          setValue={setValue}
          {...register("interestedIn", {
            required: "Please select your interest level",
          })}
        >
          <div className="rounded-lg border hover:border-[#B5BE34] p-4 mt-5 ">
            <Radio
              label="Interested"
              value="interested"
              {...register("interestedIn")}
            />
          </div>
          <div className="rounded-lg border hover:border-[#B5BE34]  p-4 mt-2">
            <Radio
              label="Not Interested"
              value="notInterested"
              {...register("interestedIn")}
            />
          </div>
        </RadioGroup>

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
  const { register, setValue } = useFormContext();
  const [date, setDate] = useState<Date | undefined>(undefined);
  // register("date");
  return (
    <div className="space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setValue("date", date);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <input
        type="hidden"
        {...register("date", { required: "Date is required" })}
      />
    </div>
  );
};
