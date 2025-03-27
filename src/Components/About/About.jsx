import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function About({ styleSection }) {
    return (
        <div className={styleSection}>
            <Card className="container_about">
                <CardContent className="about_content">
                    <CardHeader title="João Lucas Miranda Menegasso" subheader="Desenvolvedor Fullstack" className="about_presentation"/>
                    <section></section>
                    <section>
                    I have been studying physics engineering since 2017 at UFRGS. I started working with development when I took a technical course in mechatronics in 2014. In 2022, I switched to front end development and became a React developer. In 2023, I started an internship in the Rotation program at SAP where I worked as Technical Support, Quality Assurance Engineer, and currently I am a Software Engineer Intern.
                    </section>
                    <section>
                        <Button onClick={() => window.open("https://www.linkedin.com/in/jo%C3%A3o-lucas-miranda-menegasso/", "_blank")}>
                            <GitHubIcon />
                            GitHub
                        </Button>
                        <Button onClick={() => window.open("https://github.com/joaolucasmm", "_blank")}>
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
