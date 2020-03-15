import React from 'react';
import map from 'lodash/map';
/*
 *
 *rawData = {
 *  china: {
 *    'day-1': {
 *      confirmed: '1000'
 *    },
 *    'day-2': {
 *      confirmed: '2000'
 *    }
 *  }
 *}
 */
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

const Chart = ({ rawData }) => {

  const formattedData = map(rawData, (value, key) => ({
    name: key.replace(/-/g,''),
    value: value.confirmed
  }));

  const values = map(rawData, (value, key) => value.confirmed);
  const yDomain = [Math.min(...values), Math.max(...values)];

  console.log({rawData,formattedData, yDomain})
	const data = formattedData;
	return (
		<LineChart
			width={1000}
			height={500}
			data={data}
			margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
		>
			<XAxis dataKey="name" />
			<YAxis domain={yDomain}/>
			<CartesianGrid strokeDasharray="3 3" />
			<Tooltip />
			<Legend />
			<Line
				type="monotone"
				dataKey="value"
				stroke="#8884d8"
        strokeWidth="3"
				activeDot={{ r: 8 }}
			/>
		</LineChart>
	);
};

export default Chart;
