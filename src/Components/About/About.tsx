import portrait from "../../Assets/Images/avatar.jpg";
import type { Copy } from "../../content";

function About({ t }: { t: Copy["about"] }) {
    const at = t.statement.indexOf(t.accent);
    const before = t.statement.slice(0, at);
    const after = t.statement.slice(at + t.accent.length);

    return (
        <section id="about" className="section section--alt about">
            <h2 className="about__heading" data-reveal>
                {t.heading}
            </h2>
            <div className="about__layout">
                <div className="about__story" data-reveal>
                    <p className="about__statement">
                        {before}
                        <em>{t.accent}</em>
                        {after}
                    </p>
                    <div className="about__who">
                        <img
                            className="about__portrait"
                            src={portrait}
                            alt=""
                            width="640"
                            height="640"
                            loading="lazy"
                        />
                        <div>
                            <strong>{t.name}</strong>
                            <span>{t.place}</span>
                        </div>
                    </div>
                    {t.body.map((paragraph) => (
                        <p key={paragraph} className="about__body">
                            {paragraph}
                        </p>
                    ))}
                </div>
                <dl className="about__list" data-reveal>
                    {[...t.stack, ...t.facts].map(([label, value]) => (
                        <div key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}

export default About;
