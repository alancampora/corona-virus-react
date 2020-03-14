import React from 'react';
import { useSearch } from '../../hooks';
import { StyledInput } from './styled';

const Search = () => {
	const { setSearch } = useSearch();

	const search = element => setSearch(element.target.value);

	return (
		<div>
			<StyledInput type="search" placeholder="country name" onChange={search} />
		</div>
	);
};

export default Search;
