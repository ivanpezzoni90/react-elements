import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { allColors } from './constants/colors';
import { IconList } from './constants/icons';
import { generateID, mergeClasses } from './helpers';
import { Icon } from './Icon';
import { AlignPositions, BorderRadius, Cursors, IconSize, LabelLength, LabelPositions } from './types';

interface RatingContainerInterface {
    hideLabel: boolean
}

const RatingContainer = styled.div<RatingContainerInterface>`
    display: flex;
    align-items: center;
    padding: 0 1em 0 ${props => props.hideLabel ? '1em' : '0.25em'};
`;


interface RatingAdvancedWrapperInterface {
    shadow?: boolean,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    align?: AlignPositions,
    borderRadius?: BorderRadius,
    labelPosition?: LabelPositions,
}
const RatingAdvancedWrapper = styled.div<RatingAdvancedWrapperInterface>`
    display: flex;
    ${props => props.labelPosition === LabelPositions.vertical ? `
        flex-direction: column;
        padding-left: 0.5em;
        padding-bottom: 0.25em;
        align-items: ${props.align};
        justify-content: center;
    ` :`
        flex-direction: row;
        justify-content: ${props.align};
        align-items: center;
    `}
    min-width: 7em;
    height: ${props => props.labelPosition === LabelPositions.vertical ? '4em' : '3.5em'};
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: ${props => props.borderRadius};
    ${(props) => props.hideBottomBorder ? '' : `border-bottom: 1px solid ${props.borderColor};`}
    ${(props) => props.showBorders ? `border: 1px solid ${props.borderColor}` : ''};
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    background-color: #ffffff;
    ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);' : ''}

    &:hover{
        background-color: rgba(255, 255, 255, 0.45);
        ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px  rgba(0, 0, 0, 0.05);' : ''}
    }
`;

interface LabelProps {
    htmlFor: string
    labelColor?: string,
    labelPosition?: LabelPositions,
    labelLength?: LabelLength
}

const RatingAdvancedLabel = styled.label<LabelProps>`
    display: flex;
    justify-content: flex-start;
    flex: 1;
    padding: 0 1em 0 ${props => props.labelPosition === LabelPositions.horizontal ? '1em' : '0'};
    align-items: center;

    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.labelColor};
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    ${props => props.labelLength === LabelLength.auto
        ? ''
        : `max-width: ${props.labelLength};`}
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

interface RatingItemInterface {
    active: boolean;
}

const RatingItem = styled.div<RatingItemInterface>`
    padding-right: 0.25em;
    ${props => props.active ? 'transform: scale(1.2);' : ''}
