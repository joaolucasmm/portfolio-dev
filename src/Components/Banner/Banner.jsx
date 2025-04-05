import React from 'react';
import imagem from '../../Assets/Images/avatar.jpg';
import textSelector from './texts';
import { Box, Card, CardContent, createTheme, Grid2 as Grid, ListItem as Item, Paper, ThemeProvider } from '@mui/material';
import Typewriter from 'typewriter-effect';
import variables from '../UI/variables.scss';

const theme = createTheme({
    breakpoints: {
        values: {
            tablet: 0,
            desktop: parseInt(variables.breakpointTablet, 10)
        },
    },
});

function Banner({ language, styleSection }) {
    return (
        <div className={styleSection}>
            <ThemeProvider theme={theme}>
                <Card sx={{ minWidth: 600, boxShadow: 0 }} className='banner__card'>
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 1,
                                    width: { tablet: 500, desktop: 1000 },
                                    height: { tablet: 800, desktop: 500 }
                                },
                            }}
                        >
                            <Paper elevation={3} >
                                <Grid container spacing={2} sx={{ minWidth: { tablet: 400, desktop: 600 } }} className='container-banner'>
                                    <Grid size={4} className='banner' sx={{ minWidth: { tablet: 400, desktop: 500 } }} >
                                        <Item className='banner__text'>

                                            <h1 className='banner__title'>
                                                <Typewriter
                                                    options={{
                                                        strings: [textSelector(language, 0)],
                                                        autoStart: true,
                                                        loop: true,
                                                        pauseFor: 5000
                                                    }}
                                                />
                                            </h1>

                                            <h2 className='banner__subtitle'>{textSelector(language, 1)}</h2>
                                            <p className='banner__bio'>{textSelector(language, 2)}</p>
                                        </Item>
                                    </Grid>
                                    <Grid size={4} className='banner__container-image'>
                                        <Item><img className='banner__imagem' src={imagem} alt='Logo Doguito' /></Item>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    </CardContent>
                </Card >
            </ThemeProvider>
        </div>
    );
};

export default Banner;