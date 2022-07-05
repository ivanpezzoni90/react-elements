import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateID, mergeClasses } from './helpers';
import { AlignPositions, BorderRadius, ElementLength, LabelLength, LabelPositions } from './types';
import { ChangeElementValueType, PropsObjectInterface, SetBoolToStateType } from './types';
import { allColors } from './constants/colors';

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    padding: 0.25em 1em 0 0.25em;
`;
const Icon = styled.svg`
    fill: none;
    stroke: ${({colorOff}: {colorOff:string}) => colorOff};
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

interface StyledCheckboxInterface {
    checked: boolean,
    color: string,
    colorOff: string
}

const StyledCheckbox = styled.div<StyledCheckboxInterface>`
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    background: ${({ checked, color }) => (checked ? color : allColors['White'])};
    border-radius: 3px;
    border: 1px solid #666;
    transition: all 150ms;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px #dedede;
    }

    ${Icon} {
        visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')}
    }
`;

interface CheckboxAdvancedWrapperInterface {
    length: ElementLength,
    shadow?: boolean
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    borderRadius?: BorderRadius,
    align?: AlignPositions,
    labelPosition?: LabelPositions
}

const CheckboxAdvancedWrapper = styled.div<CheckboxAdvancedWrapperInterface>`
    display: flex;
    ${props => props.labelPosition === LabelPositions.vertical ? `
        flex-direction: column;
        padding-left: 0.5em;
        align-items: ${props.align};
        justify-content: center;
    ` :`
        flex-direction: row;
        justify-content: ${props.align};
        align-items: center;
    `}
    min-width: 7em;
    width: ${props => props.length};
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: ${props => props.borderRadius};
    ${(props) => props.hideBottomBorder ? '' : `border-bottom: 1px solid ${props.borderColor};`}
    ${(props) => props.showBorders ? `border: 1px solid ${props.borderColor}` : ''};
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    background-color: #ffffff;
    ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);' : ''}

    &:hover{
        background-color: rgba(255, 255, 255, 0.45);
        ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : ''}
    }
`;

interface LabelProps {
    htmlFor: string,
    length: ElementLength,
    labelColor?: string,
    labelPosition?: LabelPositions,
    labelLength?: LabelLength
}

const CheckboxAdvancedLabel = styled.label<LabelProps>`
    display: flex;
    justify-content: flex-start;
    flex: 1;
    padding: 0 1em 0 ${props => props.labelPosition === LabelPositions.horizontal ? '1em' : '0'};

    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.labelColor};
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    max-width: ${props => props.labelLength === LabelLength.auto
        ? props.length
        : props.labelLength};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

interface CheckboxProps extends PropsObjectInterface{
    className: string,
    checked: boolean,
    color: string,
    colorOff: string,
    label: string,
    labelPosition?: LabelPositions,
    align?: AlignPositions,
    shadow?: boolean,
    length: ElementLength,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    borderRadius?: BorderRadius,
    labelColor?: string,
    hideLabel?: boolean,
    labelLength?: LabelLength,
    onChange: ChangeElementValueType
}

interface CheckboxElementInterface {
    className: string,
    checked: boolean,
    color: string,
    colorOff: string,
    onChange: ChangeElementValueType
}

function CheckboxElement({
    className,
    checked: checkedFromProps,
    color,
    colorOff,
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
            color={color}
            colorOff={colorOff}
            onClick={onCheckboxChange}
        >
            <Icon
                viewBox="0 0 24 24"
                className="ie-checkbox__checkbox__icon"
                colorOff={colorOff}
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
        shadow,
        length,
        color,
        colorOff,
        borderColor,
        showBorders,
        hideBottomBorder,
        borderRadius,
        hideLabel,
        labelColor,
        labelLength,
        onChange
    } = props;

    const id = useRef(generateID());

    return (
        <CheckboxAdvancedWrapper
            shadow={shadow}
            length={length}
            align={align}
            labelPosition={labelPosition}
            borderColor={borderColor}
            showBorders={showBorders}
            hideBottomBorder={hideBottomBorder}
            borderRadius={borderRadius}
        >
            {hideLabel ? null : (
                <CheckboxAdvancedLabel
                    htmlFor={id.current}
                    length={length}
                    labelColor={labelColor}
                    labelPosition={labelPosition}
                    labelLength={labelLength}
                >
                    {label}
                </CheckboxAdvancedLabel>
            )}
            <CheckboxElement
                className={className}
                checked={checkedFromProps}
                color={color}
                colorOff={colorOff}
                onChange={onChange}
            />
        </CheckboxAdvancedWrapper>
    );
}

const defaultProps: PropsObjectInterface = {
    className: '',
    checked: false,
    color: allColors['Dim Gray'],
    colorOff: allColors['White'],
    label: 'Label',
    align: AlignPositions.center,
    shadow: true,
    labelPosition: LabelPositions.horizontal,
    length: ElementLength.m,
    borderColor: allColors['Silver Sand'],
    showBorders: false,
    hideBottomBorder: false,
    borderRadius: BorderRadius.no,
    labelColor: allColors['Dim Gray'],
    hideLabel: false,
    labelLength: LabelLength.auto,
    onChange: () => {}
};

Checkbox.defaultProps = defaultProps;
CheckboxElement.defaultProps = defaultProps;

export { CheckboxElement, Checkbox };
export type {CheckboxProps };
