"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  NameField,
  EmailField,
  PhoneField,
  InterestedInField,
  DateField,
  CountryField,
} from "./Form";
import { useRouter } from "next/navigation";
import { Button } from "rizzui";
import { BsArrowLeft, BsArrowRight, BsCheck } from "react-icons/bs";
import Line from "@/ui/Line";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, subscriptionSchema } from "./subscription.schema";

const MultistepForm = () => {
  const methods = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interestedIn: "Inpatient",
      date: undefined,
      country: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

  const formSteps = [
    {
      title: "NameField",
      component: (
        <div className="space-y-4">
          <NameField />
        </div>
      ),
      fields: ["name"],
    },
    {
      title: "EmailField",
      component: (
        <div className="space-y-4">
          <EmailField />
        </div>
      ),
      fields: ["email"],
    },
    {
      title: "PhoneField",
      component: (
        <div className="space-y-4">
          <PhoneField />
        </div>
      ),
      fields: ["phone"],
    },
    {
      title: "DateField",
      component: (
        <div className="space-y-4">
          <DateField />
        </div>
      ),
      fields: ["date"],
    },
    {
      title: "CountryField",
      component: (
        <div className="space-y-4">
          <CountryField />
        </div>
      ),
      fields: ["country"],
    },

    {
      title: "InterestedInField",
      component: (
        <div className="space-y-4">
          <InterestedInField />
        </div>
      ),
      fields: ["interestedIn"],
    },
  ];

  const validateStep = async () => {
    const currentStepFields = formSteps[currentStep]
      .fields as (keyof FormData)[];
    const result = await methods.trigger(currentStepFields);
    return result;
  };

  const handleNextStep = async () => {
    const isStepValid = await validateStep();
    if (isStepValid) {
      setCompletedSteps((prev) =>
        prev.includes(currentStep) ? prev : [...prev, currentStep]
      );
      setCurrentStep((prevStep) =>
        Math.min(prevStep + 1, formSteps.length - 1)
      );
    }
  };

  // Move to previous step
  const handlePrevStep = () => {
    // Remove the current step from completed steps when going back
    setCompletedSteps((prev) => prev.filter((step) => step !== currentStep));

    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const router = useRouter();
  const handleBackToServices = () => {
    router.back();
  };

  const handleReset = () => {
    methods.reset();
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  // Submit form
  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    router.push("/plan");
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        {currentStep > 0 ? (
          <Button
            variant="text"
            onClick={handlePrevStep}
            className="text-[#111928] font-normal text-lg flex items-center"
          >
            <BsArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        ) : (
          <Button
            variant="text"
            onClick={handleBackToServices}
            className="text-[#111928] font-normal text-lg flex items-center"
          >
            <BsArrowLeft className="w-5 h-5 mr-2" />
            Back To Services
          </Button>
        )}
        <Button
          variant="text"
          onClick={handleReset}
          className="text-[#111928] font-normal text-lg"
        >
          Reset
        </Button>
      </div>
      <Line marginTop="10px" thickness=".5px" />

      <div className="my-8">
        <h1 className="text-4xl font-bold mb-4">Let&apos;s Get to know you</h1>
        <p className="text-[#6B7280] text-lg">Fill in the blanks to proceed!</p>
      </div>

      {/* Stepper */}
      <div className="flex justify-between mb-8 relative">
        {formSteps.map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 
                  ${
                    completedSteps.includes(index)
                      ? "bg-[#B5BE34] text-white" // Completed step
                      : index === currentStep
                      ? "border-2 border-[#B5BE34] text-[#B5BE34]" // Current step
                      : "border-2 border-gray-200 text-gray-400" // Future step
                  }
                `}
              >
                {completedSteps.includes(index) && (
                  <BsCheck className="w-5 h-5" />
                )}
              </div>
            </div>
            {index < formSteps.length - 1 && (
              <div className="flex-1 relative">
                <div
                  className={`absolute top-1/2 left-0 h-[1px] w-full transition-all duration-300
                    ${
                      completedSteps.includes(index + 1)
                        ? "bg-[#B5BE34]" // Completed line
                        : index + 1 === currentStep
                        ? "bg-gradient-to-r from-[#B5BE34] to-gray-200" // Current line
                        : "bg-gray-200" // Future line
                    }
                  `}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mb-6">{formSteps[currentStep].component}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep < formSteps.length - 1 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full text-base text-white bg-[#B5BE34] hover:bg-[#aab239] flex items-center justify-center py-2 px-4 rounded"
              >
                Next
                <BsArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <Button
                type="submit"
                size="lg"
                className="w-full px-6 py-2 bg-[#B5BE34] text-white rounded hover:bg-[#aab239]"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MultistepForm;
