import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sections } from "../../Functions/useShortcuts";
import useDialogFocus from "../../Functions/useDialogFocus";

const MAX_RESULTS = 8;

// Everything on the page a visitor might look for, as [title, text, target id].
function buildIndex(t) {
    return [
        ...sections.map((id) => [t.nav[id], "", id]),
        ...t.work.items.map((p, i) => [p.name, p.kind + ". " + p.description, "project-" + i]),
        ...t.experience.items.map((e, i) => [e.title + ", " + e.place, e.text + " " + e.tools, "experience-" + i]),
        ...t.services.items.map((s, i) => [s.title, s.text + " " + s.tools, "service-" + i]),
        ...t.education.items.map((e, i) => [e.title + ", " + e.place, e.text, "education-" + i]),
    ];
}

// Titles that contain the term first, then results found only in the text.
function search(index, term) {
    if (!term) return [];
    const inTitle = index.filter(([title]) => title.toLowerCase().includes(term));
    const inText = index.filter(
        ([title, text]) => !title.toLowerCase().includes(term) && text.toLowerCase().includes(term)
    );
    return [...inTitle, ...inText].slice(0, MAX_RESULTS);
}

// The matched part in highlighter yellow; in the text, a window around it.
function Highlight({ text, term, around }) {
    const at = text.toLowerCase().indexOf(term);
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
    if (id.startsWith("experience-")) {
        window.dispatchEvent(new CustomEvent("portfolio:open-experience", { detail: Number(id.split("-")[1]) }));
    }
    target.scrollIntoView({ block: "center" });
    target.focus({ preventScroll: true });
}

function Search({ t, open, setOpen }) {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const input = useRef(null);
    const panel = useRef(null);
    const close = useCallback(() => setOpen(false), [setOpen]);
    useDialogFocus(open, panel, close);
    const index = useMemo(() => buildIndex(t), [t]);
    const term = query.trim().toLowerCase();
    const results = useMemo(() => search(index, term), [index, term]);

    useEffect(() => {
        if (!open) return;
        setQuery("");
        setActive(0);
        const id = setTimeout(() => input.current && input.current.focus(), 0);
        return () => clearTimeout(id);
    }, [open]);

    const choose = (i) => {
        const result = results[i];
        setOpen(false);
        if (result) setTimeout(() => go(result[2]), 0);
    };

    const onKeyDown = (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            const n = Math.max(1, results.length);
            setActive((a) => (a + (e.key === "ArrowDown" ? 1 : -1) + n) % n);
        } else if (e.key === "Enter") {
            e.preventDefault();
            choose(active);
        }
    };

    return (
        <div
            className="search"
            hidden={!open}
            role="dialog"
            aria-modal="true"
            aria-label={t.search.label}
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
            <div className="search__panel" ref={panel}>
                <input
                    ref={input}
                    className="search__input"
                    type="search"
                    name="q"
                    role="combobox"
                    aria-expanded={results.length > 0}
                    aria-autocomplete="list"
                    autoComplete="off"
                    spellCheck={false}
                    value={query}
                    placeholder={t.search.placeholder}
                    aria-label={t.search.label}
                    aria-controls="search-results"
                    aria-activedescendant={results.length ? "search-result-" + active : undefined}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setActive(0);
                    }}
                    onKeyDown={onKeyDown}
                />
                <ul id="search-results" className="search__results" role="listbox">
                    {results.map(([title, text], i) => (
                        <li
                            key={title + i}
                            id={"search-result-" + i}
                            role="option"
                            aria-selected={i === active}
                            className={"search__result" + (i === active ? " is-active" : "")}
                            onMouseMove={() => setActive(i)}
                            onClick={() => choose(i)}
                        >
                            <span className="search__title">
                                <Highlight text={title} term={term} />
                            </span>
                            {text && (
                                <span className="search__text">
                                    <Highlight text={text} term={term} around={36} />
                                </span>
                            )}
                            <span className="search__enter" aria-hidden="true">
                                {t.search.enter}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="search__hint" role="status">
                    {term && !results.length ? t.search.empty : t.search.hint}
                </p>
            </div>
        </div>
    );
}

export default Search;
