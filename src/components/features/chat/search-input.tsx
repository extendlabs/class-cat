import { MagnifyingGlass } from "@phosphor-icons/react";

export function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center bg-white border border-gray-200 rounded-full px-3.5 py-2 focus-within:border-coral/30 focus-within:ring-2 focus-within:ring-coral/10 transition-all">
        <MagnifyingGlass
          size={15}
          className="text-gray-400 flex-shrink-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 text-sm bg-transparent outline-none ml-2 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
