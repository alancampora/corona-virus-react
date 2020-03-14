import React, { useReducer } from 'react';

let reducer = (state, {type, payload}) => {
  console.log({payload,type});
	switch (type) {
		case 'SET_COUNTRIES':
			return { ...state, countries: payload.countries };
    case 'SET_SEARCH':
			return { ...state, search: payload.search };
		default:
			return;
	}
};

const initialState = { countries: [] , search: ''};

const StateContext = React.createContext(initialState);

function StateProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StateContext.Provider value={{ state, dispatch }}>
			{props.children}
		</StateContext.Provider>
	);
}
export { StateContext, StateProvider };
