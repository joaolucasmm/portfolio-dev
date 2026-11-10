import { useEffect, useRef, useState } from "react";
import usePhone from "../../Functions/usePhone";
import sizewise from "../../Assets/Images/sizewise.png";
import qrCodeGen from "../../Assets/Images/qrcodegen.png";
import pokedex from "../../Assets/Images/pokedex.png";
import sizewiseSmall from "../../Assets/Images/sizewise-760.jpg";
import pokedexSmall from "../../Assets/Images/pokedex-760.jpg";
import { projectLinks } from "../../content";

// Same order as projectLinks and work.items, with each picture's own size. Phones
// and the small "up next" cards take a 760px copy where it is lighter than the
// original (the QR Code Gen PNG is already smaller than a JPEG would be).
const images = [
    { src: sizewise, width: 1477, height: 815, small: sizewiseSmall },
    { src: qrCodeGen, width: 1899, height: 911, small: qrCodeGen },
    { src: pokedex, width: 1364, height: 636, small: pokedexSmall },
];

const srcSetOf = (image) => (image.small === image.src ? undefined : image.small + " 760w, " + image.src + " " + image.width + "w");

const pad = (n) => String(n).padStart(2, "0");

// "Windows app, Rust + Tauri + Vue" as tags for the phone: Windows app · Rust · Tauri · Vue.
const tagsOf = (kind) => kind.split(/, | \+ /);

// The ring repeats the projects until there are at least five slides, so two
// layers show on each side of the chosen one even with three projects.
const ringSize = (count) => count * Math.ceil(5 / count);

// Where a slide sits around the chosen one: 0 is the centre, negative is left.
function offsetOf(k, current, ring) {
    let o = (k - current) % ring;
    if (o > ring / 2) o -= ring;
    if (o < -ring / 2) o += ring;
    return o;
}

// The 3D place of a slide at offset `o`. Past the second layer a slide waits far
// behind the centre, so the one that comes round the back never crosses the stage.
function placeOf(o, phone) {
    const a = Math.abs(o);
    const side = Math.sign(o);
    if (a > 2) return { transform: "translateZ(-1100px)", opacity: 0, zIndex: 0, "--dim": 1 };
    const spread = phone ? [0, 92, 150] : [0, 56, 92];
    const angle = phone ? 22 : 34;
    return {
        transform: `translateX(${side * spread[a]}%) translateZ(${-a * 280}px) rotateY(${-side * angle * Math.min(a, 1)}deg)`,
        opacity: a === 2 ? 0.55 : 1,
        zIndex: 20 - a,
        "--dim": [0, 0.45, 0.65][a],
    };
}

