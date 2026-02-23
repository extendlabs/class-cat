import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { BusinessOnboardingData } from "@/types/business-portal";

export function OperatingHoursStep({
  data,
  setData,
}: {
  data: BusinessOnboardingData;
  setData: React.Dispatch<React.SetStateAction<BusinessOnboardingData>>;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Operating Hours
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Set your business hours for each day.
      </p>
      <div className="space-y-3">
        {data.hours.map((h, i) => (
          <div key={h.day} className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 w-24">
              {h.day}
            </span>
            <Input
              type="time"
              value={h.open}
              disabled={h.closed}
              onChange={(e) => {
                const hours = [...data.hours];
                hours[i] = { ...hours[i], open: e.target.value };
                setData((d) => ({ ...d, hours }));
              }}
              className="w-28"
            />
            <span className="text-gray-400 text-sm">–</span>
            <Input
              type="time"
              value={h.close}
              disabled={h.closed}
              onChange={(e) => {
                const hours = [...data.hours];
                hours[i] = { ...hours[i], close: e.target.value };
                setData((d) => ({ ...d, hours }));
              }}
              className="w-28"
            />
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-gray-400">Closed</span>
              <Switch
                checked={h.closed}
                onCheckedChange={(checked) => {
                  const hours = [...data.hours];
                  hours[i] = { ...hours[i], closed: checked };
                  setData((d) => ({ ...d, hours }));
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
