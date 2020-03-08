import React, {useLayoutEffect, useState} from 'react';
import {flag} from 'country-emoji';
import {
    StyledWrapper,
    StyledCard,
    StyledCardName,
    StyledInformation,
    StyledTotalsWrapper,
    StyledTotalCard,
    StyledFilters,
} from './styled';


function getTotal(data, prop) {
    return data.reduce((acum, country) => {
        acum += country[prop];
        return acum;
    }, 0);
}

function useGetCoronaVirusData() {
    // get corona virus data from api
    // transform data
    // get totals

    const [countries, setCountries] = useState([]);
    const [totals, setTotals] = useState({});

    useLayoutEffect(() => {

        const getData = async () => {
            const data = await fetch(
                'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=200&cacheHint=true');
            const countriesData = await data.json();
            const formattedData = countriesData.features.map(f => f.attributes).map(f => ({
                name: f.Country_Region,
                coordinates: [f.Lat, f.Long_],
                confirmed: f.Confirmed,
                deaths: f.Deaths,
                recovered: f.Recovered,
            }));

            const totalDeaths = getTotal(formattedData, 'deaths');
            const totalConfirmed = getTotal(formattedData, 'confirmed');
            const totalRecovered = getTotal(formattedData, 'recovered');

            setTotals({
                deaths: totalDeaths,
                confirmed: totalConfirmed,
                recovered: totalRecovered,
            })
            setCountries(formattedData);
        };

        getData();
    }, []);

    return [countries, totals];
};

const Content = () => {
    const [countries, totals] = useGetCoronaVirusData();
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
            <StyledWrapper>
                {
                    countries
                        .map(({name, confirmed, deaths, recovered}) => (
                            <StyledCard>
                                <StyledCardName>{flag(name)} {name}</StyledCardName>
                                <StyledInformation>{"🤒" + `${confirmed}`}</StyledInformation>
                                <StyledInformation>{"💀" + `${deaths}`}</StyledInformation>
                                <StyledInformation>{"😃" + `${recovered}`}</StyledInformation>
                            </StyledCard>

                        ))
                }
            </StyledWrapper>
        </div>

    );
};

export default Content;