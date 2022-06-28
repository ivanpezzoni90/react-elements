import React, { Fragment, useState, useCallback, useRef, useEffect } from 'react';
import { elaborateComputedWidth, generateID } from '../helpers';
import {
    InputWrapper,
    InputElementStyle,
    Label,
    InputNumberIcons,
    IconWrapper
} from './InputStyle';

import { CheckValidatorsType, InputProps, InputTypeProps, InputTypes } from './config';
import { BorderRadius, ElementLength, PropsObjectInterface } from '../types';
import { allColors } from '../constants/colors';
import { IconList, Icon } from '../Icon';
import { useComputedWidth } from '../hooks';

function InputElement({
    error,
    setError,
    length,
    active,
    shadow,
    textColor,
    label,
    id,
    type,
    value,
    onChange,
    onFocus,
    onBlur,
    max,
    min,
    computedWidth
}: InputTypeProps) {
    const checkValidators: CheckValidatorsType = useCallback((newValue, opts = {}) => {
        switch (type) {
            case InputTypes.text:
                if (max && newValue.length > max) {
                    return false;
                }
                if (min && newValue.length < min) {
                    setError(true);
                } else {
                    setError(false);
                }
                return true;
            case InputTypes.number: {
                const parsedValue = parseFloat(newValue);
                if (
                    (max !== undefined && parsedValue > max)
                    || (min !== undefined && parsedValue < min)
                ) {
                    setError(true);
                    if (opts.changeFromCaret) {
                        return false;
                    }
                } else {
                    setError(false);
                }
                return true;
            }
        }
        return true;
    }, [max, min, type, setError]);
   
    const onChangeValue = useCallback((event: any) => {
        const newValue = event.target.value;
        if (checkValidators(newValue)) {
            onChange(newValue);
        }
    }, [onChange, checkValidators]);

    const onBlurInput = useCallback((event: any) => {
        const newValue = event.target.value;
        if (checkValidators(newValue)) {
            onBlur(newValue);
        }
    }, [onBlur, checkValidators]);

    const handleNumberCaret = useCallback((type: 'up'|'down') => () => {
        const parsedValue = parseFloat(value || '0');
        const newValue = (type === 'up' ? (parsedValue + 1) : (parsedValue - 1)).toString();

        if (checkValidators(newValue, { changeFromCaret: true })) {
            onChange(newValue);
        }
    }, [checkValidators, onChange, value]);

    return (
        <Fragment>
            <InputElementStyle
                error={error}
                length={length}
                active={active}
                shadow={shadow}
                textColor={textColor}
                id={id}
                type={type}
                value={value}
                placeholder={label}
                computedWidth={computedWidth}
                onChange={onChangeValue}
                onFocus={onFocus}
                onBlur={onBlurInput}
            />
            {type === InputTypes.number ? (
                <InputNumberIcons>
                    <IconWrapper
                        onClick={handleNumberCaret('up')}
                    >
                        <Icon
                            color={textColor}
                            icon={IconList.caretUp}
                        />
                    </IconWrapper>
                    <IconWrapper
                        onClick={handleNumberCaret('down')}
                    >
                        <Icon
                            color={textColor}
                            icon={IconList.caretDown}
                        />
                    </IconWrapper>
                </InputNumberIcons>
            ) : null}
        </Fragment>
    );
}

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
    type,
    showBorders,
    hideBottomBorder,
    borderRadius
}: InputProps) {
    // active = focused or with value
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

    const onChangeCb = useCallback((newValue: string | number) => {
        if (newValue !== '') setActive(true);
        setValue(newValue as string);
        onChange(newValue);
    }, [onChange]);

    const setFocusFromDiv = useCallback(() => {
        const inputEl = document.getElementById(id.current);
        inputEl && inputEl.focus();
    }, []);

    const onFocusCb = useCallback(() => {
        if (!locked) setActive(true);
    }, [locked]);
   
    const onBlurCb = useCallback((newValue: string | number) => {
        if (newValue === '') setActive(false);
        onBlur(newValue);
    }, [onBlur]);

    const inputWrapperRef = useRef<Element>(null);
    const inputElementWidth = elaborateComputedWidth(
        useComputedWidth(inputWrapperRef)
    );

    return (
        <InputWrapper
            ref={inputWrapperRef}
            length={length}
            active={active}
            locked={locked}
            shadow={shadow}
            borderColor={borderColor}
            showBorders={showBorders}
            hideBottomBorder={hideBottomBorder}
            borderRadius={borderRadius}
            onClick={setFocusFromDiv}
        >
            <Label
                htmlFor={id.current}
                error={error}
                length={length}
                // Type date is always "active"
                active={active || type === InputTypes.date}
                labelColor={labelColor}
            >
                {(error && errorMessage) || label}
            </Label>
            <InputElement
                error={error}
                setError={setError}
                length={length}
                // Type date is always "active"
                active={active || type === InputTypes.date}
                shadow={shadow}
                textColor={textColor}
                label={label}
                id={id.current}
                type={type}
                value={value}
                onChange={onChangeCb}
                onFocus={onFocusCb}
                onBlur={onBlurCb}
                max={max}
                min={min}
                computedWidth={inputElementWidth}
            />
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
    length: ElementLength.full,
    active: undefined,
    labelColor: allColors['Dim Gray'],
    textColor: allColors['Dim Gray'],
    borderColor: allColors['Silver Sand'],
    min: undefined,
    max: undefined,
    type: InputTypes.text,
    showBorders: false,
    hideBottomBorder: false,
    borderRadius: BorderRadius.no,
};

Input.defaultProps = defaultProps;

export default Input;
export { InputElement };

export type { InputProps };
