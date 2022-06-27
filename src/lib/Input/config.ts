import { ChangeElementValueType, ElementLength, PropsObjectInterface } from '../types';

export enum InputTypes {
    text = 'text',
    number = 'number',
    date = 'date'
}

export interface InputProps extends PropsObjectInterface {
    locked: boolean,
    error: boolean,
    errorMessage?: string,
    value: string,
    label: string,
    shadow?: boolean,
    onBlur: ChangeElementValueType,
    onChange: ChangeElementValueType,
    length: ElementLength,
    active?: boolean,
    labelColor?: string,
    textColor?: string,
    borderColor?: string,
    min?: number,
    max?: number,
    type?: InputTypes
}

export type SetErrorType = (e: boolean) => void;

export type ChangeInputHandlerType = (v: string | number) => void;

export interface InputTypeProps {
    error: boolean,
    setError: SetErrorType,
    length: ElementLength,
    active?: boolean,
    shadow?: boolean,
    textColor?: string,
    label: string,
    id: string,
    type?: InputTypes,
    value: string,
    onChange: ChangeInputHandlerType,
    onFocus: VoidFunction,
    onBlur: ChangeInputHandlerType,
    max?: number,
    min?: number,
    computedWidth: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean
}

export interface InputWrapperProps {
    ref: any,
    length: string,
    active: boolean
    locked: boolean,
    shadow?: boolean,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean
}

export interface LabelProps {
    error: boolean,
    errorMessage?: string,
    active: boolean,
    labelColor?: string,
    length: ElementLength,
    type?: InputTypes
}

export interface InputElementProps {
    error: boolean,
    length: string,
    active?: boolean,
    shadow?: boolean
    textColor?: string,
    type?: InputTypes,
    placeholder: string,
    id: string,
    value: string,
    onChange: ChangeInputHandlerType,
    onFocus: VoidFunction,
    onBlur: ChangeInputHandlerType,
    computedWidth: string
}

export type CheckValidatorsType = (v: string, opts?: {
   changeFromCaret?: boolean 
}) => boolean