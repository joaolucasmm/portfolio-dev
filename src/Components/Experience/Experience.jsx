import { useEffect, useRef, useState } from "react";

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

// The list names drop the internship prefix so they fit on one or two lines.
function listName(title) {
    const name = title.replace(/^(Rotation programme intern|Estagiário do programa de rotação), /, "");
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// As on the first portfolio: the roles as a plain list with dividers, the chosen
// one beside it with no card, all on one screen. Arrow keys move along the list.
function Experience({ t }) {
    const [chosen, setChosen] = useState(0);
    const tabs = useRef([]);
    const count = t.items.length;

    // The search palette opens the role it found.
    useEffect(() => {
        const onOpen = (e) => setChosen(e.detail);
        window.addEventListener("portfolio:open-experience", onOpen);
        return () => window.removeEventListener("portfolio:open-experience", onOpen);
    }, []);

    const onKeyDown = (e) => {
        const moves = {
            ArrowDown: chosen + 1,
            ArrowRight: chosen + 1,
            ArrowUp: chosen - 1,
            ArrowLeft: chosen - 1,
            Home: 0,
            End: count - 1,
        };
        if (!(e.key in moves)) return;
        e.preventDefault();
        const next = (moves[e.key] + count) % count;
        setChosen(next);
        tabs.current[next]?.focus();
    };

    const item = t.items[chosen];

    return (
        <section id="experience" className="section section--alt experience" tabIndex={-1}>
            <h2 className="experience__heading" data-reveal>
                {t.heading}
            </h2>
            <div className="experience__board" data-reveal>
                <div className="experience__list" role="tablist" aria-orientation="vertical" aria-label={t.heading}>
                    {t.items.map((role, i) => (
                        <button
                            key={role.dates.join()}
                            ref={(el) => (tabs.current[i] = el)}
                            id={"experience-" + i}
                            type="button"
                            role="tab"
                            className="experience__tab"
                            aria-selected={i === chosen}
                            aria-controls="experience-panel"
                            tabIndex={i === chosen ? 0 : -1}
                            onClick={() => setChosen(i)}
                            onKeyDown={onKeyDown}
                        >
                            {listName(role.title)}
                        </button>
                    ))}
                </div>
                <div
                    key={chosen}
                    id="experience-panel"
                    className="experience__role"
                    role="tabpanel"
                    aria-labelledby={"experience-" + chosen}
                >
                    <div className="experience__head">
                        <h3 className="experience__title">{item.title}</h3>
                        <p className="experience__when">
                            {formatDates(item.dates, t.locale, t.units)} ({formatLength(item.dates, t.units)})
                        </p>
                    </div>
                    <p className="experience__place">{item.place}</p>
                    <p className="experience__text">{item.text}</p>
                    <p className="experience__tools">
                        {t.tools}: {item.tools}.
                    </p>
                    <a className="experience__more" href={item.link} target="_blank" rel="noreferrer">
                        {t.company}
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Experience;
