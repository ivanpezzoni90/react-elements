import React from 'react';
import styled from 'styled-components';
import { allColors } from './constants/colors';
import { IconList } from './constants/icons';
import { mergeClasses } from './helpers';
import { buildKeyframesAnimation } from './helpers/spinnerHelpers';
import { Icon } from './Icon';
import { IconSize, SpinnerSpeed, SpinnerSteps } from './types';


interface SpinnerContainerInterface {
    animation: string,
    speed: SpinnerSpeed
}
const SpinnerContainer = styled.div<SpinnerContainerInterface>`
    animation: spin-animation ${props => props.speed} infinite;
    display: inline-block;

    ${props => props.animation}
`;

interface SpinnerProps {
    icon?: IconList,
    fontSize?: IconSize,
    color?: string,
    speed: SpinnerSpeed,
    steps: SpinnerSteps,
    className: string
}

const Spinner = ({
    icon,
    color,
    fontSize,
    speed,
    steps,
    className
}: SpinnerProps) => {
    const animation = buildKeyframesAnimation(steps);
    console.log(animation);
    return (
        <SpinnerContainer
            className={mergeClasses('ie-spinner', className)}
            animation={animation}
            speed={speed}
        >
            <Icon   
                className="ie-spinner__icon"
                icon={icon}
                color={color}
                fontSize={fontSize}
            />
        </SpinnerContainer>
    );
};

const defaultProps: SpinnerProps = {
    className: '',
    icon: IconList.spinner,
    color: allColors['Dim Gray'],
    fontSize: IconSize.m,
    speed: SpinnerSpeed.normal,
    steps: SpinnerSteps.continuous
};

Spinner.defaultProps = defaultProps;

export { Spinner };