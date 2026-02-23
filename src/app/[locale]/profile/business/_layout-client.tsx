"use client";

import { useState } from "react";
import { BusinessNavbar } from "@/components/layout/business-navbar";
import {
  BusinessSidebar,
  BusinessSidebarMobile,
} from "@/components/layout/business-sidebar";

export default function BusinessDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleToggle = () => {
    // On mobile: toggle mobile sheet
    if (window.innerWidth < 768) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <BusinessNavbar onToggleSidebar={handleToggle} />
      <div className="flex h-[calc(100vh-64px)]">
        <BusinessSidebar collapsed={sidebarCollapsed} />
        <BusinessSidebarMobile
          open={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
