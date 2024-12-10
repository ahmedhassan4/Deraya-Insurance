// MultistepForm.tsx

"use client";
import React, { useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  NameField,
  EmailField,
  PhoneField,
  InterestedInField,
  DateField,
  CountryField,
} from "./Form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "rizzui";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Line from "@/ui/Line";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, useSubscriptionSchema } from "./subscription.schema";
import { useLocale, useTranslations } from "next-intl";
import Stepper from "./Stepper"; // Ensure the path is correct
import { useServiceData } from "@/hooks/useServiceData";
import Spinner from "../spinner";

// Mapping from API field names to internal field names (camelCase)
const fieldMapping: { [key: string]: string } = {
  name: "name",
  email: "email",
  phone: "phone",
  date_of_birth: "date",
  country: "country",
  interested_in: "interestedIn",
};

// Mapping from internal field names to components
const fieldComponents: { [key: string]: React.ReactElement } = {
  name: <NameField />,
  email: <EmailField />,
  phone: <PhoneField />,
  date: <DateField />,
  country: <CountryField />,
  interestedIn: <InterestedInField />,
};

const MultistepForm = () => {
  const { data: services, isLoading } = useServiceData();

  const searchParams = useSearchParams();
  const serviceIdParam = searchParams.get("service_id");
  const serviceId = serviceIdParam ? parseInt(serviceIdParam, 10) : null;

  const service = useMemo(() => {
    return services?.find((s) => s.id === serviceId) || null;
  }, [services, serviceId]);

  const t = useTranslations("subscription");
  const locale = useLocale();
  const router = useRouter();

  const serviceFields: string[] = useMemo(
    () => service?.fields || [],
    [service]
  );

  // Always call useSubscriptionSchema, even if serviceFields is empty
  const subscriptionSchema = useSubscriptionSchema(serviceFields);

  // Generate default values based on serviceFields
  const defaultValues = useMemo(() => {
    const defaults: Partial<FormData> = {};

    serviceFields.forEach((field) => {
      const internalField = fieldMapping[field] || field;
      switch (internalField) {
        case "name":
        case "email":
        case "phone":
        case "country":
          defaults[internalField] = "";
          break;
        case "date":
          defaults[internalField] = null;
          break;
        case "interestedIn":
          defaults[internalField] = "Inpatient";
          break;
        default:
          break;
      }
    });
    return defaults;
  }, [serviceFields]);

  const methods = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(subscriptionSchema),
    defaultValues,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Generate form steps based on serviceFields
  const formSteps = useMemo(() => {
    return serviceFields.map((field) => {
      const internalField = fieldMapping[field] || field;
      const component = fieldComponents[internalField];

      return {
        title: `${
          internalField.charAt(0).toUpperCase() + internalField.slice(1)
        }`,
        component: <div className="space-y-4">{component}</div>,
        fields: [internalField as keyof FormData],
      };
    });
  }, [serviceFields]);

  console.log("form steps", formSteps);

  // Validate the current step
  const validateStep = async () => {
    const currentStepFields = formSteps[currentStep]?.fields || [];
    return methods.trigger(currentStepFields);
  };

  // Handle moving to the next step
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

  // Handle moving to the previous step
  const handlePrevStep = () => {
    setCompletedSteps((prev) => prev.filter((step) => step !== currentStep));
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // Handle resetting the form
  const handleReset = () => {
    methods.reset(defaultValues);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  // Handle navigating back to services
  const handleBackToServices = () => {
    router.back();
  };

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
    router.push(`/${locale}/plan?service_id=1`);
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  // If no service found after loading, show error
  if (!service) {
    return <div className="text-red-500">{t("service_not_found")}</div>;
  }

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
            {locale === "en" ? (
              <BsArrowLeft className="w-5 h-5 mr-2" />
            ) : (
              <BsArrowRight className="w-5 h-5 ml-2" />
            )}
            {t("back")}
          </Button>
        ) : (
          <Button
            variant="text"
            onClick={handleBackToServices}
            className="text-[#111928] font-normal text-lg flex items-center"
          >
            {locale === "en" ? (
              <BsArrowLeft className="w-5 h-5 mr-2" />
            ) : (
              <BsArrowRight className="w-5 h-5 ml-3" />
            )}
            {t("back_to_services")}
          </Button>
        )}
        <Button
          variant="text"
          onClick={handleReset}
          className="text-[#111928] font-normal text-lg"
        >
          {t("reset")}
        </Button>
      </div>
      <Line marginTop="10px" thickness=".5px" />

      {/* Header Content */}
      <div className="my-8">
        <h1 className="text-4xl font-bold mb-4">{t("header")}</h1>
        <p className="text-[#6B7280] text-lg">{t("sub_header")}</p>
      </div>

      {/* Stepper */}
      {formSteps.length > 0 && (
        <Stepper
          steps={formSteps.length}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      )}

      {/* Error Message */}
      {!service && formSteps.length === 0 && (
        <div className="text-red-500">{t("service_not_found")}</div>
      )}

      {/* Form */}
      {formSteps.length > 0 && (
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
                  {locale === "en" ? (
                    <>
                      {t("next")}
                      <BsArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      {t("next")}
                      <BsArrowLeft className="w-4 h-4 mr-2" />
                    </>
                  )}
                </button>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  className="w-full px-6 py-2 bg-[#B5BE34] text-white rounded hover:bg-[#aab239]"
                >
                  {t("submit")}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default MultistepForm;
