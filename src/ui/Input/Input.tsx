import React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { generateID } from '../../helpers';
import {InputWrapper, InputElement, Label } from './InputStyle';
import { InputProps, InputTypes } from './config';
import { InputLength, PropsObjectInterface } from '../../types';
import { allColors } from '../../constants/colors';

function Input({
    locked,
    error: errorFromProps,
    errorMessage,
    value: valueFromProps,
    label,
    shadow,
    onBlur,
    onChange,
    length,
    active: activeFromProps,
    labelColor,
    textColor,
    borderColor,
    max,
    min,
    type
}: InputProps) {
    // active = focused
    const [active, setActive] = useState(activeFromProps || (valueFromProps !== ''));
    const [value, setValue] = useState(valueFromProps);
    const [error, setError] = useState(errorFromProps);

    useEffect(() => {
        setValue(valueFromProps);
    }, [valueFromProps]);

    useEffect(() => {
        setError(errorFromProps);
    }, [errorFromProps]);

    const id = useRef(generateID());

    const checkValidators: (v: string) => boolean = useCallback((newValue) => {
        if (max && newValue.length > max) {
            return false;
        }
        if (min && newValue.length < min) {
            setError(true);
        }
        return true;
    }, [max, min]);
   
    const onChangeValue = useCallback((event) => {
        const newValue = event.target.value;
        if (checkValidators(newValue)) {
            setValue(newValue);
            onChange(newValue);
        }
    }, [onChange, checkValidators]);
   
    const onFocusCb = useCallback(() => {
        if (!locked) setActive(true);
    }, [locked]);
   
    const onBlurCb = useCallback((event) => {
        const newValue = event.target.value;
        if (newValue === '') setActive(false);
        onBlur(newValue);
    }, [onBlur]);

    return (
        <InputWrapper
            length={length}
            active={active}
            locked={locked}
            shadow={shadow}
            borderColor={borderColor}
        >
            <InputElement
                error={error}
                length={length}
                active={active}
                shadow={shadow}
                textColor={textColor}

                id={id.current}
                type={type}
                value={value}
                placeholder={label}
                onChange={onChangeValue}
                onFocus={onFocusCb}
                onBlur={onBlurCb}
            />
            <Label
                htmlFor={id.current}
                error={error}
                active={active}
                labelColor={labelColor}
            >
                {(error && errorMessage) || label}
            </Label>
        </InputWrapper>
    );
}

const defaultProps: PropsObjectInterface = {
    locked: false,
    error: false,
    errorMessage: undefined,
    value: '',
    label: 'Label',
    onBlur: () => {},
    onChange: () => {},
    shadow: true,
    length: InputLength.full,
    active: undefined,
    labelColor: allColors['Dim Gray'],
    textColor: allColors['Dim Gray'],
    borderColor: allColors['Dim Gray'],
    min: undefined,
    max: undefined,
    type: InputTypes.text
};

Input.defaultProps = defaultProps;

export default Input;

export type { InputProps };
