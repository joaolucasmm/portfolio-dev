import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";

// The page is rendered once at build time (scripts/prerender.mjs) and then hydrated
// in the browser. Whatever the first browser render reads must therefore match what
// the build saw; these hooks start from the build's value and switch to the
// browser's right after hydration.

/** useLayoutEffect in the browser, useEffect on the server (where neither runs). */
export const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const noSubscription = () => () => {};

/**
 * Whether a media query matches. `server` is what the prerendered page assumes;
 * `fallback` is used in browsers (and jsdom) without matchMedia.
 */
export function useMedia(query: string, { server = false, fallback = false } = {}) {
    return useSyncExternalStore(
        (onChange) => {
            if (typeof window.matchMedia !== "function") return () => {};
            const list = window.matchMedia(query);
            list.addEventListener?.("change", onChange);
            return () => list.removeEventListener?.("change", onChange);
        },
        () => (typeof window.matchMedia === "function" ? window.matchMedia(query).matches : fallback),
        () => server
    );
}

const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** Apple keyboards show ⌘ where the others show Ctrl. */
export function useMac() {
    return useSyncExternalStore(noSubscription, isMac, () => false);
}

// The month the site was built, as "YYYY-MM" (vite.config.mts defines it), so the
// prerendered page and the browser count a current role's length the same way.
const BUILD_MONTH = __BUILD_MONTH__;
const thisMonth = () => new Date().toISOString().slice(0, 7);

/** The current month: the build's while hydrating, then the visitor's. */
export function useThisMonth() {
    return useSyncExternalStore(noSubscription, thisMonth, () => BUILD_MONTH);
}
