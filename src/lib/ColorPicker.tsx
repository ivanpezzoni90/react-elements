import React, { Fragment, useRef, useState } from 'react';
import styled from 'styled-components';
import { fontColorFromBackground, generateID, mergeClasses } from './helpers';
import { Element } from './Element';
import {
    AlignPositions,
    ElementLength,
    LabelPositions,
    ChangeElementValueType,
    PropsObjectInterface,
    BorderRadius
} from './types';
import { useClickOutside, useComputedZIndex } from './hooks';
import { ColorObject, palette, getColorNameByHex, allColors } from './constants/colors';
import { Input } from './Input';

const doNothing = () => {};

const ColorPickerContainer = styled.div`
    padding-right: 1em;

    vertical-align: middle;
    padding: 0.25em 1em 0 0.25em;

    display: flex;
`;

interface StyledColorPickerInterface {
    color: string,
    ref: React.RefObject<HTMLDivElement>
}

const StyledColorPicker = styled.div<StyledColorPickerInterface>`
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    border-radius: 3px;
    border: 1px solid #666;
    background: ${props => props.color};
`;

interface ColorPickerAdvancedWrapperInterface {
    length: ElementLength,
    shadow?: boolean,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    borderRadius?: BorderRadius
}

const ColorPickerAdvancedWrapper = styled.div<ColorPickerAdvancedWrapperInterface>`
    display: flex;
    align-items: center;
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
    ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);' : ''}

    &:hover{
        background-color: rgba(255, 255, 255, 0.45);
        ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : ''}
    }
`;

interface LabelProps {
    htmlFor: string,
    length: ElementLength,
    labelColor?: string
}
interface DropDownContainerProps {
    zIndex: number | null
}

const ColorPickerAdvancedLabel = styled.div<LabelProps>`
    display: flex;
    justify-content: flex-start;
    flex: 1;
    padding: 0 1em 0 1em;

    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.labelColor};
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    max-width: ${({length}) => length};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const DropDownListContainer = styled('div')<DropDownContainerProps>`
    position: absolute;
    ${props => props.zIndex ? `z-index: ${props.zIndex}` : ''};
    margin-top: 2em;
    right: 0;
`;

const DropDownList = styled.div`
    margin: 0;
    margin-top: 0.25em;
    padding: 0.5em;
    background-color: #ebebeb;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    color: #666;
    font-size: 1em;
    font-weight: 500;
    text-align: left;

    display: flex;
    flex-direction: column;
`;

const ColorListColumn = styled.div`
    display: flex;
    flex-direction: column;

`;

const ColorListRow = styled.div`
    display: flex;
`;

interface ColorListItemInterface {
    color: string,
    selected: boolean,
    hovered: boolean,
    borderColor: string
}

const ColorListItem = styled.div<ColorListItemInterface>`
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    background: ${props => props.color};
    ${props => props.hovered ? `
        -webkit-box-shadow:inset 0px 0px 0px 1px ${props.borderColor};
        -moz-box-shadow:inset 0px 0px 0px 10px ${props.borderColor};
        box-shadow:inset 0px 0px 0px 1px ${props.borderColor};
    ` : ''}
    ${props => props.selected ? `
        -webkit-box-shadow:inset 0px 0px 0px 1px ${props.borderColor};
        -moz-box-shadow:inset 0px 0px 0px 10px ${props.borderColor};
        box-shadow:inset 0px 0px 0px 1px ${props.borderColor};
    ` : ''}
    margin-right: 1px;
    margin-bottom: 1px;
`;

const ColorListFooter = styled.div`
    display: flex;
    padding-top: 1em;
`;
const ColorPickerInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 10px;
    color: ${allColors['Dim Gray']};
    padding-right: 0.5em;
    text-align: right;
`;
const SelectedColor = styled.div`
`;
const SelectedColorLabel = styled.div`
`;

interface ColorPickerProps extends PropsObjectInterface{
    className: string,
    value: string,
    label: string,
    simpleElement?: boolean,
    labelPosition?: LabelPositions,
    align?: AlignPositions,
    shadow?: boolean,
    length: ElementLength,
    onChange: ChangeElementValueType,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    labelColor?: string,
    hideLabel?: boolean,
    closeOnClickOutside?: boolean
    borderRadius?: BorderRadius
}

interface ColorPickerElementInterface {
    className: string,
    valueFromProps: string,
    closeOnClickOutside?: boolean,
    onChange: ChangeElementValueType
}

