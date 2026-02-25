import Image from "next/image";
import Link from "next/link";
import { DotsThree, PencilSimple, Trash, CalendarBlank } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COURT_STATUS_STYLES } from "@/lib/status-styles";
import type { Court } from "@/types/court";

export function CourtListItem({
  court,
  onEdit,
  onDelete,
  scheduleHref,
}: {
  court: Court;
  onEdit: () => void;
  onDelete: () => void;
  scheduleHref: string;
}) {
  const status = court.status ?? "active";

  return (
    <TableRow className="hover:bg-coral/[0.03] transition-colors group border-b border-gray-100 last:border-0">
      <TableCell className="pl-6 py-4">
        <div className="flex items-center gap-3.5">
          <Image
            src={court.image}
            alt={court.name}
            width={44}
            height={44}
            className="rounded-xl object-cover ring-1 ring-gray-100 group-hover:ring-coral/20 transition-all"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-coral transition-colors">
              {court.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {court.address}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <span className="inline-flex items-center text-xs font-medium text-gray-600 bg-gray-100/80 px-2.5 py-1 rounded-full capitalize">
          {court.sport}
        </span>
      </TableCell>
      <TableCell className="py-4">
        <Badge
          className={`text-[11px] font-medium capitalize border px-2.5 py-0.5 rounded-full ${COURT_STATUS_STYLES[status]}`}
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell className="py-4">
        <span className="text-xs text-gray-500">
          {court.indoor ? "Indoor" : "Outdoor"}
        </span>
      </TableCell>
      <TableCell className="py-4">
        <span className="text-sm font-medium text-gray-700 tabular-nums">
          {court.courtCount ?? 1}
        </span>
      </TableCell>
      <TableCell className="py-4">
        <span className="text-sm font-medium text-gray-700 tabular-nums">
          {court.pricePerHour} zł/hr
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
            <DropdownMenuItem asChild>
              <Link href={scheduleHref}>
                <CalendarBlank size={14} />
                Schedule
              </Link>
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
