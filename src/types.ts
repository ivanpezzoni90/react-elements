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

export enum InputLength {
    s = 's',
    m = 'm',
    l = 'l',
    full = 'full'
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
    length?: InputLength,
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
    type?: InputTypes
}
export type SetPropsToStateType = (props: PropsObjectInterface) => void;