import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import textSelector from "./texts";
import variables from '../UI/variables.scss';


function About({ styleSection, language, darkMode }) {
    return (
        <div className={styleSection}>
            <Card className="container_about glass-background">
                <CardContent className={"about_content " + (darkMode && "about_content_dark")}>
                    <section className="about_header">
                        <h3 className="about_title">{textSelector(language, 0)}</h3>
                        <h4 className="about_subtitle">{textSelector(language, 1)}</h4>
                    </section>
                    <section className="about_text">
                        <p>
                        {textSelector(language, 2)}
                        </p>
                    </section>
                    <section>
                        <Button className={"button " + (darkMode && "button_dark")} variant="contained" onClick={() => window.open("https://www.linkedin.com/in/jo%C3%A3o-lucas-miranda-menegasso/", "_blank")}>
                            <GitHubIcon />
                            GitHub
                        </Button>
                        <Button className={"button " + (darkMode && "button_dark")} variant="contained" onClick={() => window.open("https://github.com/joaolucasmm", "_blank")}>
                            <LinkedInIcon />
                            LinkedIn
                        </Button>
                    </section>
                </CardContent>
            </Card>
        </div>
    );
}

export default About;
