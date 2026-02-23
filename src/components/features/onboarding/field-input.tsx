import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FieldInput({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={error ? "border-red-300" : ""}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
