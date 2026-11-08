import { links } from "../../content";

function Contact({ t, openDialog }) {
    return (
        <section id="contact" className="contact inverse" tabIndex={-1}>
            <h2 className="contact__heading" data-reveal>
                {t.heading}
            </h2>
            <a className="contact__email" href={"mailto:" + links.email} data-reveal>
                joaol_mm@
                <br />
                hotmail.com
            </a>
            <div className="contact__corners" data-reveal>
                <p>
                    <a href={links.phoneHref}>{links.phone}</a>
                    <br />
                    {t.place}
                </p>
                <button type="button" className="button" onClick={openDialog}>
                    {t.form}
                </button>
                <p className="contact__social">
                    <a href={links.github} target="_blank" rel="noreferrer">
                        GitHub
                    </a>
                    <a href={links.linkedin} target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                </p>
            </div>
        </section>
    );
}

export default Contact;
