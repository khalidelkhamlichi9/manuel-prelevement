"use client";

import Footer from "@/components/footer/Footer";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/signin");
    }
  }, [isLoading, isAuthenticated, router]);

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[250px]"
    : "lg:ml-[90px]";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Skeleton */}
        <div className="h-16 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 animate-pulse" />
        <div className="flex">
          {/* Sidebar Skeleton */}
          <div className="hidden lg:block w-[250px] h-[calc(100vh-64px)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 animate-pulse" />
          {/* Content Skeleton */}
          <div className="flex-1 p-6 space-y-6">
            <div className="h-[350px] w-full bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
              <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
              <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null; // Redirect handled by useEffect

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}

        <Footer/>
        </div>
      </div>
    </div>
  );
}
