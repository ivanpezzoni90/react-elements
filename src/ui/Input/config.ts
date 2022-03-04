import { ChangeElementValueType, InputLength, PropsObjectInterface } from '../../types';

export enum InputTypes {
    text = 'text',
    number = 'number'
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
    length: InputLength,
    active?: boolean,
    labelColor?: string,
    textColor?: string,
    borderColor?: string,
    min?: number,
    max?: number,
    type?: InputTypes
}

export interface InputWrapperProps {
  length: string,
  active: boolean
  locked: boolean,
  shadow?: boolean,
  borderColor?: string
}

export interface LabelProps {
  error: boolean,
  errorMessage?: string,
  active: boolean,
  labelColor?: string,
}

export interface InputElementProps {
  error: boolean,
  length: string,
  active: boolean,
  shadow?: boolean
  textColor?: string,
  type?: InputTypes
}
