import React, { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { allColors } from './constants/colors';
import { mergeClasses } from './helpers';
import { BadgePositions, BorderRadius, ElementSize } from './types';

const calculateBadgePosition = (position: BadgePositions) => {
    switch (position) {
        case BadgePositions.bottomLeft:
            return `
                bottom: 0;
                left: 0;
                transform: scale(1) translate(-50%, 50%);
            `;
        case BadgePositions.bottomRight:
            return `
                bottom: 0;
                right: 0;
                transform: scale(1) translate(50%, 50%);
            `;
        case BadgePositions.topLeft:
            return `
                top: 0;
                left: 0;
                transform: scale(1) translate(-50%, -50%);
            `;
        case BadgePositions.topRight:
            return `
                top: 0;
                right: 0;
                transform: scale(1) translate(50%, -50%);
            `;
    }
};

const BadgeContainer = styled.span`
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
`;

const BadgeElement = styled.span<BadgeElementInterface>`
    position: absolute;
    display: flex;
    place-content: center;
    -webkit-box-align: center;
    align-items: center;
    padding: ${props => props.showAsDot || props.content === ''
        ? '0 0.35em 0 0.35em'
        : '0 0.5em 0 0.5em'};
    background-color: ${props => props.background};
    color: ${props => props.color};
    font-size: ${props => props.size};
    border-radius: ${BorderRadius.xl};
    font-weight: 500;
    z-index: 1;
    height: ${props => props.showAsDot || props.content === '' ? '0.75em' : '1.5em'};
    ${props => props.outline ? 'outline: solid;' : ''}
    ${props => calculateBadgePosition(props.position)}
`;

interface BadgeElementInterface {
    content: string,
    background: string,
    color: string,
    size: ElementSize,
    position: BadgePositions,
    outline: boolean,
    showAsDot: boolean
}

interface BadgeProps {
    content: string,
    background: string,
    color: string,
    size: ElementSize,
    children: ReactElement | null,
    position: BadgePositions,
    outline: boolean,
    showWhenZero: boolean,
    showBadge: boolean,
    maxValue: number
    showAsDot: boolean,
    className: string
}

const Badge = ({
    content,
    background,
    color,
    size,
    position,
    children,
    outline,
    showWhenZero,
    showBadge,
    maxValue,
    showAsDot,
    className
}: BadgeProps) => {
    const shouldShowBadge = useMemo(() => showBadge
        && (parseInt(content) === 0
            ? showWhenZero
            : true
        ), [content, showBadge, showWhenZero]
    );
    const currentContent = useMemo(() => showAsDot
        ? ''
        : parseInt(content) > maxValue
            ? `${maxValue}+`
            : content,
    [content, maxValue, showAsDot]);

    return (
        <BadgeContainer
            className={mergeClasses(className, 'ie-badge')}
        >
            {children}
            {shouldShowBadge && <BadgeElement
                className="ie-badge__element"
                content={content}
                background={background}
                color={color}
                size={size}
                position={position}
                outline={outline}
                showAsDot={showAsDot}
            >
                {currentContent}
            </BadgeElement>}
        </BadgeContainer>
    );
};

Badge.defaultProps = {
    content: '',
    background: allColors['Teal'],
    color: allColors['White'],
    size: ElementSize.xs,
    position: BadgePositions.topRight,
    outline: false,
    showWhenZero: false,
    showBadge: true,
    maxValue: 99,
    showAsDot: false,
    children: null,
    className: ''
};

export { Badge };
export type { BadgeProps };
