import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateID, mergeClasses } from './helpers';
import {
    BorderRadius,
    ButtonIconSize,
    ElementLength,
    ElementSize,
    Option,
    Positions,
    RadioTypes
} from './types';
import { ChangeElementValueType, PropsObjectInterface } from './types';
import { CheckboxElement } from './Checkbox';
import { SwitchToggleElement } from './SwitchToggle';
import { Button } from './Button';
import { IconList } from './Icon';
import { allColors } from './constants/colors';

interface LabelProps {
    htmlFor: string
}

const Label = styled.div<LabelProps>`
    display: flex;
    justify-content: flex-start;
    flex: 1;
    padding: 0 1em 0 1em;

    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #666;
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;
`;

const RadioWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5em;
`;

interface RadioContainerInterface {
    position: Positions
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
    padding-left: 1.5em;
`;

interface RadioElementInterface {
    key: string,
    type: RadioTypes
}

const RadioElement = styled.div<RadioElementInterface>`
    display: flex;
    align-items: center;
    padding: 0.25em ${({type}) => type === RadioTypes.button ? '1em' : '0'} 0.25em 0;
`;

const RadioLabel = styled.div`
    padding: 0 1em 0 0;
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

interface RadioProps extends PropsObjectInterface{
    className: string,
    label: string,
    position: Positions,
    value: string | number | boolean,
    type: RadioTypes,
    options: Array<Option>,
    onChange: ChangeElementValueType
}

type getRadioElementType = (
    o: Option,
    type: RadioTypes,
    value: string | number | boolean,
    onRadioChange: (value: string | number | boolean) => void
) => ReactElement;

const getRadioElement: getRadioElementType = (
    o,
    type,
    value,
    onRadioChange
) => {
    let element: ReactElement = <div></div>;
    switch(type) {
        case RadioTypes.checkbox:
            element = (<CheckboxElement
                className={'ie-radio__element__checkbox'}
                checked={value === o.value}
                onChange={() => {
                    onRadioChange(o.value);
                }}
            />);
            break;
        case RadioTypes.toggle:
            element = (<SwitchToggleElement
                checked={value === o.value}
                onChange={() => {
                    onRadioChange(o.value);
                }}
            />);
            break;
        case RadioTypes.button:
            element = (<Button
                label=""
                icon={o.icon as IconList}
                borderRadius={BorderRadius.m}
                length={ElementLength.squared}
                fontSize={ElementSize.xxs}
                buttonIconSize={ButtonIconSize.xl}
                color={value === o.value ? allColors['Gray Web'] : allColors['Quick Silver']}
                onClick={() => {
                    onRadioChange(o.value);
                }}
            />);
            break;
        default:
            break;
    }
    return <RadioElement
        key={`key_${o.value}`}
        type={type}
        className="ie-radio__element"
    >
        <RadioLabel
            className="ie-radio__element__label"
        >
            {o.label}
        </RadioLabel>
        {element}
    </RadioElement>;
};

function Radio(props: RadioProps) {
    const {
        className,
        label,
        position,
        value: valueFromProps,
        type,
        options,
        onChange
    } = props;

    const id = useRef(generateID());
    const [value, setValue] = useState(valueFromProps);

    const onRadioChange = (newValue: string | number | boolean) => {
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <RadioWrapper
            className={mergeClasses('ie-radio', className)}
        >
            <Label
                className="ie-radio__label"
                htmlFor={id.current}
            >
                {label}
            </Label>
            <RadioContainer
                className="ie-radio__container"
                position={position}
            >
                {options.map((o) => getRadioElement(o, type, value, onRadioChange))}
            </RadioContainer>
        </RadioWrapper>
    );
}

const defaultProps: PropsObjectInterface = {
    className: '',
    label: 'Label',
    position: Positions.vertical,
    value: '',
    type: RadioTypes.checkbox,
    options: [],
    onChange: () => {}
};

Radio.defaultProps = defaultProps;

export { Radio };

export type { RadioProps };
