import React, { useMemo } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { fontColorFromBackground, generateID, lightenDarkenColor, mergeClasses, rgbFromHex } from './helpers';
import { AlignPositions, BorderRadius, ElementLength, LabelLength, LabelPositions, Option } from './types';
import { allColors } from './constants/colors';
import {
    getStepValue,
    getDefaultValue,
    parseUnavailableValues,
    calculateTooltipPosition,
    getOutlineColor
} from './helpers/sliderHelpers';

interface SliderContainerInterface {
    labelPosition?: LabelPositions
}
const SliderContainer = styled.div<SliderContainerInterface>`
    display: flex;
    vertical-align: middle;
    flex: 1;

    ${props => props.labelPosition === LabelPositions.vertical
        ? ` width: 100%;
            padding: 0.5em;
            `
        : 'padding: 0.25em 1em 0 0.25em;'}
`;

interface SliderAdvancedWrapperInterface {
    length: ElementLength,
    shadow?: boolean,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    borderRadius?: BorderRadius,
    labelPosition?: LabelPositions,
    align?: AlignPositions,
}

const SliderAdvancedWrapper = styled.div<SliderAdvancedWrapperInterface>`
    display: flex;
    ${props => props.labelPosition === LabelPositions.vertical ? `
        flex-direction: column;
        padding: 0 0.5em;
        align-items: ${props.align};
        justify-content: center;
    ` :`
        flex-direction: row;
        align-items: center;
        justify-content: ${props.align};
    `}
    min-width: 7em;
    width: ${props => props.length};
    height: ${props => props.labelPosition === LabelPositions.vertical ? '5.5em' : '3.5em'};
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
        ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : ''}
    }
`;

interface LabelProps {
    htmlFor: string,
    length: ElementLength,
    labelColor?: string,
    labelPosition?: LabelPositions,
    labelLength?: LabelLength
}

const SliderAdvancedLabel = styled.label<LabelProps>`
    display: flex;
    justify-content: flex-start;
    ${props => props.labelPosition === LabelPositions.horizontal
        ? 'flex: 0.2;'
        : ''}

    ${props => props.labelPosition === LabelPositions.horizontal
        ? 'padding: 0 1em'
        : 'padding-top: 0.5em;'};

    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.labelColor};
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    max-width: ${props => props.labelLength === LabelLength.auto
        ? props.length
        : props.labelLength};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const getSliderCursorStyles = (color: string, showSteps?: boolean) => (`
    width: 1em;
    height: 1em;
    border: 2px solid ${color};
    background: white;
    cursor: pointer;

    outline: none;
    
    border-radius: 18px;

    transition: outline 0.5s ease-in-out;

    ${showSteps
        ? 'margin-bottom: 0.75em;'
        : 'margin-top: 0.25em;'}

    &:hover {
        outline: ${getOutlineColor(lightenDarkenColor(color, 80))} solid 4px;
        transition: outline 0.5s ease-in-out;
    }
`);

interface SliderInputInterface {
    color: string,
    showSteps?: boolean
}

const SliderElementContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    color: #888;
`;

const SliderInput = styled.input<SliderInputInterface>`
    -webkit-appearance: none;
    width: 100%;
    height: 0.5em;
    border-radius: 5px;
    background: ${allColors['Platinum']};
    outline: none;

    padding-bottom: 0.25em;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        ${({color, showSteps}) => getSliderCursorStyles(color, showSteps)}
    }
    &::-moz-range-thumb {
        ${({color, showSteps}) => getSliderCursorStyles(color, showSteps)}
    }
`;

interface SliderDataListInterface {
    showValue: boolean;
}

const SliderDataList = styled.datalist<SliderDataListInterface>`
    display: flex;
    justify-content: space-between;
    height: 0.75em;
    overflow: hidden;
    padding-left: 0.25em;
    padding-right: 0.075em;
    color: ${props => props.color};

    ${(props) => props.showValue ? `
        font-size: 8px;
        height: 1em;
    ` : ''}
`;

