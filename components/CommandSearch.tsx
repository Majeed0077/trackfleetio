"use client";

import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const CommandSearchDialog = dynamic(() =>
  import("@/components/CommandSearchDialog").then((mod) => mod.CommandSearchDialog),
);

export function CommandSearch({
  placeholder,
  onOpen,
}: {
  placeholder: string;
  onOpen?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);
  const [currentQuery, setCurrentQuery] = useState("");

  const syncCurrentQuery = () => {
    const nextQuery = new URLSearchParams(window.location.search).get("q") ?? "";
    setCurrentQuery(nextQuery);
  };

  useEffect(() => {
    const onWindowKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpen?.();
        syncCurrentQuery();
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
    syncCurrentQuery();
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
