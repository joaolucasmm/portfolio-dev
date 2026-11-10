import React, { useCallback, useEffect, useState } from "react";
import "./Assets/style/style.scss";

import content from "./content";
import Backdrop from "./Components/Backdrop/Backdrop";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Projects from "./Components/Projects/Projects";
import Experience from "./Components/Experience/Experience";
import Services from "./Components/Services/Services";
import Education from "./Components/Education/Education";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import EmailDialog from "./Components/EmailDialog/EmailDialog";
import Search from "./Components/Search/Search";
import useReveal from "./Functions/useReveal";
import useShortcuts from "./Functions/useShortcuts";

function App() {
    const [language, setLanguage] = useState("english");
    const [emailDialog, setEmailDialog] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [searchOpen, setSearchOpen] = useState(false);
    const t = content[language];

    const toggleTheme = useCallback(() => setDarkMode((d) => !d), []);
    const toggleSearch = useCallback(() => setSearchOpen((s) => !s), []);
    const { lastUsed } = useShortcuts({ toggleTheme, toggleSearch, searchOpen });

    useReveal();

    useEffect(() => {
        document.documentElement.lang = language === "english" ? "en" : "pt-BR";
    }, [language]);

    useEffect(() => {
        document.documentElement.dataset.theme = darkMode ? "dark" : "light";
        // Browser chrome follows the page ground (--bg of each theme).
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", darkMode ? "#151a30" : "#f7f6fa");
    }, [darkMode]);

    const openDialog = () => setEmailDialog(true);

    return (
        <div className="App">
            <Backdrop />
            <a className="skip-link" href="#main">
                {t.nav.skip}
            </a>
            <Header
                t={t.nav}
                language={language}
                setLanguage={setLanguage}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                openSearch={() => setSearchOpen(true)}
            />
            <main id="main" tabIndex={-1}>
                <Hero t={t.hero} language={language} contact={t.contact} />
                <About t={t.about} />
                <Projects t={t.work} />
                <Experience t={t.experience} />
                <Services t={t.services} />
                <Education t={t.education} />
                <Contact t={t.contact} openDialog={openDialog} />
            </main>
            <Footer t={t.footer} nav={t.nav} lastUsed={lastUsed} />
            <EmailDialog
                t={t.dialog}
                emailDialog={emailDialog}
                setEmailDialog={setEmailDialog}
            />
            <Search
                t={t}
                open={searchOpen}
                setOpen={setSearchOpen}
                toggleTheme={toggleTheme}
                language={language}
                setLanguage={setLanguage}
            />
        </div>
    );
}

export default App;
