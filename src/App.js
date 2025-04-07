import React, { useState } from "react";
import "./Assets/style/style.css";

import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header/Header";
import Skills from "./Components/Skills/Skills";
import Footer from "./Components/Footer/Footer";
import Projects from "./Components/Projects/Projects";
import Info from "./Components/Info/Info";
import Experience from "./Components/Experience/Experience";
import Education from "./Components/Education/Education";
import Services from "./Components/Services/Services";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import EmailDialog from "./Components/EmailDialog/EmailDialog";

function App() {
    const [language, setLanguage] = useState("english");
    const [emailDialog, setEmailDialog] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={"App " + (darkMode ? "bg_darkMode" : "bg_lightMode")}>
            <Router>
                <div className="container__header">
                    <Header
                        language={language}
                        setLanguage={setLanguage}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                </div>
            </Router>
            <EmailDialog
                styleSection="email_dialog"
                language={language}
                emailDialog={emailDialog}
                setEmailDialog={setEmailDialog}
                darkMode={darkMode}
            />
            <Hero
                language={language}
                styleSection="section"
                setEmailDialog={setEmailDialog}
                darkMode={darkMode}
            />
           
            <div id="about" className="section about">
                <About language={language} darkMode={darkMode} />
                <Skills language={language} darkMode={darkMode} />
            </div>
            <Projects
                language={language}
                styleSection="section projects"
                darkMode={darkMode}
            />
            <Services
                language={language}
                styleSection="section services"
                darkMode={darkMode}
            />
            <Experience
                language={language}
                styleSection="section experience"
                darkMode={darkMode}
            />
            <Education
                language={language}
                styleSection="section education"
                darkMode={darkMode}
            />
            <Info
                language={language}
                styleSection="section"
                darkMode={darkMode}
            />
            <Footer />
        </div>
    );
}

export default App;
