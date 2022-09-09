import React from 'react';
import petshop from '../../Assets/Images/petshop.png';

function Projetos() {
    return (
        <div id='projetos' className='container-projects'>
            <div className='projects'>
                <h1 className='projects__title'>Projetos</h1>
                <div className='projects__container'>
                    <div className='project'>
                        <h2>Petshop</h2>
                        <img src={petshop} className='project__image'/>    
                        <p>Projeto de página de blog sobre pets usando conceitos de Single Page Application (SPA), utilizando API para chamada de posts.</p>
                    </div>
                    <div className='project'>
                        <h2>Petshop</h2>
                        <img src={petshop} className='project__image'/>    
                        <p>Projeto de página de blog sobre pets usando conceitos de Single Page Application (SPA), utilizando API para chamada de posts.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projetos;