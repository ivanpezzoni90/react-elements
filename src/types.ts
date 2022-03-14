import { ReactChild } from 'react';
import { InputTypes } from './ui/Input/config';

export type Component = {
    key: string,
    name: string,
    editor: Function // TODO:
};

export type Editor = {
    type: string,
    default: string | boolean | Array<string> | undefined,
    label: string,
    options?: Array<Option>,
    inputType?: InputTypes,
    prop: string
};

export type Option = {
    label: string,
    value: string,
    icon?: string
};

export type  VoidFunction = () => void;

export type SetStringToStateType = (s: string) => void;
export type SetBoolToStateType = (s: boolean) => void;

export type ChangeEditorPropType = (prop: string, value: string | boolean | Array<string>) => void;
export type ChangeElementValueType = (value: string | boolean | Array<string>) => void;

export enum ElementLength {
    s = 's',
    m = 'm',
    l = 'l',
    full = 'full'
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

export enum ElementSize {
    xxs = '10px',
    xs = '12px',
    s = '14px',
    m = '16px',
    l = '18px',
    xl = '20px',
    xxl = '22px'
}

export enum LabelPositions {
    vertical = 'vertical',
    horizontal = 'horizontal'
}

export enum AlignPositions {
    left = 'flex-start',
    center = 'center',
    right = 'flex-end'
}

export enum ToggleLabelType {
    label = 'label',
    icon = 'icon'
}

export interface PropsObjectInterface {
    id?: string,
    className?: string,
    children?: Array<ReactChild> | ReactChild
    options?: Array<Option>,
    value?: string | boolean | Array<string>,
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
    color?: string,
    icon?: string,
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
    type?: InputTypes,
    padding?: Padding,
    borderRadius?: BorderRadius
}
export type SetPropsToStateType = (props: PropsObjectInterface) => void;