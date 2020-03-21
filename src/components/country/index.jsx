import React, { useEffect, useState } from 'react';
import progessionData from './data';
import Curve from '../graphs/curve';
import SimpleBarChart from '../graphs/simple-bar-chart';
import { Card, Col, PageHeader, Progress, Row } from 'antd';
import { flag } from 'country-emoji';
import { getNewDeathsByDay, getNewConfirmedByDay} from './helpers';

const ENDPOINT = 'https://pomber.github.io/covid19/timeseries.json';

async function getCountryData(countryId) {
	if (!progessionData[countryId]) return {};

	const response = await fetch(ENDPOINT);
	const countries = await response.json();
	const country = countries[countryId].filter(({ confirmed }) => confirmed > 0);
	const lastUpdateCountry = country[country.length - 1];
	const { confirmed, recovered, deaths, date } = lastUpdateCountry;

	return {
		lastUpdate: date,
		confirmed,
		recovered: {
			value: recovered,
			percent: Math.round((recovered / confirmed) * 100),
		},
		deaths: {
			value: deaths,
			percent: Math.round((deaths / confirmed) * 100),
		},
		allData: country,
	};
}

const useCountryData = countryId => {
	const [data, setData] = useState({});
	useEffect(() => {
		getCountryData(countryId).then(result => setData(result));
	}, [countryId]);

	return [data, setData];
};

const Country = ({ countryId }) => {
	const [data] = useCountryData(countryId);

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
					<Curve rawData={data.allData} />
				</Col>
			</Row>
			<Row justify="center" style={{ margin: '1rem' }}>
				<Col span={16}>
					<PageHeader title="Deaths by day" />
					<SimpleBarChart
						data={getNewDeathsByDay(data.allData)}
						dataKeyX="date"
						dataKeyY="newDeaths"
					/>
				</Col>
			</Row>
      <Row justify="center" style={{ margin: '1rem' }}>
				<Col span={16}>
					<PageHeader title="New confirmed cases by day" />
					<SimpleBarChart
						data={getNewConfirmedByDay(data.allData)}
						dataKeyX="date"
						dataKeyY="newConfirmed"
					/>
				</Col>
			</Row>
		</div>
	);
};

export default Country;
