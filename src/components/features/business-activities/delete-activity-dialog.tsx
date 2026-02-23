import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { BusinessActivity } from "@/types/business-portal";

export function DeleteActivityDialog({
  deleteTarget,
  onConfirm,
  onCancel,
}: {
  deleteTarget: BusinessActivity | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AlertDialog
      open={!!deleteTarget}
      onOpenChange={(v) => !v && onCancel()}
    >
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Activity?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{deleteTarget?.title}&quot;?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            className="rounded-full"
            onClick={onConfirm}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
