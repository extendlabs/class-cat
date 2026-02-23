"use client";

import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function OnboardingStepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 w-full max-w-xl mx-auto">
      {steps.map((label, i) => {
        const completed = i < currentStep;
        const current = i === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            {/* Dot */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  completed && "bg-coral",
                  current && "bg-white border-[2.5px] border-coral shadow-[0_0_0_4px_rgba(255,138,101,0.2)]",
                  !completed && !current && "bg-gray-200"
                )}
              />
              <span
                className={cn(
                  "text-[10px] mt-1.5 whitespace-nowrap hidden sm:block",
                  completed || current
                    ? "text-coral font-bold"
                    : "text-gray-400"
                )}
              >
                {label}
              </span>
            </div>
            {/* Line (skip after last) */}
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-1.5">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    completed ? "bg-coral" : "bg-gray-200"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
