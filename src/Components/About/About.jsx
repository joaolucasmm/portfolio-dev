import portrait from "../../Assets/Images/avatar.jpg";

function About({ t }) {
    return (
        <section id="about" className="section section--alt about">
            <div className="about__side" data-reveal>
                <h2 className="about__heading">{t.heading}</h2>
                <dl className="about__facts">
                    {t.facts.map(([label, value]) => (
                        <div key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
            <div className="about__text">
                <p className="about__statement" data-reveal>
                    <img
                        className="about__portrait"
                        src={portrait}
                        alt=""
                        width="640"
                        height="640"
                        loading="lazy"
                    />
                    <strong>{t.lead}</strong>
                    {t.first}
                </p>
                <div className="about__body" data-reveal>
                    {t.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default About;
