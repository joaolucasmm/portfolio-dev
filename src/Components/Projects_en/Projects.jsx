import React from 'react';
import petshop from '../../Assets/Images/petshop.png';
import frutaEfruto from '../../Assets/Images/fruta-e-fruto.png';
import myLinks from '../../Assets/Images/my-links.png';
import pokedex from '../../Assets/Images/pokedex.png';
import tictactoe from '../../Assets/Images/screenshotTictactoe.png';

function Projetos() {
    return (
        <div id='projects' className='container-projects'>
            <div className='projects'>
                <h1 className='projects__title'>Projects</h1>
                <div className='projects__container'>
                    <div className='project'>
                        <h2>Petshop</h2>
                        <a href='https://github.com/joaolucasmm/petshop'>
                            <img src={petshop} className='project__image' alt='Screenshot showing a petshop store blog page'/></a>    
                        <p>Blog page project about petshop using Single Page Application (SPA) concepts, utilizing API for post calls.</p>
                    </div>
                    <div className='project'>
                        <h2>Fruta & Fruto</h2>
                        <a href='https://github.com/joaolucasmm/bootstrap-study'>
                            <img src={frutaEfruto} className='project__image' alt='Screenshot of the recipe blog'/></a>
                        <p>Recipe blog landing page project using bootstrap for layout design.</p>
                    </div>
                    <div className='project'>
                        <h2><a className='project__link' href='https://joaolucasmm.github.io/my-links/'>My Links</a></h2>
                        <a href='https://github.com/joaolucasmm/my-links'>
                            <img src={myLinks} className='project__image' alt='Screenshot of LinkTree'/></a>
                        <p>Page with links to all my online profiles.</p>
                    </div>
                    
                </div>
                <div className='projects__container'>
                    <div className='project'>
                        <h2><a className='project__link' href='https://joaolucasmm.github.io/Pokedex/'>Pokédex</a></h2>
                        <a href='https://github.com/joaolucasmm/Pokedex'>
                            <img src={pokedex} className='project__image' alt='Screenshot of the Pokedex'/></a>
                        <p>Functional Pokedex made with API.</p>
                    </div>
                    <div className='project'>
                        <h2><a className='project__link' href='https://joaolucasmm.github.io/TicTacToe/'>TicTacToe</a></h2>
                        <a href='https://github.com/joaolucasmm/TicTacToe'>
                            <img src={tictactoe} className='project__image' alt='Screenshot of TicTacToe'/></a>
                        <p>TicTacToe game made in React.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projetos;