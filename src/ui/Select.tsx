import { Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateID } from '../helpers';
import { Option as OptionType } from '../types';
import Icon, {IconList} from '../ui/Icon';

const SelectElement = styled.div<SelectElementProps>`
    width: 100%;
    text-align: left;
    height: 1.75em;
    position: relative;
    padding: 0 1em;
    border: none;
    border-radius: 4px;
    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    background-color: transparent;
    color: #666;
    outline: none;
    box-shadow: 0px 4px 20px 0px transparent;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
    0.1s padding ease-in-out;
    -webkit-appearance: none;

    ::placeholder,
    ::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
    ::-moz-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
    :-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
    :-moz-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
    padding: 2em 1em 0.5em 1.25em;
`;

const SelectWrapper = styled.div<SelectWrapperProps>`
    width: 100%;
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    border-bottom: 1px solid #666;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    ${props => props.hasValue
        ? `background-color: #ffffff;
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);`
        : ''
    }
    &:hover{
        background-color: rgba(255, 255, 255, 0.45);
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    }
`;

const Label = styled.div<LabelProps>`
    position: absolute;
    top: 1em;
    left: 1em;
    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #666;
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    ${props => props.hasValue
        ? `top: .25em;
          left: 1.5em;
          opacity: 1;
          color: #666;
          font-size: 12px;`
        : ''
    }
`;

const IconWrapper = styled.div`
    position: absolute;
    top: 1.5em;
    right: 0.5em;
`;

interface LabelProps {
    htmlFor: string
    hasValue: boolean
};
interface SelectElementProps {
};
interface SelectWrapperProps{
    hasValue: boolean
};

const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")`
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    color: #666;
    font-size: 1em;
    font-weight: 500;
    text-align: left;
`;

interface ListItemProps {
    onClick: Function
    key: string
    selected: boolean
};

const ListItem = styled("li")<ListItemProps>`
    list-style: none;
    padding: 0.5em 1em 0.5em 1em;
    &:hover {
        ${props => !props.selected ? 'background: #dfdede' : ''};
    }
    ${props => props.selected
        ? `background: #adadad;
            color: #ffffff;`
        : ''
    }
`;

function Select(props: {
    options: Array<OptionType>,
    value: string,
    onChange: Function,
    label?: string,
    labelPosition?: string
}) {
    const {
        options,
        value: valueFromProps,
        label = '',
        labelPosition,
        onChange
    } = props;

    // TODO: Width della select

    const isValidValue = (v: string) => v !== null && v !== '';

    const id = useRef(generateID());

    const [isOpen, setIsOpen] = useState(false);
    
    const toggling = () => setIsOpen(!isOpen);
    const [selectedOption, setSelectedOption] = useState(valueFromProps);

    const [hasValue, setHasValue] = useState(isValidValue(selectedOption));

    useEffect(() => {
        setHasValue(isValidValue(selectedOption));
    }, [selectedOption]);

    const onOptionClicked = (value: string) => () => {
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
    return (
        <Fragment>
            <SelectWrapper
                hasValue={hasValue}
                onClick={toggling}
            >
                <SelectElement>
                    {getLabelFromValue(selectedOption)}
                </SelectElement>
                {isOpen && (
                    <DropDownListContainer>
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
    )
}

Select.defaultProps = {
    options: [],
    value: null,
    label: 'Label',
    labelPosition: undefined,
    onChange: () => {}
}

export default Select;
