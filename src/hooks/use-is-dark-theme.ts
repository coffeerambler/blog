"use client";

import { useEffect, useState } from "react";

/** True unless `<html>` has the `.light` class (dark is the default). */
export function useIsDarkTheme() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(!root.classList.contains("light"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark;
}
