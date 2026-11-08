import portrait from "../../Assets/Images/avatar.jpg";
import { links } from "../../content";

function Hero({ t, language, openDialog }) {
    return (
        <section id="top" className="hero">
            <h1 className="hero__name">
                <span className="mask">
                    <span className="mask__line">João</span>
                </span>
                <span className="hero__frame">
                    <img src={portrait} alt={t.portrait} width="640" height="640" />
                </span>
                <span className="mask">
                    <span className="mask__line mask__line--2">Lucas</span>
                </span>
                <span className="visually-hidden">, {t.role}</span>
            </h1>
            <div className="hero__foot">
                <p className="hero__sentence">{t.sentence}</p>
                <div className="hero__actions">
                    <a className="text-link" href={links.resume[language]} target="_blank" rel="noreferrer">
                        {t.resume}
                    </a>
                    <button type="button" className="button" onClick={openDialog}>
                        {t.action}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;
