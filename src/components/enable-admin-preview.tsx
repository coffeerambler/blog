"use client";

import { useEffect } from "react";
import { enableAdminPreview } from "@/lib/admin-preview";

/** Existing sessions missed the preview cookie that login now sets. */
export function EnableAdminPreview() {
  useEffect(() => {
    void enableAdminPreview();
  }, []);
  return null;
}
