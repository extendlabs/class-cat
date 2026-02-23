import { MagnifyingGlass } from "@phosphor-icons/react";
import { TableRow, TableCell } from "@/components/ui/table";

export function EmptyActivityState() {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={7} className="text-center py-16">
        <div className="flex flex-col items-center gap-2">
          <MagnifyingGlass size={32} className="text-gray-300" />
          <p className="text-sm text-gray-500">No activities found.</p>
          <p className="text-xs text-gray-400">Try adjusting your filters or create a new activity.</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
