import React, { ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { fontColorFromBackground, generateID, mergeClasses } from './helpers';
import {
    BorderRadius,
    Cursors,
    ElementLength,
    ElementPosition,
    ElementSize,
    LabelLength,
    LabelPositions,
    Option,
    Padding,
    Positions,
    RadioTypes
} from './types';
import { CheckboxElement } from './Checkbox';
import { SwitchToggleElement } from './SwitchToggle';
import { Icon } from './Icon';
import { allColors } from './constants/colors';
import { IconList } from './constants/icons';
import { ButtonGroup } from './ButtonGroup';
import { Button } from './Button';

interface LabelProps {
    htmlFor: string,
    labelColor?: string,
    labelPosition?: LabelPositions,
    labelLength?: LabelLength
}

const Label = styled.div<LabelProps>`
    display: flex;
    justify-content: flex-start;
    ${props => props.labelPosition === LabelPositions.vertical ? 'flex: 1;' : 'align-items: center;'}
    padding: 0 1em 0 0.5em;
    max-width: ${props => props.labelLength};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.labelColor};
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;
`;
interface RadioWrapperInterface {
    labelPosition?: LabelPositions,
    hideBottomBorder?: boolean,
    borderColor?: string
}
const RadioWrapper = styled.div<RadioWrapperInterface>`
    display: flex;
    flex-direction: ${props => props.labelPosition === LabelPositions.horizontal ? 'row' : 'column'};
    padding: 0.5em;
    ${(props) => props.hideBottomBorder ? '' : `border-bottom: 1px solid ${props.borderColor};`}
`;

interface RadioContainerInterface {
    position: Positions,
}
const RadioContainer = styled.div<RadioContainerInterface>`
    display: flex;
    ${({position}) => position === Positions.horizontal
        ? `
            flex-direction: row;
        `
        : ''}
    ${({position}) => position === Positions.vertical
        ? `
            flex-direction: column;
            max-width: 8em;
        `
        : ''}
    padding-left: 1em;
`;

interface RadioElementInterface {
    key: string,
    type: RadioTypes
}

const RadioElement = styled.div<RadioElementInterface>`
    display: flex;
    align-items: center;
    padding: 0.25em ${({type}) => type === RadioTypes.icon ? '1em' : '0'} 0.25em 0;
`;

interface RadioLabelInterface {
    elementPosition: ElementPosition
    position: Positions
}
const RadioLabel = styled.div<RadioLabelInterface>`
    padding: ${props => props.elementPosition === ElementPosition.right
        ? props.position === Positions.vertical ? '0 0.5em 0 0' : '0 0 0 0.5em'
        : props.position === Positions.vertical ? '0 0 0 0.5em' : '0 0.5em 0 0'};
    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #666;

    display: flex;
    flex: 1;

    max-width: 6em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const RadioInputWrapper = styled.div`
    padding: 0;
`;
interface RadioInputInterface {
    primaryColor?: string,
    secondaryColor?: string
}
const RadioInput = styled.input<RadioInputInterface>`
    -webkit-appearance: none;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid ${props => props.primaryColor};
    border-radius: 50%;
    outline: none;

    :hover {
        box-shadow: 0 0 5px 0px ${allColors['Quick Silver']} inset;
    }

    :before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius:50%;    
    }

    :checked:before {
        background: ${props => props.primaryColor};
    }
