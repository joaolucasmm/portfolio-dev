import { useEffect, useState } from "react";

function Experience({ t }) {
    const [open, setOpen] = useState(0);

    // The search palette opens the role it found.
    useEffect(() => {
        const onOpen = (e) => setOpen(e.detail);
        window.addEventListener("portfolio:open-experience", onOpen);
        return () => window.removeEventListener("portfolio:open-experience", onOpen);
    }, []);

    return (
        <section id="experience" className="section experience" tabIndex={-1}>
            <h2 className="experience__heading" data-reveal>
                {t.heading}
            </h2>
            <ul className="experience__list">
                {t.items.map((item, i) => {
                    const isOpen = open === i;
                    const panel = "experience-panel-" + i;
                    return (
                        <li
                            key={item.dates}
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
                                    {item.place}, {item.dates}
                                </span>
                            </button>
                            <div id={panel} className="experience__panel" hidden={!isOpen}>
                                <div className="experience__meta">
                                    <h3>
                                        {item.title}, {item.place}
                                        <span>{item.length}</span>
                                    </h3>
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
