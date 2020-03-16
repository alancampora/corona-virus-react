import React, { useEffect, useState } from 'react';
import 'react-dropdown/style.css';
import { StyledWrapper, StyledTotalsWrapper, StyledTotalCard } from './styled';
import { getData, useSearch } from '../../hooks';
import { Input } from 'antd';
import { Col, Row } from 'antd';
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
			<StyledTotalsWrapper>
				<StyledTotalCard backgroundColor="#ffff00b3">
					<h1>Total Cases</h1>
					<h1>🤒</h1>
					<h1>{totals.confirmed}</h1>
				</StyledTotalCard>
				<StyledTotalCard backgroundColor="red">
					<h1>Deaths</h1>
					<h1>💀</h1>
					<h1>{totals.deaths}</h1>
				</StyledTotalCard>
				<StyledTotalCard backgroundColor="#94ff6a">
					<h1>Recovered</h1>
					<h1>😃</h1>
					<h1>{totals.recovered}</h1>
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
				<Table dataSource={filteredData} />
			</StyledWrapper>
		</div>
	);
};

export default Content;
