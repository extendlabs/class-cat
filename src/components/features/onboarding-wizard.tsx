"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import { OnboardingStepIndicator } from "./onboarding-step-indicator";
import { Button } from "@/components/ui/button";
import { createBusinessAccount } from "@/api/business-portal";
import {
  CategoryStep,
  CompanyInfoStep,
  AddressStep,
  MapPinStep,
  OperatingHoursStep,
  TeamStep,
} from "./onboarding";
import type { BusinessCategory, BusinessOnboardingData } from "@/types/business-portal";

const STEPS = ["Category", "Company", "Address", "Map", "Hours", "Team"];

const DEFAULT_HOURS = [
  { day: "Monday", open: "08:00", close: "18:00", closed: false },
  { day: "Tuesday", open: "08:00", close: "18:00", closed: false },
  { day: "Wednesday", open: "08:00", close: "18:00", closed: false },
  { day: "Thursday", open: "08:00", close: "18:00", closed: false },
  { day: "Friday", open: "08:00", close: "18:00", closed: false },
  { day: "Saturday", open: "09:00", close: "15:00", closed: false },
  { day: "Sunday", open: "09:00", close: "15:00", closed: true },
];

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<BusinessOnboardingData>({
    category: "" as BusinessCategory,
    companyName: "",
    ownerFirstName: "",
    ownerLastName: "",
    phone: "",
    acceptedPrivacy: false,
    address: "",
    coordinates: { lat: 50.0647, lng: 19.9450 },
    hours: DEFAULT_HOURS.map((h) => ({ ...h })),
    employees: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (): boolean => {
    const errs: Record<string, string> = {};

    if (step === 0 && !data.category) {
      errs.category = "Please select a category";
    }
    if (step === 1) {
      if (!data.companyName.trim()) errs.companyName = "Required";
      if (!data.ownerFirstName.trim()) errs.ownerFirstName = "Required";
      if (!data.ownerLastName.trim()) errs.ownerLastName = "Required";
      if (!data.phone.trim()) errs.phone = "Required";
      if (!data.acceptedPrivacy) errs.acceptedPrivacy = "You must accept privacy policy";
    }
    if (step === 2 && !data.address.trim()) {
      errs.address = "Please enter an address";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await createBusinessAccount(data);
      router.push("/profile/business");
    } catch {
      setSubmitting(false);
    }
  };

  const handleCoordinateChange = useCallback(
    (coords: { lat: number; lng: number }) => {
      setData((d) => ({ ...d, coordinates: coords }));
    },
    []
  );

  const addEmployee = () => {
    setData((d) => ({
      ...d,
      employees: [...d.employees, { name: "", specialty: "", avatarUrl: "" }],
    }));
  };

  const removeEmployee = (idx: number) => {
    setData((d) => ({
      ...d,
      employees: d.employees.filter((_, i) => i !== idx),
    }));
  };

  const updateEmployee = (
    idx: number,
    field: "name" | "specialty" | "avatarUrl",
    value: string
  ) => {
    setData((d) => ({
      ...d,
      employees: d.employees.map((e, i) =>
        i === idx ? { ...e, [field]: value } : e
      ),
    }));
  };

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-10">
        <OnboardingStepIndicator steps={STEPS} currentStep={step} />
      </div>

      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-[var(--shadow-soft)] border border-gray-100/60">
        {step === 0 && <CategoryStep data={data} errors={errors} setData={setData} setErrors={setErrors} />}
        {step === 1 && <CompanyInfoStep data={data} errors={errors} setData={setData} />}
        {step === 2 && <AddressStep data={data} errors={errors} setData={setData} />}
        {step === 3 && <MapPinStep data={data} onCoordinateChange={handleCoordinateChange} />}
        {step === 4 && <OperatingHoursStep data={data} setData={setData} />}
        {step === 5 && <TeamStep data={data} addEmployee={addEmployee} removeEmployee={removeEmployee} updateEmployee={updateEmployee} />}
      </div>

      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          className="rounded-full gap-1.5"
          onClick={back}
          disabled={step === 0}
        >
          <ArrowLeft size={14} />
          Back
        </Button>

        <div className="flex gap-3">
          {isLastStep && (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleSubmit}
              disabled={submitting}
            >
              Skip & Finish
            </Button>
          )}
          <Button
            className="rounded-full bg-coral hover:bg-coral-hover text-white gap-1.5"
            onClick={isLastStep ? handleSubmit : next}
            disabled={submitting}
          >
            {submitting ? (
              "Creating..."
            ) : isLastStep ? (
              <>
                <Check size={14} weight="bold" />
                Complete Setup
              </>
            ) : (
              <>
                Next
                <ArrowRight size={14} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
