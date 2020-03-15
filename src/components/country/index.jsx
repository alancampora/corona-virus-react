import React from 'react';
import progessionData from './data';
import Curve from '../graphs/curve';
import { PageHeader, Row, Col } from 'antd';
import { flag } from 'country-emoji';

const Country = ({ countryId }) => {
	console.log({ countryId });
	const countryData = progessionData[countryId];
	return (
		<div>
			<Row justify="center">
				<Col span={16}>
					<PageHeader title={`${flag(countryId)} ${countryId}`} />
				</Col>
				<Col span={16}>
					<PageHeader title="Progression of inffected people day by day"/>
					<Curve rawData={countryData} />
				</Col>
			</Row>
		</div>
	);
};

export default Country;
