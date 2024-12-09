// Stepper.tsx
import React from "react";
import { BsCheck } from "react-icons/bs";

interface StepperProps {
  steps: number;
  currentStep: number;
  completedSteps: number[];
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  completedSteps,
}) => {
  return (
    <div className="flex justify-between mb-8 relative">
      {Array.from({ length: steps }).map((_, index) => (
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
              {completedSteps.includes(index) ? (
                <BsCheck className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
          </div>
          {index < steps - 1 && (
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
  );
};

export default Stepper;
