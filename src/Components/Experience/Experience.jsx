import { useEffect, useLayoutEffect, useRef, useState } from "react";
import usePhone from "../../Functions/usePhone";

const month = (iso) => new Date(iso + "-01T00:00:00Z");

// ["2024-08", "2025-03"] → "Aug 2024 – Mar 2025"; a null end reads "now".
function formatDates([from, to], locale, units) {
    const format = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" });
    if (!to) return format.format(month(from)) + " – " + units.now;
    return format.formatRange(month(from), month(to));
}

// Counted like LinkedIn, both months included: Aug 2024 – Mar 2025 is 8 months.
function formatLength([from, to], units) {
    const start = month(from);
    const end = to ? month(to) : new Date();
    const total = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth() + 1;
    const years = Math.floor(total / 12);
    const months = total % 12;
    const part = (n, [one, many]) => n + " " + (n === 1 ? one : many);
    return [years && part(years, units.year), months && part(months, units.month)].filter(Boolean).join(units.and);
}

// A role held in stages (SAP's rotation programme) lists them under its own text,
// newest first, each with its dates and length.
function Stages({ role, t }) {
    if (!role.stages) return null;
    return (
        <ol className="experience__stages" aria-label={t.stagesLabel}>
            {role.stages.map((stage) => (
                <li key={stage.title}>
                    <p className="experience__stage-head">
                        <b>{stage.title}</b>{" "}
                        <span>
                            {formatDates(stage.dates, t.locale, t.units)} · {formatLength(stage.dates, t.units)}
                        </span>
                    </p>
                    <p>{stage.text}</p>
                </li>
            ))}
        </ol>
    );
}

