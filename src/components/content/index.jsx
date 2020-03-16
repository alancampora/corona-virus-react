import React, { useEffect, useState } from 'react';
import 'react-dropdown/style.css';
import { StyledWrapper, StyledTotalsWrapper, StyledTotalCard } from './styled';
import { getData, useSearch } from '../../hooks';
import { Input } from 'antd';
import { Col, Row, Card } from 'antd';
import Table from '../table';

const { Search } = Input;
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

	const filteredData = countries.filter(({ name }) =>
		searchTerm
			? name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
			: true,
	);
	return (
		<div>
			<Row  justify="space-around" style={{margin: '2rem'}}>
				<Col span={4}>
					<Card
						size="small"
						title="Total Confirmed"
						headStyle={{
							background: '#ffff00b3',
							'font-size': '2em',
							'text-align': 'center',
						}}
						bodyStyle={{
							background: '#ffff00b3',
							'font-size': '1.5em',
							'text-align': 'center',
						}}
					>
						<p>{totals.confirmed}</p>
					</Card>
				</Col>
				<Col span={4}>
					<Card
						size="small"
						title="Total Deaths"
						headStyle={{
							background: 'red',
							'font-size': '2em',
							'text-align': 'center',
						}}
						bodyStyle={{
							background: 'red',
							'font-size': '1.5em',
							'text-align': 'center',
						}}
					>
						<p>{totals.deaths}</p>
					</Card>
				</Col>
				<Col span={4}>
					<Card
						size="small"
						title="Total Recovered"
						headStyle={{
							background: '#94ff6a',
							'font-size': '2em',
							'text-align': 'center',
						}}
						bodyStyle={{
							background: '#94ff6a',
							'font-size': '1.5em',
							'text-align': 'center',
						}}
					>
						<p>{totals.recovered}</p>
					</Card>
				</Col>
			</Row>
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
				<Table dataSource={filteredData} />
			</StyledWrapper>
		</div>
	);
};

export default Content;
