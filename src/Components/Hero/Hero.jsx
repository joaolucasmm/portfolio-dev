import image from "../../Assets/Images/avatar.jpg";
import Typewriter from "typewriter-effect";
import Grid from "@mui/material/Grid2";
import textSelector from "./texts";
import { Button } from "@mui/material";

function Hero({ styleSection, language, setEmailDialog }) {
    const resumeLink =
        language === "english"
            ? "https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoResume.pdf"
            : "https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoCurriculo.pdf";

    return (
        <div className={styleSection}>
            <div className="hero_container">
                <Grid container spacing={4}>
                    <Grid size={8}>
                        <div className="text">
                            <h1>
                                <Typewriter
                                    options={{
                                        strings: [textSelector(language, 0)],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 5000,
                                    }}
                                />
                            </h1>
                            <span>
                                <h2>{textSelector(language, 1)}</h2>
                                <h3>
                                    {textSelector(language, 2)}
                                </h3>
                                    <p><b>{textSelector(language, 3)}</b></p>
                                    <p><i>{textSelector(language, 4)}</i></p>
                            </span>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div className="logo">
                            <img src={image} alt="Logo" className="image" />
                        </div>
                    </Grid>
                    <Grid size={4} />
                    <Grid size={2} className="button">
                        <Button href={resumeLink} target="_blank">
                            Download Resume
                        </Button>
                    </Grid>
                    <Grid size={2} className="button">
                        <Button onClick={() => setEmailDialog(true)}>
                            Contato
                        </Button>
                    </Grid>
                    <Grid size={4} />
                </Grid>
            </div>
        </div>
    );
}

export default Hero;
