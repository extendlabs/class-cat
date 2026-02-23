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
import type { ActivitiesPageAction } from "@/hooks/use-activities-list-reducer";
import type { Category } from "@/types/activity";

const CATEGORIES: Category[] = [
  "wellness", "sports", "arts", "music", "education",
  "cooking", "dance", "fitness", "outdoor", "tech",
];

export function ActivityFilters({
  search,
  categoryFilter,
  statusFilter,
  dispatch,
}: {
  search: string;
  categoryFilter: string;
  statusFilter: string;
  dispatch: React.Dispatch<ActivitiesPageAction>;
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
            placeholder="Search activities..."
            value={search}
            onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
            className="pl-9 rounded-full bg-white"
          />
        </div>
        <Select value={categoryFilter} onValueChange={(v) => dispatch({ type: "SET_CATEGORY_FILTER", payload: v })}>
          <SelectTrigger className="w-40 rounded-full bg-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                <span className="capitalize">{cat}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => dispatch({ type: "SET_STATUS_FILTER", payload: v })}>
          <SelectTrigger className="w-36 rounded-full bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AnimateIn>
  );
}
