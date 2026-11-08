import { useState } from "react";
import sizewise from "../../Assets/Images/sizewise.png";
import portfolio from "../../Assets/Images/portfolio.jpg";
import qrCodeGen from "../../Assets/Images/qrcodegen.png";
import pokedex from "../../Assets/Images/pokedex.png";
import { projectLinks } from "../../content";

// Same order as projectLinks and work.items, with each picture's own size.
const images = [
    { src: sizewise, width: 1477, height: 815 },
    { src: portfolio, width: 1440, height: 900 },
    { src: qrCodeGen, width: 1899, height: 911 },
    { src: pokedex, width: 1364, height: 636 },
];

// One project per block: its picture (or the live app, when run here) beside
// its name, facts and links, so no two projects ever share the same space.
function Project({ t, item, index, running, setRunning }) {
    const link = projectLinks[index];
    const image = images[index];
    const isRunning = running === index;
    const href = link.url || link.repo;

    return (
        <li className="project" id={"project-" + index} tabIndex={-1}>
            <div className={"project__frame" + (isRunning ? " is-running" : "")}>
                {isRunning ? (
                    <iframe title={t.frameTitle + ": " + item.name} src={link.url} />
                ) : (
                    <a href={href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
                        <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" />
                    </a>
                )}
            </div>
            <div className="project__text" data-reveal>
                <h3 className="project__name">
                    <a href={href} target="_blank" rel="noreferrer">
                        {item.name}
                    </a>
                </h3>
                <p className="project__kind">
                    {item.kind}
                    <span className="project__year">{link.year}</span>
                </p>
                <p className="project__description">{item.description}</p>
                <div className="project__controls">
                    {link.run && (
                        <button
                            type="button"
                            className="button button--small"
                            onClick={() => setRunning(isRunning ? -1 : index)}
                        >
                            {isRunning ? t.stop : t.run}
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
        </li>
    );
}

function Projects({ t }) {
    const [running, setRunning] = useState(-1);

    return (
        <section id="work" className="section work" tabIndex={-1}>
            <h2 className="work__heading" data-reveal>
                {t.heading}
            </h2>
            <ul className="work__list">
                {t.items.map((item, i) => (
                    <Project
                        key={projectLinks[i].repo}
                        t={t}
                        item={item}
                        index={i}
                        running={running}
                        setRunning={setRunning}
                    />
                ))}
            </ul>
        </section>
    );
}

export default Projects;
