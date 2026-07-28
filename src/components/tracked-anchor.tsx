"use client";

import type { ComponentProps } from "react";
import { trackGrowthCta } from "@/lib/growth-analytics";

type Props = ComponentProps<"a"> & {
  event: string;
  eventProps?: Record<string, string | number | boolean>;
};

export function TrackedAnchor({ event, eventProps, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        void trackGrowthCta(event, {
          ...eventProps,
          cta_href: typeof props.href === "string" ? props.href : undefined,
        });
        onClick?.(e);
      }}
    />
  );
}
