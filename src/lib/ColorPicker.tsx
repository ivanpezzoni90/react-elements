import React, { Fragment, memo, useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { fontColorFromBackground, generateID, mergeClasses } from './helpers';
import {
    AlignPositions,
    ElementLength,
    LabelPositions,
    BorderRadius,
    LabelLength
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
    align?: AlignPositions,
    labelPosition?: LabelPositions,
    borderRadius?: BorderRadius
}

const ColorPickerAdvancedWrapper = styled.div<ColorPickerAdvancedWrapperInterface>`
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
interface DropDownContainerProps {
    zIndex: number | null
}

const ColorPickerAdvancedLabel = styled.div<LabelProps>`
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

const DropDownListContainer = styled('div')<DropDownContainerProps>`
    position: absolute;
    ${props => props.zIndex ? `z-index: ${props.zIndex}` : ''};
    margin-top: 2em;
    right: auto;
    left: 0;
`;

const DropDownList = styled.div`
    margin: 0;
    margin-top: 0.25em;
    padding: 0.5em;
    background-color: #ebebeb;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    color: #666;
    font-size: 1em;
    font-weight: 500;
    text-align: left;

    max-height: 25em;
    overflow: auto;

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
    ${props => props.color === allColors['Transparent']
        ? `
            background: repeating-conic-gradient(${allColors['Silver Sand']} 0% 25%, transparent 0% 50%) 
            50% / 16px 16px;
        ` : `
            background: ${props.color};
        `}
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

type ColorPickerChangeHandlerType = (v: string) => void;

interface ColorPickerProps {
    className: string,
    value: string,
    label: string,
    labelPosition?: LabelPositions,
    align?: AlignPositions,
    shadow?: boolean,
    length: ElementLength,
    onChange: ColorPickerChangeHandlerType,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    labelColor?: string,
    hideLabel?: boolean,
    closeOnClickOutside?: boolean,
    labelLength?: LabelLength,
    borderRadius?: BorderRadius
}

interface ColorPickerElementInterface {
    valueFromProps: string,
    closeOnClickOutside?: boolean,
    onChange: ColorPickerChangeHandlerType,
}

const ColorListItemComponent = memo(({
    color,
    selectedColor,
    hoverColor,
    onMouseEnter,
    onChange
}: {
    color: ColorObject,
    selectedColor: string,
    hoverColor: string,
    onMouseEnter: (color: ColorObject) => () => void,
    onChange: (newColor: string) => void
}) => {
    const onChangeColor = useCallback((newColor: string) => () => {
        onChange(newColor);
    }, [onChange]);

    return (<ColorListItem
        className="ie-dropdown__color__list__row__item"
        color={color.hex}
        selected={color.hex === selectedColor}
        hovered={color.hex === hoverColor}
        onClick={onChangeColor(color.hex)}
        onMouseEnter={onMouseEnter(color)}
        borderColor={fontColorFromBackground(color.hex)}
    />);
});
ColorListItemComponent.displayName = 'ColorListItem';

const ColorListFooterComponent = memo(({
    hoverColor,
    selectedColor,
    selectedColorLabel,
    onCustomColorChange
}: {
    hoverColor: ColorObject
    selectedColor: string,
    selectedColorLabel?: string
    onCustomColorChange: (newColor: string | number) => void
}) => {
    const [customColor, setCustomColor] = useState(false);
    const onInputChange = useCallback(() => {
        if (!customColor) setCustomColor(true);
    }, [customColor]);

    return (
        <ColorListFooter
            className="ie-dropdown__color__list__footer"
        >
            <Input
                className="ie-dropdown__color__list__footer__input"
                active
                shadow={false}
                value={hoverColor.hex !== '' ? hoverColor.hex : selectedColor}
                label={ customColor
                    ? '' 
                    : hoverColor.name !== ''
                        ? hoverColor.name
                        : selectedColorLabel
                }
                onChange={onInputChange}
                onBlur={onCustomColorChange}
            />

        </ColorListFooter>
    );
});
ColorListFooterComponent.displayName = 'ColorListFooter';

const ColorPickerElement = memo(({
    valueFromProps,
    closeOnClickOutside,
    onChange
}: ColorPickerElementInterface) => {
    const [selectedColor, setSelectedColor] = useState(valueFromProps);
    const [isOpen, setIsOpen] = useState(false);

    const selectedColorLabel = getColorNameByHex(selectedColor);

    const toggling = () => setIsOpen(!isOpen);

    const styledColorPickerRef = useRef<HTMLDivElement>(null);
    const dropDownZIndex = useComputedZIndex(styledColorPickerRef);

    const onChangeColor = useCallback((newColor: string) => {
        setSelectedColor(newColor);
        onChange(newColor);
    }, [onChange]);


    const onCustomColorChange = useCallback((newColor: string | number) => {
        setSelectedColor(newColor as string);
        onChange(newColor as string);
    }, [onChange]);

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
    useClickOutside(
        dropDownRef,
        closeOnClickOutside
            ? () => setIsOpen(false)
            : doNothing,
        [styledColorPickerRef]
    );

    const colorListRows = useMemo(() => {
        return (
            Object.values(palette).map((colorArray) => (
                <ColorListRow
                    className="ie-dropdown__color__list__row"
                    key={Math.random()}
                >
                    {colorArray.map((colorObj: ColorObject) => (
                        <ColorListItemComponent
                            key={`${colorObj.name}_${colorObj.hex}`}
                            color={colorObj}
                            selectedColor={selectedColor}
                            hoverColor={hoverColor.hex}
                            onMouseEnter={onMouseEnter}
                            onChange={onChangeColor}
                        />
                    ))}
                </ColorListRow>
            ))
        );
    }, [hoverColor.hex, onChangeColor, selectedColor]);

    return (
        <>
            <ColorPickerContainer
                className="ie-color-picker__element"
            >
                <ColorPickerInfoContainer
                    className="ie-color-picker__element__info"
                >
                    <SelectedColor
                        className="ie-color-picker__element__info__color"
                    >
                        {selectedColor}
                    </SelectedColor>
                    <SelectedColorLabel
                        className="ie-color-picker__element__info__label"
                    >
                        {selectedColorLabel}
                    </SelectedColorLabel>
                </ColorPickerInfoContainer>
                <StyledColorPicker
                    className="ie-color-picker__element__picker"
                    ref={styledColorPickerRef}
                    color={selectedColor}
                    onClick={toggling}
                />
                {isOpen && (
                    <DropDownListContainer
                        className="ie-dropdown ie-dropdown__color"
                        ref={dropDownRef}
                        zIndex={dropDownZIndex}
                    >
                        <DropDownList
                            className="ie-dropdown__color__list"
                        >
                            <ColorListColumn
                                className="ie-dropdown__color__list__column"
                                // Reset hoverColor when leaving palette div
                                onMouseLeave={onMouseLeave}
                            >
                                {colorListRows}
                            </ColorListColumn>
                            <ColorListFooterComponent
                                hoverColor={hoverColor}
                                selectedColor={selectedColor}
                                selectedColorLabel={selectedColorLabel}
                                onCustomColorChange={onCustomColorChange}
                            />
                        </DropDownList>
                    </DropDownListContainer>
                )}
            </ColorPickerContainer>
        </>
    );
});

function ColorPicker(props: ColorPickerProps) {
    const {
        className,
        value: valueFromProps,
        label,
        labelPosition,
        labelLength,
        align,
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
        <ColorPickerAdvancedWrapper
            align={align}
            shadow={shadow}
            length={length}
            labelPosition={labelPosition}
            borderColor={borderColor}
            showBorders={showBorders}
            hideBottomBorder={hideBottomBorder}
            borderRadius={borderRadius}
            className={mergeClasses('ie-color-picker', className)}
        >
            {hideLabel ? null : (
                <ColorPickerAdvancedLabel
                    className="ie-color-picker__label"
                    htmlFor={id.current}
                    length={length}
                    labelColor={labelColor}
                    labelPosition={labelPosition}
                    labelLength={labelLength}
                >
                    {label}
                </ColorPickerAdvancedLabel>
            )}
            <ColorPickerElement
                valueFromProps={valueFromProps}
                closeOnClickOutside={closeOnClickOutside}
                onChange={onChange}
            />
        </ColorPickerAdvancedWrapper>
    );
}

const defaultProps: ColorPickerProps = {
    className: '',
    value: '',
    label: 'Label',
    shadow: true,
    labelPosition: LabelPositions.horizontal,
    labelLength: LabelLength.auto,
    align: AlignPositions.center,
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
ColorPickerElement.displayName = 'ColorPickerElement';

export { ColorPickerElement, ColorPicker };
export type {ColorPickerProps };
