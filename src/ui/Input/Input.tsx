import React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { generateID } from '../../helpers';
import {InputWrapper, InputElement, Label } from './InputStyle';
import { InputProps } from './config';
import { InputLength, PropsObjectInterface } from '../../types';

function Input({
    locked,
    error,
    value: valueFromProps,
    label,
    onBlur,
    onChange,
    length,
}: InputProps) {
    // active = focused
    const [active, setActive] = useState(valueFromProps !== '');
    const [value, setValue] = useState(valueFromProps);

    useEffect(() => {
        setValue(valueFromProps);
    }, [valueFromProps]);

    const id = useRef(generateID());
   
    // TODO: Throttle
    const onChangeValue = useCallback((event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(newValue);
    }, [onChange]);
   
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
        >
            <InputElement
                error={error}
                length={length}
                active={active}

                id={id.current}
                type="text"
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
            >
                {error || label}
            </Label>
        </InputWrapper>
    );
}

const defaultProps: PropsObjectInterface = {
    locked: false,
    error: '',
    value: '',
    label: 'Label',
    onBlur: () => {},
    onChange: () => {},
    length: InputLength.full
};

Input.defaultProps = defaultProps;

export default Input;

export type { InputProps };