const SliderDataListOption = styled.option`
    :before {
        content: '';
        display: block;
        width: 0;
        height: auto;
        padding-left: 3px;
        text-indent: 0;
    }
`;

const SliderTooltip = styled.output`
    padding: 0.25em 0.5em;
    position: absolute;
    border-radius: 4px;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -2.25em;
    min-width: 2em;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.5s, opacity 0.5s;

    background-color: ${props => props.color};
    color: ${props => fontColorFromBackground(props.color as string)};
    text-align: center;
    border-radius: 6px;

    left: ${({left}: {left: string}) => left};

    ::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: ${props => props.color} transparent transparent transparent;
    }
`;

const SliderInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    position: relative;

    &:hover ${SliderTooltip} {
        visibility: visible;
        opacity: 1;
        transition: opacity 0.5s;
    }
`;

interface SliderValueInterface {
    length: ElementLength,
    labelPosition?: LabelPositions,
    showSteps?: boolean
}
const SliderValue = styled.div<SliderValueInterface>`
    ${props => props.labelPosition === LabelPositions.horizontal
        ? 'align-items: flex-start;'
        : `align-items: center;
            padding-bottom: ${props.showSteps ? '1em' : '0'};
        `}
    font-size: ${({length}) =>
        length === ElementLength.l || length === ElementLength.full ? '14px' : '11px'};
    color: ${props => props.color};
    padding-right: 0.5em;
    display: flex;
    width: ${({length}) =>
        length === ElementLength.l || length === ElementLength.full ? '2em' : '1.5em'};
