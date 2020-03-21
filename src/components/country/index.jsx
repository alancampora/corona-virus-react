import React, {useEffect, useState} from 'react';
import progessionData from './data';
import Curve from '../graphs/curve';
import {Card, Col, PageHeader, Progress, Row, Slider} from 'antd';
import {flag} from 'country-emoji';


async function getCountryData(countryId) {
    if (!progessionData[countryId]) return {};


    const response = await fetch("https://pomber.github.io/covid19/timeseries.json");
    const countries = await response.json();
    const country = countries[countryId].filter(({confirmed}) => confirmed > 0);
    const lastUpdateCountry = country[country.length - 1];
    const {confirmed, recovered, deaths, date} = lastUpdateCountry;

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

const useFromToFilter = (countryData = null) => {
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [marks, setMarks] = useState({});
    const [maxAmountOfDays, setMaxAmountOfDays] = useState(0);

    useEffect(() => {
        maxAmountOfDays = countryData.allData ? countryData.allData.length - 1 : 0;
        setTo(maxAmountOfDays);

        let labels = {};
        for (let i = from; i < maxAmountOfDays; i++) {
            labels[Number(i)] = `${i}d`;
        }
        setMarks(labels);

        console.log({marks, from, to});
    }, [countryData]);

    return [from, to, setFrom, setTo, maxAmountOfDays, marks];
};

const handleSliderChange = (setFrom, setTo) => ([from, to]) => {
    setFrom(from);
    setTo(to);
};

const Country = ({countryId}) => {
    const [data] = useCountryData(countryId);
    const [from, to, setFrom, setTo, maxAmountOfDays, marks] = useFromToFilter(data);

    return (
        <div>
            <Row justify="center" style={{margin: '1rem'}}>
                <Col align="center" span={16}>
                    <PageHeader title={`${flag(countryId)} ${countryId}`}/>
                </Col>
            </Row>
            <Row justify="center" style={{margin: '1rem'}}>
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
            <div>
                <Slider range marks={marks} max={maxAmountOfDays} defaultValue={[0, maxAmountOfDays]}/>
            </div>
            <Row justify="center" style={{margin: '1rem'}}>
                <Col span={16}>
                    <PageHeader title="Progression of total confirmed cases by day"
                                subTitle={`Last update: ${data.lastUpdate}`}/>
                    <Curve rawData={data.allData}/>
                </Col>
            </Row>
        </div>
    );
};

export default Country;
