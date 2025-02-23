import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import textSelector from './texts';

function Info({ language }) {
    return (
        <div id='info' className='container-contact'>
            <div className='contact'>
                <h1>{textSelector(language, 0)}</h1>
                <span className='container-item'>
                    <span className='contact__item'>
                        <FaGithub size='2em' /><a className='contact__text' href='https://www.github.com/joaolucasmm'>{textSelector(language, 1)}</a>
                    </span>
                    <span className='contact__item'>
                        <FaLinkedin size='2em' /><a className='contact__text' href='https://www.linkedin.com/in/jo%C3%A3o-lucas-miranda-menegasso/'>{textSelector(language, 2)}</a>
                    </span>
                    <span className='contact__item'>
                        <FaEnvelope size='2em' /><h4 className='contact__text'>{textSelector(language, 3)}</h4>
                    </span>
                    <span className='contact__item'>
                        <FaPhoneAlt size='2em' /><h4 className='contact__text'>{textSelector(language, 4)}</h4>
                    </span>
                </span>
            </div>
        </div>
    );
}

export default Info;