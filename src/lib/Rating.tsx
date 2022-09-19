import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { allColors } from './constants/colors';
import { IconList } from './constants/icons';
import { Icon } from './Icon';
import { Cursors, IconSize } from './types';

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
`;

interface RatingItemInterface {
    active: boolean;
}

const RatingItem = styled.div<RatingItemInterface>`
    padding-right: 0.25em;
    ${props => props.active ? 'transform: scale(1.2);' : ''}
`;

interface RatingProps {
    defaultValue: number,
    size: IconSize,
    length: number,
    iconSelected: IconList,
    iconNotSelected: IconList,
    highlightSelectedOnly: boolean,
    colorSelected: string,
    colorNotSelected: string,
}

const Rating = ({
    defaultValue,
    size,
    length,
    iconSelected,
    iconNotSelected,
    highlightSelectedOnly,
    colorSelected,
    colorNotSelected
}: RatingProps) => {
    const [selectedRating, setSelectedRating] = useState(defaultValue);
    const [currentHoverRating, setCurrentHoverRating] = useState(selectedRating);
    const [currentItemHovered, setCurrentItemHovered] = useState(0);

    const onMouseEnterCb = useCallback((rating: number) => {
        return (e: any) => {
            console.log('Hovered on star n ', rating);
            setCurrentHoverRating(rating);
            setCurrentItemHovered(rating);
        };
    }, []);

    const onLeaveContainerCb = useCallback((e: any) => {
        // Reset rating on leave
        setCurrentHoverRating(selectedRating);
        setCurrentItemHovered(0);
    }, [selectedRating]);

    const onSelectRating = useCallback((rating: number) => {
        return () => {
            setSelectedRating(rating);
        };
    }, []);

    const isItemSelected = useCallback((n: number) => {
        if (highlightSelectedOnly) {
            return currentHoverRating === n;
        }
        return currentHoverRating >= n;
    }, [currentHoverRating, highlightSelectedOnly]);

    const ratingArray = Array.from({length}, (x, i) => i + 1);
    return (
        <RatingContainer
            onMouseLeave={onLeaveContainerCb}
        >
            {ratingArray.map((n) => {
                return (
                    <RatingItem
                        active={currentItemHovered === n}
                        key={n}
                        onMouseEnter={onMouseEnterCb(n)}
                    >
                        <Icon
                            fontSize={size}
                            color={isItemSelected(n) ? colorSelected : colorNotSelected}
                            cursor={Cursors.pointer}
                            icon={isItemSelected(n) ? iconSelected : iconNotSelected}
                            onClick={onSelectRating(n)}
                        />
                    </RatingItem>
                );
            })}
        </RatingContainer>
    );
};

Rating.defaultProps = {
    defaultValue: 0,
    size: IconSize.m,
    length: 5,
    iconSelected: IconList.starFill,
    iconNotSelected: IconList.star,
    highlightSelectedOnly: false,
    colorSelected: allColors['Cyber Yellow'],
    colorNotSelected: allColors['Dim Gray']
};

export {
    Rating
};