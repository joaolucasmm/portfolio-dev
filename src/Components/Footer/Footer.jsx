import { links } from "../../content";

const sections = ["work", "experience", "services", "education", "contact"];

function Footer({ t, nav }) {
    return (
        <footer className="footer inverse">
            <p className="footer__name" aria-hidden="true">
                <span>João Lucas</span>
                <span>Menegasso</span>
            </p>
            <div className="footer__row">
                <ul className="footer__places">
                    <li>
                        <a href={"mailto:" + links.email}>{links.email}</a>
                    </li>
                    <li>
                        <a href={links.phoneHref}>{links.phone}</a>
                    </li>
                </ul>
                <div className="footer__columns">
                    <div>
                        <h2>{t.sections}</h2>
                        <ul>
                            {sections.map((id) => (
                                <li key={id}>
                                    <a href={"#" + id}>{nav[id]}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>{t.elsewhere}</h2>
                        <ul>
                            <li>
                                <a href={links.github} target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href={links.linkedin} target="_blank" rel="noreferrer">
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>{t.credits}</h2>
                        <p>
                            <a
                                href="https://commons.wikimedia.org/w/index.php?curid=186582792"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Campus do Vale UFRGS
                            </a>
                            , Junoyun, CC0, via Wikimedia Commons
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer__legal">
                <p>{t.rights}</p>
                <a href="#top">{t.top}</a>
            </div>
        </footer>
    );
}

export default Footer;
