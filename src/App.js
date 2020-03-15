import React from 'react';
import './App.css';
import { StateProvider } from './context';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/home';
import Country from './views/country';

function App() {
	return (
		<StateProvider>
			<Router basename="corona-virus-react">
				<Switch>
					<Route exact path="/" component={Home} />
          <Route path="/country/:countryId" component={Country} />
				</Switch>
			</Router>
		</StateProvider>
	);
}

export default App;
