import React from 'react';
import styled from 'styled-components';
import { allColors } from './constants/colors';
import { mergeClasses } from './helpers';
import { Icon, IconList } from './Icon';
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

const buildKeyframesAnimation = (steps: SpinnerSteps) => {
    const numberOfSteps = (steps - 1);
    const degreeStep = 360 / numberOfSteps;
    const percentStep = 100 / numberOfSteps;

    let animationSteps = '';

    Array.from(Array(numberOfSteps)).forEach((e, i) => {
        animationSteps = `${animationSteps}
        ${percentStep * i}% {
            transform: rotate(${degreeStep * i}deg);
        }
        `;
    });

    return `
    @keyframes spin-animation {
    ${animationSteps}
        100% {
            transform: rotate(359deg);
        }
    }`;
};

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