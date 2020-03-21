import React from 'react';
/*
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
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';

const Chart = ({rawData = []}) => {
    const formattedData = rawData.map(({date, confirmed}) => {
        const [_, __, month, day] = date.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        return ({
            name: `${month}-${day}`,
            cases: confirmed,
        })
    });

    const values = rawData.map(({confirmed}) => confirmed);
    const yDomain = [Math.min(...values), Math.max(...values)];

    const data = formattedData;
    return (
        <ResponsiveContainer aspect={1.6}>
            <LineChart
                width={1000}
                height={500}
                data={data}
                margin={{top: 20, right: 20, left: 20, bottom: 20}}
            >
                <XAxis dataKey="name"/>
                <YAxis domain={yDomain}/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="#8884d8"
                    strokeWidth="3"
                    activeDot={{r: 8}}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
