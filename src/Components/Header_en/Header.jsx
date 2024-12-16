import React from 'react';

import imagem from '../../Assets/Images/JL.svg' ;
import { Link } from 'react-router-dom';

function Cabecalho() {
    return(
        <header id='home' className='cabecalho'>

            <div className='menu-site'>
                <span className='menu-site__icone'>

                </span>
            </div>
            <div className='cabecalho-container'>
                <Link to='/' className=''>
                    <img className='cabecalho__logo' src={imagem} alt='Logo JL' />
                </Link>
            </div>

            <nav className='menu-cabecalho'>
                <ul className='menu-itens'>
                    <li className='container__menu-item'><a href='#skills' className='menu-item'>Skills</a></li>
                    <li className='container__menu-item'><a href='#projects' className='menu-item'>Projects</a></li>
                    <li className='container__menu-item'><a href='#info' className='menu-item'>Contact Info</a></li>
                    <li className='container__menu-item'><a href='https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoResume.pdf' 
                        className='menu-item' target="_blank" rel="noreferrer">Resume</a></li>
                </ul>
            </nav>

        </header>
    );
}

export default Cabecalho;