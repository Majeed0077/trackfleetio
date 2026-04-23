"use client";

import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const CommandSearchDialog = dynamic(() =>
  import("@/components/CommandSearchDialog").then((mod) => mod.CommandSearchDialog),
);

export function CommandSearch({
  currentQuery = "",
  placeholder,
  onOpen,
}: {
  currentQuery?: string;
  placeholder: string;
  onOpen?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);

  useEffect(() => {
    const onWindowKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpen?.();
        setDialogKey((currentValue) => currentValue + 1);
        setIsOpen(true);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onWindowKeyDown);

    return () => {
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  }, [onOpen]);

  const openPalette = () => {
    onOpen?.();
    setDialogKey((currentValue) => currentValue + 1);
    setIsOpen(true);
  };

  return (
    <>
      <button
        className="nav-utility nav-command-trigger"
        type="button"
        aria-label="Open command search"
        onClick={openPalette}
      >
        <Search size={18} strokeWidth={1.9} />
        <span className="nav-command-shortcut" aria-hidden="true">
          <span>Ctrl</span>
          <span>K</span>
        </span>
      </button>
      <CommandSearchDialog
        key={`${dialogKey}:${currentQuery}`}
        initialQuery={currentQuery}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placeholder={placeholder}
      />
    </>
  );
}
