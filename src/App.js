import React from 'react';
import './App.css';
import './Assets/style/style.css';

import { BrowserRouter as Router } from 'react-router-dom';
import Cabecalho from './Components/Cabecalho/Cabecalho';
import Banner from './Components/Banner/Banner';
import Habilidades from './Components/Habilidades/Habilidades';
import Footer from './Components/Footer/Footer';
import Projetos from './Components/Projetos/Projetos';
import Contato from './Components/Contato/Contato';
import Retorno from './Components/Retorno/Retorno';
import Card from './Components/Card/Card';


function App() {
  	return (
		<div className="App">
			<Router>
				<Cabecalho />
			</Router>
			<Banner />
			<Habilidades />
			<Projetos />
			<Contato />
			<Retorno />
			<Footer />
			
		</div>
  	);
}

export default App;
