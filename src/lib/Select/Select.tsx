import React, { MouseEvent, useCallback } from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { checkEventTargetContainsClass, elaborateComputedWidth, generateID, lightenDarkenColor, mergeClasses } from '../helpers';
import { BorderRadius, ElementHeight, IconSize, LabelLength, LabelPositions, Option as OptionType } from '../types';
import { IconList, Icon } from '../Icon';
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
    DropDownSearchIconWrapper
} from './SelectStyle';

import {
    ListItemClickCallbackType,
    SelectProps,
} from './config';
import { useClickOutside, useComputedWidth, useComputedZIndex } from '../hooks';
import { allColors } from '../constants/colors';
import { CheckboxElement } from '../Checkbox';
import { Input } from '../Input';

const doNothing = () => {};

// Valid value when is not null and not empty string or empty array
const isValidValue = (
    v: string | string[] | null
) => Array.isArray(v) ? v !== null && v.length !== 0 : v !== null && v !== '';

const isOptionSelected = (value: string | string[], optionValue: string) =>
    Array.isArray(value) ? value.includes(optionValue as string) : optionValue === value;

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
    
    const toggleOpen = (e: MouseEvent<HTMLDivElement>) => {
        // Exclude event trigger for icon elements
        if (!checkEventTargetContainsClass(e, 'ie-icon')) {
            setIsOpen(!isOpen);
        }
    };

    const [selectedOption, setSelectedOption] = useState(valueFromProps);
    const [hasValue, setHasValue] = useState(isValidValue(selectedOption));
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
        setHasValue(isValidValue(selectedOption));
    }, [selectedOption]);

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
            setIsOpen(false);
        }
    };

    const onSelectReset = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setSelectedOption(null);
        onChange(null);
        setIsOpen(false);
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
            ? () => setIsOpen(false)
            : doNothing,
        [selectRef]
    );

    const currentOptionsList: OptionType[] = getOptionsFromValue(selectedOption);

    const getChip = (currentOptionObject: OptionType, multiple: boolean) => (<>
        {currentOptionObject && currentOptionObject.icon ? (
            <ListIcon>
                <Icon
                    icon={currentOptionObject.icon}
                    fontSize={IconSize.s}
                />
            </ListIcon>
        ) : null}
        <ChipText
            multiple={multiple}
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
                    multiple={multiple}
                    textColor={textColor}
                >
                    <ChipsWrapper>
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
                        icon={IconList.caretDown}
                    />
                </CaretWrapper>
            </SelectWrapper>
            {isOpen && (
                <RelativeDropDownContainer>
                    <DropDownListContainer
                        ref={dropDownRef}
                        computedWidth={selectWrapperWidth}
                        zIndex={dropDownZIndex}
                        length={length}
                    >
                        <DropDownList>
                            {filterable && (
                                <DropDownSearchContainer>
                                    <Input
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
                            {filteredOptions.map((o: OptionType) => (
                                <ListItem
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
                                                icon={o.icon}
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