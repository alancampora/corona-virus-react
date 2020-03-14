import { useContext } from 'react';
import { StateContext } from '../context';

export function getTotal(data, prop) {
	return data.reduce((acum, country) => {
		acum += country[prop];
		return acum;
	}, 0);
}

export async function getData(search) {
	const data = await fetch(
		'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=200&cacheHint=true',
	);
	const countriesData = await data.json();
	const countries = countriesData.features
		.map(f => f.attributes)
		.filter(country => search.length ? country.Country_Region.toLowerCase() === search.toLowerCase(): true)
		.map(f => ({
			name: f.Country_Region,
			coordinates: [f.Lat, f.Long_],
			confirmed: f.Confirmed,
			deaths: f.Deaths,
			recovered: f.Recovered,
		}));

	const deaths = getTotal(countries, 'deaths');
	const confirmed = getTotal(countries, 'confirmed');
	const recovered = getTotal(countries, 'recovered');

	const totals = {
		deaths,
		confirmed,
		recovered,
	};

	return [countries, totals];
}

export function useCountries() {
	const { dispatch } = useContext(StateContext);

	const setCountries = countries => {
		dispatch({
			type: 'SET_COUNTRIES',
			payload: {
				countries,
			},
		});
	};

	const setTotals = totals => {
		dispatch({
			type: 'SET_TOTALS',
			payload: {
				totals,
			},
		});
	};

	return {
		setCountries,
		setTotals,
	};
}

export function useSearch() {
	const { dispatch, state } = useContext(StateContext);

	const setSearch = search => {
		dispatch({
			type: 'SET_SEARCH',
			payload: {
				search,
			},
		});
	};

	return {
		setSearch,
		search: state.search,
	};
}
