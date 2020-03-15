import React from 'react';
import progessionData from './data';
import Curve from '../graphs/curve';
import { PageHeader } from 'antd';
import { flag } from 'country-emoji';

const Country = ({countryId}) => {
  console.log({countryId});
	const countryData = progessionData[countryId];
	return (
		<div>
			<PageHeader title={`${flag(countryId)} ${countryId}`}/>
			<Curve rawData={countryData} />
		</div>
	);
};

export default Country;
