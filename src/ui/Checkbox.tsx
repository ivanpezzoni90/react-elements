import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateID, mergeClasses } from '../helpers';
import Element, { AlignPositions, LabelPositions } from './Element';
import { ChangeElementValueType, PropsObjectInterface, SetBoolToStateType } from '../types';

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    padding-top: 0.25em;
`;
const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`;
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledCheckbox = styled.div`
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    background: ${({ checked }: { checked: boolean }) => (checked ? '#ba0c2f' : '#fff')};
    border-radius: 3px;
    border: 1px solid #666;
    transition: all 150ms;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px #dedede;
    }

    ${Icon} {
        visibility: ${({ checked }: { checked: boolean }) => (checked ? 'visible' : 'hidden')}
    }
`;

interface CheckboxProps extends PropsObjectInterface{
    className: string,
    checked: boolean,
    label: string,
    labelPosition?: LabelPositions,
    align?: AlignPositions,
    onChange: ChangeElementValueType
}

interface CheckboxElementInterface {
    className: string,
    checked: boolean,
    onChange: ChangeElementValueType
}

function CheckboxElement({
    className,
    checked: checkedFromProps,
    onChange
}: CheckboxElementInterface) {
    const [
        checked, setChecked
    ]: [
        checked: boolean, setChecked: SetBoolToStateType
    ] = useState(checkedFromProps);

    function onCheckboxChange() {
        setChecked(!checked);
        onChange(!checked);
    }

    useEffect(() => {
        setChecked(checkedFromProps);
    }, [checkedFromProps]);

    return (<CheckboxContainer
        className={mergeClasses('ie-checkbox', className)}
    >
        <HiddenCheckbox
            className="ie-checkbox__input"
        />
        <StyledCheckbox
            className="ie-checkbox__checkbox"
            checked={checked}
            onClick={onCheckboxChange}
        >
            <Icon viewBox="0 0 24 24"
                className="ie-checkbox__checkbox__icon"
            >
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
    </CheckboxContainer>);
}

function Checkbox(props: CheckboxProps) {
    const {
        className,
        checked: checkedFromProps,
        label,
        labelPosition,
        align,
        onChange
    } = props;

    const id = useRef(generateID());

    return (
        <Element
            id={id.current}
            align={align}
            label={label}
            labelPosition={labelPosition}
        >
            <CheckboxElement
                className={className}
                checked={checkedFromProps}
                onChange={onChange}
            />
        </Element>
    );
}

const defaultProps: PropsObjectInterface = {
    className: '',
    checked: false,
    label: 'Label',
    labelPosition: LabelPositions.horizontal,
    onChange: () => {}
};

Checkbox.defaultProps = defaultProps;

export default Checkbox;

export { CheckboxElement };
export type {CheckboxProps };
