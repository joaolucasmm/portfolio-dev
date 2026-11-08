import React, { useEffect, useState } from "react";
import "./Assets/style/style.scss";

import content from "./content";
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
import useReveal from "./Functions/useReveal";

function App() {
    const [language, setLanguage] = useState("english");
    const [emailDialog, setEmailDialog] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const t = content[language];

    useReveal();

    useEffect(() => {
        document.documentElement.lang = language === "english" ? "en" : "pt-BR";
    }, [language]);

    useEffect(() => {
        document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    }, [darkMode]);

    const openDialog = () => setEmailDialog(true);

    return (
        <div className="App">
            <Header
                t={t.nav}
                language={language}
                setLanguage={setLanguage}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                openDialog={openDialog}
            />
            <main>
                <Hero t={t.hero} language={language} openDialog={openDialog} />
                <About t={t.about} />
                <Projects t={t.work} />
                <Experience t={t.experience} />
                <Services t={t.services} />
                <Education t={t.education} />
                <Contact t={t.contact} openDialog={openDialog} />
            </main>
            <Footer t={t.footer} nav={t.nav} />
            <EmailDialog
                t={t.dialog}
                emailDialog={emailDialog}
                setEmailDialog={setEmailDialog}
            />
        </div>
    );
}

export default App;
