import {
    BorderRadius,
    ChangeElementValueType,
    ElementLength,
    Option as OptionType,
    PropsObjectInterface,
    VoidFunction
} from '../types';

export type ListItemClickCallbackType = (value: string) => () => void;

export interface ListItemProps {
    onClick: VoidFunction,
    key: string
    selected: boolean,
    textColor?: string,
    optionSelectedColor?: string,
    multiple?: boolean
}

export interface LabelProps {
    htmlFor: string,
    hasValue: boolean,
    labelColor?: string,
    length?: ElementLength,
    label?: string,
    hideLabel?: boolean
}
export interface SelectElementProps {
    length: string,
    shadow?: boolean,
    computedWidth: string,
    textColor?: string,
    multiple?: boolean
}

export interface DropDownContainerProps {
    length: string,
    computedWidth: string,
    zIndex: number | null
}
export interface SelectWrapperProps{
    hasValue: boolean,
    length: string,
    shadow?: boolean,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    ref: any,
    borderRadius?: BorderRadius
}

export interface SelectProps extends PropsObjectInterface {
    options: Array<OptionType>,
    value: string | string[] | null,
    onChange: ChangeElementValueType,
    label?: string,
    shadow?: boolean,
    length: ElementLength,
    labelColor?: string,
    textColor?: string,
    borderColor?: string,
    optionSelectedColor?: string,
    resettable?: boolean,
    multiple?: boolean,
    className: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    borderRadius?: BorderRadius,
    chipBorderRadius?: BorderRadius,
    hideLabel?: boolean,
    closeOnClickOutside?: boolean
}
