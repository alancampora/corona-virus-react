import React from 'react';
import { StyledTitle, StyledNav, StyledNavItem} from './styled';

const Header = () => {
	return (
		<div>
			<StyledTitle> Beating Corona Virus </StyledTitle>
			<StyledNav>
				<StyledNavItem>home</StyledNavItem>
				<StyledNavItem>taking care</StyledNavItem>
				<StyledNavItem>statistics</StyledNavItem>
			</StyledNav>
		</div>
	);
};

export default Header;
