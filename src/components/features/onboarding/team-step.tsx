import { Plus, Trash } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import type { BusinessOnboardingData } from "@/types/business-portal";

export function TeamStep({
  data,
  addEmployee,
  removeEmployee,
  updateEmployee,
}: {
  data: BusinessOnboardingData;
  addEmployee: () => void;
  removeEmployee: (idx: number) => void;
  updateEmployee: (idx: number, field: "name" | "specialty" | "avatarUrl", value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Your Team
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Add instructors or staff (optional — you can skip this step).
      </p>
      <div className="space-y-4">
        {data.employees.map((emp, i) => (
          <div
            key={`employee-${emp.name || i}`}
            className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50"
          >
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                placeholder="Name"
                value={emp.name}
                onChange={(e) => updateEmployee(i, "name", e.target.value)}
              />
              <Input
                placeholder="Specialty"
                value={emp.specialty}
                onChange={(e) =>
                  updateEmployee(i, "specialty", e.target.value)
                }
              />
              <Input
                placeholder="Avatar URL (optional)"
                value={emp.avatarUrl}
                onChange={(e) =>
                  updateEmployee(i, "avatarUrl", e.target.value)
                }
              />
            </div>
            <button
              onClick={() => removeEmployee(i)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0 mt-1"
            >
              <Trash size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={addEmployee}
          className="flex items-center gap-2 text-sm font-medium text-coral hover:text-coral-hover transition-colors"
        >
          <Plus size={16} weight="bold" />
          Add team member
        </button>
      </div>
    </div>
  );
}
