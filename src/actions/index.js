export const fireChangeSearch = (dispatch, state, searchTerm) => {
	const filteredCountries = state.countries.filter(countrie =>
		countrie.indexOf(searchTerm >= 0),
	);

  fireSetCountries(dispatch, state,filteredCountries);

};

export const fireSetCountries = (dispatch, state, countries) => {
	dispatch({
		type: 'SET_COUNTRIES',
		payload: {
			countries,
		},
	});
};
