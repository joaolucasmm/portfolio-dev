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

// Every role is open: dates and place on the left, what was done on the right.
function Experience({ t }) {
    return (
        <section id="experience" className="section section--alt experience" tabIndex={-1}>
            <h2 className="experience__heading" data-reveal>
                {t.heading}
            </h2>
            <ol className="experience__list">
                {t.items.map((item, i) => (
                    <li key={item.dates.join()} id={"experience-" + i} tabIndex={-1} className="experience__item" data-reveal>
                        <div className="experience__meta">
                            <p className="experience__when">{formatDates(item.dates, t.locale, t.units)}</p>
                            <p className="experience__where">
                                <a href={item.link} target="_blank" rel="noreferrer">
                                    {item.place}
                                </a>
                                <span>{formatLength(item.dates, t.units)}</span>
                            </p>
                        </div>
                        <div className="experience__body">
                            <h3 className="experience__title">{item.title}</h3>
                            <p>{item.text}</p>
                            <p className="experience__tools">{item.tools}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export default Experience;
