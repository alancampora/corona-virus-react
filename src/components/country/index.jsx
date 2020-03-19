import React, {useEffect, useState} from 'react';
import progessionData from './data';
import Curve from '../graphs/curve';
import {PageHeader, Row, Col, Card} from 'antd';
import {flag} from 'country-emoji';
import {Progress} from 'antd';

const fixKeys = {
    China: 'Mainland China',
};

async function getCountryData(countryId) {
    if (!progessionData[countryId]) return {};

    const keys = Object.keys(progessionData[countryId]);
    const lastUpdate = keys[keys.length - 1];
    const {confirmed, recovered, deaths} = progessionData[countryId][lastUpdate];

    return {
        lastUpdate,
        confirmed,
        recovered: {
            value: recovered,
            percent: Math.round((recovered / confirmed) * 100),
        },
        deaths: {
            value: deaths,
            percent: Math.round((deaths / confirmed) * 100),
        },
    };
}

const useCountryData = countryId => {
    const [data, setData] = useState({});
    useEffect(() => {
        getCountryData(countryId).then(result => setData(result));
    }, [countryId]);

    return [data];
};
const Country = ({countryId}) => {
    const [data] = useCountryData(countryId);
    const overrideKey = fixKeys[countryId] ? fixKeys[countryId] : countryId;
    const countryData = progessionData[overrideKey];
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
            <Row justify="center" style={{margin: '1rem'}}>
                <Col span={16}>
                    <PageHeader title="Progression of total confirmed cases by day" subTitle={`Last update: ${data.lastUpdate}`}/>
                    <Curve rawData={countryData}/>
                </Col>
            </Row>
        </div>
    );
};

export default Country;
