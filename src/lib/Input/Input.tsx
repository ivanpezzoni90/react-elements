import React, { Fragment, useState, useCallback, useRef, useEffect } from 'react';
import { elaborateComputedWidth, generateID, mergeClasses } from '../helpers';
import {
    InputWrapper,
    InputElementStyle,
    TextAreaElementStyle,
    Label,
    InputNumberIcons,
} from './InputStyle';

import { CheckValidatorsType, InputProps, InputTypeProps, InputTypes } from './config';
import { BorderRadius, ElementHeight, ElementLength, LabelLength, LabelPositions } from '../types';
import { allColors } from '../constants/colors';
import { Icon } from '../Icon';
import { useComputedWidth } from '../hooks';
import { throttle } from 'throttle-debounce';
import { IconList } from '../constants/icons';

function InputElement({
    error,
    setError,
    length,
    active,
    shadow,
    textColor,
    id,
    type,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    max,
    min,
    placeholder,
    computedWidth,
    textarea
}: InputTypeProps) {
    const inputElementRef = useRef<HTMLInputElement>(null);
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
   
    
    const onChangeValue = throttle(200, (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newValue = event.target.value;
        if (checkValidators(newValue)) {
            onChange(newValue);
        }
    });

    const onBlurInput = useCallback((
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newValue = event.target.value;
        if (checkValidators(newValue)) {
            onBlur(newValue);
        }
    }, [onBlur, checkValidators]);

    const handleNumberCaret = useCallback((type: 'up'|'down') => () => {
        if (inputElementRef !== null && inputElementRef.current) {
            // Get current input value and parse to increase its value
            const currentValue = inputElementRef?.current?.value;
            const parsedValue = parseFloat(currentValue || '0');
            const newValue = (type === 'up' ? (parsedValue + 1) : (parsedValue - 1)).toString();
    
            if (checkValidators(newValue, { changeFromCaret: true })) {
                onChange(newValue);
                inputElementRef.current.value = newValue;
            }
        }
    }, [checkValidators, onChange]);

    const maxMin = type === InputTypes.text
        ? {
            minLength: min as number,
            maxLength: max as number
        } : {
            min: min,
            max: max
        };

    const commonElementProps = {
        className: 'ie-input__element',
        error: error,
        length: length,
        active: active,
        shadow: shadow,
        textColor: textColor,
        id: id,
        defaultValue: defaultValue,
        placeholder: placeholder,
        computedWidth: computedWidth,
        onChange: onChangeValue,
        onFocus: onFocus,
        onBlur: onBlurInput,
    };
    return (
        <Fragment>
            {textarea
                ? <TextAreaElementStyle
                    {...commonElementProps}
                />
                : <InputElementStyle
                    ref={inputElementRef}
                    type={type}
                    {...maxMin}
                    {...commonElementProps}
                />
            }
            {type === InputTypes.number ? (
                <InputNumberIcons
                    className="ie-input__element__icons"
                >
                    <Icon
                        className="ie-input__element__icons__up"
                        color={textColor}
                        icon={IconList.caretUp}
                        onClick={handleNumberCaret('up')}
                    />
                    <Icon
                        className="ie-input__element__icons__down"
                        color={textColor}
                        icon={IconList.caretDown}
                        onClick={handleNumberCaret('down')}
                    />
                </InputNumberIcons>
            ) : null}
        </Fragment>
    );
}

function Input({
    className,
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
    borderRadius,
    height,
    placeholder,
    textarea
}: InputProps) {
    // active = focused or with value
    const [active, setActive] = useState(activeFromProps || (valueFromProps !== ''));
    const [error, setError] = useState(errorFromProps);
    const [defaultValue, setDefaultValue] = useState(valueFromProps);

    useEffect(() => {
        setDefaultValue(valueFromProps);
    }, [valueFromProps]);

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
            className={mergeClasses('ie-input', className)}
            ref={inputWrapperRef}
            key={defaultValue}
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
            height={height}
            textarea={textarea}
            onClick={setFocusFromDiv}
        >
            {hideLabel ? null : (
                <Label
                    className="ie-input__label"
                    htmlFor={id.current}
                    error={error}
                    length={length}
                    // Type date is always "active", and force active when there is a placeholder
                    // or is a textarea
                    active={active || type === InputTypes.date || placeholder !== '' || !!textarea}
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
                defaultValue={defaultValue}
                onChange={onChangeCb}
                onFocus={onFocusCb}
                onBlur={onBlurCb}
                max={max}
                min={min}
                placeholder={placeholder}
                textarea={textarea}
                computedWidth={inputElementWidth}
            />
        </InputWrapper>
    );
}

const defaultProps: InputProps = {
    locked: false,
    className: '',
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
    height: ElementHeight.m,
    placeholder: '',
    textarea: false
};

Input.defaultProps = defaultProps;

export default Input;
export { InputElement };

export type { InputProps };
