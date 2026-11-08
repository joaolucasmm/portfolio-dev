import { useEffect, useState } from "react";

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

function Experience({ t }) {
    const [open, setOpen] = useState(0);

    // The search palette opens the role it found.
    useEffect(() => {
        const onOpen = (e) => setOpen(e.detail);
        window.addEventListener("portfolio:open-experience", onOpen);
        return () => window.removeEventListener("portfolio:open-experience", onOpen);
    }, []);

    return (
        <section id="experience" className="section section--alt experience" tabIndex={-1}>
            <h2 className="experience__heading" data-reveal>
                {t.heading}
            </h2>
            <ul className="experience__list">
                {t.items.map((item, i) => {
                    const isOpen = open === i;
                    const panel = "experience-panel-" + i;
                    return (
                        <li
                            key={item.dates.join()}
                            id={"experience-" + i}
                            tabIndex={-1}
                            className={isOpen ? "is-open" : ""}
                            data-reveal
                        >
                            <button
                                type="button"
                                className="experience__line"
                                aria-expanded={isOpen}
                                aria-controls={panel}
                                onClick={() => setOpen(isOpen ? -1 : i)}
                            >
                                <span className="experience__role">{item.short}</span>
                                <span className="experience__when">
                                    {item.place}, {formatDates(item.dates, t.locale, t.units)}
                                </span>
                            </button>
                            <div id={panel} className="experience__panel" hidden={!isOpen}>
                                <div className="experience__meta">
                                    <h3>{item.title}</h3>
                                    <p className="experience__where">
                                        {item.place}, {formatLength(item.dates, t.units)}
                                    </p>
                                    <a className="text-link" href={item.link} target="_blank" rel="noreferrer">
                                        {t.company}
                                    </a>
                                </div>
                                <p>{item.text}</p>
                                <p className="experience__tools">{item.tools}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default Experience;
