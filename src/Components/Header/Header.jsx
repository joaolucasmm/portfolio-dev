import React from 'react';

import imagem from '../../Assets/Images/JL.svg' ;
import { Link } from 'react-router-dom';

function Header() {
    return(
        <header id='home' className='header'>

            <div className='menu-site'>
                <span className='menu-site__icone'>

                </span>
            </div>
            <div className='header-container'>
                <Link to='/' className=''>
                    <img className='header__logo' src={imagem} alt='Logo JL' />
                </Link>
            </div>

            <nav className='menu-header'>
                <ul className='menu-itens'>
                    <li className='container__menu-item'><a href='#skills' className='menu-item'>Habilidades</a></li>
                    <li className='container__menu-item'><a href='#projects' className='menu-item'>Projetos</a></li>
                    <li className='container__menu-item'><a href='#info' className='menu-item'>Contato</a></li>
                    <li className='container__menu-item'><a href='https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoResume.pdf' 
                        className='menu-item' target="_blank" rel="noreferrer">Currículo</a></li>
                    
                </ul>
            </nav>

        </header>
    );
}

export default Header;