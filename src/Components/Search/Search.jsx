import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sections } from "../../Functions/useShortcuts";
import useDialogFocus from "../../Functions/useDialogFocus";
import { links, projectLinks } from "../../content";
import { icons } from "../Channels/Channels";

const MAX_RESULTS = 10;

// Everything on the page a visitor might look for, as { type, title, text, sub, id }.
function buildIndex(t) {
    return [
        ...sections.map((id) => ({ type: "section", title: t.nav[id], text: "", sub: t.search.goTo, id })),
        ...t.work.items.map((p, i) => ({
            type: "project",
            title: p.name,
            text: p.kind + ". " + p.description,
            sub: p.kind,
            id: "project-" + i,
        })),
        ...t.experience.items.map((e, i) => ({
            type: "role",
            title: e.title,
            text: e.place + ". " + e.text + " " + e.tools,
            sub: e.place,
            id: "experience-" + i,
        })),
        ...t.services.items.map((s, i) => ({
            type: "way",
            title: s.title,
            text: s.text + " " + s.tools,
            sub: t.nav.services,
            id: "service-" + i,
        })),
        ...t.education.items.map((e, i) => ({
            type: "edu",
            title: e.title,
            text: e.place + ". " + e.text,
            sub: e.place,
            id: "education-" + i,
        })),
    ];
}

// Titles that contain the term first, then results found only in the text.
function search(index, term) {
    if (!term) return [];
    const inTitle = index.filter((it) => it.title.toLowerCase().includes(term));
    const inText = index.filter((it) => !it.title.toLowerCase().includes(term) && it.text.toLowerCase().includes(term));
    return [...inTitle, ...inText].slice(0, MAX_RESULTS);
}

// The matched part in highlighter yellow; in the text, a window around it.
function Highlight({ text, term, around }) {
    const at = term ? text.toLowerCase().indexOf(term) : -1;
    if (at < 0) return text;
    const start = around ? Math.max(0, at - around) : 0;
    return (
        <Fragment>
            {start > 0 && "…"}
            {text.slice(start, at)}
            <mark>{text.slice(at, at + term.length)}</mark>
            {text.slice(at + term.length)}
        </Fragment>
    );
}

function go(id) {
    const target = document.getElementById(id);
    if (!target) return;
    // A role in Experience is a tab: select it before moving there.
    if (id.startsWith("experience-")) {
        window.dispatchEvent(new CustomEvent("portfolio:open-experience", { detail: Number(id.split("-")[1]) }));
    }
    // A project is a slide in the showcase: bring it to the centre.
    if (id.startsWith("project-")) {
        window.dispatchEvent(new CustomEvent("portfolio:open-project", { detail: Number(id.split("-")[1]) }));
    }
    // A whole section opens at its title; a single item is brought to the middle.
    target.scrollIntoView({ block: id.includes("-") ? "center" : "start" });
    target.focus({ preventScroll: true });
}

const MARK = { action: "›", section: "#", project: "P", role: "C", way: "T", edu: "E" };

const line = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

// What a recruiter looks for first, one tap from the search field.
const SHORTCUT_ICONS = {
    experience: (
        <svg {...line}>
            <rect x="3" y="7" width="18" height="13" rx="2.5" />
            <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" />
        </svg>
    ),
    work: (
        <svg {...line}>
            <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
            <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
        </svg>
    ),
    linkedin: icons.linkedin,
    email: icons.email,
};

// Keeps the open search inside what the keyboard leaves visible on phones.
function useVisibleHeight(open) {
    useEffect(() => {
        const view = window.visualViewport;
        if (!open || !view) return undefined;
        const root = document.documentElement;
        const set = () => root.style.setProperty("--visible-height", view.height + "px");
        set();
        view.addEventListener("resize", set);
        return () => {
            view.removeEventListener("resize", set);
            root.style.removeProperty("--visible-height");
        };
    }, [open]);
}

