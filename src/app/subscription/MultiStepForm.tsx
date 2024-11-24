"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EmailField, NameField, PhoneField } from "./Form";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

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

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  const CurrentStepComponent = formSteps[currentStep - 1].component;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleBack}
          className="text-gray-600 flex items-center"
        >
          <BsArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <button onClick={() => methods.reset()} className="text-gray-600">
          Reset
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Let&lsquo;s Get to know you</h1>
      <p className="text-gray-600 mb-8">Fill in the blanks to proceed!</p>

      {/* Progress bar */}
      <div className="flex justify-between mb-8 relative">
        {[...Array(totalSteps)].map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full ${
                  index + 1 <= currentStep ? "bg-green-500" : "bg-gray-200"
                } flex items-center justify-center text-white text-sm`}
              >
                {index + 1 <= currentStep && "✓"}
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-1 mt-3 ${
                  index + 1 < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
              />
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
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
              >
                Next
                <BsArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MultiStepForm;
