import { useEffect, useState } from "react";

const sections = ["work", "experience", "education", "contact"];

// Keyboard layer, after the ui-library patterns tema-shift-t, debug-css-shift-d,
// alt-foco-navegacao (with the Alt+n jumps of nav-pilulas-atalhos) and busca-ctrl-k.
function useShortcuts({ toggleTheme, toggleSearch, searchOpen }) {
    const [altHeld, setAltHeld] = useState(false);
    const [debug, setDebug] = useState(false);
    const [lastUsed, setLastUsed] = useState(null);

    useEffect(() => {
        let clear;
        const flash = (id) => {
            setLastUsed(id);
            clearTimeout(clear);
            clear = setTimeout(() => setLastUsed(null), 900);
        };
        const typing = (e) => /input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable;

        const onKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                toggleSearch();
                flash("search");
                return;
            }
            if (searchOpen) return;
            if (e.key === "Alt") {
                // Keeps the browser from moving focus to its menu bar.
                e.preventDefault();
                setAltHeld(true);
                return;
            }
            if (e.altKey && /^Digit[1-4]$/.test(e.code)) {
                e.preventDefault();
                const target = document.getElementById(sections[Number(e.code.slice(-1)) - 1]);
                if (target) {
                    target.scrollIntoView();
                    target.focus({ preventScroll: true });
                }
                flash("jump");
                return;
            }
            if (!e.shiftKey || e.ctrlKey || e.metaKey || e.altKey || typing(e)) return;
            if (e.code === "KeyT") {
                toggleTheme();
                flash("theme");
            }
            if (e.code === "KeyD") {
                setDebug((d) => !d);
                flash("debug");
            }
        };
        const onKeyUp = (e) => e.key === "Alt" && setAltHeld(false);
        // Alt+Tab leaves the window with Alt still down.
        const onBlur = () => setAltHeld(false);

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("blur", onBlur);
        return () => {
            clearTimeout(clear);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            window.removeEventListener("blur", onBlur);
        };
    }, [toggleTheme, toggleSearch, searchOpen]);

    useEffect(() => {
        document.documentElement.classList.toggle("alt-held", altHeld);
    }, [altHeld]);

    useEffect(() => {
        document.documentElement.classList.toggle("debug-grid", debug);
    }, [debug]);

    return { altHeld, debug, lastUsed };
}

export { sections };
export default useShortcuts;
