import { useEffect } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

// For overlays that are not a native <dialog>: Esc closes, Tab stays inside,
// the page behind does not scroll, and focus returns to what opened it.
function useDialogFocus(open, container, onClose) {
    useEffect(() => {
        if (!open) return undefined;
        const opener = document.activeElement;
        const box = container.current;
        const root = document.documentElement;
        root.classList.add("no-scroll");

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
                return;
            }
            if (e.key !== "Tab" || !box) return;
            const items = [...box.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
            if (!items.length) return;
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            root.classList.remove("no-scroll");
            // A search result moves focus on purpose; only restore when nothing else took it.
            const focus = document.activeElement;
            const leftInside = !focus || focus === document.body || (box && box.contains(focus));
            if (opener && typeof opener.focus === "function" && leftInside) {
                opener.focus({ preventScroll: true });
            }
        };
    }, [open, container, onClose]);
}

export default useDialogFocus;
