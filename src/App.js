import React, { useState } from 'react';
import './App.css';
import './Assets/style/style.css';

import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header/Header';
import Skills from './Components/Skills/Skills';
import Footer from './Components/Footer/Footer';
import Projects from './Components/Projects/Projects';
import Info from './Components/Info/Info';
import Experience from './Components/Experience/Experience';
import Education from './Components/Education/Education';
import Services from './Components/Services/Services';
import Hero from './Components/Hero/Hero';
import About from './Components/About/About';
import EmailDialog from './Components/EmailDialog/EmailDialog';

function App() {
	const [language, setLanguage] = useState("english");
	const [emailDialog, setEmailDialog] = useState(false);
	return (
		<div className="App">
			<Router>
				<div className='container__header'>
					<Header language={language} setLanguage={setLanguage} />
				</div>
			</Router>
			<EmailDialog styleSection='section email_dialog' emailDialog={emailDialog} setEmailDialog={setEmailDialog}/>
			<Hero language={language} styleSection='section' setEmailDialog={setEmailDialog}/>
			<div id='about' className='section about'>
				<About language={language} />
				<Skills language={language} />
			</div>
			<Projects language={language}  styleSection='section'/>
			<Services language={language} styleSection='section section_secondaryColor'/>
			<Experience language={language} styleSection='section'/>
			<Education language={language} styleSection='section section_secondaryColor'/>
			<Info language={language}  styleSection='section'/>
			<Footer />
		</div>
	);
}

export default App;
