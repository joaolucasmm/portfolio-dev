import React from 'react';
import textSelector from './texts';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function DrawerAppBar({ props, links, setLanguage, language }) {
    return (
        <Box className="header-container">
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar className="header-toolbar">
                    <Typography
                        variant="h4"
                        component="div"
                        className="header-title"
                    >
                        João Lucas
                    </Typography>
                    <Box className="header-buttons">
                        {props.map((item, i) => (
                            <Button key={item} href={links[i]} sx={{ color: '#fff' }}>
                                {item}
                            </Button>
                        ))}
                        <Button
                            className='translate'
                            onClick={() => setLanguage(language === "english" ? "portuguese" : "english")}
                        >
                            {language === "english" ? "Portuguese" : "English"}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

function Header({ language, setLanguage }) {
    const resumeLink = language === "english"
        ? 'https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoResume.pdf'
        : 'https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegasso.pdf';

    const content = [textSelector(language, 0), textSelector(language, 1), textSelector(language, 2), textSelector(language, 3)];
    const links = ['#skills', '#projects', '#info', resumeLink];

    return (
        <DrawerAppBar props={content} links={links} setLanguage={setLanguage} language={language} />
    );
}

export default Header;