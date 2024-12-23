"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  NameField,
  EmailField,
  PhoneField,
  InterestedInField,
  DateField,
  CountryField,
  CarTypeField,
  MarketValueField,
  ProductionYearField,
  CompanyNameField,
  EmployeesCountField,
  InsuranceTypeField,
} from "./Form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "rizzui";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Line from "@/ui/Line";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, useSubscriptionSchema } from "./subscription.schema";
import { useLocale, useTranslations } from "next-intl";
import Stepper from "./Stepper";
import { useServiceData } from "@/hooks/useServiceData";
import Spinner from "../spinner";
import { useCreateProvider } from "@/hooks/useCreateProvider";
import {
  InsuranceOfferRequest,
  InsuranceOfferResponse,
} from "@/services/providersApi";
import useModal from "@/components/modal-views/use-madal";
import SubmitFormModal from "./SubmitFormModal";
import { usePlanStore } from "@/store/planStore";
import { PiArrowsCounterClockwise } from "react-icons/pi";

const fieldMapping: { [key: string]: string } = {
  name: "name",
  email: "email",
  phone: "phone",
  date_of_birth: "date_of_birth",
  country: "country",
  interested_in: "interestedIn",
  car_type: "car_type",
  model: "model",
  market_value: "market_value",
  production_year: "production_year",
  company_name: "company_name",
  employees_count: "employees_count",
  insurance_type: "insurance_type",
};

const fieldComponents: { [key: string]: React.ReactElement } = {
  name: <NameField />,
  email: <EmailField />,
  phone: <PhoneField />,
  date_of_birth: <DateField />,
  country: <CountryField />,
  interestedIn: <InterestedInField />,
  car_type: <CarTypeField />,
  market_value: <MarketValueField />,
  production_year: <ProductionYearField />,
  company_name: <CompanyNameField />,
  employees_count: <EmployeesCountField />,
  insurance_type: <InsuranceTypeField />,
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

  const subscriptionSchema = useSubscriptionSchema(serviceFields);

  const defaultValues = useMemo(() => {
    const defaults: Partial<FormData> = {};
    serviceFields.forEach((field) => {
      const internalField = fieldMapping[field] || field;
      switch (internalField) {
        case "name":
        case "email":
        case "phone":
        case "country":
        case "model":
        case "insurance_type":
        case "company_name":
          defaults[internalField] = "";
          break;
        case "date_of_birth":
          defaults[internalField] = null;
          break;
        case "car_type":
          defaults[internalField] = "";
          break;
        case "interestedIn":
          defaults[internalField] = "Inpatient";
          break;
        case "market_value":
          defaults[internalField] = 0;
          break;
        case "production_year":
          defaults[internalField] = new Date().getFullYear();
          break;
        case "employees_count":
          defaults[internalField] = 1;
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

  const validateStep = async () => {
    const currentStepFields = formSteps[currentStep]?.fields || [];
    return methods.trigger(currentStepFields);
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

  const handlePrevStep = () => {
    setCompletedSteps((prev) => prev.filter((step) => step !== currentStep));
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleReset = () => {
    methods.reset(defaultValues);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  // Add keyboard event handler
  useEffect(() => {
    const handleKeyPress = async (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (currentStep === formSteps.length - 1) {
          // On the last step, submit the form
          const isValid = await methods.trigger();
          if (isValid) {
            methods.handleSubmit(onSubmit)();
          }
        } else {
          // On other steps, move to next step
          handleNextStep();
        }
      }
    };

    // Add event listener
    document.addEventListener("keypress", handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [currentStep, formSteps.length, methods]);

  const handleBackToServices = () => {
    router.back();
  };

  const { mutate } = useCreateProvider();
  const { openModal, closeModal } = useModal();
  const { setPlanData } = usePlanStore();

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);

    const requestData: Record<string, any> = {
      service_id: serviceId,
    };

    serviceFields.forEach((field) => {
      const internalField = fieldMapping[field] || field;
      const fieldValue = data[internalField as keyof FormData];

      if (
        fieldValue !== undefined &&
        fieldValue !== null &&
        fieldValue !== ""
      ) {
        if (field === "date_of_birth" && fieldValue instanceof Date) {
          requestData[field] = fieldValue.toISOString().split("T")[0];
        } else {
          requestData[field] = fieldValue;
        }
      }
    });

    mutate(requestData as InsuranceOfferRequest, {
      onSuccess: (responseData: InsuranceOfferResponse) => {
        console.log("Insurance offer created successfully:", responseData);
        setPlanData(responseData);
        if ("data" in responseData) {
          router.push(`/${locale}/plan?service_id=${serviceId || 1}`);
        } else if ("message" in responseData) {
          openModal({
            view: (
              <SubmitFormModal
                closeModal={closeModal}
                message={responseData.message}
                title={responseData.title}
              />
            ),
            customSize: "420px",
          });
        }
      },
      onError: (error) => {
        console.error("Insurance offer creation failed:", error);
        alert("An error occurred while creating the insurance offer.");
      },
    });
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

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
          <PiArrowsCounterClockwise size={24} />
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
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            onKeyPress={(e) => {
              // Prevent form submission on Enter key
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          >
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