`;

interface RatingComponentProps {
    defaultValue: number,
    size: IconSize,
    length: number,
    iconSelected: IconList,
    iconNotSelected: IconList,
    iconHalf: IconList,
    displayHalfValue: boolean,
    highlightSelectedOnly: boolean,
    colorSelected: string,
    colorNotSelected: string,
    hideLabel?: boolean
    onSelectRating: (newRating: number) => void,
}

const RatingComponent = ({
    defaultValue,
    size,
    length,
    iconSelected,
    iconNotSelected,
    iconHalf,
    displayHalfValue,
    highlightSelectedOnly,
    colorSelected,
    colorNotSelected,
    hideLabel,
    onSelectRating
}: RatingComponentProps) => {
    const [selectedRating, setSelectedRating] = useState(defaultValue);
    const [currentHoverRating, setCurrentHoverRating] = useState(selectedRating);
    const [currentItemHovered, setCurrentItemHovered] = useState(0);

    const onMouseMoveCb = (rating: number) => {
        return (e: React.MouseEvent<HTMLElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const halfWidth = rect.width / 2;
            const x = e.clientX - rect.left;

            let newRating = rating;

            if (x <= halfWidth) {
                newRating = rating - 0.5;
            }

            if (newRating !== currentHoverRating) {
                setCurrentHoverRating(newRating);
            }
        };
    };

    const onMouseEnterCb = useCallback((n: number) => {
        return () => {
            setCurrentItemHovered(n);
            if (!displayHalfValue) {
                // Set new hover rating on mouse enter when shouldn't display half
                setCurrentHoverRating(n);
            }
        };
    }, [displayHalfValue]);

    const onLeaveContainerCb = useCallback(() => {
        // Reset rating on leave
        setCurrentHoverRating(selectedRating);
        setCurrentItemHovered(0);
    }, [selectedRating]);

    const onSelectRatingCb = useCallback((rating: number) => {
        return () => {
            setSelectedRating(rating);
            onSelectRating(rating);
        };
    }, [onSelectRating]);

    const isItemActive = useCallback((n: number) => {
        return currentItemHovered === n;
    }, [currentItemHovered]);

    const isValueSelected = useCallback((n: number) => {
        if (highlightSelectedOnly) {
            return currentHoverRating === n;
        }
        return currentHoverRating >= n;
    }, [currentHoverRating, highlightSelectedOnly]);

    const getCorrectValue = useCallback((n: number) => {
        return displayHalfValue ? n - 0.5 : n;
    }, [displayHalfValue]);

    const getCorrectIcon = useCallback((n: number) => {
        const value = getCorrectValue(n);
        if (isValueSelected(value)) {
            const active = isItemActive(n);
            return active
                // When active, set icon full when hover rating is integer, half otherwise
                ? Number.isInteger(currentHoverRating)
                    ? iconSelected
                    : iconHalf
                // When not active, set icon half only when
                // selected rating is a half value
                // current icon is the one that should display as half
                // nothing is being hovered (currentItemHovered = 0)
                : !Number.isInteger(selectedRating) && value === selectedRating && currentItemHovered === 0
                    ? iconHalf
                    : iconSelected;

        }
        return iconNotSelected;
    }, [
        currentHoverRating,
        selectedRating,
        currentItemHovered,
        iconNotSelected,
        iconSelected,
        iconHalf,
        isItemActive,
        isValueSelected,
        getCorrectValue
    ]);

    const ratingArray = Array.from({length}, (x, i) => i + 1);

    return (
        <RatingContainer
            data-value={selectedRating}
            className="ie-rating__element"
            hideLabel={!!hideLabel}
            onMouseLeave={onLeaveContainerCb}
        >
            {ratingArray.map((n) => {
                return (
                    <RatingItem
                        className="ie-rating__element__item"
                        active={currentItemHovered === n}
                        key={`rating-${n}`}
                        onMouseMove={displayHalfValue
                            ? onMouseMoveCb(n)
                            : undefined
                        }
                        onMouseEnter={onMouseEnterCb(n)}
                    >
                        <Icon
                            className="ie-rating__element__item__icon"
                            fontSize={size}
                            color={isValueSelected(getCorrectValue(n))
                                ? colorSelected
                                : colorNotSelected
                            }
                            cursor={Cursors.pointer}
                            icon={getCorrectIcon(n)}
                            onClick={onSelectRatingCb(currentHoverRating)}
                        />
                    </RatingItem>
                );
            })}
        </RatingContainer>
    );
};

interface RatingProps {
    className: string,
    label?: string,
    labelPosition?: LabelPositions,
    align?: AlignPositions,
    onChange: (r: number) => void,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    labelColor?: string,
    hideLabel?: boolean,
    borderRadius?: BorderRadius,
    labelLength?: LabelLength,
    shadow?: boolean,
    defaultValue: number,
    size: IconSize,
    length: number,
    iconSelected: IconList,
    iconNotSelected: IconList,
    iconHalf: IconList,
    displayHalfValue: boolean,
    highlightSelectedOnly: boolean,
    colorSelected: string,
    colorNotSelected: string,
}

const Rating = (props: RatingProps) => {
    const {
        className,
        label,
        labelPosition,
        labelLength,
        align,
        shadow,
        borderColor,
        showBorders,
        hideBottomBorder,
        borderRadius,
        labelColor,
        hideLabel,
        defaultValue,
        size,
        length,
        iconSelected,
        iconNotSelected,
        iconHalf,
        displayHalfValue,
        highlightSelectedOnly,
        colorSelected,
        colorNotSelected,
        onChange
    } = props;

    const id = useRef(generateID());

    return (
        <RatingAdvancedWrapper
            align={align}
            shadow={shadow}
            borderColor={borderColor}
            showBorders={showBorders}
            hideBottomBorder={hideBottomBorder}
            borderRadius={borderRadius}
            labelPosition={labelPosition}
            className={mergeClasses('ie-rating', className)}
        >
            {hideLabel ? null : (
                <RatingAdvancedLabel
                    className="ie-rating__label"
                    htmlFor={id.current}
                    labelColor={labelColor}
                    labelPosition={labelPosition}
                    labelLength={labelLength}
                >
                    {label}
                </RatingAdvancedLabel>
            )}
            <RatingComponent
                defaultValue={defaultValue}
                size={size}
                length={length}
                iconSelected={iconSelected}
                iconNotSelected={iconNotSelected}
                iconHalf={iconHalf}
                displayHalfValue={displayHalfValue}
                highlightSelectedOnly={highlightSelectedOnly}
                colorSelected={colorSelected}
                colorNotSelected={colorNotSelected}
                onSelectRating={onChange}
                hideLabel={hideLabel}
            />
        </RatingAdvancedWrapper>
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
    colorNotSelected: allColors['Dim Gray'],
    className: '',
    label: 'Label',
    labelPosition: LabelPositions.horizontal,
    shadow: true,
    align: AlignPositions.center,
    borderColor: allColors['Silver Sand'],
    showBorders: false,
    hideBottomBorder: false,
    borderRadius: BorderRadius.no,
    labelColor: allColors['Dim Gray'],
    hideLabel: false,
    labelLength: LabelLength.auto,
    displayHalfValue: false,
    iconHalf: IconList.starHalf,
    onChange: () => {}
};

export {
    Rating,
    RatingProps
};