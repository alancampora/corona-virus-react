const transformDate = date => {
	const [_, __, month, day] = date.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
	return `${month}-${day}`;
};

export const getNewDeathsByDay = (data = []) =>
	adaptDataByDay(data, 'deaths', 'newDeaths');

export const getNewConfirmedByDay = (data = []) => console.log({data}) || 
	adaptDataByDay(data, 'confirmed', 'newConfirmed');

export const adaptDataByDay = (daysData = [], prop, newAmountProp) =>
	daysData.reduce((acum, current, index, data) => {
		const prevCountryData = acum[acum.length - 1];

		if (!prevCountryData) {
			//first value
			acum.push({
				date: transformDate(current.date),
				[prop]: current[prop],
				[newAmountProp]: current[prop],
			});
			return acum;
		}

		if (prevCountryData && prevCountryData[prop] === current[prop]) {
			return acum;
		}

		const newAmount = current[prop] - prevCountryData[prop];

		acum.push({
			date: transformDate(current.date),
			[prop]: current[prop],
			[newAmountProp]: newAmount,
		});

		return acum;
	}, []);
