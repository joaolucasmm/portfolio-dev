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
import Retorno from './Components/Retorno/Retorno';

function App() {
	const [language, setLanguage] = useState("english");
	return (
		<div className="App">
			<Router>
				<div className='container__header'>
					<Header language={language} />
					<div className='container__translate'>
						<button className='translate' onClick={() => setLanguage(language === "english" ? "portuguese" : "english")}>
							{language === "english" ? "Portuguese" : "English"}
						</button>
					</div>
				</div>
			</Router>
			<Banner language={language} />
			<Skills language={language} />
			<Projects language={language} />
			<Info language={language} />
			<Retorno />
			<Footer />
		</div>
	);
}

export default App;
