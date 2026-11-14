import { Fragment, useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { useIsomorphicLayoutEffect, useMac } from "../../Functions/client";
import { sections } from "../../Functions/useShortcuts";
import type { Copy, Language } from "../../content";
import useDialogFocus from "../../Functions/useDialogFocus";

// The theme switch is the sun itself: in dark mode its rays turn away and a
// shadow slides across until it is a moon. The label is for screen readers only.
function ThemeSwitch({ label, on, toggle }: { label: string; on: boolean; toggle: () => void }) {
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
function SearchButton({ label, open }: { label: string; open: () => void }) {
    const mac = useMac();
    return (
        <button type="button" className="search-grow" aria-label={label} aria-keyshortcuts="Control+K" onClick={open}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="search-grow__more" aria-hidden="true">
                {label}
                <kbd className="search-grow__key">{mac ? "⌘K" : "Ctrl K"}</kbd>
            </span>
        </button>
    );
}

// The language button shows the language being read; on a click its letters roll
// like a counter, E→P and N→T, the second a beat after the first.
function LanguageRoll({ label, portuguese, toggle }: { label: string; portuguese: boolean; toggle: () => void }) {
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

// Moves a marker under the link of the current section, measured from the link
// itself. The first placement and layout changes skip the transition.
function placeMarker(list: HTMLElement | null, marker: HTMLElement | null, id: string | null, animate: boolean) {
    if (!list || !marker) return;
    const link = list.querySelector<HTMLElement>('[data-id="' + id + '"]');
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

// Desktop: a bar that is open over the hero and, once the page scrolls, shrinks into
// a glass pill in the middle, with a highlight that slides to the current section.
// Phone and tablet: the top keeps only the initials and the three buttons. The
// initials open a full-screen menu with the top of the page and the sections.
interface Props {
    t: Copy["nav"];
    language: Language;
    setLanguage: (language: Language) => void;
    darkMode: boolean;
    toggleTheme: () => void;
    openSearch: () => void;
}

function Header({ t, language, setLanguage, darkMode, toggleTheme, openSearch }: Props) {
    const [small, setSmall] = useState(false);
    const [currentSection, setCurrentSection] = useState<string | null>(null);
    const track = useRef<HTMLDivElement>(null);
    const highlight = useRef<HTMLSpanElement>(null);
    const placed = useRef(false);
    const current = useRef<string | null>(null);
    const [menu, setMenu] = useState(false);
    const menuBox = useRef<HTMLDivElement>(null);
    const closeMenu = useCallback(() => setMenu(false), []);
    useDialogFocus(menu, menuBox, closeMenu);

    // Focus the first link once the menu is open.
    useEffect(() => {
        if (menu) menuBox.current?.querySelector<HTMLElement>(".menu__link")?.focus({ preventScroll: true });
    }, [menu]);

    // Close first so the page can scroll again, then go to the section and focus it.
    const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setMenu(false);
        requestAnimationFrame(() => {
            const target = document.getElementById(id);
            if (!target) return;
            const smooth = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
            target.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
            if (id !== "top") target.focus({ preventScroll: true });
            window.history.replaceState(null, "", "#" + id);
        });
    };

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

    // Slide the highlight to the current section.
    useIsomorphicLayoutEffect(() => {
        current.current = currentSection;
        const animate = placed.current;
        placeMarker(track.current, highlight.current, currentSection, animate);
        placed.current = true;
    }, [currentSection]);

    // Labels change width with the language and the fonts; place again without moving.
    useEffect(() => {
        const replace = () => {
            placeMarker(track.current, highlight.current, current.current, false);
        };
        replace();
        document.fonts?.ready.then(replace);
        window.addEventListener("resize", replace);
        return () => window.removeEventListener("resize", replace);
    }, [language]);

    return (
        <Fragment>
            <header className={"header" + (small ? " header--small" : "") + (menu ? " header--menu" : "")}>
                <a className="header__mark" href="#top" aria-label={t.top}>
                    JL
                </a>
                <button
                    type="button"
                    className="header__menu"
                    onClick={() => setMenu(true)}
                    aria-expanded={menu}
                    aria-controls="menu"
                    aria-label={t.menu}
                >
                    JL
                </button>
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

            {/* Phone and tablet: the sections in large type over frosted glass. */}
            <div
                className={"menu" + (menu ? " is-open" : "")}
                id="menu"
                ref={menuBox}
                role="dialog"
                aria-modal="true"
                aria-label={t.sections}
                inert={menu ? undefined : ""}
            >
                <button type="button" className="menu__close" onClick={closeMenu} aria-label={t.close}>
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                        <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
                <nav aria-label={t.sections}>
                    <ol className="menu__list">
                        {(["top", ...sections] as const).map((id, i) => (
                            <li key={id}>
                                <a
                                    className="menu__link"
                                    href={"#" + id}
                                    onClick={(e) => goTo(e, id)}
                                    aria-current={currentSection === id ? "true" : undefined}
                                    style={{ "--i": i }}
                                >
                                    {id === "top" ? t.toTop : t[id]}
                                    <small aria-hidden="true">{id === "top" ? "↑" : i}</small>
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </Fragment>
    );
}

export default Header;
