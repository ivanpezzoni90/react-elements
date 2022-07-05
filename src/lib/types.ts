import { ReactChild } from 'react';
import { IconList } from './Icon';
import { InputTypes } from './Input/config';

export type Component = {
    key: string,
    name: string,
    editor: Function // TODO:
};

export enum EditorTypes {
    input = 'input',
    select = 'select',
    checkbox = 'checkbox',
    toggle = 'toggle',
    color = 'color',
}

export type Editor = {
    type: EditorTypes,
    default: string | boolean | Array<string> | number | undefined,
    label: string,
    options?: Array<Option>,
    inputType?: InputTypes | RadioTypes,
    prop: string,
    resettable?: boolean
};

export enum EditorSectionTypes {
    section = 'section'
}

export type EditorSection = {
    type: EditorSectionTypes,
    label: string,
    editors: Editor[]
}

export type Option = {
    label: string,
    value: string | number | boolean,
    icon?: string
};

export type  VoidFunction = () => void;
export type SetStringToStateType = (s: string) => void;
export type SetBoolToStateType = (s: boolean) => void;

export type ChangeEditorPropType = (prop: string, value: string | boolean | Array<string> | number | null) => void;
export type ChangeElementValueType = (value: string | boolean | Array<string> | number | null) => void;

export enum ElementLength {
    squared = '3.5em',
    xxs = '2em',
    xs = '6em',
    s = '8em',
    m = '14em',
    l = '18em',
    xl = '26em',
    xxl = '32em',
    full = '100%'
}

export enum Padding {
    s = '0.5em',
    m = '1em',
    l = '1.5em'
}

export enum BorderRadius {
    no = '0',
    xs = '.25em',
    s = '.5em',
    m = '.75em',
    l = '1em',
    xl = '1.25em',
    xxl = '1.5em'
}

export enum FontWeight {
    lighter = '300',
    light = '400',
    semibold = '500',
    bold = '600',
    bolder = '900',
}

export enum IconSize {
    xxs = '12px',
    xs = '16px',
    s = '20px',
    m = '24px',
    l = '28px',
    xl = '32px',
    xxl = '36px'
}

export enum ButtonIconSize {
    auto = 1,
    xs = 0.5,
    s = 0.8,
    m = 1.3,
    l = 2,
    xl = 3
}

export enum ElementSize {
    xxs = '10px',
    xs = '12px',
    s = '14px',
    m = '16px',
    l = '18px',
    xl = '20px',
    xxl = '22px'
}

export enum ElementHeight {
    xs = '1.5em',
    s = '2.5em',
    m = '3.5em',
    l = '4.5em',
    xl = '5.5em'
}

export enum LabelPositions {
    vertical = 'vertical',
    horizontal = 'horizontal'
}

export enum Positions {
    vertical = 'vertical',
    horizontal = 'horizontal'
}

export enum IconPosition {
    left = 'left',
    right = 'right'
}

export enum AlignPositions {
    left = 'flex-start',
    center = 'center',
    right = 'flex-end'
}

export enum LabelLength {
    xxs = '2em',
    xs = '4em',
    s = '6em',
    m = '8em',
    l = '10em',
    xl = '12em',
    xxl = '14em',
    auto = 'auto'
}

export enum ToggleLabelType {
    label = 'label',
    icon = 'icon'
}

export enum RadioTypes {
    checkbox = 'checkbox',
    toggle = 'toggle',
    button = 'button'
}

export interface PropsObjectInterface {
    id?: string,
    className?: string,
    children?: Array<ReactChild> | ReactChild
    options?: Array<Option>,
    value?: string | boolean | number | string[] | number[] | null, 
    label?: string,
    length?: ElementLength,
    simpleElement?: boolean,
    onChange?: ChangeElementValueType,
    locked?: boolean,
    error?: boolean,
    errorMessage?: string,
    onBlur?: ChangeElementValueType,
    checked?: boolean,
    labelPosition?: LabelPositions,
    position?: Positions,
    color?: string,
    icon?: IconList | string,
    fontSize?: string,
    align?: AlignPositions,
    labelOn?: string,
    labelOff?: string,
    labelType?: ToggleLabelType,
    shadow?: boolean,
    active?: boolean,
    colorOff?: string,
    iconColor?: string,
    iconOffColor?: string,
    labelColor?: string,
    textColor?: string,
    borderColor?: string,
    optionSelectedColor?: string,
    min?: number,
    max?: number,
    type?: InputTypes | RadioTypes,
    padding?: Padding,
    borderRadius?: BorderRadius,
    iconSize?: IconSize,
    buttonIconSize?: ButtonIconSize,
    iconPosition?: IconPosition,
    resettable?: boolean,
    step?: number,
    showValue?: boolean
    showTooltip?: boolean,
    cursorColor?: string,
    multiple?: boolean,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    chipBorderRadius?: BorderRadius,
    showStepValue?: boolean,
    showSteps?: boolean,
    hideLabel?: boolean,
    closeOnClickOutside?: boolean,
    labelLength?: LabelLength
}
export type SetPropsToStateType = (props: PropsObjectInterface) => void;