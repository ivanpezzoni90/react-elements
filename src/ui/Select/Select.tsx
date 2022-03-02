import React from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { generateID } from '../../helpers';
import { IconSize, Option as OptionType, PropsObjectInterface } from '../../types';
import Icon, {IconList} from '../../ui/Icon';
import { InputLength } from '../../types';
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
import { useComputedZIndex } from '../../hooks';

function Select(props: SelectProps) {
    const {
        options,
        value: valueFromProps,
        label = '',
        shadow,
        onChange,
        length
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

    const currentOptionObject: OptionType = getOptionFromValue(selectedOption);
    return (
        <Fragment>
            <SelectWrapper
                ref={selectRef}
                hasValue={hasValue}
                length={length}
                shadow={shadow}
                onClick={toggling}
            >
                <SelectElement
                    length={length}
                    shadow={shadow}
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
                <Label
                    htmlFor={id.current}
                    hasValue={hasValue}
                >
                    {label}
                </Label>
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
    length: InputLength.full,
    shadow: true,
    onChange: () => {}
};

Select.defaultProps = defaultProps;

export default Select;

export type { SelectProps };