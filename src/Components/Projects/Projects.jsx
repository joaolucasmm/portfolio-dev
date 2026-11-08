import { useEffect, useRef, useState } from "react";
import sizewise from "../../Assets/Images/sizewise.png";
import portfolio from "../../Assets/Images/portfolio.jpg";
import qrCodeGen from "../../Assets/Images/qrcodegen.png";
import pokedex from "../../Assets/Images/pokedex.png";
import { projectLinks } from "../../content";

// Same order as projectLinks and work.items.
const images = [sizewise, portfolio, qrCodeGen, pokedex];

function Frame({ t, index, running, children, className = "" }) {
    return (
        <div className={"work__frame " + className + (running === index ? " is-running" : "")}>
            {children}
            {running === index && (
                <iframe title={t.frameTitle + ": " + t.items[index].name} src={projectLinks[index].url} />
            )}
        </div>
    );
}

// Kind, year, description and the controls of one project. Under each name on
// a phone; on a wide screen, the caption of the held frame, revealed on hover
// or focus (ui-library: card-projeto-legenda).
function Details({ t, index, running, run, className }) {
    const item = t.items[index];
    const link = projectLinks[index];
    return (
        <div className={className}>
            <p className="work__kind">
                {item.kind}
                <span className="work__year">{link.year}</span>
            </p>
            <p className="work__description">{item.description}</p>
            <div className="work__controls">
                {link.run && (
                    <button type="button" className="button button--small" onClick={() => run(index)}>
                        {running === index ? t.stop : t.run}
                    </button>
                )}
                {link.download && (
                    <a className="button button--small" href={link.download} target="_blank" rel="noreferrer">
                        {t.download}
                    </a>
                )}
                <a className="text-link" href={link.repo} target="_blank" rel="noreferrer">
                    {t.code}
                </a>
                {link.post && (
                    <a className="text-link" href={link.post} target="_blank" rel="noreferrer">
                        {t.post}
                    </a>
                )}
            </div>
        </div>
    );
}

function Projects({ t }) {
    const [current, setCurrent] = useState(0);
    const [running, setRunning] = useState(-1);
    const names = useRef([]);

    // The name crossing the middle of the viewport picks the picture.
    useEffect(() => {
        if (!("IntersectionObserver" in window)) return undefined;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrent(Number(entry.target.dataset.index));
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px" }
        );
        names.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // A running project stops when another one takes the frame.
    useEffect(() => {
        setRunning((r) => (r === -1 || r === current ? r : -1));
    }, [current]);

    const run = (i) => {
        setCurrent(i);
        setRunning(running === i ? -1 : i);
    };

    return (
        <section id="work" className="section work" tabIndex={-1}>
            <div className={"work__stage" + (running === current ? " work__stage--running" : "")}>
                <Frame t={t} index={current} running={running}>
                    {images.map((src, i) => (
                        <img
                            key={src}
                            src={src}
                            alt={i === current ? t.items[i].name : ""}
                            aria-hidden={i === current ? undefined : true}
                            width="1364"
                            height="636"
                            loading="lazy"
                            className={i === current ? "is-current" : ""}
                        />
                    ))}
                    {running === current ? (
                        <button
                            type="button"
                            className="button button--small work__stop"
                            onClick={() => run(current)}
                        >
                            {t.stop}
                        </button>
                    ) : (
                        <Details t={t} index={current} running={running} run={run} className="work__legend" />
                    )}
                </Frame>
            </div>
            <div className="work__names">
                <h2 className="work__heading">{t.heading}</h2>
                <ul>
                    {t.items.map((item, i) => {
                        const link = projectLinks[i];
                        return (
                            <li
                                key={link.url}
                                id={"project-" + i}
                                tabIndex={-1}
                                ref={(el) => (names.current[i] = el)}
                                data-index={i}
                            >
                                <a
                                    href={link.url || link.repo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={"work__name" + (i === current ? " is-current" : "")}
                                >
                                    {item.name}
                                </a>
                                <Frame t={t} index={i} running={running} className="work__phone-frame">
                                    <img
                                        src={images[i]}
                                        alt=""
                                        width="1364"
                                        height="636"
                                        loading="lazy"
                                        className="is-current"
                                    />
                                </Frame>
                                <Details
                                    t={t}
                                    index={i}
                                    running={running}
                                    run={run}
                                    className="work__detail"
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

export default Projects;
