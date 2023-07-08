import React from 'react';
import styled from 'styled-components';

const ButtonGroupContainer = styled.div`
    display: flex;
    flex-direction: row;

    > :first-child {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;

        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;

        box-shadow: none;
    }

    > :last-child {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;

        box-shadow: none;
    }

    > :not(:first-child):not(:last-child) {
        border-radius: 0;
        box-shadow: none;
    }
`;

const ButtonGroup = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ButtonGroupContainer>
            {children}
        </ButtonGroupContainer>
    );
};

export { ButtonGroup };