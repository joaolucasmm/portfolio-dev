import React from 'react';
import petshop from '../../Assets/Images/petshop.png';
import frutaEfruto from '../../Assets/Images/fruta-e-fruto.png';

function Projetos() {
    return (
        <div id='projetos' className='container-projects'>
            <div className='projects'>
                <h1 className='projects__title'>Projetos</h1>
                <div className='projects__container'>
                    <div className='project'>
                        <h2>Petshop</h2>
                        <a href='https://github.com/joaolucasmm/petshop'>
                            <img src={petshop} className='project__image' alt='Print do blog de pets'/></a>    
                        <p>Projeto de página de blog sobre pets usando conceitos de Single Page Application (SPA), utilizando API para chamada de posts.</p>
                    </div>
                    <div className='project'>
                        <h2>Fruta & Fruto</h2>
                        <a href='https://github.com/joaolucasmm/bootstrap-study'>
                            <img src={frutaEfruto} className='project__image' alt='Print do blog de receitas'/></a>
                        <p>Projeto de landpage de blog de receitas utilizando bootstrap para montagem de layout.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projetos;