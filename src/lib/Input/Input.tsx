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
import { BorderRadius, ElementLength, LabelLength, LabelPositions, PropsObjectInterface } from '../types';
import { allColors } from '../constants/colors';
import { IconList, Icon } from '../Icon';
import { useComputedWidth } from '../hooks';
import { throttle } from 'throttle-debounce';

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
    defaultValue,
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
   
    const onChangeValue = throttle(200, (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (checkValidators(newValue)) {
            onChange(newValue);
        }
    });

    const onBlurInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (checkValidators(newValue)) {
            onBlur(newValue);
        }
    }, [onBlur, checkValidators]);

    const handleNumberCaret = useCallback((type: 'up'|'down') => () => {
        const parsedValue = parseFloat(defaultValue || '0');
        const newValue = (type === 'up' ? (parsedValue + 1) : (parsedValue - 1)).toString();

        if (checkValidators(newValue, { changeFromCaret: true })) {
            onChange(newValue);
        }
    }, [checkValidators, onChange, defaultValue]);

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
                defaultValue={defaultValue}
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
    hideLabel,
    labelLength,
    shadow,
    onBlur,
    onChange,
    length,
    active: activeFromProps,
    labelColor,
    labelPosition,
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
    const [error, setError] = useState(errorFromProps);

    useEffect(() => {
        setError(errorFromProps);
    }, [errorFromProps]);

    const id = useRef(generateID());

    const onChangeCb = useCallback((newValue: string | number) => {
        if (newValue !== '') setActive(true);
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

    const inputWrapperRef = useRef<HTMLDivElement>(null);
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
            labelPosition={labelPosition}
            hideLabel={hideLabel}
            onClick={setFocusFromDiv}
        >
            {hideLabel ? null : (
                <Label
                    htmlFor={id.current}
                    error={error}
                    length={length}
                    // Type date is always "active"
                    active={active || type === InputTypes.date}
                    labelColor={labelColor}
                    labelPosition={labelPosition}
                    labelLength={labelLength}
                    label={label}
                >
                    {(error && errorMessage) || label}
                </Label>
            )}
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
                defaultValue={valueFromProps}
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
    labelPosition: LabelPositions.vertical,
    labelLength: LabelLength.auto,
    min: undefined,
    max: undefined,
    type: InputTypes.text,
    showBorders: false,
    hideBottomBorder: false,
    borderRadius: BorderRadius.no,
    hideLabel: false,
};

Input.defaultProps = defaultProps;

export default Input;
export { InputElement };

export type { InputProps };
