import React, { useEffect, useState } from 'react';
import 'react-dropdown/style.css';
import { StyledWrapper } from './styled';
import { getData, useSearch } from '../../hooks';
import { Input } from 'antd';
import { Col, Row, Card, Progress, Statistic } from 'antd';
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
			<Row>
				<Col span={8} align="center">
					<Card bordered={false}>
						<Statistic
							title="Confirmed"
							groupSeparator="."
							value={totals.confirmed}
							valueStyle={{ color: 'blue' }}
						/>
					</Card>
				</Col>
				<Col span={8} align="center">
					<Card bordered={false}>
						<Statistic
							title="Deaths"
							groupSeparator="."
							value={totals.deaths}
							valueStyle={{ color: 'red' }}
						/>
					</Card>
				</Col>
				<Col span={8} align="center">
					<Card bordered={false}>
						<Statistic
							title="Recovered"
							groupSeparator="."
							value={totals.recovered}
							valueStyle={{ color: '#3f8600' }}
						/>
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
