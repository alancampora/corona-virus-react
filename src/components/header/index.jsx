import React from 'react';
import { StyledTitle, StyledNav, StyledNavItem } from './styled';
import Search from '../search';

//<StyledNav>
//<StyledNavItem>home</StyledNavItem>
//<StyledNavItem>taking care</StyledNavItem>
//<StyledNavItem>statistics</StyledNavItem>
//</StyledNav>
const Header = () => {
	return (
		<div>
			<StyledTitle> Corona Virus Statistics </StyledTitle>
			<div>
				<Search />
			</div>
		</div>
	);
};

export default Header;
