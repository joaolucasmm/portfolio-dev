import image from "../../Assets/Images/avatar.jpg";
import Typewriter from "typewriter-effect";
import Grid from "@mui/material/Grid2";
import textSelector from "./texts";
import { Button } from "@mui/material";

function Hero({ styleSection, language, setEmailDialog, darkMode }) {
    const resumeLink =
        language === "english"
            ? "https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoResume.pdf"
            : "https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoCurriculo.pdf";

    return (
        <div className={styleSection + " hero"}>
            <div className="hero_container">
                <Grid container spacing={4} className="hero_grid">
                    <Grid size={8} className="sub_grid">
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
                                <h3>{textSelector(language, 2)}</h3>
                                <p>
                                    <b>{textSelector(language, 3)}</b>
                                </p>
                                <p>
                                    <i>{textSelector(language, 4)}</i>
                                </p>
                            </span>
                        </div>
                    </Grid>
                    <Grid size={4} className="sub_grid">
                            <img src={image} alt="Logo" className="image" />
                    </Grid>
                    <Grid container spacing={4} className="button_container">
                        <Grid size={2} className="sub_grid">
                            <Button
                                className={
                                    "button " + (darkMode && "button_dark")
                                }
                                variant="outlined"
                                href={resumeLink}
                                target="_blank"
                            >
                                {textSelector(language, 5)}
                            </Button>
                        </Grid>
                        <Grid size={2} className="sub_grid">
                            <Button
                                className={
                                    "button " + (darkMode && "button_dark")
                                }
                                variant="outlined"
                                onClick={() => setEmailDialog(true)}
                            >
                                {textSelector(language, 6)}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Hero;
