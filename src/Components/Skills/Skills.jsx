import React from 'react';
import { FaReact, FaJs, FaSass, FaGit, FaHtml5, FaCss3, FaNode } from 'react-icons/fa';
import { SiTypescript, SiWebdriverio, SiArduino, SiSap } from "react-icons/si";
import textSelector from './texts';

import { Box, Card, CardContent, Grid2 as Grid, ListItem as Item, Paper } from '@mui/material';

function Skills({ language }) {
    return (
        <Card sx={{ minWidth: 600, boxShadow: 0 }} id='skills' className='container-skill'>
            <CardContent >
                <Paper elevation={3} className='skill'>
                    <h1 className='skill__title'>{textSelector(language, 0)}</h1>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} className='skill-list'>
                            <Grid size={2} className='skill-list__span'>
                                <Item className='skill-list__text'><FaHtml5 />HTML</Item>
                            </Grid>
                            <Grid size={2} className='skill-list__span'>
                                <Item className='skill-list__text'><FaCss3 />CSS</Item>
                            </Grid>
                            <Grid size={2} className='skill-list__span'>
                                <Item className='skill-list__text'><FaJs />Javascript</Item>
                            </Grid>
                            <Grid size={2} className='skill-list__span'>
                                <Item className='skill-list__text'><FaReact />ReactJS</Item>
                            </Grid>
                            <Grid size={2} className='skill-list__span'>
                                <Item className='skill-list__text'><FaSass />SASS</Item>
                            </Grid>
                            <Grid size={2} className='skill-list__span'>
                                <Item className='skill-list__text'><FaGit />GIT</Item>
                            </Grid>
                            <Grid size={2} className='skill-list__span'>
                                <Item className='skill-list__text'><SiWebdriverio />Webdriver.io</Item>
                            </Grid>
                            <Grid size={2} className='skill-list__span'>
                                <Item className='skill-list__text'><SiTypescript />Typescript</Item>
                            </Grid>
                            <Grid size={2} className='skill-list__span'>
                                <Item className='skill-list__text'><SiArduino />Arduino</Item>
                            </Grid>
                            <Grid size={2} className='skill-list__span'>
                                <Item className='skill-list__text'><SiSap />CAP</Item>
                            </Grid>
                            <Grid size={2} className='skill-list__span'>
                                <Item className='skill-list__text'><FaNode />NodeJS</Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </CardContent>
        </Card>
    );
}

export default Skills;