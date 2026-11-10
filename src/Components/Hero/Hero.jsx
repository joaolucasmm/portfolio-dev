import { useEffect, useState } from "react";
import { links } from "../../content";

// The name types itself, holds, erases and types again, like the first portfolio
// (typewriter-effect with pauseFor 5000). Letters keep their space while untyped,
// so the line never shifts. The values live here and the caret in style.scss.
const WORDS = ["João", "Lucas"];
const TOTAL = WORDS.join("").length;
const START = 300;
const TYPE = 110; // per letter, with a little jitter so it reads as typing
const ERASE = 55;
const HOLD = 5000;
const EMPTY = 600;

function useTyping() {
    const still =
        typeof window.matchMedia !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [count, setCount] = useState(still ? TOTAL : 0);
    const [erasing, setErasing] = useState(false);

    useEffect(() => {
        if (still) return undefined;
        let wait;
        if (!erasing && count < TOTAL) wait = (count === 0 ? START : 0) + TYPE * (0.6 + Math.random() * 0.8);
        else if (!erasing) wait = HOLD;
        else if (count > 0) wait = ERASE;
        else wait = EMPTY;

        const timer = setTimeout(() => {
            if (!erasing && count < TOTAL) setCount(count + 1);
            else if (!erasing) setErasing(true);
            else if (count > 0) setCount(count - 1);
            else setErasing(false);
        }, wait);
        return () => clearTimeout(timer);
    }, [count, erasing, still]);

    return { count, typing: !still && (erasing || count < TOTAL) };
}

function Word({ text, offset, count }) {
    return (
        <span className="hero__word" aria-hidden="true" translate="no">
            {[...text].map((letter, i) => {
                const at = offset + i;
                const classes = ["hero__letter"];
                if (at >= count) classes.push("is-untyped");
                if (at === count - 1) classes.push("is-caret");
                if (count === 0 && at === 0) classes.push("is-caret-before");
                return (
                    <span className={classes.join(" ")} key={i}>
                        {letter}
                    </span>
                );
            })}
        </span>
    );
}

function Hero({ t, language, openDialog }) {
    const { count, typing } = useTyping();
    return (
        <section id="top" className="hero">
            <h1 className={"hero__name" + (typing ? " is-typing" : "")}>
                <Word text={WORDS[0]} offset={0} count={count} />{" "}
                <Word text={WORDS[1]} offset={WORDS[0].length} count={count} />
                {/* Read once, as words; the split letters above are only for the eye. */}
                <span className="visually-hidden">
                    <span translate="no">João Lucas</span>, {t.role}
                </span>
            </h1>
            {/* The role is the title's second line; the company carries the accent. */}
            <div className="hero__foot">
                <p className="hero__role">
                    {t.role} <em>{t.company}</em>
                </p>
                <p className="hero__before">{t.before}</p>
                <div className="hero__actions">
                    <button type="button" className="button" onClick={openDialog}>
                        {t.action}
                    </button>
                    <a className="text-link" href={links.linkedin} target="_blank" rel="noreferrer">
                        {t.history}
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Hero;
