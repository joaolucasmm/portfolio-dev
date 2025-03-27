import React from "react";
import textSelector from "./texts";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            color: "#fff",
            transform: "translateX(22px)",
            "& .MuiSwitch-thumb:before": {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff"
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "#aab4be",
                ...theme.applyStyles("dark", {
                    backgroundColor: "#8796A5",
                }),
            },
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: "#001e3c",
        width: 32,
        height: 32,
        "&::before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                "#fff"
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
        ...theme.applyStyles("dark", {
            backgroundColor: "#003892",
        }),
    },
    "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        borderRadius: 20 / 2,
        ...theme.applyStyles("dark", {
            backgroundColor: "#8796A5",
        }),
    },
}));

function DrawerAppBar({ props, links, setLanguage, language }) {
    const [age, setAge] = React.useState("");
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box className="header-container">
            <CssBaseline />
            <AppBar component="nav" className="header_appbar">
                <FormControl
                    sx={{ m: 1, minWidth: 120 }}
                    size="small"
                    className="header_language"
                >
                    <InputLabel
                        id="demo-select-small-label"
                    >
                        {textSelector(language, 6)}
                    </InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={language}
                        label="Language"
                        onChange={(e) => {setLanguage(e.target.value)}}
                    >
                        <MenuItem value={"portuguese"}>Português</MenuItem>
                        <MenuItem value={"english"}>English</MenuItem>
                    </Select>
                </FormControl>
                <Toolbar className="header-toolbar">
                    <Typography
                        variant="h4"
                        component={Link}
                        className="header-title"
                        sx={{ textDecoration: "none" }}
                        color="#FFF"
                    >
                        João Lucas
                    </Typography>
                    <Box className="header-buttons">
                        {props.map((item, i) => (
                            <Button
                                key={item}
                                href={links[i]}
                                variant="outlined"
                                sx={{ color: "#fff" }}
                            >
                                {item}
                            </Button>
                        ))}
                        {/* <Button
                            className="translate"
                            onClick={() =>
                                setLanguage(
                                    language === "english"
                                        ? "portuguese"
                                        : "english"
                                )
                            }
                        >
                            {language === "english" ? "Portuguese" : "English"}
                        </Button> */}
                    </Box>
                </Toolbar>
                <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                    label={textSelector(language, 7)}
                    className="header_nightmode"
                />
            </AppBar>
        </Box>
    );
}

function Header({ language, setLanguage }) {
    const resumeLink =
        language === "english"
            ? "https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoResume.pdf"
            : "https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoCurriculo.pdf";

    const content = [
        textSelector(language, 0),
        textSelector(language, 1),
        textSelector(language, 2),
        textSelector(language, 3),
        textSelector(language, 4),
        textSelector(language, 5),
    ];
    const links = [
        "#about",
        "#projects",
        "#services",
        "#experience",
        "#education",
        "#info",
    ];

    return (
        <DrawerAppBar
            props={content}
            links={links}
            setLanguage={setLanguage}
            language={language}
        />
    );
}

export default Header;
