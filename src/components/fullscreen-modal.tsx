"use client";

import { useCallback, useEffect } from "react";
import { Minimize2 } from "lucide-react";

type FullscreenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export function FullscreenModal({ isOpen, onClose, title, children }: FullscreenModalProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previous;
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background" style={{ touchAction: "none" }}>
      <div className="flex shrink-0 items-center justify-between border-b border-border/50 px-4 py-3">
        {title ? <span className="text-sm font-medium text-foreground">{title}</span> : null}
        <button
          type="button"
          onClick={onClose}
          className="ml-auto flex items-center gap-1.5 rounded-md border border-border/60 bg-card/60 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <Minimize2 className="h-3 w-3" />
          Close
        </button>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
