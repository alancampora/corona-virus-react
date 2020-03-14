import React from 'react';
import { StyledContent, StyledHeader } from './styled';
import Content from '../content';
import Header from '../header';

const Index = () => {
	return (
		<div>
			<StyledHeader>
				<Header />
			</StyledHeader>
			<StyledContent>
				<Content />
			</StyledContent>
		</div>
	);
};

export default Index;
