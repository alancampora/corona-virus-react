import React, { useEffect, useState } from 'react';
import progessionData from './data';
import Curve from '../graphs/curve';
import { PageHeader, Row, Col, Card } from 'antd';
import { flag } from 'country-emoji';
import { Progress } from 'antd';

const fixKeys = {
	China: 'Mainland China',
};

//async function getCountryData(countryId) {
//const cData = await fetch(
//`https://covid19.mathdro.id/api/countries/${countryId}`,
//);
//const { confirmed, recovered, deaths } = await cData.json();
//try {
//return {
//confirmed: parseInt(confirmed.value),
//recovered: {
//value: parseInt(recovered.value),
//percent: Math.round(
//(parseInt(recovered.value) / parseInt(confirmed.value)) * 100,
//),
//},
//deaths: {
//value: parseInt(deaths.value),
//percent: Math.round(
//(parseInt(deaths.value) / parseInt(confirmed.value)) * 100,
//),
//},
//};
//} catch (e) {
//console.log(e);
//return {
//confirmed: 0,
//recovered: {
//value: 0,
//percent: 0,
//},
//deaths: {
//value: 0,
//percent: 0,
//},
//};
//}
//}

async function getCountryData(countryId) {
	if (!progessionData[countryId]) return {};

	const keys = Object.keys(progessionData[countryId]);
	const last = keys[keys.length - 1];
	const { confirmed, recovered, deaths } = progessionData[countryId][last];

	return {
		confirmed,
		recovered: {
			value: recovered,
			percent: Math.round((recovered / confirmed) * 100),
		},
		deaths: {
			value: deaths,
			percent: Math.round((deaths / confirmed) * 100),
		},
	};
}

const useCountryData = countryId => {
	const [data, setData] = useState({});
	useEffect(() => {
		getCountryData(countryId).then(result => setData(result));
	}, [countryId]);

	return [data];
};
const Country = ({ countryId }) => {
	const [data] = useCountryData(countryId);
	const overrideKey = fixKeys[countryId] ? fixKeys[countryId] : countryId;
	const countryData = progessionData[overrideKey];
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
					<PageHeader title="Progression of total confirmed cases by day" />
					<Curve rawData={countryData} />
				</Col>
			</Row>
		</div>
	);
};

export default Country;
