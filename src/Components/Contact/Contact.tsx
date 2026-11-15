import type { Copy, Language } from "../../content";
import { channels, icons, resume, useCopy, Toast } from "../Channels/Channels";

// The list from the original portfolio: one row per channel, an icon and the address.

interface Props {
    t: Copy["contact"];
    language: Language;
    openDialog: () => void;
}

function Contact({ t, language, openDialog }: Props) {
    const [status, copy] = useCopy(t);

    return (
        <section id="contact" className="section contact" tabIndex={-1}>
            <h2 className="contact__title" data-reveal>
                {t.title}
            </h2>
            <ul className="contact__list" data-reveal>
                {channels.map((channel) => (
                    <li key={channel.id}>
                        {"href" in channel ? (
                            <a className="contact__row" href={channel.href} target="_blank" rel="noreferrer">
                                {icons[channel.id]}
                                <span translate="no">{channel.text}</span>
                            </a>
                        ) : (
                            <button
                                type="button"
                                className="contact__row"
                                onClick={() => copy(channel)}
                                aria-label={t.copy[channel.id] + " " + channel.text}
                            >
                                {icons[channel.id]}
                                <span translate="no">{channel.text}</span>
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <div className="contact__actions" data-reveal>
                <a className="button" href={resume[language]} target="_blank" rel="noreferrer">
                    {t.resume}
                </a>
                <button type="button" className="button button--ghost" onClick={openDialog}>
                    {t.form}
                </button>
            </div>
            <Toast status={status} />
        </section>
    );
}

export default Contact;
