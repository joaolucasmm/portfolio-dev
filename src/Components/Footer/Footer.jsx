import { useEffect, useRef, useState } from "react";
import { links } from "../../content";
import { sections } from "../../Functions/useShortcuts";

// Same values as --morph-out, --morph-stagger and --morph-overlap in style.scss.
const MORPH_OUT = 300;
const MORPH_STAGGER = 50;
const MORPH_OVERLAP = 150;

// When the last of n letters has left.
const exitEnd = (n) => MORPH_OUT + (n - 1) * MORPH_STAGGER;

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

const forms = {
    long: ["João Lucas", "Menegasso"],
    short: ["JL"],
};

// Letters leave right to left and the other form arrives from the blur once
// they have gone (ui-library: logo-morph-mola). Timings live in style.scss.
function NameForm({ lines, state }) {
    const total = lines.join("").length;
    let n = 0;
    return (
        <span className={"footer__form is-" + state}>
            {lines.map((line) => (
                <span className="footer__line" key={line}>
                    {[...line].map((letter, i) => {
                        const index = n++;
                        return (
                            <i key={i} style={{ "--out": total - 1 - index, "--in": index }}>
                                {letter === " " ? " " : letter}
                            </i>
                        );
                    })}
                </span>
            ))}
        </span>
    );
}

function Footer({ t, nav, lastUsed }) {
    const [form, setForm] = useState("long");
    const [leaving, setLeaving] = useState(null);
    const [inStart, setInStart] = useState(0);
    const timer = useRef();
    const swapped = useRef(false);

    useEffect(() => () => clearTimeout(timer.current), []);

    const swap = () => {
        swapped.current = true;
        const next = form === "long" ? "short" : "long";
        setLeaving(form);
        setForm(next);
        // Hide the old form only once its last letter has left
        // (--morph-out + one --morph-stagger per letter).
        const letters = forms[form].join("").length;
        // The new form starts a little before the old one has gone, as in the pattern.
        setInStart(Math.max(0, exitEnd(letters) - MORPH_OVERLAP));
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setLeaving(null), exitEnd(letters));
    };

    // Before the first swap the name is simply shown, so nothing plays on load.
    const stateOf = (name) => {
        if (name === leaving) return "out";
        if (name !== form) return "hidden";
        return leaving === null && name === "long" && !swapped.current ? "shown" : "in";
    };

    // Keys joined by no-break spaces so a shortcut never splits across lines.
    const mod = isMac ? "⌘" : "Ctrl";
    const shortcuts = [
        ["focus", "Alt", t.keys.focus],
        ["jump", "Alt 1–5", t.keys.jump],
        ["search", mod + " K", t.keys.search],
        ["theme", "Shift T", t.keys.theme],
        ["debug", "Shift D", t.keys.debug],
    ];

    return (
        <footer className="footer inverse">
            <button type="button" className="footer__name" onClick={swap} aria-label={t.morph} translate="no">
                <span className="footer__forms" aria-hidden="true" style={{ "--morph-in-delay": inStart + "ms" }}>
                    <NameForm lines={forms.long} state={stateOf("long")} />
                    <NameForm lines={forms.short} state={stateOf("short")} />
                </span>
            </button>
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
            <ul className="footer__keys" aria-label={t.keys.label}>
                {shortcuts.map(([id, key, label]) => (
                    <li key={id} className={"footer__key footer__key--" + id + (lastUsed === id ? " is-active" : "")}>
                        <kbd>{key}</kbd> {label}
                    </li>
                ))}
            </ul>
            <div className="footer__legal">
                <p>{t.rights}</p>
                <a href="#top">{t.top}</a>
            </div>
        </footer>
    );
}

export default Footer;
