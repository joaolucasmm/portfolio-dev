import React from 'react';
import { FaReact, FaJs, FaSass, FaGit, FaHtml5, FaCss3 } from 'react-icons/fa';

function Habilidades(){
    return(
        <div id='habilidades' className='container-skill'>
            <div className='skill'>  
            
                <h1 className='skill__title'>Habilidades</h1>
                <ul className='skill-list'>
                    <span className='skill-list__span'>
                        <li className='skill-list__text'><FaHtml5 />HTML</li>
                        <li className='skill-list__text'><FaCss3 />CSS</li>
                    </span>
                    
                    <span className='skill-list__span'>
                        <li className='skill-list__text'><FaJs />Javascript</li>
                        <li className='skill-list__text'><FaReact />ReactJS</li>
                    </span>
                    <span className='skill-list__span'>
                        <li className='skill-list__text'><FaSass />SASS</li>
                        <li className='skill-list__text'><FaGit />GIT</li>
                    </span>
                </ul>
            </div>
        </div>
    );
}

export default Habilidades;