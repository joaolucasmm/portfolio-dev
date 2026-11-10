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

// The theme switch is the sun itself: in dark mode its rays turn away and a
// shadow slides across until it is a moon. The label is for screen readers only.
function ThemeSwitch({ label, on, toggle }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label={label}
            aria-keyshortcuts="Shift+T"
            className="eclipse"
            onClick={toggle}
        >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <mask id="eclipse-bite">
                    <rect x="-4" y="-4" width="32" height="32" fill="#fff" />
                    <circle className="eclipse__bite" cx="30" cy="-6" r="7" fill="#000" />
                </mask>
                <circle className="eclipse__core" cx="12" cy="12" r="5" fill="currentColor" mask="url(#eclipse-bite)" />
                <path
                    className="eclipse__rays"
                    d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </button>
    );
}

// The language button shows the language being read; on a click its letters roll
// like a counter, E→P and N→T, the second a beat after the first.
function LanguageRoll({ label, portuguese, toggle }) {
    return (
        <button
            type="button"
            className={"lang-roll" + (portuguese ? " is-pt" : "")}
            aria-label={label}
            onClick={toggle}
        >
            <span className="lang-roll__wheel" aria-hidden="true">
                <span className="lang-roll__letter" style={{ "--k": 0 }}>
                    <span>E</span>
                    <span>P</span>
                </span>
                <span className="lang-roll__letter" style={{ "--k": 1 }}>
                    <span>N</span>
                    <span>T</span>
                </span>
            </span>
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
                    <LanguageRoll
                        label={t.languageNow}
                        portuguese={language === "portuguese"}
                        toggle={() => setLanguage(language === "english" ? "portuguese" : "english")}
                    />
                    <ThemeSwitch label={t.theme} on={darkMode} toggle={toggleTheme} />
                </div>
            </nav>
        </header>
    );
}

export default Header;
