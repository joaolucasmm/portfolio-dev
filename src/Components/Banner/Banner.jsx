import React from 'react';
import imagem from '../../Assets/Images/avatar.jpg';
import textSelector from './texts';

function Banner({ language }) {
    return (
        <div className='container-banner'>
            <div className='banner'>
                <span className='banner__text'>
                    <h1 className='banner__title'>{textSelector(language, 0)}</h1>
                    <h2 className='banner__subtitle'>{textSelector(language, 1)}</h2>
                    <p className='banner__bio'>{textSelector(language, 2)}</p>
                </span>

                <img className='banner__imagem' src={imagem} alt='Logo Doguito' />
            </div>
        </div>
    );
};

export default Banner;