`;

interface SliderProps {
    className: string,
    value: string | number,
    cursorColor: string,
    label: string,
    labelPosition?: LabelPositions,
    shadow?: boolean,
    length: ElementLength,
    min: number,
    max: number,
    step: number,
    options: Array<Option>,
    showValue: boolean,
    showTooltip: boolean,
    showStepValue: boolean,
    showSteps: boolean,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    borderRadius?: BorderRadius,
    labelColor?: string,
    hideLabel?: boolean,
    labelLength?: LabelLength,
    align?: AlignPositions,
    onChange: (v: string | number) => void
}

interface SliderElementInterface {
    className: string,
    value: string | number,
    cursorColor: string,
    min: number,
    max: number,
    step: number,
    options: Array<Option>,
    id: string,
    showValue: boolean,
    showTooltip: boolean,
    showStepValue: boolean,
    showSteps: boolean,
    length: ElementLength,
    labelPosition?: LabelPositions,
    onChange: (v: string | number) => void
}


function SliderElement({
    labelPosition,
    value: valueFromProps,
    cursorColor,
    min,
    max,
    step,
    id,
    options,
    showValue,
    showTooltip,
    showStepValue,
    length,
    showSteps,
    onChange
}: SliderElementInterface) {
    // Calculate default slider value
    const defaultValue = getDefaultValue(valueFromProps, min, options);
    const [value, setValue] = useState(defaultValue);

    const onSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(newValue);
    }, [onChange]);

    useEffect(() => {
        setValue(getDefaultValue(valueFromProps, min, options));
    }, [min, options, valueFromProps]);

    const {
        newStep,
        newMax,
        newMin
    } = parseUnavailableValues(min, max, step);

    const steps = useMemo(() => {
        const nOfSteps = options.length !== 0 ? options.length : Math.floor((newMax - newMin) / newStep);
        return (<SliderDataList
            className="ie-slider__element__slider__data-list"
            id={id}
            color={cursorColor}
            showValue={showStepValue}
        >
            {Array.from(Array(nOfSteps)).map((e, i) => (
                <SliderDataListOption
                    className="ie-slider__element__slider__data-list__option"
                    value={options.length !== 0 ? options[i].value as string | number : getStepValue(newMin, newStep, i)}
                    key={`${e}_${i}`}
                >
                    {`${showStepValue
                        ? options.length !== 0
                            ? options[i].label
                            : getStepValue(newMin, newStep, i)
                        : '|'}`
                    }
                </SliderDataListOption>
            ))}
            <SliderDataListOption
                className="ie-slider__element__slider__data-list__option"
                value={options.length !== 0
                    ? options[options.length - 1].value as string | number
                    : newMax
                }>
                {`${showStepValue
                    ? options.length !== 0
                        ? options[options.length - 1].label
                        : newMax
                    : '|'}`
                }
            </SliderDataListOption>
        </SliderDataList>);
    }, [cursorColor, id, newMax, newMin, newStep, options, showStepValue]);

    return (<SliderContainer
        labelPosition={labelPosition}
        className="ie-slider__element"
    >
        {showValue && (
            <SliderValue
                className="ie-slider__element__value"
                length={length}
                color={cursorColor}
                labelPosition={labelPosition}
                showSteps={showSteps}
            >
                {value}
            </SliderValue>
        )}
        <SliderElementContainer
            className="ie-slider__element__slider"
        >
            <SliderInputWrapper
            >
                <SliderInput
                    className="ie-slider__element__slider__input"
                    name={id}
                    color={cursorColor}
                    type="range"
                    step={newStep}
                    min={newMin}
                    max={newMax}
                    value={value}
                    list={id}
                    showSteps={showSteps}
                    onChange={onSliderChange}
                />
                {showTooltip && (
                    <SliderTooltip
                        className="ie-slider__element__slider__tooltip"
                        htmlFor={id}
                        left={calculateTooltipPosition(newMin, newMax, value)}
                        color={cursorColor}
                    >
                        {value}
                    </SliderTooltip>
                )}
                {showSteps && (
                    steps
                )}
            </SliderInputWrapper>
        </SliderElementContainer>
    </SliderContainer>);
}

function Slider(props: SliderProps) {
    const {
        className,
        value,
        label,
        labelPosition,
        labelLength,
        shadow,
        length,
        align,
        cursorColor,
        min,
        max,
        step,
        options,
        showValue,
        showTooltip,
        borderColor,
        showBorders,
        hideBottomBorder,
        borderRadius,
        showStepValue,
        showSteps,
        labelColor,
        hideLabel,
        onChange
    } = props;

    const id = useRef(generateID());

    return (
        <SliderAdvancedWrapper
            align={align}
            shadow={shadow}
            length={length}
            borderColor={borderColor}
            showBorders={showBorders}
            hideBottomBorder={hideBottomBorder}
            borderRadius={borderRadius}
            labelPosition={labelPosition}
            className={mergeClasses('ie-slider', className)}
        >
            {hideLabel ? null : (
                <SliderAdvancedLabel
                    className="ie-slider__label"
                    htmlFor={id.current}
                    length={length}
                    labelColor={labelColor}
                    labelPosition={labelPosition}
                    labelLength={labelLength}
                >
                    {label}
                </SliderAdvancedLabel>
            )}
            <SliderElement
                labelPosition={labelPosition}
                value={value}
                cursorColor={cursorColor}
                min={min}
                max={max}
                step={step}
                options={options}
                id={id.current}
                showValue={showValue}
                showTooltip={showTooltip}
                showStepValue={showStepValue}
                showSteps={showSteps}
                length={length}
                onChange={onChange}
            />
        </SliderAdvancedWrapper>
    );
}

const defaultProps: SliderProps = {
    className: '',
    value: '',
    cursorColor: allColors['Dim Gray'],
    label: 'Label',
    shadow: true,
    labelPosition: LabelPositions.horizontal,
    labelLength: LabelLength.auto,
    align: AlignPositions.center,
    min: 0,
    max: 100,
    step: 20,
    options: [],
    length: ElementLength.xl,
    showValue: true,
    showTooltip: true,
    borderColor: allColors['Silver Sand'],
    showBorders: false,
    hideBottomBorder: false,
    borderRadius: BorderRadius.no,
    showStepValue: false,
    showSteps: true,
    labelColor: allColors['Dim Gray'],
    hideLabel: false,
    onChange: () => {}
};

Slider.defaultProps = defaultProps;
SliderElement.defaultProps = defaultProps;

export { SliderElement, Slider };
export type { SliderProps };
