import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CodeIcon from "@mui/icons-material/Code";
import textSelector from "./texts";
import variables from "../UI/variables.scss";

function Services({ styleSection, language, darkMode }) {
    return (
        <div id="services" className={styleSection}>
            <div className="services_container">
                <h1 className={darkMode && "dark"}>{textSelector(language, 0)}</h1>
                <div className="services_content">
                    <Card sx={{ maxWidth: 345, bgcolor: variables.color1 }}>
                        <CodeIcon className="services_icon"/>
                        <CardContent className={"services_text " + (darkMode && "dark")}>
                            <h2>
                                {textSelector(language, 1)}
                            </h2>
                            <p className="description">
                                {textSelector(language, 2)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 345, bgcolor: variables.color1 }}>
                        <CodeIcon className="services_icon" />
                        <CardContent className={"services_text " + (darkMode && "dark")}>
                            <h2>
                                {textSelector(language, 3)}
                            </h2>
                            <p className="description">
                                {textSelector(language, 4)}
                                Desenvolvo APIs profissionais, blogs, SaaS,
                                landing pages, ecommerce e entre outros
                                websites.
                            </p>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 345, bgcolor: variables.color1 }}>
                        <CodeIcon className="services_icon" />
                        <CardContent className={"services_text " + (darkMode && "dark")}>
                            <h2>
                                {textSelector(language, 5)}
                            </h2>
                            <p className="description">
                                {textSelector(language, 6)}
                                Desenvolvo sites profissionais, blogs, SaaS,
                                landing pages, ecommerce e entre outros
                                websites.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Services;
