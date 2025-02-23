import React from 'react';
import petshop from '../../Assets/Images/petshop.png';
import frutaEfruto from '../../Assets/Images/fruta-e-fruto.png';
import myLinks from '../../Assets/Images/my-links.png';
import pokedex from '../../Assets/Images/pokedex.png';
import tictactoe from '../../Assets/Images/screenshotTictactoe.png';
import textSelector from './texts';

function Projects({ language }) {
    return (
        <div id='projects' className='container-projects'>
            <div className='projects'>
                <h1 className='projects__title'>{textSelector(language, 0)}</h1>
                <div className='projects__container'>
                    <div className='project'>
                        <h2>Petshop</h2>
                        <a href='https://github.com/joaolucasmm/petshop'>
                            <img src={petshop} className='project__image' alt='Print do blog de pets'/></a>    
                        <p>{textSelector(language, 1)}</p>
                    </div>
                    <div className='project'>
                        <h2>Fruta & Fruto</h2>
                        <a href='https://github.com/joaolucasmm/bootstrap-study'>
                            <img src={frutaEfruto} className='project__image' alt='Print do blog de receitas'/></a>
                        <p>{textSelector(language, 2)}</p>
                    </div>
                    <div className='project'>
                        <h2><a className='project__link' href='https://joaolucasmm.github.io/my-links/'>My Links</a></h2>
                        <a href='https://github.com/joaolucasmm/my-links'>
                            <img src={myLinks} className='project__image' alt='Print da LinkTree'/></a>
                        <p>{textSelector(language, 3)}</p>
                    </div>
                    
                </div>
                <div className='projects__container'>
                    <div className='project'>
                        <h2><a className='project__link' href='https://joaolucasmm.github.io/Pokedex/'>Pokédex</a></h2>
                        <a href='https://github.com/joaolucasmm/Pokedex'>
                            <img src={pokedex} className='project__image' alt='Print da Pokedex'/></a>
                        <p>{textSelector(language, 4)}</p>
                    </div>
                    <div className='project'>
                        <h2><a className='project__link' href='https://joaolucasmm.github.io/TicTacToe/'>TicTacToe</a></h2>
                        <a href='https://github.com/joaolucasmm/TicTacToe'>
                            <img src={tictactoe} className='project__image' alt='Print do TicTacToe'/></a>
                        <p>{textSelector(language, 5)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;