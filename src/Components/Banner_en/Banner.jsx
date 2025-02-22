import React from 'react';
import imagem from '../../Assets/Images/avatar.jpg';

function Banner() {
    return (
        <div className='container-banner'>
            <div className='banner'>
                <span className='banner__text'>
                    <h1 className='banner__title'>Hello, I am João Lucas</h1>
                    <h2 className='banner__subtitle'>Junior Web Developer!</h2>
                    <p className='banner__bio'>I have been studying physics engineering since 2017 at UFRGS.
                    I started working with development when I took a technical course in mechatronics in 2014.
                    In 2022, I switched to front end development and became a React developer.
                    In 2023, I started an internship in the Rotation program at SAP where I worked as Technical Support,
                    Quality Assurance Engineer, and currently I am a Software Engineer Intern.</p>
                </span>

                <img className='banner__imagem' src={imagem} alt='Doguito Logo' />
            </div>
        </div>
    );
};

export default Banner;