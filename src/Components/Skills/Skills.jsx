import React from "react";
import {
    FaReact,
    FaJs,
    FaSass,
    FaGit,
    FaHtml5,
    FaCss3,
    FaNode,
} from "react-icons/fa";
import { SiTypescript, SiWebdriverio, SiArduino, SiSap } from "react-icons/si";
import textSelector from "./texts";

import {
    Grid2 as Grid,
    ListItem as Item,
} from "@mui/material";

function Skills({ styleSection, language, darkMode }) {
    return (
        <div className={styleSection}>
            <div className="container_skill">
                    <h1 className="skill__title">
                        {textSelector(language, 0)}
                    </h1>
                    <div>
                        <Grid container spacing={2} className="skill-list">
                            <Grid size={2} className="skill-list__span">
                                <Item className={"skill-list__text " + (darkMode && "skill-list__text_dark")}>
                                    <FaHtml5 />
                                    HTML
                                </Item>
                            </Grid>
                            <Grid size={2} className="skill-list__span">
                                <Item className={"skill-list__text " + (darkMode && "skill-list__text_dark")}>
                                    <FaCss3 />
                                    CSS
                                </Item>
                            </Grid>
                            <Grid size={2} className="skill-list__span">
                                <Item className={"skill-list__text " + (darkMode && "skill-list__text_dark")}>
                                    <FaJs />
                                    Javascript
                                </Item>
                            </Grid>
                            <Grid size={2} className="skill-list__span">
                                <Item className={"skill-list__text " + (darkMode && "skill-list__text_dark")}>
                                    <FaReact />
                                    ReactJS
                                </Item>
                            </Grid>
                            <Grid size={2} className="skill-list__span">
                                <Item className={"skill-list__text " + (darkMode && "skill-list__text_dark")}>
                                    <FaSass />
                                    SASS
                                </Item>
                            </Grid>
                            <Grid size={2} className="skill-list__span">
                                <Item className={"skill-list__text " + (darkMode && "skill-list__text_dark")}>
                                    <FaGit />
                                    GIT
                                </Item>
                            </Grid>
                            <Grid size={2} className="skill-list__span">
                                <Item className={"skill-list__text " + (darkMode && "skill-list__text_dark")}>
                                    <SiWebdriverio />
                                    Webdriver.io
                                </Item>
                            </Grid>
                            <Grid size={2} className="skill-list__span">
                                <Item className={"skill-list__text " + (darkMode && "skill-list__text_dark")}>
                                    <SiTypescript />
                                    Typescript
                                </Item>
                            </Grid>
                            <Grid size={2} className="skill-list__span">
                                <Item className={"skill-list__text " + (darkMode && "skill-list__text_dark")}>
                                    <SiArduino />
                                    Arduino
                                </Item>
                            </Grid>
                            <Grid size={2} className="skill-list__span">
                                <Item className={"skill-list__text " + (darkMode && "skill-list__text_dark")}>
                                    <SiSap />
                                    CAP
                                </Item>
                            </Grid>
                            <Grid size={2} className="skill-list__span">
                                <Item className={"skill-list__text " + (darkMode && "skill-list__text_dark")}>
                                    <FaNode />
                                    NodeJS
                                </Item>
                            </Grid>
                        </Grid>
                    </div>
            </div>
        </div>
    );
}

export default Skills;
