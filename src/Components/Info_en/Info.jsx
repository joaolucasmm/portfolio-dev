import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";;

function Contato() {
    return(
        <div id='info' className='container-contact'>
            <div className='contact'>
                <h1>Contact Info</h1>
                <span className='container-item'>
                    <span className='contact__item'>
                        <FaGithub size='2em' /><a className='contact__text' href='https://www.github.com/joaolucasmm'>GitHub</a>
                    </span>
                    <span className='contact__item'>
                        <FaLinkedin size='2em' /><a className='contact__text' href='https://www.linkedin.com/in/jo%C3%A3o-lucas-miranda-menegasso/'>LinkedIn</a>
                    </span>
                    <span className='contact__item'>
                        <FaEnvelope size='2em' /><h4 className='contact__text'>joaol_mm@hotmail.com</h4>
                    </span>
                    <span className='contact__item'>
                        <FaPhoneAlt size='2em' /><h4 className='contact__text'>(48) 996330209</h4>
                    </span>
                </span>
            </div>
        </div>
    );
}

export default Contato;