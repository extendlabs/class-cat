"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
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
  const t = useTranslations("onboarding");
  const tCommon = useTranslations("common");
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

  const STEPS = [
    t("steps.category"),
    t("steps.company"),
    t("steps.address"),
    t("steps.map"),
    t("steps.hours"),
    t("steps.team"),
  ];

  const validateStep = (): boolean => {
    const errs: Record<string, string> = {};

    if (step === 0 && !data.category) {
      errs.category = t("validation.selectCategory");
    }
    if (step === 1) {
      if (!data.companyName.trim()) errs.companyName = t("validation.required");
      if (!data.ownerFirstName.trim()) errs.ownerFirstName = t("validation.required");
      if (!data.ownerLastName.trim()) errs.ownerLastName = t("validation.required");
      if (!data.phone.trim()) errs.phone = t("validation.required");
      if (!data.acceptedPrivacy) errs.acceptedPrivacy = t("validation.acceptPolicy");
    }
    if (step === 2 && !data.address.trim()) {
      errs.address = t("validation.enterAddress");
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
          {tCommon("back")}
        </Button>

        <div className="flex gap-3">
          {isLastStep && (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {t("skipAndFinish")}
            </Button>
          )}
          <Button
            className="rounded-full bg-coral hover:bg-coral-hover text-white gap-1.5"
            onClick={isLastStep ? handleSubmit : next}
            disabled={submitting}
          >
            {submitting ? (
              t("creating")
            ) : isLastStep ? (
              <>
                <Check size={14} weight="bold" />
                {t("completeSetup")}
              </>
            ) : (
              <>
                {tCommon("next")}
                <ArrowRight size={14} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
