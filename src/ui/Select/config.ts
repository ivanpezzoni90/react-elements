import { ChangeElementValueType, InputLength, Option as OptionType, PropsObjectInterface, VoidFunction } from '../../types';

export type ListItemClickCallbackType = (value: string) => () => void;

export interface ListItemProps {
    onClick: VoidFunction,
    key: string
    selected: boolean
}

export interface LabelProps {
    htmlFor: string
    hasValue: boolean
}
export interface SelectElementProps {
    length: string,
    shadow?: boolean
}
export interface DropDownContainerProps {
    length: string,
    zIndex: number | null
}
export interface SelectWrapperProps{
    hasValue: boolean,
    length: string,
    shadow?: boolean,
    ref: any
}

export interface SelectProps extends PropsObjectInterface {
    options: Array<OptionType>,
    value: string,
    onChange: ChangeElementValueType,
    label?: string,
    shadow?: boolean,
    length: InputLength
}
