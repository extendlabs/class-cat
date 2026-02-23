import Image from "next/image";
import { DotsThree, PencilSimple, Trash, Star } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ACTIVITY_STATUS_STYLES as STATUS_STYLES } from "@/lib/status-styles";
import type { BusinessActivity } from "@/types/business-portal";

export function ActivityListItem({
  activity,
  onEdit,
  onDelete,
}: {
  activity: BusinessActivity;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <TableRow
      className="hover:bg-coral/[0.03] transition-colors group border-b border-gray-100 last:border-0"
    >
      <TableCell className="pl-6 py-4">
        <div className="flex items-center gap-3.5">
          <Image
            src={activity.image}
            alt={activity.title}
            width={44}
            height={44}
            className="rounded-xl object-cover ring-1 ring-gray-100 group-hover:ring-coral/20 transition-all"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-coral transition-colors">
              {activity.title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {activity.priceAmount ?? 0} {activity.currency ?? "zł"}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <span className="inline-flex items-center text-xs font-medium text-gray-600 bg-gray-100/80 px-2.5 py-1 rounded-full capitalize">
          {activity.category}
        </span>
      </TableCell>
      <TableCell className="py-4">
        <Badge
          className={`text-[11px] font-medium capitalize border px-2.5 py-0.5 rounded-full ${STATUS_STYLES[activity.status]}`}
        >
          {activity.status}
        </Badge>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-coral/70 rounded-full transition-all"
              style={{
                width: `${Math.min(100, ((activity.enrolledCount ?? 0) / (activity.maxCapacity || 1)) * 100)}%`,
              }}
            />
          </div>
          <span className="text-sm text-gray-600 tabular-nums">
            {activity.enrolledCount}/{activity.maxCapacity}
          </span>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex items-center gap-1">
          <Star size={13} weight="fill" className="text-amber-400" />
          <span className="text-sm font-medium text-gray-700 tabular-nums">
            {activity.rating > 0 ? activity.rating.toFixed(1) : "\u2014"}
          </span>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <span className="text-sm text-gray-500">
          {activity.nextSessionDate
            ? new Date(activity.nextSessionDate).toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric" }
              )
            : "\u2014"}
        </span>
      </TableCell>
      <TableCell className="py-4 pr-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-300 opacity-0 group-hover:opacity-100 hover:text-gray-700 hover:bg-gray-100 transition-all">
              <DotsThree size={18} weight="bold" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <PencilSimple size={14} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              className="text-red-600 focus:text-red-600"
            >
              <Trash size={14} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
