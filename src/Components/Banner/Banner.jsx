import React from 'react';
import imagem from '../../Assets/Images/avatar.jpg';

function Banner() {
    return (
        <div className='container-banner'>
            <div className='banner'>
                <span className='banner__text'>
                    <h1 className='banner__title'>Olá, eu sou João Lucas</h1>
                    <h2 className='banner_subtitle'>Desenvolvedor Front End!</h2>
                    <p className='banner_bio'>Trabalho com React - Bio completar texto</p>
                </span>

                <img className='banner__imagem' src={imagem} alt='Logo Doguito' />
            </div>
        </div>
    );
};

export default Banner;