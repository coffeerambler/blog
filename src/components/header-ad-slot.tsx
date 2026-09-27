"use client";

import { usePathname } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";

export function HeaderAdSlot() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <AdSlot slot="header" />;
}
