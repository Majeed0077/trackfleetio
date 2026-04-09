"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "trackfleetio_compare_recent_v1";
const MAX_ENTRIES = 12;

export type RecentComparison = {
  ids: string[];
  ts: number;
};

let inMemory: RecentComparison[] = [];
let hasLoaded = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function normalizeIds(ids: string[]) {
  const normalized = ids
    .filter((id): id is string => typeof id === "string")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, 4);

  return Array.from(new Set(normalized));
}

function safeParse(value: unknown): RecentComparison[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const out: RecentComparison[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") {
      continue;
    }

    const candidate = item as { ids?: unknown; ts?: unknown };
    const ids = normalizeIds(Array.isArray(candidate.ids) ? (candidate.ids as string[]) : []);
    const ts = typeof candidate.ts === "number" ? candidate.ts : Date.now();

    if (ids.length < 2) {
      continue;
    }

    out.push({ ids, ts });
  }

  return out.slice(0, MAX_ENTRIES);
}

function readFromStorage(): RecentComparison[] {
  if (typeof window === "undefined") {
    return inMemory;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return safeParse(JSON.parse(raw));
  } catch {
    return [];
  }
}

function persist(next: RecentComparison[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(0, MAX_ENTRIES)));
  } catch {
    // ignore
  }
}

function ensureLoaded() {
  if (hasLoaded) {
    return;
  }

  hasLoaded = true;
  inMemory = readFromStorage();

  if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      const next = readFromStorage();
      const beforeKey = inMemory.map((item) => item.ids.join("|")).join(";");
      const nextKey = next.map((item) => item.ids.join("|")).join(";");
      if (beforeKey !== nextKey) {
        inMemory = next;
        emit();
      }
    });
  }
}

export function recordRecentComparison(ids: string[]) {
  ensureLoaded();
  const normalized = normalizeIds(ids);

  if (normalized.length < 2) {
    return;
  }

  // Deduplicate by unordered set (A|B == B|A).
  const key = [...normalized].sort().join("|");

  const next: RecentComparison[] = [
    { ids: normalized, ts: Date.now() },
    ...inMemory.filter((item) => [...item.ids].sort().join("|") !== key),
  ].slice(0, MAX_ENTRIES);

  inMemory = next;
  persist(next);
  emit();
}

export function clearRecentComparisons() {
  ensureLoaded();
  inMemory = [];
  persist([]);
  emit();
}

export function useRecentComparisons() {
  ensureLoaded();
  return useSyncExternalStore(
    (listener) => {
      ensureLoaded();
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => {
      ensureLoaded();
      return inMemory;
    },
    () => [],
  );
}

