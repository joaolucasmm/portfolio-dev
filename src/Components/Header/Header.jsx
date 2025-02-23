import React from 'react';
import imagem from '../../Assets/Images/JL.svg';
import { Link } from 'react-router-dom';
import textSelector from './texts';

function Header({ language }) {
    const resumeLink = language === "english" 
        ? 'https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoResume.pdf' 
        : 'https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegasso.pdf';

    return (
        <header id='home' className='header'>
            <div className='menu-site'>
                <span className='menu-site__icone'></span>
            </div>
            <div className='header-container'>
                <Link to='/' className=''>
                    <img className='header__logo' src={imagem} alt='Logo JL' />
                </Link>
            </div>
            <nav className='menu-header'>
                <ul className='menu-itens'>
                    <li className='container__menu-item'><a href='#skills' className='menu-item'>{textSelector(language, 0)}</a></li>
                    <li className='container__menu-item'><a href='#projects' className='menu-item'>{textSelector(language, 1)}</a></li>
                    <li className='container__menu-item'><a href='#info' className='menu-item'>{textSelector(language, 2)}</a></li>
                    <li className='container__menu-item'><a href={resumeLink} className='menu-item' target="_blank" rel='noreferrer'>{textSelector(language, 3)}</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;