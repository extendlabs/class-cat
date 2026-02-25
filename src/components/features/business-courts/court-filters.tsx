import { MagnifyingGlass } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CourtsPageAction } from "@/hooks/use-courts-list-reducer";
import type { CourtSport } from "@/types/court";

const SPORTS: CourtSport[] = [
  "tennis", "padel", "badminton", "squash", "basketball", "volleyball", "futsal",
];

export function CourtFilters({
  search,
  sportFilter,
  statusFilter,
  dispatch,
}: {
  search: string;
  sportFilter: string;
  statusFilter: string;
  dispatch: React.Dispatch<CourtsPageAction>;
}) {
  return (
    <AnimateIn>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search courts..."
            value={search}
            onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
            className="pl-9 rounded-full bg-white"
          />
        </div>
        <Select value={sportFilter} onValueChange={(v) => dispatch({ type: "SET_SPORT_FILTER", payload: v })}>
          <SelectTrigger className="w-40 rounded-full bg-white">
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            {SPORTS.map((sport) => (
              <SelectItem key={sport} value={sport}>
                <span className="capitalize">{sport}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => dispatch({ type: "SET_STATUS_FILTER", payload: v })}>
          <SelectTrigger className="w-40 rounded-full bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AnimateIn>
  );
}
