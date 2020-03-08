import React from 'react';
import {StyledContent, StyledHeader} from "./styled";
import Content from "../content";

const Index = () => {
    return (
        <div>
            <StyledHeader>CORONA VIRUS STATISTICS</StyledHeader>
            <StyledContent>
               <Content/>
            </StyledContent>
        </div>
    );
};

export default Index;