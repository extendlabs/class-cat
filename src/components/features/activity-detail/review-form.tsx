"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { submitActivityReview } from "@/api/activity-detail";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";

export function ReviewForm({ activityId }: { activityId: string }) {
  const t = useTranslations("activity");
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [text, setText] = useState("");

  const mutation = useMutation({
    mutationFn: (data: { rating: number; text: string }) =>
      submitActivityReview(activityId, {
        rating: data.rating,
        text: data.text,
        authorName: user?.name ?? "Anonymous",
        authorInitials:
          user?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() ?? "AN",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity", activityId] });
      toast.success(t("reviewSubmitted"));
      setOpen(false);
      setRating(0);
      setText("");
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Link
          href="/profile"
          className="text-coral hover:text-coral-hover font-semibold transition-colors"
        >
          {t("loginToReview")}
        </Link>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Button
          variant="outline"
          className="rounded-full font-bold px-6 border-gray-200 hover:border-coral/30"
          onClick={() => setOpen(true)}
        >
          {t("writeReview")}
        </Button>
      </div>
    );
  }

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error(t("selectRating"));
      return;
    }
    mutation.mutate({ rating, text });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      <div className="max-w-lg space-y-4 bg-white rounded-2xl border border-gray-100 shadow-[var(--shadow-soft)] p-6">
        <h3 className="font-bold text-gray-900">{t("writeReview")}</h3>

        {/* Star picker */}
        <div>
          <p className="text-sm text-gray-500 mb-2">{t("yourRating")}</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={28}
                  weight={star <= (hoveredStar || rating) ? "fill" : "regular"}
                  className={
                    star <= (hoveredStar || rating)
                      ? "text-amber-400"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <Textarea
          placeholder={t("reviewPlaceholder")}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />

        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="bg-coral hover:bg-coral-hover text-white rounded-full font-bold px-6"
          >
            {t("submitReview")}
          </Button>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => {
              setOpen(false);
              setRating(0);
              setText("");
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
