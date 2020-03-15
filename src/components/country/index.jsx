import React from 'react';
import progessionData from './data';
import Curve from '../graphs/curve';

const Country = ({ countryId }) => {
	const countryData = progessionData[countryId];
	return (
		<div>
			<Curve rawData={countryData}/>
		</div>
	);
};

export default Country;
