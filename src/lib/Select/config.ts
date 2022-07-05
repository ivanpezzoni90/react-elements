import {
    BorderRadius,
    ElementLength,
    LabelLength,
    LabelPositions,
    Option as OptionType,
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
    labelLength?: LabelLength,
    labelPosition?: LabelPositions,
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
    labelPosition?: LabelPositions,
    ref: React.RefObject<HTMLDivElement>,
    borderRadius?: BorderRadius
}

export interface SelectProps {
    options: Array<OptionType>,
    value: string | string[] | null,
    onChange: (v: string | string[] | null) => void,
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
    closeOnClickOutside?: boolean,
    labelLength?: LabelLength,
    labelPosition?: LabelPositions,
    filterable?: boolean
}
