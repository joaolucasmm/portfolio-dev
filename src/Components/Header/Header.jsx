import React, { useState } from "react";

const sections = ["work", "experience", "services", "education", "contact"];

function Header({ t, language, setLanguage, darkMode, setDarkMode, openDialog }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const close = () => setMenuOpen(false);

    return (
        <header className={"header" + (menuOpen ? " header--open" : "")}>
            <a className="header__mark" href="#top" aria-label="João Lucas, top of page" onClick={close}>
                JL
            </a>
            <button
                type="button"
                className="header__menu"
                aria-expanded={menuOpen}
                aria-controls="site-nav"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? t.close : t.menu}
            </button>
            <nav id="site-nav" className="header__nav">
                <ul className="header__links">
                    {sections.map((id) => (
                        <li key={id}>
                            <a href={"#" + id} onClick={close}>
                                {t[id]}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="header__switches">
                    <button
                        type="button"
                        className="header__switch"
                        lang={language === "english" ? "pt-BR" : "en"}
                        aria-label={t.language}
                        onClick={() => setLanguage(language === "english" ? "portuguese" : "english")}
                    >
                        {t.languageShort}
                    </button>
                    <button
                        type="button"
                        className="header__switch"
                        aria-pressed={!darkMode}
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? t.theme[0] : t.theme[1]}
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header;
