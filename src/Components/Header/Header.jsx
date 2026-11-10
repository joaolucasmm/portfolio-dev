import React, { useCallback, useEffect, useRef, useState } from "react";
import { sections } from "../../Functions/useShortcuts";
import useDialogFocus from "../../Functions/useDialogFocus";

// The arrow says "further down this page" (ui-library: nav-ancora-seta-pulando).
function ArrowDown() {
    return (
        <svg className="header__arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M10 3v13M4.5 10.5 10 16l5.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    );
}

// The theme toggle is a switch again, as on the first portfolio. Pressing it grows
// the knob into a glass lens over the track; letting go slides it across with a
// spring (ui-library: toggle-lente-vidro).
function ThemeSwitch({ label, on, toggle }) {
    const [pressed, setPressed] = useState(false);
    const press = () => setPressed(true);
    const release = () => setPressed(false);

    return (
        <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-keyshortcuts="Shift+T"
            className={"theme-switch" + (pressed ? " is-pressed" : "")}
            onClick={toggle}
            onPointerDown={press}
            onPointerUp={release}
            onPointerLeave={release}
            onPointerCancel={release}
            onKeyDown={(e) => (e.key === " " || e.key === "Enter") && press()}
            onKeyUp={release}
            onBlur={release}
        >
            <span className="theme-switch__track" aria-hidden="true">
                <span className="theme-switch__knob">
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                        {on ? (
                            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor" />
                        ) : (
                            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                            </g>
                        )}
                    </svg>
                </span>
            </span>
            <span className="theme-switch__label">{label}</span>
        </button>
    );
}

function Header({ t, language, setLanguage, darkMode, toggleTheme, openSearch }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const close = useCallback(() => setMenuOpen(false), []);
    const header = useRef(null);
    // The full-screen menu (narrow screens) behaves as a dialog while open.
    useDialogFocus(menuOpen, header, close);

    // The section under the middle band of the viewport is marked in the bar.
    const [currentSection, setCurrentSection] = useState(null);
    useEffect(() => {
        if (!("IntersectionObserver" in window)) return undefined;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setCurrentSection(entry.target.id);
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        ["top", "about", ...sections].forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <header ref={header} className={"header" + (menuOpen ? " header--open" : "")}>
            <a className="header__mark" href="#top" aria-label="João Lucas, top of page" onClick={close}>
                JL
            </a>
            <button
                type="button"
                className="header__menu"
                aria-expanded={menuOpen}
                aria-controls="site-nav"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? t.close : t.menu}
            </button>
            <nav id="site-nav" className="header__nav">
                <ul className="header__links">
                    {sections.map((id, i) => (
                        <li key={id}>
                            <a
                                href={"#" + id}
                                onClick={close}
                                aria-current={currentSection === id ? "true" : undefined}
                                aria-keyshortcuts={"Alt+" + (i + 1)}
                                style={{ "--k": i }}
                            >
                                {t[id]}
                                <ArrowDown />
                                <span className="header__key" aria-hidden="true">
                                    {i + 1}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="header__switches">
                    <button
                        type="button"
                        className="header__switch"
                        aria-keyshortcuts="Control+K"
                        onClick={() => {
                            close();
                            openSearch();
                        }}
                    >
                        {t.search}
                    </button>
                    <button
                        type="button"
                        className="header__switch"
                        lang={language === "english" ? "pt-BR" : "en"}
                        aria-label={t.languageShort + ", " + t.language}
                        onClick={() => setLanguage(language === "english" ? "portuguese" : "english")}
                    >
                        {t.languageShort}
                    </button>
                    <ThemeSwitch label={t.theme} on={darkMode} toggle={toggleTheme} />
                </div>
            </nav>
        </header>
    );
}

export default Header;
