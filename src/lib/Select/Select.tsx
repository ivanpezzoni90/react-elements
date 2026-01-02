import React, { MouseEvent, useCallback } from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { checkEventTargetContainsClass, elaborateComputedWidth, fontColorFromBackground, generateID, lightenDarkenColor, mergeClasses } from '../helpers';
import { BorderRadius, ElementHeight, IconSize, LabelLength, LabelPositions, Option as OptionType } from '../types';
import { Icon } from '../Icon';
import { ElementLength } from '../types';
import {
    SelectElement,
    SelectWrapper,
    Label,
    CaretWrapper,
    DropDownListContainer,
    DropDownList,
    ListItem,
    ListIcon,
    ResetWrapper,
    SelectChip,
    ChipText,
    ChipsWrapper,
    ChipIconWrapper,
    RelativeDropDownContainer,
    SelectContainer,
    DropDownSearchContainer,
    DropDownSearchIconWrapper,
} from './SelectStyle';

import {
    ListItemClickCallbackType,
    SelectProps,
} from './config';
import { useClickOutside, useComputedWidth, useComputedZIndex } from '../hooks';
import { allColors } from '../constants/colors';
import { CheckboxElement } from '../Checkbox';
import { Input } from '../Input';
import { IconList } from '../constants/icons';

const doNothing = () => {};

// Valid value when is not null and not empty string or empty array
const isValidValue = (
    v: string | string[] | null
) => Array.isArray(v) ? v !== null && v.length !== 0 : v !== null && v !== '';