`;

interface RadioProps {
    className: string,
    label: string,
    position: Positions,
    value: string | string[],
    type: RadioTypes,
    options: Array<Option>,
    labelPosition?: LabelPositions,
    labelLength?: LabelLength,
    hideLabel?: boolean,
    labelColor?: string,
    multiple?: boolean,
    elementPosition?: ElementPosition,
    primaryColor?: string,
    secondaryColor?: string,
    hideBottomBorder?: boolean,
    borderColor?: string,
    onChange: (v: string | string[]) => void
}

interface RadioElementType {
    o: Option,
    type: RadioTypes,
    value: string | string[],
    multiple?: boolean,
    primaryColor?: string,
    secondaryColor?: string,
    elementPosition?: ElementPosition,
    position?: Positions,
    isOptionSelected:  (value: string | string[], optionValue: string) => boolean,
    onRadioChange: (value: string) => void
}

const RadioElementComponent = ({
    o,
    type,
    value,
    elementPosition,
    primaryColor,
    secondaryColor,
    position,
    isOptionSelected,
    onRadioChange
}: RadioElementType) => {
    let element: ReactElement = <div></div>;
    const optionSelected = isOptionSelected(value, o.value as string);
    switch(type) {
        case RadioTypes.radio:
            element = (<RadioInputWrapper>
                <RadioInput
                    className={'ie-radio__element__radio'}
                    checked={isOptionSelected(value, o.value as string)}
                    data-checked={isOptionSelected(value, o.value as string)
                        ? 'checked'
                        : 'not-checked'
                    }
                    onClick={() => {
                        onRadioChange(o.value as string);
                    }}
                    primaryColor={primaryColor}
                    type="radio"
                />
            </RadioInputWrapper>);
            break;
        case RadioTypes.checkbox:
            element = (<CheckboxElement
                className={'ie-radio__element__checkbox'}
                checked={isOptionSelected(value, o.value as string)}
                color={primaryColor}
                colorOff={fontColorFromBackground(primaryColor as string)}
                onChange={() => {
                    onRadioChange(o.value as string);
                }}
            />);
            break;
        case RadioTypes.toggle:
            element = (<SwitchToggleElement
                className={'ie-radio__element__toggle'}
                checked={isOptionSelected(value, o.value as string)}
                color={primaryColor}
                colorOff={secondaryColor}
                onChange={() => {
                    onRadioChange(o.value as string);
                }}
            />);
            break;
        case RadioTypes.icon:
            element = (<Icon
                className={'ie-radio__element__icon'}
                icon={o.icon as IconList}
                borderRadius={BorderRadius.xxl}
                fontSize={ElementSize.m}
                color={optionSelected
                    ? fontColorFromBackground(primaryColor as string)
                    : fontColorFromBackground(secondaryColor as string)}
                backgroundColor={optionSelected
                    ? primaryColor
                    : secondaryColor}
                cursor={Cursors.pointer}
                padding={Padding.s}
                onClick={() => {
                    onRadioChange(o.value as string);
                }}
            />);
            break;
        case RadioTypes.button:
            element = (<Button
                className="ie-radio__element__button"
                icon={o.icon as IconList}
                length={ElementLength.squared}
                borderRadius={BorderRadius.no}
                label={o.label}
                color={optionSelected ? primaryColor : secondaryColor}
                iconColor={optionSelected
                    ? fontColorFromBackground(primaryColor as string)
                    : fontColorFromBackground(secondaryColor as string)}
                onClick={() => {
                    onRadioChange(o.value as string);
                }}
                clickAnimation={false}
            />);
            break;
        default:
            break;
    }
    const label = o.label !== '' && type !== RadioTypes.button
        ? (
            <RadioLabel
                elementPosition={elementPosition as ElementPosition}
                position={position as Positions}
                className="ie-radio__element__label"
            >
                {o.label}
            </RadioLabel>
        ) : null;

    return (<>
        {type === RadioTypes.button ? (
            element
        ) : (
            <RadioElement
                key={`key_${o.value}`}
                type={type}
                className="ie-radio__element"
            >
                {elementPosition === ElementPosition.left && element}
                {label}
                {elementPosition === ElementPosition.right && element}
            </RadioElement>
        )}
    </>);
};

function Radio(props: RadioProps) {
    const {
        className,
        label,
        labelPosition,
        position,
        value: valueFromProps,
        type,
        options,
        hideLabel,
        labelColor,
        labelLength,
        multiple,
        elementPosition,
        primaryColor,
        secondaryColor,
        hideBottomBorder,
        borderColor,
        onChange
    } = props;

    const id = useRef(generateID());
    const [value, setValue] = useState(valueFromProps);

    const isOptionSelected = useCallback((
        value: string | string[],
        optionValue: string
    ) =>
        Array.isArray(value) ? value.includes(optionValue as string) : optionValue === value,
    []);

    const onRadioChange = useCallback((newValue: string) => {
        if (multiple) {
            const newValues = value || [];
            const valueIndex = newValues.indexOf(newValue);
            // Remove option from array if selected, add it otherwise
            const newOptions = isOptionSelected(newValues, newValue)
                ? [
                    ...newValues.slice(0, valueIndex),
                    ...newValues.slice(valueIndex + 1)
                ]
                : [...newValues, newValue];

            setValue(newOptions as string[]);
            onChange(newOptions as string[]);
        } else {
            setValue(newValue as string);
            onChange(newValue);
        }
    }, [isOptionSelected, multiple, onChange, value]);

    const radioOptions = useMemo(() => (
        options.map((o) => RadioElementComponent({
            o,
            type,
            value,
            multiple,
            elementPosition,
            position,
            primaryColor,
            secondaryColor,
            isOptionSelected,
            onRadioChange
        }))
    ), [
        elementPosition,
        isOptionSelected,
        multiple,
        onRadioChange,
        options,
        primaryColor,
        secondaryColor,
        type,
        value,
        position
    ]);

    return (
        <RadioWrapper
            hideBottomBorder={hideBottomBorder}
            borderColor={borderColor}
            labelPosition={labelPosition}
            className={mergeClasses('ie-radio', className)}
        >
            {hideLabel ? null : (
                <Label
                    labelPosition={labelPosition}
                    className="ie-radio__label"
                    htmlFor={id.current}
                    labelColor={labelColor}
                    labelLength={labelLength}
                >
                    {label}
                </Label>
            )}
            <RadioContainer
                className="ie-radio__container"
                position={position}
            >
                {type === RadioTypes.button ? (
                    <ButtonGroup>
                        {radioOptions}
                    </ButtonGroup>
                ) : radioOptions}
            </RadioContainer>
        </RadioWrapper>
    );
}

const defaultProps: RadioProps = {
    className: '',
    label: 'Label',
    position: Positions.vertical,
    labelPosition: LabelPositions.vertical,
    labelLength: LabelLength.auto,
    elementPosition: ElementPosition.left,
    value: '',
    type: RadioTypes.radio,
    options: [],
    labelColor: allColors['Dim Gray'],
    hideLabel: false,
    multiple: false,
    primaryColor: allColors['Teal'],
    secondaryColor: allColors['Silver Sand'],
    hideBottomBorder: true,
    borderColor: allColors['Silver Sand'],
    onChange: () => {}
};

Radio.defaultProps = defaultProps;

export { Radio };

export type { RadioProps };
