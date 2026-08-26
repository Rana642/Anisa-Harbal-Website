"use client";

import { useEffect, useRef } from "react";
import { trackViewContent, type TrackedItem } from "@/lib/tracking";

/** Fires ViewContent once per mount. Renders nothing. */
export function TrackViewContent({ item }: { item: TrackedItem }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackViewContent(item);
  }, [item]);
  return null;
}
