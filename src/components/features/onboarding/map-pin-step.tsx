import { SidebarMap } from "../sidebar-map";
import type { BusinessOnboardingData } from "@/types/business-portal";

export function MapPinStep({
  data,
  onCoordinateChange,
}: {
  data: BusinessOnboardingData;
  onCoordinateChange: (coords: { lat: number; lon: number }) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Pin Your Location
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Click on the map or drag the marker to set your exact location.
      </p>
      <SidebarMap
        lat={data.coordinates.lat}
        lng={data.coordinates.lon}
        address={data.address || "Your location"}
        interactive
        onCoordinateChange={({ lat, lng }) => onCoordinateChange({ lat, lon: lng })}
      />
      <div className="flex gap-4 mt-4 text-xs text-gray-400">
        <span>Lat: {data.coordinates.lat.toFixed(4)}</span>
        <span>Lon: {data.coordinates.lon.toFixed(4)}</span>
      </div>
    </div>
  );
}
