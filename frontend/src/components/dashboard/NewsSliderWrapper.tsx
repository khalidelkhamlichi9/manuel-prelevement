"use client";

import dynamic from "next/dynamic";
import React from "react";

const NewsSlider = dynamic(() => import("./NewsSlider"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl border border-gray-200 dark:border-gray-800" />
  ),
});

export default function NewsSliderWrapper() {
  return <NewsSlider />;
}
