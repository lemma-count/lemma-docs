"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  initGrowthAnalytics,
  refreshGrowthAnalyticsProperties,
  trackGrowthPageview,
} from "@/lib/growth-analytics";

export function GrowthAnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    let active = true;

    void initGrowthAnalytics().then((initialized) => {
      if (!active || !initialized) return;
      refreshGrowthAnalyticsProperties();
      trackGrowthPageview();
    });

    return () => {
      active = false;
    };
  }, [pathname]);

  return null;
}
