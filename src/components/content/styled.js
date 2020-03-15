import styled from 'styled-components';

export const StyledWrapper = styled.div`
	background: #ececec2e;
	padding: 30px;
`;

export const StyledCard = styled.div`
	width: 25%;
	padding: 10px;
	margin: 10px;
	background-color: #edcaca4d;
`;

export const StyledCardName = styled.h2`
	text-align: center;
`;

export const StyledInformation = styled.p`
	text-align: center;
	font-size: 1.5em;
`;

export const StyledTotalsWrapper = styled.p`
	display: flex;
	flex-wrap: wrap;
	-webkit-box-pack: center;
	justify-content: center;
`;

export const StyledTotalCard = styled.div`
	border-radius: 10px;
	background: ${props => props.backgroundColor};
	text-align: center;
	padding: 10px;
	margin: 10px;
	width: 25%;
	word-break: break-word;
`;

export const StyledFilters = styled.div`
	padding: 1rem;
	max-width: 250px;
`;
