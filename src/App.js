import React from 'react';
import './App.css';
import { StateProvider } from './context';
import { Router} from '@reach/router';
import Home from './views/home';
import Country from './views/country';

function App() {
	return (
		<StateProvider>
			<Router basepath="corona-virus-react">
				<Home path="/" />
				<Country path="country/:countryId" />
			</Router>
		</StateProvider>
	);
}

export default App;
