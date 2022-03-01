import { ChangeElementValueType, InputLength, PropsObjectInterface } from '../../types';

export interface InputProps extends PropsObjectInterface {
    locked: boolean,
    error: string,
    value: string,
    label: string,
    shadow?: boolean,
    onBlur: ChangeElementValueType,
    onChange: ChangeElementValueType,
    length: InputLength,
}

export interface InputWrapperProps {
  length: string,
  active: boolean
  locked: boolean,
  shadow?: boolean
}

export interface LabelProps {
  error: string,
  active: boolean,
}

export interface InputElementProps {
  error: string,
  length: string,
  active: boolean,
  shadow?: boolean
}
