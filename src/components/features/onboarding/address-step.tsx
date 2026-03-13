import { FieldInput } from "./field-input";
import type { BusinessOnboardingData } from "@/types/business-portal";

export function AddressStep({
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
        Business Address
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Where is your business located?
      </p>
      <div className="space-y-4">
        <FieldInput
          label="Street address"
          value={data.address}
          onChange={(v) => setData((d) => ({ ...d, address: v }))}
          error={errors.address}
          placeholder="e.g. ul. Dietla 50"
        />
        <FieldInput
          label="City"
          value={data.city}
          onChange={(v) => setData((d) => ({ ...d, city: v }))}
          error={errors.city}
          placeholder="e.g. Kraków"
        />
      </div>
    </div>
  );
}
