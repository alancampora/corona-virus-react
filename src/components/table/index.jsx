import React from 'react';
import { Table, Tag } from 'antd';
import { flag } from 'country-emoji';

const order = (a, b) => parseInt(a) - parseInt(b);

const withFlag = countryName => flag(countryName) ?  `${flag(countryName)} ${countryName}` :  countryName;

const CustomTable = ({ dataSource }) => {
	const columns = [
		{
			title: 'Country',
			dataIndex: 'name',
			key: 'name',
			render: countryName => (
				<a href={`#/country/${countryName}`}>
					<span>{withFlag(countryName)}</span>
				</a>
			),
		},
		{
			title: '🤒  Confirmed',
			dataIndex: 'confirmed',
			key: 'confirmed',
			sorter: {
				compare: (a, b) => order(a.cofirmed, b.confirmed),
			},
		},
		{
			title: '💀  Deaths',
			dataIndex: 'deaths',
			key: 'deaths',
			sorter: {
				compare: (a, b) => order(a.deaths, b.deaths),
			},
		},
		{
			title: '😃 Recovered',
			dataIndex: 'recovered',
			key: 'recovered',
			sorter: {
				compare: (a, b) => order(a.recovered, b.recovered),
			},
		},
	];

	return <Table pagination={false} columns={columns} dataSource={dataSource} />;
};

export default CustomTable;
