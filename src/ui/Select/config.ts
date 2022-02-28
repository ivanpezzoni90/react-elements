import { MutableRefObject } from 'react';
import { Option as OptionType } from '../../types';

export interface ListItemProps {
    onClick: Function
    key: string
    selected: boolean
}

export interface LabelProps {
    htmlFor: string
    hasValue: boolean
}
export interface SelectElementProps {
    length: string,
}
export interface DropDownContainerProps {
    length: string,
    zIndex: number | null
}
export interface SelectWrapperProps{
    hasValue: boolean,
    length: string,
    ref: any
}

export interface SelectProps {
    options: Array<OptionType>,
    value: string,
    onChange: Function,
    label?: string,
    length: string
}
