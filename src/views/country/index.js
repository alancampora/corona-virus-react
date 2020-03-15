import React from 'react';
import BaseLayout from '../../components/layout';
import Content from '../../components/country';

const CountryView = ({ countryId }) => {
	return (
		<BaseLayout title="Corona Virus Statistics">
			<Content countryId={countryId} />
		</BaseLayout>
	);
};

export default CountryView;
