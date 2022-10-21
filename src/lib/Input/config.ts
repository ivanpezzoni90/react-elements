import { throttle } from 'throttle-debounce';
import { BorderRadius, ElementHeight, ElementLength, LabelLength, LabelPositions } from '../types';

export enum InputTypes {
    text = 'text',
    number = 'number',
    date = 'date'
}

export interface InputProps {
    className: string,
    locked: boolean,
    error: boolean,
    errorMessage?: string,
    value: string,
    label: string,
    shadow?: boolean,
    onBlur: ChangeInputHandlerType,
    onChange: ChangeInputHandlerType,
    length: ElementLength,
    active?: boolean,
    labelColor?: string,
    labelPosition?: LabelPositions,
    textColor?: string,
    borderColor?: string,
    min?: number | string,
    max?: number | string,
    type?: InputTypes,
    labelLength?: LabelLength,
    hideLabel?: boolean,
    height?: ElementHeight,
    placeholder?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean
    borderRadius?: BorderRadius,
    textarea?: boolean,
    name?: string
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
    defaultValue: string,
    onChange: ChangeInputHandlerType,
    onFocus: VoidFunction,
    onBlur: ChangeInputHandlerType,
    max?: number | string,
    min?: number | string,
    computedWidth: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    borderRadius?: BorderRadius,
    placeholder?: string,
    textarea?: boolean,
    name?: string
}

export interface InputWrapperProps {
    ref: React.RefObject<HTMLDivElement>,
    length: string,
    active: boolean
    locked: boolean,
    shadow?: boolean,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    hideLabel?: boolean,
    labelPosition?: LabelPositions,
    borderRadius?: BorderRadius,
    height?: ElementHeight
    textarea?: boolean
}

export interface LabelProps {
    error: boolean,
    errorMessage?: string,
    active: boolean,
    labelColor?: string,
    length: ElementLength,
    labelPosition?: LabelPositions,
    type?: InputTypes,
    labelLength?: LabelLength,
    label: string,
    placeholder?: string
}

export interface CommonElementProps {
    error: boolean,
    length: string,
    active?: boolean,
    shadow?: boolean
    textColor?: string,
    type?: InputTypes,
    placeholder?: string,
    id: string,
    defaultValue: string,
    onFocus: VoidFunction,
    computedWidth: string,
    minlength?: number,
    maxlength?: number,
    textarea?: boolean
}
export interface InputElementProps extends CommonElementProps {
    onChange: throttle<(event: React.ChangeEvent<HTMLInputElement>) => void>,
    onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export interface TextareaElementProps extends CommonElementProps {
    onChange: throttle<(event: React.ChangeEvent<HTMLTextAreaElement>) => void>,
    onBlur: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export type CheckValidatorsType = (v: string, opts?: {
   changeFromCaret?: boolean 
}) => boolean