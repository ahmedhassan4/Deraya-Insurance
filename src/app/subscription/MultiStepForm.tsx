"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EmailField, NameField, PhoneField } from "./Form";
import { BsArrowLeft, BsArrowRight, BsCheck } from "react-icons/bs";
import { Button } from "rizzui";
import Line from "@/ui/Line";
import { useRouter } from "next/navigation";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const totalSteps = 3;

  const formSteps = [
    { title: "Name", component: NameField },
    { title: "Email", component: EmailField },
    { title: "Phone", component: PhoneField },
  ];

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const router = useRouter();
  const handleBackToServices = () => {
    router.back();
  };

  const handleReset = () => {
    methods.reset();
    setCurrentStep(1);
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  const CurrentStepComponent = formSteps[currentStep - 1].component;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        {currentStep === 1 ? (
          <Button
            variant="text"
            onClick={handleBackToServices}
            className="text-[#111928] font-normal text-lg flex items-center"
          >
            <BsArrowLeft className="w-5 h-5 mr-2" />
            Back To Services
          </Button>
        ) : (
          <Button
            variant="text"
            onClick={handleBack}
            className="text-[#111928] font-normal text-lg flex items-center"
          >
            <BsArrowLeft className="w-5 h-5 mr-2" />
            Back
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

      {/* Progress bar */}
      <div className="flex justify-between mb-8 relative">
        {[...Array(totalSteps)].map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 
                  ${
                    index + 1 < currentStep
                      ? "bg-[#B5BE34] text-white" // Completed step
                      : index + 1 === currentStep
                      ? "border-2 border-[#B5BE34] text-[#B5BE34]" // Current step
                      : "border-2 border-gray-200 text-gray-400" // Future step
                  }
                `}
              >
                {index + 1 < currentStep && <BsCheck className="w-5 h-5" />}
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div className="flex-1 relative">
                <div
                  className={`absolute top-1/2 left-0 h-[1px] w-full transition-all duration-300
                    ${
                      index + 1 < currentStep
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

      {/* Form */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mb-6">
            <CurrentStepComponent />
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            {currentStep === totalSteps ? (
              <Button
                type="submit"
                size="lg"
                className="w-full px-6 py-2 bg-[#B5BE34] text-white rounded hover:bg-[#aab239]"
              >
                Submit
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="w-full text-base font-medium hover:bg-[#aab239]"
                size="lg"
              >
                Next
                <BsArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MultiStepForm;