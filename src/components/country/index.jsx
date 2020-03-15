import React, { useEffect, useState } from 'react';
import progessionData from './data';
import Curve from '../graphs/curve';
import { PageHeader, Row, Col, Card } from 'antd';
import { flag } from 'country-emoji';
import { Progress } from 'antd';

const fixKeys = {
	China: 'Mainland China',
};

const useCountryData = countryId => {
	const [data, setData] = useState({});
	useEffect(() => {
		fetch(`https://covid19.mathdro.id/api/countries/${countryId}`)
			.then(cData => cData.json())
			.then(({ confirmed, recovered, deaths }) =>
				setData({
					confirmed: parseInt(confirmed.value),
					recovered: {
						value: parseInt(recovered.value),
						percent: Math.round(
							(parseInt(recovered.value) / parseInt(confirmed.value)) * 100,
						),
					},
					deaths: {
						value: parseInt(deaths.value),
						percent: Math.round(
							(parseInt(deaths.value) / parseInt(confirmed.value)) * 100,
						),
					},
				}),
			);
	}, [countryId]);

	return [data];
};
const Country = ({ countryId }) => {
	console.log({ countryId });
	const [data] = useCountryData(countryId);
	const overrideKey = fixKeys[countryId] ? fixKeys[countryId] : countryId;
	const countryData = progessionData[overrideKey];
	console.log({ data });
	return (
		<div>
			<Row justify="center" style={{ margin: '1rem' }}>
				<Col align="center" span={16}>
					<PageHeader title={`${flag(countryId)} ${countryId}`} />
				</Col>
			</Row>
			<Row justify="center" style={{ margin: '1rem' }}>
				<Col align="center" span={8}>
					<Card title="Recovered" bordered={false}>
						<Progress
							strokeColor="green"
							type="circle"
							percent={data.recovered && data.recovered.percent}
						/>
					</Card>
				</Col>
				<Col align="center" span={8}>
					<Card title="Deaths" bordered={false}>
						<Progress
							strokeColor="red"
							type="circle"
							percent={data.deaths && data.deaths.percent}
						/>
					</Card>
				</Col>
			</Row>
			<Row justify="center" style={{ margin: '1rem' }}>
				<Col span={16}>
					<PageHeader title="Progression of inffected people day by day" />
					<Curve rawData={countryData} />
				</Col>
			</Row>
		</div>
	);
};

export default Country;