// One slide: the project's picture as the ground, its name, facts and links over it,
// and the next projects as small cards. Only the chosen slide can be used; the others
// are pictures that bring themselves to the centre when clicked.
function Slide({ t, k, index, offset, phone, running, setRunning, goProject, goSlide }) {
    const item = t.items[index];
    const link = projectLinks[index];
    const image = images[index];
    const count = t.items.length;
    const active = offset === 0;
    const isRunning = active && running === index;
    const href = link.url || link.repo;
    const tab = active ? 0 : -1;

    const onClickCapture = (e) => {
        if (active) return;
        e.preventDefault();
        e.stopPropagation();
        goSlide(k);
    };

    return (
        <div
            className={"project" + (active ? " is-active" : "")}
            id={k < count ? "project-" + index : undefined}
            tabIndex={-1}
            style={placeOf(offset, phone)}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} ${t.of} ${count}: ${item.name}`}
            aria-hidden={!active}
            onClickCapture={onClickCapture}
        >
            <img
                className="project__picture"
                src={image.src}
                srcSet={srcSetOf(image)}
                sizes="(max-width: 720px) 100vw, 1100px"
                alt=""
                width={image.width}
                height={image.height}
                decoding="async"
                loading={Math.abs(offset) <= 1 ? "eager" : "lazy"}
            />
            <div className="project__shade" />
            <div className="project__body">
                <p className="project__top">
                    <span>{t.heading}</span>
                    <span className="project__count">
                        <b>{pad(index + 1)}</b> / {pad(count)}
                    </span>
                </p>
                <div className="project__text">
                    <h3 className="project__name">
                        <a href={href} target="_blank" rel="noreferrer" tabIndex={tab}>
                            {item.name}
                        </a>
                    </h3>
                    <p className="project__kind">
                        {item.kind}
                        <span className="project__year">{link.year}</span>
                    </p>
                    <ul className="project__tags">
                        {tagsOf(item.kind).map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                        <li className="project__tags-year">{link.year}</li>
                    </ul>
                    <p className="project__description">{item.description}</p>
                    <div className="project__controls">
                        {link.run && (
                            <button
                                type="button"
                                className="button button--small"
                                tabIndex={tab}
                                onClick={() => setRunning(index)}
                            >
                                {t.run}
                            </button>
                        )}
                        {link.download && !phone && (
                            <a
                                className="button button--small"
                                href={link.download}
                                target="_blank"
                                rel="noreferrer"
                                tabIndex={tab}
                            >
                                {t.download}
                            </a>
                        )}
                        <a
                            className={link.download && phone ? "button button--small" : "text-link"}
                            href={link.repo}
                            target="_blank"
                            rel="noreferrer"
                            tabIndex={tab}
                        >
                            {t.code}
                        </a>
                        {link.download && phone && <p className="project__note">{t.windowsOnly}</p>}
                        {link.post && (
                            <a className="text-link" href={link.post} target="_blank" rel="noreferrer" tabIndex={tab}>
                                {t.post}
                            </a>
                        )}
                    </div>
                </div>
                {count > 1 && (
                    <div className="project__next">
                        <span className="project__next-label">{t.next}</span>
                        <div className="project__minis">
                            {[1, 2]
                                .filter((step) => step < count)
                                .map((step) => {
                                    const q = (index + step) % count;
                                    return (
                                        <button
                                            key={q}
                                            type="button"
                                            className="project__mini"
                                            tabIndex={tab}
                                            aria-label={t.goTo + " " + t.items[q].name}
                                            onClick={() => goProject(q)}
                                        >
                                            <img src={images[q].small} alt="" loading="lazy" decoding="async" />
                                            <span>{t.items[q].name}</span>
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                )}
            </div>
            {isRunning && (
                <div className="project__live">
                    <iframe title={t.frameTitle + ": " + item.name} src={link.url} />
                    <button type="button" className="button button--small project__stop" onClick={() => setRunning(-1)}>
                        {t.stop}
                    </button>
                </div>
            )}
        </div>
    );
}

// The projects as a 3D showcase: the chosen one large in the centre, the others
// turning away on both sides. Arrows, dots, the small cards, a click on a side
// slide, the arrow keys and a swipe all move it.
function Projects({ t }) {
    const count = t.items.length;
    const ring = ringSize(count);
    const [current, setCurrent] = useState(0);
    const [running, setRunning] = useState(-1);
    const phone = usePhone();
    const swipe = useRef(null);

    const goSlide = (k) => {
        setCurrent(((k % ring) + ring) % ring);
        setRunning(-1);
    };
    const step = (dir) => goSlide(current + dir);
    // The nearest copy of that project, the short way round.
    const goProject = (index) => {
        let best = null;
        for (let k = index; k < ring; k += count) {
            const o = offsetOf(k, current, ring);
            if (best === null || Math.abs(o) < Math.abs(best)) best = o;
        }
        goSlide(current + best);
    };

    // The search palette opens the project it found (the first copy carries its id).
    useEffect(() => {
        const onOpen = (e) => {
            setCurrent(e.detail);
            setRunning(-1);
        };
        window.addEventListener("portfolio:open-project", onOpen);
        return () => window.removeEventListener("portfolio:open-project", onOpen);
    }, []);

    const onKeyDown = (e) => {
        if (e.target !== e.currentTarget) return;
        const moves = { ArrowRight: 1, ArrowLeft: -1 };
        if (e.key in moves) {
            e.preventDefault();
            step(moves[e.key]);
        } else if (e.key === "Home" || e.key === "End") {
            e.preventDefault();
            goProject(e.key === "Home" ? 0 : count - 1);
        }
    };

    // A horizontal swipe on touch screens; a click that follows it is ignored.
    const onPointerDown = (e) => {
        if (e.pointerType !== "mouse") swipe.current = { x: e.clientX, at: 0 };
    };
    const onPointerUp = (e) => {
        if (!swipe.current || e.pointerType === "mouse") return;
        const dx = e.clientX - swipe.current.x;
        swipe.current = Math.abs(dx) > 45 ? { at: performance.now() } : null;
        if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
    };
    const onClickCapture = (e) => {
        if (swipe.current?.at && performance.now() - swipe.current.at < 400) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const chosen = current % count;

    return (
        <section id="work" className="section work" tabIndex={-1}>
            <h2 className="work__heading" data-reveal>
                {t.heading}
            </h2>
            <div className="work__show">
                <div
                    className="work__stage"
                    tabIndex={0}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={t.hint}
                    onKeyDown={onKeyDown}
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerCancel={() => (swipe.current = null)}
                    onClickCapture={onClickCapture}
                >
                    {Array.from({ length: ring }, (_, k) => (
                        <Slide
                            key={k}
                            t={t}
                            k={k}
                            index={k % count}
                            offset={offsetOf(k, current, ring)}
                            phone={phone}
                            running={running}
                            setRunning={setRunning}
                            goProject={goProject}
                            goSlide={goSlide}
                        />
                    ))}
                </div>
                <div className="work__controls">
                    <button type="button" className="work__arrow" aria-label={t.previous} onClick={() => step(-1)}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M15 5l-7 7 7 7" />
                        </svg>
                    </button>
                    <div className="work__dots">
                        {t.items.map((item, i) => (
                            <button
                                key={item.name}
                                type="button"
                                className="work__dot"
                                aria-label={t.goTo + " " + item.name}
                                aria-current={i === chosen}
                                onClick={() => goProject(i)}
                            />
                        ))}
                    </div>
                    <button type="button" className="work__arrow" aria-label={t.following} onClick={() => step(1)}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Projects;
