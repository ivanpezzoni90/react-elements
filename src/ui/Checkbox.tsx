import React, { Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateID, mergeClasses } from '../helpers';
import Element from './Element';
import { AlignPositions, ElementLength, LabelPositions } from '../types';
import { ChangeElementValueType, PropsObjectInterface, SetBoolToStateType } from '../types';

const CheckboxContainer = styled.div`
    padding-right: 1em;

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

interface CheckboxAdvancedWrapperInterface {
    length: ElementLength,
    shadow?: boolean
}

const CheckboxAdvancedWrapper = styled.div<CheckboxAdvancedWrapperInterface>`
    display: flex;
    align-items: center;
    min-width: 7em;
    width: ${props => props.length};
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    border-bottom: 1px solid #666;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    background-color: #ffffff;
    ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);' : ''}

    &:hover{
        background-color: rgba(255, 255, 255, 0.45);
        ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : ''}
    }
`;

interface LabelProps {
    htmlFor: string
}

const CheckboxAdvancedLabel = styled.div<LabelProps>`
    display: flex;
    justify-content: flex-start;
    flex: 1;
    padding: 0 1em 0 1em;

    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #666;
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;
`;

interface CheckboxProps extends PropsObjectInterface{
    className: string,
    checked: boolean,
    label: string,
    simpleElement?: boolean,
    labelPosition?: LabelPositions,
    align?: AlignPositions,
    shadow?: boolean,
    length: ElementLength,
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
        simpleElement,
        shadow,
        length,
        onChange
    } = props;

    const id = useRef(generateID());

    return (
        <Fragment>
            {simpleElement ? (
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
            ): (
                <CheckboxAdvancedWrapper
                    shadow={shadow}
                    length={length}
                >
                    <CheckboxAdvancedLabel
                        htmlFor={id.current}
                    >
                        {label}
                    </CheckboxAdvancedLabel>
                    <CheckboxElement
                        className={className}
                        checked={checkedFromProps}
                        onChange={onChange}
                    />
                </CheckboxAdvancedWrapper>
            )}
        </Fragment>
    );
}

const defaultProps: PropsObjectInterface = {
    className: '',
    checked: false,
    label: 'Label',
    simpleElement: false,
    shadow: true,
    labelPosition: LabelPositions.horizontal,
    length: ElementLength.m,
    onChange: () => {}
};

Checkbox.defaultProps = defaultProps;

export default Checkbox;

export { CheckboxElement };
export type {CheckboxProps };
