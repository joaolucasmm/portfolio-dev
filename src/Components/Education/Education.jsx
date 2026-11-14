// One line per course: the school, the course, the years and a note.

function Education({ t }) {
    return (
        <section id="education" className="section section--alt education" tabIndex={-1}>
            <h2 className="education__heading" data-reveal>
                {t.heading}
            </h2>
            <ul className="education__list">
                {t.items.map((item, i) => (
                    <li key={item.place} id={"education-" + i} tabIndex={-1} className="education__item" data-reveal>
                        <span className="education__name">
                            <b translate="no">{item.place}</b> {item.title}
                        </span>
                        <span className="education__when">
                            {item.dates} · {item.city}
                        </span>
                        <span className="education__note">
                            {item.note}{" "}
                            <a className="text-link" href={item.link} target="_blank" rel="noreferrer">
                                {t.more}
                            </a>
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Education;
