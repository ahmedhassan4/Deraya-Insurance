"use client";
import Line from "@/ui/Line";
import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Button, Input, Radio, Text } from "rizzui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^^(\+?\d{1,4})?\s?(\(?\d{1,4}\)?)?\s?\d{4,10}$/, {
    message: "Invalid phone number",
  }),
  registered: z.boolean(),
});

type ContactFormProps = z.infer<typeof contactFormSchema>;

function Contact() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormProps>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      registered: false,
    },
  });

  const onSubmit = (data: ContactFormProps) => {
    console.log(data);
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <Link href="/services">
        <Button
          variant="text"
          className="text-[#111928] font-normal text-lg flex items-center"
        >
          <BsArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      </Link>
      <Line marginTop="10px" thickness=".5px" />

      <div className="my-6">
        <Text className="text-2xl font-bold mb-1">Let’s Get to know you</Text>
        <Text className="text-[#6B7280] ">Fill in the blanks to proceed!</Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="text"
            size="lg"
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        <div>
          <Input
            type="email"
            size="lg"
            label="Email Address"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div>
          <Input
            type="tel"
            size="lg"
            label="Phone Number"
            placeholder="Enter your phone number"
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 ">
            Are you an FRA registered broker?
          </label>
          <Controller
            name="registered"
            control={control}
            render={({ field }) => (
              <div className="flex w-full gap-4">
                <div className="rounded-lg border hover:border-[#B5BE34] p-4 mt-5 w-full ">
                  <Radio
                    label="Yes"
                    value="true"
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                  />
                </div>
                <div className="rounded-lg border hover:border-[#B5BE34] p-4 mt-5 w-full ">
                  <Radio
                    label="No"
                    value="false"
                    checked={field.value === false}
                    onChange={() => field.onChange(false)}
                  />
                </div>
              </div>
            )}
          />
        </div>

        <Button type="submit" color="primary" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Contact;
