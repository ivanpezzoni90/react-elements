import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { allColors } from '../../lib/constants/colors';

const Container = styled.div`
    padding: 2em 1em 2em 1em;
    border-bottom: 1px solid ${allColors['Dim Gray']};
    display: flex;
    justify-content: center;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    min-width: 40em;
`;
export const ElementContainer = ({children}: {children: ReactElement}) => (
    <Container
        className="ie__workarea__element"
    >
        <Wrapper
            className="ie__workarea__element__wrapper"
        >
            {children}
        </Wrapper>
    </Container>
);
