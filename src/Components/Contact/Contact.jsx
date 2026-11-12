import { channels, icons, useCopy, Toast } from "../Channels/Channels";

// The list from the original portfolio: one row per channel, an icon and the address.

function Contact({ t, openDialog }) {
    const [status, copy] = useCopy(t);

    return (
        <section id="contact" className="section contact" tabIndex={-1}>
            <h2 className="contact__title" data-reveal>
                {t.title}
            </h2>
            <ul className="contact__list" data-reveal>
                {channels.map((channel) => (
                    <li key={channel.id}>
                        {channel.href ? (
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
            <button type="button" className="button" onClick={openDialog} data-reveal>
                {t.form}
            </button>
            <Toast status={status} />
        </section>
    );
}

export default Contact;