// A command palette: actions and sections while empty, results grouped by kind
// while typing, with the actions whose words match kept on top.
function Search({ t, open, setOpen, toggleTheme, language, setLanguage }) {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [status, setStatus] = useState("");
    const input = useRef(null);
    const panel = useRef(null);
    const list = useRef(null);
    const close = useCallback(() => setOpen(false), [setOpen]);
    useDialogFocus(open, panel, close);
    useVisibleHeight(open);
    const s = t.search;
    const index = useMemo(() => buildIndex(t), [t]);
    const term = query.trim().toLowerCase();

    const actions = useMemo(
        () => [
            {
                type: "action",
                key: "theme",
                title: s.actions.theme[0],
                sub: s.actions.theme[1],
                shortcut: "Shift T",
                run: toggleTheme,
            },
            {
                type: "action",
                key: "language",
                title: s.actions.language[0],
                sub: s.actions.language[1],
                run: () => setLanguage(language === "english" ? "portuguese" : "english"),
            },
            {
                type: "action",
                key: "email",
                title: s.actions.email[0],
                sub: links.email,
                keep: true,
                run: () => copyEmail(),
            },
            {
                type: "action",
                key: "download",
                title: s.actions.download[0],
                sub: s.actions.download[1],
                run: () => window.open(projectLinks[0].download, "_blank", "noopener"),
            },
        ],
        [s, toggleTheme, setLanguage, language],
    );

    // Flat list in display order, so the arrows and Enter follow what is drawn.
    const groups = useMemo(() => {
        const matching = actions.filter(
            (a) => !term || (a.title + " " + s.actions[a.key][2]).toLowerCase().includes(term),
        );
        const found = term ? search(index, term) : index.filter((it) => it.type === "section");
        const byType = {};
        found.forEach((it) => (byType[it.type] = byType[it.type] || []).push(it));
        const out = [];
        if (matching.length) out.push([s.groups.action, matching]);
        ["section", "project", "role", "way", "edu"].forEach(
            (type) => byType[type] && out.push([s.groups[type], byType[type]]),
        );
        return out;
    }, [actions, index, term, s]);
    const flat = useMemo(() => groups.flatMap(([, items]) => items), [groups]);

    useEffect(() => {
        if (!open) return;
        setQuery("");
        setActive(0);
        setStatus("");
        const id = setTimeout(() => input.current && input.current.focus(), 0);
        return () => clearTimeout(id);
    }, [open]);

    // Keep the active row in view as the arrows move.
    useEffect(() => {
        if (!open) return;
        const row = list.current?.querySelector(".is-active");
        if (row && typeof row.scrollIntoView === "function") row.scrollIntoView({ block: "nearest" });
    }, [open, active, flat]);

    const copyEmail = () =>
        navigator.clipboard
            ?.writeText(links.email)
            .then(() => setStatus(s.copied))
            .catch(() => setStatus(links.email));

    const shortcuts = [
        { key: "experience", run: () => go("experience") },
        { key: "work", run: () => go("work") },
        { key: "linkedin", href: links.linkedin },
        { key: "email", keep: true, run: copyEmail },
    ];

    const choose = (i) => {
        const item = flat[i];
        if (!item) return;
        if (item.type === "action") {
            item.run();
            if (!item.keep) setOpen(false);
            return;
        }
        setOpen(false);
        setTimeout(() => go(item.id), 0);
    };

    const onKeyDown = (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            const n = Math.max(1, flat.length);
            setActive((a) => (a + (e.key === "ArrowDown" ? 1 : -1) + n) % n);
        } else if (e.key === "Enter") {
            e.preventDefault();
            choose(active);
        }
    };

    let at = -1;

    return (
        <div
            className="search"
            hidden={!open}
            role="dialog"
            aria-modal="true"
            aria-label={s.label}
            onClick={(e) => (e.target === e.currentTarget || e.target === panel.current) && setOpen(false)}
        >
            {/* As Spotlight on the Mac: the field as a pill, shortcuts as circles beside it, results below. */}
            <div className="search__panel" ref={panel}>
                <div className="search__bar">
                    <div className="search__head">
                        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <input
                            ref={input}
                            className="search__input"
                            type="text"
                            name="q"
                            role="combobox"
                            aria-expanded={flat.length > 0}
                            aria-autocomplete="list"
                            autoComplete="off"
                            spellCheck={false}
                            value={query}
                            placeholder={s.placeholder}
                            aria-label={s.label}
                            aria-controls="search-results"
                            aria-activedescendant={flat.length ? "search-result-" + active : undefined}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setActive(0);
                                setStatus("");
                            }}
                            onKeyDown={onKeyDown}
                        />
                        <kbd className="search__key">Esc</kbd>
                    </div>
                    <ul className="search__shortcuts" aria-label={s.shortcuts.label}>
                        {shortcuts.map((item) => (
                            <li key={item.key}>
                                {item.href ? (
                                    <a
                                        className="search__shortcut"
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        title={s.shortcuts[item.key]}
                                        onClick={close}
                                    >
                                        <span className="search__circle">{SHORTCUT_ICONS[item.key]}</span>
                                        <span className="search__shortcut-name">{s.shortcuts[item.key]}</span>
                                    </a>
                                ) : (
                                    <button
                                        type="button"
                                        className="search__shortcut"
                                        title={s.shortcuts[item.key]}
                                        onClick={() => {
                                            if (item.keep) return item.run();
                                            setOpen(false);
                                            setTimeout(item.run, 0);
                                        }}
                                    >
                                        <span className="search__circle">{SHORTCUT_ICONS[item.key]}</span>
                                        <span className="search__shortcut-name">{s.shortcuts[item.key]}</span>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="search__card">
                    <ul id="search-results" className="search__results" role="listbox" ref={list}>
                        {groups.map(([label, items]) => (
                            <li key={label} role="presentation">
                                <p className="search__group" aria-hidden="true">
                                    {label}
                                </p>
                                <ul role="group" aria-label={label}>
                                    {items.map((item) => {
                                        at += 1;
                                        const i = at;
                                        const inText = term && !item.title.toLowerCase().includes(term) && item.text;
                                        return (
                                            <li
                                                key={item.key || item.id}
                                                id={"search-result-" + i}
                                                role="option"
                                                aria-selected={i === active}
                                                className={"search__result" + (i === active ? " is-active" : "")}
                                                onMouseMove={() => i !== active && setActive(i)}
                                                onClick={() => choose(i)}
                                            >
                                                <span className="search__mark" aria-hidden="true">
                                                    {MARK[item.type]}
                                                </span>
                                                <span className="search__title">
                                                    <Highlight text={item.title} term={term} />
                                                </span>
                                                <span className="search__text">
                                                    {inText ? (
                                                        <Highlight text={item.text} term={term} around={30} />
                                                    ) : (
                                                        item.sub
                                                    )}
                                                </span>
                                                {item.shortcut ? (
                                                    <kbd className="search__key">{item.shortcut}</kbd>
                                                ) : (
                                                    <span className="search__enter" aria-hidden="true">
                                                        {s.enter}
                                                    </span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ul>
                    {term && !flat.length && <p className="search__empty">{s.empty}</p>}
                    <p className={"search__foot" + (status ? " has-status" : "")} role="status">
                        {status || (
                            <Fragment>
                                <span>
                                    <kbd className="search__key">↑↓</kbd> {s.keys.choose}
                                </span>
                                <span>
                                    <kbd className="search__key">Enter</kbd> {s.keys.open}
                                </span>
                                <span>
                                    <kbd className="search__key">Esc</kbd> {s.keys.close}
                                </span>
                            </Fragment>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Search;
