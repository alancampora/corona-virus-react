import React from 'react';
import './App.css';
import Layout from './components/layout/index.jsx';
import Country from './components/country/index.jsx';
import { StateProvider } from './context';
import { Router} from '@reach/router';

function App() {
	return (
		<StateProvider>
			<Router basepath="corona-virus-react">
				<Layout path="/" />
				<Country path="country/:countryId" />
			</Router>
		</StateProvider>
	);
}

export default App;
