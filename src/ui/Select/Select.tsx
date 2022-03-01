import React from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { generateID } from '../../helpers';
import { Option as OptionType, PropsObjectInterface } from '../../types';
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
} from './SelectStyle';

import {
    ListItemClickCallbackType,
    SelectProps,
    SetStateDropDownZIndexType
} from './config';

function Select(props: SelectProps) {
    const {
        options,
        value: valueFromProps,
        label = '',
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
        console.log(selectedOption);
    };

    const getLabelFromValue = (value: string) => (
        options.find(
            (o: OptionType) => o.value === value
        )
    )?.label;

    const selectRef = useRef<Element>(null);
    const [
        dropDownZIndex, setDropDownZIndex
    ]: [
        dropDownZIndex: number,
        setDropDownZIndex: SetStateDropDownZIndexType
    ] = useState(0);

    useEffect(() => {
        if (selectRef !== null) {
            const style = window.getComputedStyle(selectRef.current as Element);
            const computedZIndex = style.zIndex;
            if (computedZIndex !== 'auto') {
                setDropDownZIndex(parseInt(computedZIndex, 10) +1);
            }
            setDropDownZIndex(1);
        }
    }, [selectRef]);
    return (
        <Fragment>
            <SelectWrapper
                ref={selectRef}
                hasValue={hasValue}
                length={length}
                onClick={toggling}
            >
                <SelectElement
                    length={length}
                >
                    {getLabelFromValue(selectedOption)}
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
    onChange: () => {}
};

Select.defaultProps = defaultProps;

export default Select;

export type { SelectProps };