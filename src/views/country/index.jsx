import React from 'react';
import BaseLayout from '../../components/layout';
import Content from '../../components/country';
import { useParams } from 'react-router-dom';

const CountryView = () => {
	const { countryId } = useParams();

	console.log({ countryId });
	return (
		<BaseLayout title="Corona Virus Statistics">
			<Content countryId={countryId} />
		</BaseLayout>
	);
};

export default CountryView;
