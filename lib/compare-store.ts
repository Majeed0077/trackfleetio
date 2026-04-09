"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "trackfleetio_compare_v1";
const MAX_COMPARE_ITEMS = 4;

type CompareState = {
  ids: string[];
};

let inMemoryState: CompareState = { ids: [] };
let hasLoaded = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function parseCandidate(value: unknown): CompareState | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  if (!("ids" in value)) {
    return null;
  }

  const ids = (value as { ids?: unknown }).ids;

  if (!Array.isArray(ids)) {
    return null;
  }

  const normalized = ids
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim())
    .slice(0, MAX_COMPARE_ITEMS);

  return { ids: Array.from(new Set(normalized)) };
}

function readFromStorage(): CompareState {
  if (typeof window === "undefined") {
    return inMemoryState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { ids: [] };
    }

    const parsed = parseCandidate(JSON.parse(raw));
    return parsed ?? { ids: [] };
  } catch {
    return { ids: [] };
  }
}

function ensureLoaded() {
  if (hasLoaded) {
    return;
  }

  hasLoaded = true;
  inMemoryState = readFromStorage();

  if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      const next = readFromStorage();
      if (next.ids.join("|") !== inMemoryState.ids.join("|")) {
        inMemoryState = next;
        emit();
      }
    });
  }
}

function persist(next: CompareState) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore (private mode / quota / etc)
  }
}

function setState(updater: (prev: CompareState) => CompareState) {
  ensureLoaded();
  const next = updater(inMemoryState);
  const normalized = parseCandidate(next) ?? { ids: [] };
  inMemoryState = normalized;
  persist(normalized);
  emit();
}

export function useCompareIds() {
  ensureLoaded();
  return useSyncExternalStore(
    (listener) => {
      ensureLoaded();
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => {
      ensureLoaded();
      return inMemoryState.ids;
    },
    () => [],
  );
}

export function useCompareActions() {
  return {
    set: (ids: string[]) => {
      setState(() => ({ ids }));
    },
    setOnly: (id: string) => {
      setState(() => ({ ids: [id] }));
    },
    add: (id: string) => {
      setState((prev) => {
        if (!id.trim()) {
          return prev;
        }

        const existing = prev.ids.filter(Boolean);
        const has = existing.includes(id);

        if (has) {
          return prev;
        }

        const next = [...existing, id];
        if (next.length > MAX_COMPARE_ITEMS) {
          next.splice(0, next.length - MAX_COMPARE_ITEMS);
        }

        return { ids: next };
      });
    },
    remove: (id: string) => {
      setState((prev) => ({ ids: prev.ids.filter((value) => value !== id) }));
    },
    toggle: (id: string) => {
      setState((prev) => {
        if (prev.ids.includes(id)) {
          return { ids: prev.ids.filter((value) => value !== id) };
        }

        const next = [...prev.ids, id];
        if (next.length > MAX_COMPARE_ITEMS) {
          next.splice(0, next.length - MAX_COMPARE_ITEMS);
        }

        return { ids: next };
      });
    },
    clear: () => setState(() => ({ ids: [] })),
  };
}

export const compareStoreConfig = {
  maxItems: MAX_COMPARE_ITEMS,
};
