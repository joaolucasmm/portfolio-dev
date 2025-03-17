import React from 'react';
import image from '../../Assets/Images/avatar.jpg';
import Typewriter from 'typewriter-effect';
import Grid from '@mui/material/Grid2';
import CardContent from '@mui/material/CardContent';
import CodeIcon from '@mui/icons-material/Code';
import Typography from '@mui/material/Typography';

import TerminalIcon from '@mui/icons-material/Terminal';
import DataObjectIcon from '@mui/icons-material/DataObject';
import SourceIcon from '@mui/icons-material/Source';
import textSelector from './texts';

function Hero({ styleSection, language }) {
    return (
        <div className={styleSection}>
            <div className='hero_container'>
                <Grid container spacing={4}>
                    <Grid size={8}>
                        <div className='text'>
                            <h1>
                                <Typewriter
                                    options={{
                                        strings: [textSelector(language, 0)],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 5000
                                    }} />
                            </h1>
                            <span>
                                <h2>
                                    {textSelector(language, 1)}
                                </h2>
                                <p>
                                    {textSelector(language, 2)}
                                </p>
                            </span>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div className='logo'>
                            <img src={image} alt='Logo' className='image' />
                        </div>
                    </Grid>
                    <Grid size={4} />
                    <Grid size={2} className='button'>
                        Download CV
                    </Grid>
                    <Grid size={2} className='button'>
                        Contato
                    </Grid>
                    <Grid size={4} />
                </Grid>



            </div>
        </div>
    );
}

export default Hero;