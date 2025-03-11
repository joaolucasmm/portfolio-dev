import React from 'react';
import { FaReact, FaJs, FaSass, FaGit, FaHtml5, FaCss3, FaNode } from 'react-icons/fa';
import { SiTypescript, SiWebdriverio, SiArduino, SiSap } from "react-icons/si";
import textSelector from './texts';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

function Skills({ language }) {
    return (

        <div id='skills' className='container-skill'>
            <div className='skill'>

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
            </div>
        </div>
    );
}

export default Skills;