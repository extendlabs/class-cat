"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import React from "react";

const STORAGE_KEY = "classcat-liked";

interface LikedItem {
  id: string;
  title: string;
  image: string;
}

interface LikedContextValue {
  likedItems: LikedItem[];
  toggleLike: (item: LikedItem) => void;
  isLiked: (id: string) => boolean;
  removeLike: (id: string) => void;
  clearAll: () => void;
}

const LikedContext = createContext<LikedContextValue | null>(null);

function readStorage(): LikedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function LikedActivitiesProvider({ children }: { children: ReactNode }) {
  const [likedItems, setLikedItems] = useState<LikedItem[]>([]);

  useEffect(() => {
    setLikedItems(readStorage());
  }, []);

  const persist = useCallback((items: LikedItem[]) => {
    setLikedItems(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, []);

  const isLiked = useCallback(
    (id: string) => likedItems.some((item) => item.id === id),
    [likedItems]
  );

  const toggleLike = useCallback(
    (item: LikedItem) => {
      const exists = likedItems.some((i) => i.id === item.id);
      const next = exists
        ? likedItems.filter((i) => i.id !== item.id)
        : [...likedItems, item];
      persist(next);
    },
    [likedItems, persist]
  );

  const removeLike = useCallback(
    (id: string) => {
      persist(likedItems.filter((i) => i.id !== id));
    },
    [likedItems, persist]
  );

  const clearAll = useCallback(() => {
    persist([]);
  }, [persist]);

  const value = { likedItems, toggleLike, isLiked, removeLike, clearAll };

  return React.createElement(LikedContext.Provider, { value }, children);
}

export function useLikedActivities(): LikedContextValue {
  const ctx = useContext(LikedContext);
  if (!ctx) {
    throw new Error("useLikedActivities must be used within LikedActivitiesProvider");
  }
  return ctx;
}
