import { useEffect, useRef, useState } from "react";
import myLinks from "../../Assets/Images/my-links.png";
import pokedex from "../../Assets/Images/pokedex.png";
import tictactoe from "../../Assets/Images/screenshotTictactoe.png";
import qrCodeGen from "../../Assets/Images/qrcodegen.png";
import { projectLinks } from "../../content";

const images = [myLinks, pokedex, tictactoe, qrCodeGen];

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
                            alt={t.items[i].name}
                            width="1364"
                            height="636"
                            loading="lazy"
                            className={i === current ? "is-current" : ""}
                        />
                    ))}
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
                                    href={link.url}
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
                                <div className="work__detail">
                                    <p className="work__kind">
                                        {item.kind}, {link.year}
                                    </p>
                                    <p className="work__description">{item.description}</p>
                                    <div className="work__controls">
                                        <button
                                            type="button"
                                            className="button button--small"
                                            aria-pressed={running === i}
                                            onClick={() => run(i)}
                                        >
                                            {running === i ? t.stop : t.run}
                                        </button>
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
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

export default Projects;
