import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { sections } from "../../Functions/useShortcuts";

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

// The search button is a lens; on hover or focus it widens with the spring to show
// the word and the shortcut (ui-library: nav-pilulas-atalhos, the visible shortcut).
const MAC = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

function SearchButton({ label, open }) {
    return (
        <button type="button" className="search-grow" aria-label={label} aria-keyshortcuts="Control+K" onClick={open}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="search-grow__more" aria-hidden="true">
                {label}
                <kbd className="search-grow__key">{MAC ? "⌘K" : "Ctrl K"}</kbd>
            </span>
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

// Icons for the phone dock, one per section, drawn on a 24px grid.
const DOCK_ICONS = {
    work: (
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
            <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
        </g>
    ),
    experience: (
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <rect x="3" y="7" width="18" height="13" rx="2.5" />
            <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" />
        </g>
    ),
    services: (
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
            <circle cx="15" cy="7" r="2" />
            <circle cx="9" cy="17" r="2" />
        </g>
    ),
    education: (
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5z" />
            <path d="M6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11M21.5 9v5" strokeLinecap="round" />
        </g>
    ),
    contact: (
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
            <path d="m4 7 8 6 8-6" />
        </g>
    ),
};

// Moves a marker under the link of the current section, measured from the link
// itself. The first placement and layout changes skip the transition.
function placeMarker(list, marker, id, animate) {
    if (!list || !marker) return;
    const link = list.querySelector('[data-id="' + id + '"]');
    if (!link) {
        marker.style.opacity = "0";
        return;
    }
    if (!animate) marker.style.transition = "none";
    marker.style.opacity = "1";
    marker.style.setProperty("--x", link.offsetLeft + "px");
    marker.style.setProperty("--w", link.offsetWidth + "px");
    if (!animate) {
        marker.getBoundingClientRect();
        marker.style.transition = "";
    }
}

const reducedMotion = () =>
    typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Desktop: a bar that is open over the hero and, once the page scrolls, shrinks into
// a glass pill in the middle, with a highlight that slides to the current section.
// Phone and tablet: the sections move to a liquid glass dock at the bottom, as on
// iOS 26, and the top keeps only the initials and the three buttons.
function Header({ t, language, setLanguage, darkMode, toggleTheme, openSearch }) {
    const [small, setSmall] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const track = useRef(null);
    const highlight = useRef(null);
    const dock = useRef(null);
    const lens = useRef(null);
    const placed = useRef(false);
    const current = useRef(null);

    // Shrinks after the first screen starts to move.
    useEffect(() => {
        let frame = 0;
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => setSmall(window.scrollY > 48));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    // The section under the middle band of the viewport is the current one.
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

    // Slide the highlight and the dock's lens; the lens swells a little as it moves.
    useLayoutEffect(() => {
        current.current = currentSection;
        const animate = placed.current;
        placeMarker(track.current, highlight.current, currentSection, animate);
        placeMarker(dock.current, lens.current, currentSection, animate);
        if (animate && lens.current?.animate && !reducedMotion()) {
            lens.current.animate([{ scale: 1 }, { scale: 1.12, offset: 0.35 }, { scale: 1 }], {
                duration: 560,
                easing: "ease-out",
            });
        }
        placed.current = true;
    }, [currentSection]);

    // Labels change width with the language and the fonts; place again without moving.
    useEffect(() => {
        const replace = () => {
            placeMarker(track.current, highlight.current, current.current, false);
            placeMarker(dock.current, lens.current, current.current, false);
        };
        replace();
        document.fonts?.ready.then(replace);
        window.addEventListener("resize", replace);
        return () => window.removeEventListener("resize", replace);
    }, [language]);

    return (
        <Fragment>
            <header className={"header" + (small ? " header--small" : "")}>
                <a className="header__mark" href="#top" aria-label={t.top}>
                    JL
                </a>
                <nav className="header__nav" aria-label={t.sections}>
                    <div className="header__track" ref={track}>
                        <span className="header__highlight" ref={highlight} aria-hidden="true" />
                        <ul className="header__links">
                            {sections.map((id, i) => (
                                <li key={id}>
                                    <a
                                        href={"#" + id}
                                        data-id={id}
                                        aria-current={currentSection === id ? "true" : undefined}
                                        aria-keyshortcuts={"Alt+" + (i + 1)}
                                        style={{ "--k": i }}
                                    >
                                        {t[id]}
                                        <span className="header__key" aria-hidden="true">
                                            {i + 1}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
                <div className="header__switches">
                    <SearchButton label={t.search} open={openSearch} />
                    <LanguageRoll
                        label={t.languageNow}
                        portuguese={language === "portuguese"}
                        toggle={() => setLanguage(language === "english" ? "portuguese" : "english")}
                    />
                    <ThemeSwitch label={t.theme} on={darkMode} toggle={toggleTheme} />
                </div>
            </header>

            <nav className="dock" ref={dock} aria-label={t.sections}>
                <span className="dock__glass" aria-hidden="true" />
                <span className="dock__lens" ref={lens} aria-hidden="true" />
                {sections.map((id) => (
                    <a key={id} className="dock__item" href={"#" + id} data-id={id} aria-current={currentSection === id ? "true" : undefined}>
                        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                            {DOCK_ICONS[id]}
                        </svg>
                        <span>{t.dock[id]}</span>
                    </a>
                ))}
            </nav>

            {/* The liquid glass bends what is behind it (ui-library: vidro-liquido-refracao). Chromium only. */}
            <svg className="liquid-defs" width="0" height="0" aria-hidden="true" focusable="false">
                <filter id="liquid-refract" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.012" numOctaves="2" seed="92" result="noise" />
                    <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
                    <feDisplacementMap in="SourceGraphic" in2="soft" scale="36" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>
        </Fragment>
    );
}

export default Header;
