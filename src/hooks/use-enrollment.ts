"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyActivityRequest, sendActivityRequest } from "@/api/enrollments";
import { useAuth } from "@/hooks/use-auth";
import type { ActivityDetail } from "@/types/activity";

export function useEnrollment(activity: ActivityDetail) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const providerSlug = activity.provider.slug ?? "";

  // User is the contractor of this activity — cannot apply
  const isOwnActivity =
    !!user?.contractorId && !!activity.contractorId && user.contractorId === activity.contractorId;

  const requestQuery = useQuery({
    queryKey: ["activity-request", providerSlug, activity.id],
    queryFn: () => getMyActivityRequest(providerSlug, activity.id),
    enabled: !isOwnActivity && !!providerSlug,
  });

  const requestMutation = useMutation({
    mutationFn: (message: string) => sendActivityRequest(providerSlug, activity.id, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity-request", providerSlug, activity.id] });
    },
  });

  const myRequest = requestQuery.data ?? null;
  const alreadySent = myRequest !== null || !!requestMutation.data;

  return {
    isOwnActivity,
    alreadySent,
    myRequest,
    requestLoading: requestQuery.isLoading,
    sendRequest: (message: string) => requestMutation.mutate(message),
    isSending: requestMutation.isPending,
    sendError: requestMutation.error,
  };
}
