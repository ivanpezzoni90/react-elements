import React from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { elaborateComputedWidth, generateID, rgbFromHex } from '../../helpers';
import { IconSize, Option as OptionType, PropsObjectInterface } from '../../types';
import Icon, {IconList} from '../../ui/Icon';
import { ElementLength } from '../../types';
import {
    SelectElement,
    SelectWrapper,
    Label,
    IconWrapper,
    DropDownListContainer,
    DropDownList,
    ListItem,
    ListIcon,
} from './SelectStyle';

import {
    ListItemClickCallbackType,
    SelectProps,
} from './config';
import { useComputedWidth, useComputedZIndex } from '../../hooks';
import { allColors } from '../../constants/colors';

function Select(props: SelectProps) {
    const {
        options,
        value: valueFromProps,
        label = '',
        shadow,
        onChange,
        length,
        labelColor,
        textColor,
        borderColor,
        optionSelectedColor
    } = props;

    const isValidValue = (v: string) => v !== null && v !== '';

    const id = useRef(generateID());

    const [isOpen, setIsOpen] = useState(false);
    
    const toggling = () => setIsOpen(!isOpen);
    const [selectedOption, setSelectedOption] = useState(valueFromProps);

    const [hasValue, setHasValue] = useState(isValidValue(selectedOption));

    useEffect(() => {
        setHasValue(isValidValue(selectedOption));
    }, [selectedOption]);

    const onOptionClicked: ListItemClickCallbackType = (value: string) => () => {
        setSelectedOption(value);
        onChange(value);
        setIsOpen(false);
    };

    const getOptionFromValue = (value: string) => (
        options.find(
            (o: OptionType) => o.value === value
        ) as OptionType // TODO: Review
    );

    const selectRef = useRef<Element>(null);
    const dropDownZIndex = useComputedZIndex(selectRef);
    const selectElementWidth = elaborateComputedWidth(
        useComputedWidth(selectRef)
    );

    const currentOptionObject: OptionType = getOptionFromValue(selectedOption);

    return (
        <Fragment>
            <SelectWrapper
                ref={selectRef}
                hasValue={hasValue}
                length={length}
                shadow={shadow}
                borderColor={borderColor}
                onClick={toggling}
            >
                <Label
                    htmlFor={id.current}
                    hasValue={hasValue}
                    labelColor={labelColor}
                >
                    {label}
                </Label>
                <SelectElement
                    length={length}
                    shadow={shadow}
                    computedWidth={selectElementWidth}
                    textColor={textColor}
                >
                    {currentOptionObject && currentOptionObject.icon ? (
                        <ListIcon>
                            <Icon
                                icon={currentOptionObject.icon}
                                fontSize={IconSize.s}
                            />
                        </ListIcon>
                    ) : null}
                    {currentOptionObject && currentOptionObject.label}
                </SelectElement>
                {isOpen && (
                    <DropDownListContainer
                        zIndex={dropDownZIndex}
                        length={length}
                    >
                        <DropDownList>
                            {options.map((o: OptionType) => (
                                <ListItem
                                    onClick={onOptionClicked(o.value)}
                                    key={o.value}
                                    selected={selectedOption === o.value}
                                    textColor={textColor}
                                    optionSelectedColor={optionSelectedColor}
                                >
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
                <IconWrapper>
                    <Icon
                        icon={IconList.caretDown}
                    />
                </IconWrapper>
            </SelectWrapper>
        </Fragment>
    );
}
const defaultProps: PropsObjectInterface = {
    options: [],
    value: undefined,
    label: 'Label',
    length: ElementLength.full,
    shadow: true,
    labelColor: allColors['Dim Gray'],
    textColor: allColors['Dim Gray'],
    borderColor: allColors['Dim Gray'],
    optionSelectedColor: allColors['Quick Silver'],
    onChange: () => {}
};

Select.defaultProps = defaultProps;

export default Select;

export type { SelectProps };