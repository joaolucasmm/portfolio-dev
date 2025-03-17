import React, { useState } from 'react';
import './App.css';
import './Assets/style/style.css';

import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header/Header';
import Banner from './Components/Banner/Banner';
import Skills from './Components/Skills/Skills';
import Footer from './Components/Footer/Footer';
import Projects from './Components/Projects/Projects';
import Info from './Components/Info/Info';
import Return from './Components/Return/Return';
import Experience from './Components/Experience/Experience';
import Education from './Components/Education/Education';
import Services from './Components/Services/Services';
import Hero from './Components/Hero/Hero';

function App() {
	const [language, setLanguage] = useState("english");
	return (
		<div className="App">
			<Router>
				<div className='container__header'>
					<Header language={language} setLanguage={setLanguage} />
				</div>
			</Router>
			<Hero language={language} styleSection='section'/>
			<Banner language={language}  styleSection='section'/>
			<Skills language={language}  styleSection='section section_secondaryColor'/>
			<Projects language={language}  styleSection='section'/>
			<Experience language={language} styleSection='section section_secondaryColor'/>
			<Education language={language} styleSection='section'/>
			<Info language={language}  styleSection='section section_secondaryColor'/>
			<Services language={language} styleSection='section'/>
			<Return />
			<Footer />
		</div>
	);
}

export default App;
