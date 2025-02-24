import React from 'react';
import textSelector from './texts';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function DrawerAppBar({ props, setLanguage, language }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        João Lucas
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {props.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }}>
                                {item}
                            </Button>
                        ))
                        }
                        <Button
                            className='translate'
                            onClick={() => setLanguage(language === "english" ? "portuguese" : "english")}
                            sx={{ color: '#fff' }}
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

    const pages = [textSelector(language, 0), textSelector(language, 1), textSelector(language, 2)];

    return (
        <DrawerAppBar props={pages} setLanguage={setLanguage} language={language} />
    );
}

export default Header;