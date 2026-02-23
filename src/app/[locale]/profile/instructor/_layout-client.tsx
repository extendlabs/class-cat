"use client";

import { useState } from "react";
import { InstructorNavbar } from "@/components/layout/instructor-navbar";
import {
  InstructorSidebar,
  InstructorSidebarMobile,
} from "@/components/layout/instructor-sidebar";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <InstructorNavbar onToggleSidebar={handleToggle} />
      <div className="flex h-[calc(100vh-64px)]">
        <InstructorSidebar collapsed={sidebarCollapsed} />
        <InstructorSidebarMobile
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
