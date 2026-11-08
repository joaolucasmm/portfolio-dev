import campus from "../../Assets/Images/found/campus-do-vale-ufrgs.jpg";

function Education({ t }) {
    return (
        <section id="education" className="section education" tabIndex={-1}>
            <h2 className="education__heading" data-reveal>
                {t.heading}
            </h2>
            {t.items.map((item, i) => (
                <div className="education__row" key={item.place} id={"education-" + i} tabIndex={-1}>
                    <dl className="education__facts" data-reveal>
                        <div>
                            <dt className="visually-hidden">School</dt>
                            <dd>{item.place}</dd>
                        </div>
                        <div>
                            <dt className="visually-hidden">Years</dt>
                            <dd>{item.dates}</dd>
                        </div>
                        <div>
                            <dt className="visually-hidden">City</dt>
                            <dd>{item.city}</dd>
                        </div>
                    </dl>
                    <div className="education__body" data-reveal>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                        <a className="text-link" href={item.link} target="_blank" rel="noreferrer">
                            {t.more}
                        </a>
                    </div>
                </div>
            ))}
            <figure className="education__photo" data-reveal>
                <div className="education__crop">
                    <img src={campus} alt={t.photo} width="1920" height="1440" loading="lazy" />
                </div>
                <figcaption>{t.photo}</figcaption>
            </figure>
        </section>
    );
}

export default Education;