function Select(props: SelectProps) {
    const {
        options,
        className,
        value: valueFromProps,
        label,
        hideLabel,
        shadow,
        onChange,
        length,
        labelColor,
        textColor,
        borderColor,
        optionSelectedColor,
        resettable,
        multiple,
        showBorders,
        hideBottomBorder,
        borderRadius,
        chipBorderRadius,
        closeOnClickOutside,
        labelLength,
        labelPosition,
        filterable
    } = props;

    const id = useRef(generateID());

    const [isOpen, setIsOpen] = useState(false);

    const setIsOpenWrapper = useCallback((v: boolean) => {
        setIsOpen(v);
        // Reset filtered options on dropdown close
        if (v === false) setFilteredOptions(options);
    }, [options]);
    
    const toggleOpen = (e: MouseEvent<HTMLDivElement>) => {
        // Exclude event trigger for icon elements
        if (!checkEventTargetContainsClass(e, 'ie-icon')) {
            setIsOpenWrapper(!isOpen);
        }
    };

    const [selectedOption, setSelectedOption] = useState(valueFromProps);
    const [hasValue, setHasValue] = useState(isValidValue(selectedOption));
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
        setHasValue(isValidValue(selectedOption));
    }, [selectedOption]);

    const isOptionSelected = useCallback((
        value: string | string[],
        optionValue: string
    ) =>
        Array.isArray(value) ? value.includes(optionValue as string) : optionValue === value,
    []);

    const onOptionClicked: ListItemClickCallbackType = (value: string) => () => {
        if (multiple) {
            const newSelectedOptions = selectedOption || [];
            const valueIndex = newSelectedOptions.indexOf(value);
            // Remove option from array if selected, add it otherwise
            const newOptions = isOptionSelected(newSelectedOptions, value)
                ? [
                    ...newSelectedOptions.slice(0, valueIndex),
                    ...newSelectedOptions.slice(valueIndex + 1)
                ]
                : [...newSelectedOptions, value];

            setSelectedOption(newOptions as string[]);
            onChange(newOptions as string[]);
        } else {
            setSelectedOption(value as string);
            onChange(value);
            setIsOpenWrapper(false);
        }
    };

    const onSelectReset = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setSelectedOption(null);
        onChange(null);
        setIsOpenWrapper(false);
    };

    const getOptionsFromValue = (value: string | string[] | null): OptionType[] => {
        const opts = options.filter((o: OptionType) =>
            isOptionSelected(value as string | string[], o.value as string));
        return opts;
    };

    const selectRef = useRef<HTMLDivElement>(null);
    const dropDownZIndex = useComputedZIndex(selectRef);
    const selectElementWidth = elaborateComputedWidth(
        useComputedWidth(selectRef)
    );
    const selectWrapperWidth = useComputedWidth(selectRef);

    const dropDownRef = useRef<HTMLDivElement>(null);
    // Set close dropdown callback on click outside when enabled
    useClickOutside(
        dropDownRef,
        closeOnClickOutside
            ? () => setIsOpenWrapper(false)
            : doNothing,
        [selectRef]
    );

    const currentOptionsList: OptionType[] = getOptionsFromValue(selectedOption);

    const getChip = (currentOptionObject: OptionType, multiple: boolean) => (<>
        {currentOptionObject && currentOptionObject.icon ? (
            <ListIcon
                className="ie-select__element__chip_icon"
            >
                <Icon
                    color={textColor}
                    icon={currentOptionObject.icon}
                    fontSize={IconSize.s}
                />
            </ListIcon>
        ) : null}
        <ChipText
            className="ie-select__element__chip_text"
            $multiple={multiple}
        >
            {currentOptionObject && currentOptionObject.label}
        </ChipText>
    </>);

    const filterOptions = useCallback((value: string | number) => {
        const newOptions = options.filter(o => {
            return o.label.toLowerCase().indexOf(value.toString().toLowerCase()) !== -1;
        });
        setFilteredOptions(newOptions);
    }, [options]);

    const getIconSelectedColor = useCallback((selected: boolean) => {
        if (selected) {
            return fontColorFromBackground(optionSelectedColor as string);
        }
        return textColor;
    }, [optionSelectedColor, textColor]);

    return (
        <SelectContainer>
            <SelectWrapper
                className={mergeClasses('ie-select', className)}
                ref={selectRef}
                hasValue={hasValue}
                length={length}
                shadow={shadow}
                borderColor={borderColor}
                showBorders={showBorders}
                hideBottomBorder={hideBottomBorder}
                borderRadius={borderRadius}
                labelPosition={labelPosition}
                onClick={toggleOpen}
            >
                {hideLabel ? null : (
                    <Label
                        className="ie-select__label"
                        htmlFor={id.current}
                        hasValue={hasValue}
                        labelColor={labelColor}
                        length={length}
                        hideLabel={hideLabel}
                        labelPosition={labelPosition}
                        labelLength={labelLength}
                        label={label}
                    >
                        {label}
                    </Label>
                )}
                <SelectElement
                    className="ie-select__element"
                    length={length}
                    shadow={shadow}
                    computedWidth={selectElementWidth}
                    textColor={textColor}
                >
                    <ChipsWrapper
                        className="ie-select__element__chips"
                    >
                        {currentOptionsList.map((currentOptionObject: OptionType, i) => {
                            if (multiple) {
                                return (
                                    <SelectChip
                                        color={optionSelectedColor}
                                        className="ie-select__element__chip"
                                        borderRadius={chipBorderRadius}
                                        key={`${currentOptionObject.label}_${i}`}
                                    >
                                        {getChip(currentOptionObject, true)}
                                        <ChipIconWrapper
                                            color={lightenDarkenColor(optionSelectedColor as string, -30)}
                                            borderRadius={chipBorderRadius}
                                        >
                                            <Icon
                                                className="ie-select__element__chip__close"
                                                icon={IconList.close}
                                                color={textColor}
                                                onClick={onOptionClicked(currentOptionObject.value as string)}
                                            />
                                        </ChipIconWrapper>
                                    </SelectChip>
                                );
                            }
                            return getChip(currentOptionObject, false);
                        })}
                    </ChipsWrapper>
                </SelectElement>
                {resettable &&
                    <ResetWrapper
                        className="ie-select__reset"
                        onClick={onSelectReset}
                    >
                        <Icon
                            icon={IconList.outlineClose}
                            fontSize={IconSize.m}
                        />
                    </ResetWrapper>
                }
                <CaretWrapper>
                    <Icon
                        className="ie-select__caret"
                        icon={IconList.caretDown}
                    />
                </CaretWrapper>
            </SelectWrapper>
            {isOpen && (
                <RelativeDropDownContainer
                    className="ie-dropdown"
                >
                    <DropDownListContainer
                        className="ie-dropdown__container"
                        ref={dropDownRef}
                        computedWidth={selectWrapperWidth}
                        zIndex={dropDownZIndex}
                        length={length}
                    >
                        {filterable && (
                            <DropDownSearchContainer
                                className="ie-dropdown__container__list__filter"
                            >
                                <Input
                                    className="ie-dropdown__container__list__filter__input"
                                    hideLabel
                                    placeholder='Search...'
                                    height={ElementHeight.s}
                                    onChange={filterOptions}
                                />
                                <DropDownSearchIconWrapper>
                                    <Icon
                                        icon={IconList.search}
                                    />
                                </DropDownSearchIconWrapper>
                            </DropDownSearchContainer>
                        )}
                        <DropDownList
                            borderRadius={borderRadius}
                            className="ie-dropdown__container__list"
                        >
                            {filteredOptions.map((o: OptionType) => (
                                <ListItem
                                    className="ie-dropdown__container__list__item"
                                    onClick={onOptionClicked(o.value as string)}
                                    key={o.value.toString()}
                                    selected={isOptionSelected(
                                        selectedOption as string | string[],
                                        o.value as string
                                    )}
                                    textColor={textColor}
                                    optionSelectedColor={optionSelectedColor}
                                    multiple={multiple}
                                >
                                    {multiple ? (
                                        <CheckboxElement
                                            className="ie-dropdown__container__list__item__checkbox"
                                            color={optionSelectedColor}
                                            colorOff={textColor}
                                            checked={isOptionSelected(
                                                selectedOption as string | string[],
                                                o.value as string
                                            )}
                                        />
                                    ): null}
                                    {o.icon ? (
                                        <ListIcon>
                                            <Icon
                                                className="ie-dropdown__container__list__item__icon"
                                                icon={o.icon}
                                                color={getIconSelectedColor(
                                                    isOptionSelected(
                                                        selectedOption as string | string[],
                                                        o.value as string
                                                    )
                                                )}
                                                fontSize={IconSize.s}
                                            />
                                        </ListIcon>
                                    ): null}
                                    
                                    {o.label}
                                </ListItem>
                            ))}
                        </DropDownList>
                    </DropDownListContainer>
                </RelativeDropDownContainer>
            )}
        </SelectContainer>
    );
}
const defaultProps: SelectProps = {
    options: [],
    className: '',
    value: null,
    label: 'Label',
    length: ElementLength.full,
    shadow: true,
    labelColor: allColors['Dim Gray'],
    textColor: allColors['Dim Gray'],
    borderColor: allColors['Silver Sand'],
    optionSelectedColor: allColors['Platinum'],
    resettable: false,
    multiple: false,
    showBorders: false,
    hideBottomBorder: false,
    borderRadius: BorderRadius.no,
    chipBorderRadius: BorderRadius.xs,
    hideLabel: false,
    closeOnClickOutside: true,
    labelPosition: LabelPositions.vertical,
    labelLength: LabelLength.auto,
    filterable: false,
    onChange: () => {}
};

Select.defaultProps = defaultProps;

export default Select;

export type { SelectProps };
