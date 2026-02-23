"use client";

import {
  Star,
  ChatCircle,
  Trash,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AnimateIn } from "@/components/ui/animate-in";
import type { UserReview } from "@/types/user";

export function ReviewsList({
  reviews,
  onDeleteReview,
}: {
  reviews: UserReview[];
  onDeleteReview: (id: string) => void;
}) {
  return (
    <AnimateIn>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, i) => (
            <AnimateIn key={review.id} delay={i * 60}>
              <div className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] border border-gray-100/60 hover:shadow-[var(--shadow-hover)] hover:border-coral/10 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {review.activityTitle}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {review.providerName}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        weight="fill"
                        className={
                          j < review.rating
                            ? "text-amber-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mt-3">
                  {review.text}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-[11px] text-gray-400">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="xs"
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 gap-1 rounded-full"
                      >
                        <Trash size={12} />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete Review?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete your review
                          for &quot;{review.activityTitle}&quot;?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-full">
                          Keep Review
                        </AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          className="rounded-full"
                          onClick={() => onDeleteReview(review.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-[var(--shadow-soft)]">
          <ChatCircle
            size={32}
            className="mx-auto text-gray-300 mb-2"
          />
          <p className="text-sm text-gray-500">No reviews yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Your reviews will appear here after attending activities.
          </p>
        </div>
      )}
    </AnimateIn>
  );
}
