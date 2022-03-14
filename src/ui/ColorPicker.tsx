import React, { Fragment, useRef, useState } from 'react';
import styled from 'styled-components';
import { fontColorFromBackground, generateID, mergeClasses } from '../helpers';
import Element from './Element';
import { AlignPositions, LabelPositions } from '../types';
import { ChangeElementValueType, PropsObjectInterface } from '../types';
import { useComputedZIndex } from '../hooks';
import { ColorObject, palette, getColorNameByHex } from '../constants/colors';
import Input from './Input';

const ColorPickerContainer = styled.div`
    padding-right: 1em;

    display: inline-block;
    vertical-align: middle;
    padding-top: 0.25em;
`;

interface StyledColorPickerInterface {
    color: string,
    ref: any // TODO:
}

const StyledColorPicker = styled.div<StyledColorPickerInterface>`
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    border-radius: 3px;
    border: 1px solid #666;
    background: ${props => props.color};
`;

const ColorPickerAdvancedWrapper = styled.div`
    display: flex;
    align-items: center;
    min-width: 7em;
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    border-bottom: 1px solid #666;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    background-color: #ffffff;
    ${({shadow}: {shadow?: boolean}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);' : ''}

    &:hover{
        background-color: rgba(255, 255, 255, 0.45);
        ${({shadow}: {shadow?: boolean}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : ''}
    }
`;

interface LabelProps {
    htmlFor: string
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
    color: #666;
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;
`;

const DropDownListContainer = styled('div')<DropDownContainerProps>`
    position: absolute;
    ${props => props.zIndex ? `z-index: ${props.zIndex}` : ''}
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

interface ColorPickerProps extends PropsObjectInterface{
    className: string,
    value: string,
    label: string,
    simpleElement?: boolean,
    labelPosition?: LabelPositions,
    align?: AlignPositions,
    shadow?: boolean,
    onChange: ChangeElementValueType
}

interface ColorPickerElementInterface {
    className: string,
    valueFromProps: string,
    onChange: ChangeElementValueType
}

function ColorPickerElement({
    className,
    valueFromProps,
    onChange
}: ColorPickerElementInterface) {
    const [selectedColor, setSelectedColor] = useState(valueFromProps);
    const [isOpen, setIsOpen] = useState(false);

    const selectedColorLabel = getColorNameByHex(selectedColor);

    const toggling = () => setIsOpen(!isOpen);

    const ref = useRef<Element>(null);
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

    return (<ColorPickerContainer
        className={mergeClasses('ie-color-picker', className)}
    >
        <StyledColorPicker
            className="ie-color-picker__picker"
            ref={ref}
            color={selectedColor}
            onClick={toggling}
        />
        {isOpen && (
            <DropDownListContainer
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
    </ColorPickerContainer>);
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
                        onChange={onChange}
                    />
                </Element>
            ): (
                <ColorPickerAdvancedWrapper
                    shadow={shadow}
                >
                    <ColorPickerAdvancedLabel
                        htmlFor={id.current}
                    >
                        {label}
                    </ColorPickerAdvancedLabel>
                    <ColorPickerElement
                        className={className}
                        valueFromProps={valueFromProps}
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
    onChange: () => {}
};

ColorPicker.defaultProps = defaultProps;

export default ColorPicker;

export { ColorPickerElement };
export type {ColorPickerProps };
