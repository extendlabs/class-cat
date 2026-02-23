import { Star } from "@phosphor-icons/react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Star size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold mb-1 text-gray-900">
        No activities found
      </h3>
      <p className="text-sm text-gray-500 max-w-sm">
        Try adjusting your search or filters to find what you&apos;re looking for.
      </p>
    </div>
  );
}
