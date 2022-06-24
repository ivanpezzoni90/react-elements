import React from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { checkEventTargetContainsClass, elaborateComputedWidth, generateID, lightenDarkenColor, mergeClasses } from '../helpers';
import { IconSize, Option as OptionType, PropsObjectInterface } from '../types';
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
    ChipIconWrapper
} from './SelectStyle';

import {
    ListItemClickCallbackType,
    SelectProps,
} from './config';
import { useComputedWidth, useComputedZIndex } from '../hooks';
import { allColors } from '../constants/colors';
import { CheckboxElement } from '../Checkbox';

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
        shadow,
        onChange,
        length,
        labelColor,
        textColor,
        borderColor,
        optionSelectedColor,
        resettable,
        multiple
    } = props;

    const id = useRef(generateID());

    const [isOpen, setIsOpen] = useState(false);
    
    const toggleOpen = (e: any) => {
        // Exclude event trigger for icon elements
        if (!checkEventTargetContainsClass(e, 'ie-icon')) {
            setIsOpen(!isOpen);
        }
    };

    const [selectedOption, setSelectedOption] = useState(valueFromProps);

    const [hasValue, setHasValue] = useState(isValidValue(selectedOption));

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

    const selectRef = useRef<Element>(null);
    const dropDownZIndex = useComputedZIndex(selectRef);
    const selectElementWidth = elaborateComputedWidth(
        useComputedWidth(selectRef)
    );
    const selectWrapperWidth = useComputedWidth(selectRef);

    const currentOptionsList: OptionType[] = getOptionsFromValue(selectedOption);

    const getChip = (currentOptionObject: OptionType) => (<>
        {currentOptionObject && currentOptionObject.icon ? (
            <ListIcon>
                <Icon
                    icon={currentOptionObject.icon}
                    fontSize={IconSize.s}
                />
            </ListIcon>
        ) : null}
        <ChipText>
            {currentOptionObject && currentOptionObject.label}
        </ChipText>
    </>);

    return (
        <Fragment>
            <SelectWrapper
                className={mergeClasses('ie-select', className)}
                ref={selectRef}
                hasValue={hasValue}
                length={length}
                shadow={shadow}
                borderColor={borderColor}
                onClick={toggleOpen}
            >
                <Label
                    className="ie-select__label"
                    htmlFor={id.current}
                    hasValue={hasValue}
                    labelColor={labelColor}
                    length={length}
                >
                    {label}
                </Label>
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
                                        key={`${currentOptionObject.label}_${i}`}
                                    >
                                        {getChip(currentOptionObject)}
                                        <ChipIconWrapper
                                            color={lightenDarkenColor(optionSelectedColor as string, -30)}
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
                            return getChip(currentOptionObject);
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
                <DropDownListContainer
                    computedWidth={selectWrapperWidth}
                    zIndex={dropDownZIndex}
                    length={length}
                >
                    <DropDownList>
                        {options.map((o: OptionType) => (
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
            )}
        </Fragment>
    );
}
const defaultProps: PropsObjectInterface = {
    options: [],
    className: '',
    value: null,
    label: 'Label',
    length: ElementLength.full,
    shadow: true,
    labelColor: allColors['Dim Gray'],
    textColor: allColors['Dim Gray'],
    borderColor: allColors['Dim Gray'],
    optionSelectedColor: allColors['Platinum'],
    resettable: false,
    multiple: false,
    onChange: () => {}
};

Select.defaultProps = defaultProps;

export default Select;

export type { SelectProps };