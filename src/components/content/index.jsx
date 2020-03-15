import React, { useEffect, useState } from 'react';
import { flag } from 'country-emoji';
import 'react-dropdown/style.css';
import {
	StyledWrapper,
	StyledInformation,
	StyledTotalsWrapper,
	StyledTotalCard,
} from './styled';
import { getData, useSearch } from '../../hooks';
import { Input } from 'antd';
import { Card, Col, Row } from 'antd';
const { Search } = Input;
const FILTERS = {
	ALL: { value: 'all', label: 'all' },
	WITH_DEATHS: { value: 'with-deaths', label: 'countries with deaths' },
};

const useCoronaVirusData = () => {
	const { search } = useSearch();
	const [fetchedCountries, setFetchedCountries] = useState([]);
	const [fetchedTotals, setFetchedTotals] = useState({});

	useEffect(() => {
		getData(search).then(([countries, totals]) => {
			setFetchedCountries(countries);
			setFetchedTotals(totals);
		});
	}, [search]);

	return [fetchedCountries, fetchedTotals];
};

const Content = props => {
	const [countries, totals] = useCoronaVirusData();
	const [searchTerm, setSearchTerm] = useState();
	const { search } = useSearch();

	return (
		<div>
			<StyledTotalsWrapper>
				<StyledTotalCard backgroundColor="#ffff00b3">
					<h1>Total Cases</h1>
					<h1>🤒</h1>
					<h1>{totals.confirmed}</h1>
				</StyledTotalCard>
				<StyledTotalCard backgroundColor="#94ff6a">
					<h1>Recovered</h1>
					<h1>😃</h1>
					<h1>{totals.recovered}</h1>
				</StyledTotalCard>
				<StyledTotalCard backgroundColor="red">
					<h1>Deaths</h1>
					<h1>💀</h1>
					<h1>{totals.deaths}</h1>
				</StyledTotalCard>
			</StyledTotalsWrapper>
			<Row justify="center">
				<Col span={8}>
					<Search
						size="large"
						placeholder="Search by country name"
						onChange={element => setSearchTerm(element.target.value)}
					/>
				</Col>
			</Row>
			<StyledWrapper>
				<Row gutter={12}>
					{countries
						.filter(({ name }) =>
							searchTerm
								? name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
								: true,
						)
						.map(({ name, confirmed, deaths, recovered }) => (
							<Col span={6}>
								<Card
									title={`${flag(name)} ${name}`}
									extra={<a href={`#/country/${name}`}>More</a>}
									style={{ margin: '10px' }}
								>
									<StyledInformation>{'🤒' + `${confirmed}`}</StyledInformation>
									<StyledInformation>{'💀' + `${deaths}`}</StyledInformation>
									<StyledInformation>{'😃' + `${recovered}`}</StyledInformation>
								</Card>
							</Col>
						))}
				</Row>
			</StyledWrapper>
		</div>
	);
};

export default Content;
