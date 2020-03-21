import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

const SimpleBarChart = ({ data, dataKeyX, dataKeyY }) => (
	<ResponsiveContainer aspect={1.6}>
		<BarChart
			width={500}
			height={300}
			data={data}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />

			<XAxis dataKey={dataKeyX}></XAxis>
			<YAxis />
			<Tooltip />
			<Bar dataKey={dataKeyY} fill="#8884d8" />
		</BarChart>
	</ResponsiveContainer>
);

export default SimpleBarChart;
