import { Label } from "@/components/ui/label";
import { FieldInput } from "./field-input";
import type { BusinessOnboardingData } from "@/types/business-portal";

export function CompanyInfoStep({
  data,
  errors,
  setData,
}: {
  data: BusinessOnboardingData;
  errors: Record<string, string>;
  setData: React.Dispatch<React.SetStateAction<BusinessOnboardingData>>;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Company Information
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Tell us about your business.
      </p>
      <div className="space-y-4">
        <FieldInput
          label="Company Name"
          value={data.companyName}
          onChange={(v) => setData((d) => ({ ...d, companyName: v }))}
          error={errors.companyName}
        />
        <div className="grid grid-cols-2 gap-4">
          <FieldInput
            label="Owner First Name"
            value={data.ownerFirstName}
            onChange={(v) => setData((d) => ({ ...d, ownerFirstName: v }))}
            error={errors.ownerFirstName}
          />
          <FieldInput
            label="Owner Last Name"
            value={data.ownerLastName}
            onChange={(v) => setData((d) => ({ ...d, ownerLastName: v }))}
            error={errors.ownerLastName}
          />
        </div>
        <FieldInput
          label="Phone Number"
          value={data.phone}
          onChange={(v) => setData((d) => ({ ...d, phone: v }))}
          error={errors.phone}
          type="tel"
        />
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="privacy"
            checked={data.acceptedPrivacy}
            onChange={(e) =>
              setData((d) => ({ ...d, acceptedPrivacy: e.target.checked }))
            }
            className="w-4 h-4 rounded border-gray-300 text-coral focus:ring-coral"
          />
          <Label htmlFor="privacy" className="text-sm text-gray-600">
            I accept the Privacy Policy and Terms of Service
          </Label>
        </div>
        {errors.acceptedPrivacy && (
          <p className="text-xs text-red-500">{errors.acceptedPrivacy}</p>
        )}
      </div>
    </div>
  );
}
