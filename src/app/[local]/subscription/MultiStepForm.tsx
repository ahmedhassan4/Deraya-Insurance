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

const services = {
  data: [
    {
      id: 1,
      title: "International Medical Insurance",
      inner_title: "International Medical Insurance",
      desc: "With International Medical Insurance, you are not limited to treatment in just one country, but have quick access to medical care from all over the world when it matters most, wherever you may be.",
      image:
        "https://insurance.incodehub.com/images/services/individuals/F83152F72.jpg",
      inner_image:
        "https://insurance.incodehub.com/images/services/individuals/7BE60C8F7.jpg",
      bullet_points: [
        "Eligible medical treatment at home and abroad.",
        "Annual limits starting from $1m.",
        "Comprehensive range of health plans available to suit your specific needs and budget.",
        "Full cover for eligible cancer treatment.",
        "Access to a second medical opinion at no extra cost.",
        "Your choice of doctors and hospitals.",
      ],
      hiddenInput: true,
      fields: ["name", "date", "phone", "country", "email", "interested_in"],
    },
    {
      id: 2,
      title: "Local Medical Insurance",
      inner_title: "Local/ Regional Medical Insurance",
      desc: "With the current health care inflation rate, health insurance today is a necessity. Health insurance provides you with a much needed financial backup at times of medical emergencies.",
      image:
        "https://insurance.incodehub.com/images/services/individuals/C5743703C.png",
      inner_image:
        "https://insurance.incodehub.com/images/services/individuals/C7EEAE732.jpg",
      bullet_points: [
        "Affordable insurance plans for the entire family.",
        "Comprehensive hospitalization and surgical cover.",
        "Easy & quick access to treatment.",
        "A range of secure online services related to your policy.",
        "Cover for your prescribed medications.",
        "24/7 customer service.",
      ],
      hiddenInput: false,
      fields: ["name", "date", "phone", "country"],
    },
    {
      id: 3,
      title: "Car Insurance",
      inner_title: "Car Insurance",
      desc: "Plans offering you the essential help whenever you need it, with a variety of services to ensure your daily protection on the road.",
      image:
        "https://insurance.incodehub.com/images/services/individuals/8F24E3EE1.jpg",
      inner_image:
        "https://insurance.incodehub.com/images/services/individuals/5AB9CE1FB.jpg",
      bullet_points: [
        "Comprehensive programs that protect your car from a wide range of accidents.",
        "Transportation alternatives when your car is being fixed.",
        "Get your car fixed at the official service centers without worrying about the cost.",
        "Free roadside assistance.",
        "A professional and knowledgeable service team dedicated to assisting you.",
        "Guaranteed",
        "fast and efficient handling of all claims.",
      ],
      hiddenInput: false,
      fields: ["phone", "country", "email", "interested_in"],
    },
    {
      id: 4,
      title: "Investment Plans",
      inner_title: "Investment Plans",
      desc: "Getting married, having a child, or planning for retirement - each of these brings extra responsibilities and also a change in your financial focus. Your long term financial planning should go hand in hand with making a plan to ensure availability of funds to meet periodic needs.",
      image:
        "https://insurance.incodehub.com/images/services/individuals/A2423AA6C.jpg",
      inner_image:
        "https://insurance.incodehub.com/images/services/individuals/1AAF4E024.jpg",
      bullet_points: [
        "Agreed upon amounts to be saved.",
        "Guaranteed return on investments.",
        "Plans can be tailored according to when you’d like to receive your savings.",
      ],
      hiddenInput: false,
      fields: ["name", "date", "phone", "email", "interested_in"],
    },
    {
      id: 5,
      title: "Life Insurance",
      inner_title: "Life Insurance",
      desc: "The future holds many surprises, some of which may be unpleasant. This is why it is important to provide protection coverage that will ensure financial security to your family.",
      image:
        "https://insurance.incodehub.com/images/services/individuals/193473A1E.jpg",
      inner_image:
        "https://insurance.incodehub.com/images/services/individuals/46A7B32D6.jpg",
      bullet_points: [
        "Maintain the standard of living for your loved ones in case of unfortunate events.",
        "The flexibility to tailor your policy to your needs.",
        "Your beneficiaries get a death benefit which can help cover funeral costs",
        "medical bills",
        "replace your income",
        "and even ensure the continuity of a business if you pass away.",
        "Loan facilitation.",
      ],
      hiddenInput: false,
      fields: ["name", "date", "phone", "country", "email"],
    },
    {
      id: 6,
      title: "Travel Insurance",
      inner_title: "Travel Insurance",
      desc: "Plans designed to cover unexpected costs that may arise when you are traveling, wherever your destination is and no matter how long you stay.",
      image:
        "https://insurance.incodehub.com/images/services/individuals/41C8A1753.jpg",
      inner_image:
        "https://insurance.incodehub.com/images/services/individuals/1030C7B07.jpg",
      bullet_points: [
        "Emergency medical expenses and medical transportation coverage.",
        "Support in the case of losing personal baggage and/or passports.",
        "Coverage in the case of flight cancellation.",
        "Repatriation service.",
      ],
      hiddenInput: false,
      fields: ["name", "interested_in"],
    },
  ],
};

// Mapping from API field names to internal field names (camelCase)
const fieldMapping: { [key: string]: string } = {
  name: "name",
  email: "email",
  phone: "phone",
  date: "date",
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
  const searchParams = useSearchParams();
  const serviceIdParam = searchParams.get("service_id");
  const serviceId = serviceIdParam ? parseInt(serviceIdParam, 10) : null;

  const service = useMemo(() => {
    return services.data.find((s) => s.id === serviceId) || null;
  }, [serviceId]);

  const t = useTranslations("subscription");
  const locale = useLocale();
  const router = useRouter();

  const serviceFields: string[] = service?.fields || [];

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
