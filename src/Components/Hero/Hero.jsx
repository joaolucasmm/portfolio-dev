import portrait from "../../Assets/Images/avatar.jpg";
import { links } from "../../content";

// Each line starts at its own time and its letters follow one stagger apart
// (ui-library: manchete-letras-desfoque). The values live in style.scss.
function Word({ text, line }) {
    return (
        <span className="hero__word" style={{ "--line": line }} aria-hidden="true" translate="no">
            {[...text].map((letter, i) => (
                <span className="hero__letter" style={{ "--i": i }} key={i}>
                    {letter}
                </span>
            ))}
        </span>
    );
}

function Hero({ t, language, openDialog }) {
    return (
        <section id="top" className="hero">
            <h1 className="hero__name">
                <Word text="João" line={0} />{" "}
                <span className="hero__frame">
                    <img src={portrait} alt="" width="640" height="640" fetchpriority="high" />
                </span>{" "}
                <Word text="Lucas" line={1} />
                {/* Read once, as words; the split letters above are only for the eye. */}
                <span className="visually-hidden">
                    <span translate="no">João Lucas</span>, {t.role}
                </span>
            </h1>
            {/* On a phone the portrait leaves the line and fills the screen under the name. */}
            <div className="hero__portrait">
                <img src={portrait} alt="" width="640" height="640" fetchpriority="high" />
            </div>
            <div className="hero__foot">
                <p className="hero__sentence">{t.sentence}</p>
                <div className="hero__actions">
                    <a className="text-link" href={links.linkedin} target="_blank" rel="noreferrer">
                        {t.history}
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
