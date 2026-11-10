// One row per course, like the contact list. Closed, a row shows the school, the
// course, the years and the line that sums it up; open, the subjects and the text.

function Education({ t }) {
    return (
        <section id="education" className="section section--alt education" tabIndex={-1}>
            <h2 className="education__heading" data-reveal>
                {t.heading}
            </h2>
            <ul className="education__list">
                {t.items.map((item, i) => (
                    <li key={item.place} id={"education-" + i} tabIndex={-1}>
                        <details className="education__item" open={i === 0} data-reveal>
                            <summary>
                                <span className="education__name">
                                    <b>{item.place}</b> {item.title}
                                </span>
                                <span className="education__when">
                                    {item.dates} · {item.city}
                                </span>
                                <span className="education__quote">“{item.quote}”</span>
                            </summary>
                            <div className="education__open">
                                <ul className="education__subjects" aria-label={t.subjects}>
                                    {item.subjects.map((subject) => (
                                        <li key={subject}>{subject}</li>
                                    ))}
                                </ul>
                                <p>{item.text}</p>
                                <a className="text-link" href={item.link} target="_blank" rel="noreferrer">
                                    {t.more}
                                </a>
                            </div>
                        </details>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Education;
