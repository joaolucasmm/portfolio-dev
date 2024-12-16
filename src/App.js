import React, { useState } from 'react';
import './App.css';
import './Assets/style/style.css';

import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header/Header';
import HeaderEN from './Components/Header_en/Header';
import Banner from './Components/Banner/Banner';
import BannerEN from './Components/Banner_en/Banner';
import Skills from './Components/Skills/Skills';
import SkillsEN from './Components/Skills_en/Skills';
import Footer from './Components/Footer/Footer';
import Projects from './Components/Projects/Projects';
import ProjectsEN from './Components/Projects_en/Projects';
import Info from './Components/Info/Info';
import InfoEN from './Components/Info_en/Info';
import Retorno from './Components/Retorno/Retorno';

function App() {
	const [toggle, setToggle] = useState(true);
	if(toggle){
		return (
		  <div className="App">
			  <Router>
				<div className='container__header'>
					<HeaderEN />
					<div className='container__translate'>
						<button className='translate' onClick={() => setToggle(false)}>Portuguese</button>
					</div>
				</div>
			  </Router>
			  <BannerEN />
			  <SkillsEN />
			  <ProjectsEN />
			  <InfoEN />
			  <Retorno />
			  <Footer />
			  
		  </div>
		);
	}
	else {
		return (
		  <div className="App">
			  <Router>
			  <div className='container__header'>
					<Header />
					<div className='container__translate'>
						<button className='translate' onClick={() => setToggle(true)}>English</button>
					</div>
				</div>	
			  </Router>
			  <Banner />
			  <Skills />
			  <Projects />
			  <Info />
			  <Retorno />
			  <Footer />
			  
		  </div>
		);
	}
}

export default App;
