import React from 'react';
import imagem from '../../Assets/Images/avatar.jpg';

function Banner() {
    return (
        <div className='container-banner'>
            <div className='banner'>
                <span className='banner__text'>
                    <h1 className='banner__title'>Olá, eu sou João Lucas</h1>
                    <h2 className='banner__subtitle'>Desenvolvedor Front End!</h2>
                    <p className='banner__bio'>Sou estudante de engenharia física desde 2017 na UFRGS.
                    Comecei a trabalhar com desenvolvimento ainda quando fiz curso técnico em mecatrônica em 2014. 
                    Recentemente migrei para o desenvolvimento front end e me tornei desenvolvedor em React. 
                    Estou em busca de estágio na área.</p>
                </span>

                <img className='banner__imagem' src={imagem} alt='Logo Doguito' />
            </div>
        </div>
    );
};

export default Banner;