import { ChangeElementValueType, ElementLength, Option as OptionType, PropsObjectInterface, VoidFunction } from '../../types';

export type ListItemClickCallbackType = (value: string | number) => () => void;

export interface ListItemProps {
    onClick: VoidFunction,
    key: string
    selected: boolean,
    textColor?: string,
    optionSelectedColor?: string
}

export interface LabelProps {
    htmlFor: string,
    hasValue: boolean,
    labelColor?: string,
}
export interface SelectElementProps {
    length: string,
    shadow?: boolean,
    computedWidth: string,
    textColor?: string,
}

export interface DropDownContainerProps {
    length: string,
    zIndex: number | null
}
export interface SelectWrapperProps{
    hasValue: boolean,
    length: string,
    shadow?: boolean,
    borderColor?: string,
    ref: any
}

export interface SelectProps extends PropsObjectInterface {
    options: Array<OptionType>,
    value: string | number,
    onChange: ChangeElementValueType,
    label?: string,
    shadow?: boolean,
    length: ElementLength,
    labelColor?: string,
    textColor?: string,
    borderColor?: string,
    optionSelectedColor?: string
}
