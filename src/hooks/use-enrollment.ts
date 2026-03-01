"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCohortsByActivity,
  getUserEnrollmentForActivity,
  applyForCohort,
} from "@/api/enrollments";

export function useEnrollment(activityId: string) {
  const queryClient = useQueryClient();

  const cohortsQuery = useQuery({
    queryKey: ["cohorts", activityId],
    queryFn: () => fetchCohortsByActivity(activityId),
  });

  const enrollmentQuery = useQuery({
    queryKey: ["user-enrollment", activityId],
    queryFn: () => getUserEnrollmentForActivity(activityId),
  });

  const applyMutation = useMutation({
    mutationFn: (cohortId: string) => applyForCohort(activityId, cohortId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-enrollment", activityId] });
      queryClient.invalidateQueries({ queryKey: ["cohorts", activityId] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  return {
    cohorts: cohortsQuery.data ?? [],
    cohortsLoading: cohortsQuery.isLoading,
    enrollment: enrollmentQuery.data ?? null,
    enrollmentLoading: enrollmentQuery.isLoading,
    apply: applyMutation.mutate,
    isApplying: applyMutation.isPending,
    applyResult: applyMutation.data,
  };
}
