"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { LikedActivitiesProvider } from "@/hooks/use-liked-activities";
import { AuthProvider } from "@/hooks/use-auth";
import { ChatSidebarProvider } from "@/components/features/chat-sidebar-context";
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LikedActivitiesProvider>
          <ChatSidebarProvider>
            {children}
            <Toaster position="bottom-right" />
          </ChatSidebarProvider>
        </LikedActivitiesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