function ColorPickerElement({
    className,
    valueFromProps,
    closeOnClickOutside,
    onChange
}: ColorPickerElementInterface) {
    const [selectedColor, setSelectedColor] = useState(valueFromProps);
    const [isOpen, setIsOpen] = useState(false);

    const selectedColorLabel = getColorNameByHex(selectedColor);

    const toggling = () => setIsOpen(!isOpen);

    const ref = useRef<HTMLDivElement>(null);
    const dropDownZIndex = useComputedZIndex(ref);

    const onChangeColor = (newColor: string) => () => {
        setSelectedColor(newColor);
        onChange(newColor);
    };

    const onCustomColorChange: ChangeElementValueType = (newColor) => {
        setSelectedColor(newColor as string);
        onChange(newColor);
    };

    const emptyColorObj: ColorObject = {
        name: '',
        hex: '',
        rgb: []
    };

    const [
        hoverColor, setHoverColor
    ]: [
        hoverColor: ColorObject,
        setHoverColor: (color: ColorObject) => void
    ] = useState(emptyColorObj);

    const onMouseEnter = (color: ColorObject) => () => setHoverColor(color);
    const onMouseLeave = () => setHoverColor(emptyColorObj);

    const dropDownRef = useRef<HTMLDivElement>(null);
    // Set close dropdown callback on click outside when enabled
    useClickOutside(dropDownRef, closeOnClickOutside
        ? () => setIsOpen(false)
        : doNothing
    );

    return (
        <>
            <ColorPickerContainer
                className={mergeClasses('ie-color-picker', className)}
            >
                <ColorPickerInfoContainer>
                    <SelectedColor>
                        {selectedColor}
                    </SelectedColor>
                    <SelectedColorLabel>
                        {selectedColorLabel}
                    </SelectedColorLabel>
                </ColorPickerInfoContainer>
                <StyledColorPicker
                    className="ie-color-picker__picker"
                    ref={ref}
                    color={selectedColor}
                    onClick={toggling}
                />
                {isOpen && (
                    <DropDownListContainer
                        ref={dropDownRef}
                        zIndex={dropDownZIndex}
                    >
                        <DropDownList>
                            <ColorListColumn
                            // Reset hoverColor when leaving palette div
                                onMouseLeave={onMouseLeave}
                            >
                                {Object.values(palette).map((colorArray) => (
                                    <ColorListRow
                                        key={Math.random()}
                                    >
                                        {colorArray.map((colorObj: ColorObject) => (
                                            <ColorListItem
                                                key={`${colorObj.name}_${colorObj.hex}`}
                                                color={colorObj.hex}
                                                selected={colorObj.hex === selectedColor}
                                                hovered={colorObj.hex === hoverColor.hex}
                                                onClick={onChangeColor(colorObj.hex)}
                                                onMouseEnter={onMouseEnter(colorObj)}
                                                borderColor={fontColorFromBackground(colorObj.hex)}
                                            />
                                        ))}
                                    </ColorListRow>
                                ))}
                            </ColorListColumn>
                            <ColorListFooter>
                                <Input
                                    active
                                    shadow={false}
                                    value={hoverColor.hex !== '' ? hoverColor.hex : selectedColor}
                                    label={hoverColor.name !== '' ? hoverColor.name : (selectedColorLabel || '')}
                                    onChange={onCustomColorChange}
                                />

                            </ColorListFooter>
                        </DropDownList>
                    </DropDownListContainer>
                )}
            </ColorPickerContainer>
        </>
    );
}

function ColorPicker(props: ColorPickerProps) {
    const {
        className,
        value: valueFromProps,
        label,
        labelPosition,
        align,
        simpleElement,
        shadow,
        length,
        borderColor,
        showBorders,
        hideBottomBorder,
        borderRadius,
        hideLabel,
        labelColor,
        closeOnClickOutside,
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
                    <ColorPickerElement
                        className={className}
                        valueFromProps={valueFromProps}
                        closeOnClickOutside={closeOnClickOutside}
                        onChange={onChange}
                    />
                </Element>
            ): (
                <ColorPickerAdvancedWrapper
                    shadow={shadow}
                    length={length}
                    borderColor={borderColor}
                    showBorders={showBorders}
                    hideBottomBorder={hideBottomBorder}
                    borderRadius={borderRadius}
                >
                    {hideLabel ? null : (
                        <ColorPickerAdvancedLabel
                            htmlFor={id.current}
                            length={length}
                            labelColor={labelColor}
                        >
                            {label}
                        </ColorPickerAdvancedLabel>
                    )}
                    <ColorPickerElement
                        className={className}
                        valueFromProps={valueFromProps}
                        closeOnClickOutside={closeOnClickOutside}
                        onChange={onChange}
                    />
                </ColorPickerAdvancedWrapper>
            )}
        </Fragment>
    );
}

const defaultProps: PropsObjectInterface = {
    className: '',
    value: '',
    label: 'Label',
    simpleElement: false,
    shadow: true,
    labelPosition: LabelPositions.horizontal,
    length: ElementLength.m,
    borderColor: allColors['Silver Sand'],
    showBorders: false,
    hideBottomBorder: false,
    borderRadius: BorderRadius.no,
    labelColor: allColors['Dim Gray'],
    hideLabel: false,
    closeOnClickOutside: true,
    onChange: () => {}
};

ColorPicker.defaultProps = defaultProps;

export { ColorPickerElement, ColorPicker };
export type {ColorPickerProps };
