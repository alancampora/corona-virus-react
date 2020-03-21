const transformDate = date => {
	const [_, __, month, day] = date.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
	return `${month}-${day}`;
};

export const getNewDeathsByDay = (daysData = []) =>
	console.log({ daysData }) ||
	daysData.reduce((acum, current, index, data) => {
		console.log({ acum, current });
		const prevCountryData = acum[acum.length - 1];
		console.log({ acum, current, index, prevCountryData });

		if (!prevCountryData) {
			//first value
			acum.push({
				date: transformDate(current.date),
				deaths: current.deaths,
				newDeaths: current.deaths,
			});
			return acum;
		}

		if (prevCountryData && prevCountryData.deaths === current.deaths) {
			return acum;
		}

		const newDeaths = current.deaths - prevCountryData.deaths;
		console.log({ current, prevCountryData, newDeaths });

		acum.push({
			date: transformDate(current.date),
			deaths: current.deaths,
			newDeaths,
		});

		return acum;
	}, []);
