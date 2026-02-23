"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("searchparams", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("searchparams", callback);
  };
}

// Include pathname so category (path-based) changes also trigger re-render
function getSnapshot() {
  return window.location.pathname + window.location.search;
}

function getServerSnapshot() {
  return "/";
}

/**
 * URL search params hook that reacts to pushState/replaceState changes.
 * Listens for "popstate" (back/forward) and custom "searchparams" events.
 * Re-renders on both pathname and search param changes.
 */
export function useUrlSearchParams(): URLSearchParams {
  const href = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // Extract only the search part for the URLSearchParams
  const searchIdx = href.indexOf("?");
  return new URLSearchParams(searchIdx >= 0 ? href.slice(searchIdx) : "");
}
