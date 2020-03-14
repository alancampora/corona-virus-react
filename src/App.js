import React from 'react';
import './App.css';
import Layout from './components/layout/index.jsx';
import { StateProvider } from './context';

function App() {
	return (
		<StateProvider>
      <Layout/>
		</StateProvider>
	);
}

export default App;