// The time between roles, said plainly so nobody has to ask.
function Between({ t }) {
    return (
        <div className="experience__between" data-reveal>
            <h3>{t.betweenHeading}</h3>
            <ul>
                {t.between.map((gap) => (
                    <li key={gap.dates.join()}>
                        <span>{formatDates(gap.dates, t.locale, t.units)}</span> {gap.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// As on the first portfolio: the roles as a plain list with dividers, the chosen
// one beside it with no card, all on one screen. Arrow keys move along the list.
// On phones each role is a row that opens in place, like Education; -1 means
// every row is closed there, and the computer shows the first role.
function Experience({ t }) {
    const phone = usePhone();
    const [chosen, setChosen] = useState(0);
    const tabs = useRef([]);
    const bar = useRef(null);
    const chosenRef = useRef(chosen);
    const count = t.items.length;

    // One bar slides to the chosen role on the site's spring. It is measured from the
    // tab, down the list; if the list is ever laid out as a row, it measures along it.
    const placeBar = (animate) => {
        const tab = tabs.current[chosenRef.current];
        const el = bar.current;
        if (!tab || !el) return;
        const across = getComputedStyle(tab.parentElement).gridAutoFlow.startsWith("column");
        if (!animate) el.style.transition = "none";
        el.style.setProperty("--offset", (across ? tab.offsetLeft : tab.offsetTop) + "px");
        el.style.setProperty("--size", (across ? tab.offsetWidth : tab.offsetHeight) + "px");
        if (!animate) {
            el.getBoundingClientRect();
            el.style.transition = "";
        }
    };

    useLayoutEffect(() => {
        const shown = Math.max(chosen, 0);
        const first = chosenRef.current === shown;
        chosenRef.current = shown;
        placeBar(!first);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosen]);

    // Layout changes (fonts loading, the switch to tabs) move the bar without animating.
    useEffect(() => {
        const list = bar.current?.parentElement;
        if (!list) return;
        const replace = () => placeBar(false);
        document.fonts?.ready.then(replace);
        // Without ResizeObserver (older browsers, the test environment), window resizes still move it.
        if (typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", replace);
            return () => window.removeEventListener("resize", replace);
        }
        const observer = new ResizeObserver(replace);
        observer.observe(list);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phone]);

    // The search palette opens the role it found.
    useEffect(() => {
        const onOpen = (e) => setChosen(e.detail);
        window.addEventListener("portfolio:open-experience", onOpen);
        return () => window.removeEventListener("portfolio:open-experience", onOpen);
    }, []);

    const shown = Math.max(chosen, 0);

    const onKeyDown = (e) => {
        const moves = {
            ArrowDown: shown + 1,
            ArrowRight: shown + 1,
            ArrowUp: shown - 1,
            ArrowLeft: shown - 1,
            Home: 0,
            End: count - 1,
        };
        if (!(e.key in moves)) return;
        e.preventDefault();
        const next = (moves[e.key] + count) % count;
        setChosen(next);
        tabs.current[next]?.focus();
    };

    const item = t.items[shown];
    const when = (role) => formatDates(role.dates, t.locale, t.units) + " · " + formatLength(role.dates, t.units);

    if (phone) {
        return (
            <section id="experience" className="section section--alt experience" tabIndex={-1}>
                <h2 className="experience__heading" data-reveal>
                    {t.heading}
                </h2>
                <ul className="experience__rows">
                    {t.items.map((role, i) => (
                        <li key={role.dates.join()} id={"experience-" + i} tabIndex={-1}>
                            <details
                                className="experience__row"
                                open={i === chosen}
                                data-reveal
                                onToggle={(e) => {
                                    const open = e.currentTarget.open;
                                    // Opening one closes the others; closing the open one closes all.
                                    setChosen((c) => (open ? i : c === i ? -1 : c));
                                }}
                            >
                                <summary>
                                    <span className="experience__row-title">{role.title}</span>
                                    <span className="experience__row-when">
                                        <b translate="no">{role.place}</b> · {when(role)}
                                    </span>
                                </summary>
                                <div className="experience__row-body">
                                    <p>{role.text}</p>
                                    <Stages role={role} t={t} />
                                    <ul className="experience__pills" aria-label={t.tools}>
                                        {role.tools.split(", ").map((tool) => (
                                            <li key={tool}>{tool}</li>
                                        ))}
                                    </ul>
                                    <a className="experience__link" href={role.link} target="_blank" rel="noreferrer">
                                        {t.company} <span aria-hidden="true">↗</span>
                                    </a>
                                </div>
                            </details>
                        </li>
                    ))}
                </ul>
                <Between t={t} />
            </section>
        );
    }

    return (
        <section id="experience" className="section section--alt experience" tabIndex={-1}>
            <h2 className="experience__heading" data-reveal>
                {t.heading}
            </h2>
            <div className="experience__board" data-reveal>
                <div className="experience__list" role="tablist" aria-orientation="vertical" aria-label={t.heading}>
                    <span ref={bar} className="experience__indicator" aria-hidden="true" />
                    {t.items.map((role, i) => (
                        <button
                            key={role.dates.join()}
                            ref={(el) => (tabs.current[i] = el)}
                            id={"experience-" + i}
                            type="button"
                            role="tab"
                            className="experience__tab"
                            aria-selected={i === shown}
                            aria-controls="experience-panel"
                            tabIndex={i === shown ? 0 : -1}
                            onClick={() => setChosen(i)}
                            onKeyDown={onKeyDown}
                        >
                            {role.title}
                            <span className="experience__tab-place" translate="no">
                                {role.place}
                            </span>
                        </button>
                    ))}
                </div>
                <div
                    key={shown}
                    id="experience-panel"
                    className="experience__role"
                    role="tabpanel"
                    aria-labelledby={"experience-" + shown}
                >
                    <div className="experience__head">
                        <h3 className="experience__title">{item.title}</h3>
                        <p className="experience__when">
                            {formatDates(item.dates, t.locale, t.units)} ({formatLength(item.dates, t.units)})
                        </p>
                    </div>
                    <p className="experience__place" translate="no">
                        {item.place}
                    </p>
                    <p className="experience__text">{item.text}</p>
                    <Stages role={item} t={t} />
                    <p className="experience__tools">
                        {t.tools}: {item.tools}.
                    </p>
                    <a className="experience__more" href={item.link} target="_blank" rel="noreferrer">
                        {t.company}
                    </a>
                </div>
            </div>
            <Between t={t} />
        </section>
    );
}

export default Experience;
