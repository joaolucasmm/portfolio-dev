import React from 'react';
import imagem from '../../Assets/Images/avatar.jpg';
import textSelector from './texts';
import { Grid2 as Grid, ListItem as Item } from '@mui/material';
import Typewriter from 'typewriter-effect';

function Banner({ language }) {
    return (
        <Grid container spacing={2} className='container-banner'>
            <Grid size={4} className='banner'>
                <Item className='banner__text'>
                    <h1 className='banner__title'>
                        <Typewriter
                        options={{
                            strings: [textSelector(language, 0), "teste"],
                            autoStart: true,
                            loop: true,
                            pauseFor: 5000
                        }}
                        /></h1>
                    <h2 className='banner__subtitle'>{textSelector(language, 1)}</h2>
                    <p className='banner__bio'>{textSelector(language, 2)}</p>
                </Item>
            </Grid>
            <Grid size={4} className='banner'>
                <Item><img className='banner__imagem' src={imagem} alt='Logo Doguito' /></Item>
            </Grid>
        </Grid>
    );
};

export default Banner;