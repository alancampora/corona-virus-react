import { getNewDeathsByDay } from './helpers';

describe('Country', () => {
	it('should get new 3 death numbers', () => {
		const mockInput = [
			{
				date: '2020-1-22',
				deaths: 0,
			},
			{
				date: '2020-1-23',
				deaths: 2,
			},
			{
				date: '2020-1-24',
				deaths: 2,
			},
			{
				date: '2020-1-25',
				deaths: 3,
			},
      {
				date: '2020-1-26',
				deaths: 4,
			},
		];
		const expected = [
			{
				date: '1-22',
				deaths: 0,
				newDeaths: 0,
			},
			{
				date: '1-23',
				deaths: 2,
				newDeaths: 2,
			},
			{
				date: '1-25',
				deaths: 3,
				newDeaths: 1,
			},
      {
				date: '1-26',
				deaths: 4,
				newDeaths: 1,
			},
		];

		const result = getNewDeathsByDay(mockInput);

		expect(result).toEqual(expected);
	});
});
