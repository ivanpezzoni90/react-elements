export interface InputProps {
    locked: boolean,
    active: boolean,
    error: string,
    value: string,
    label: string,
    onBlur: Function,
    onChange: Function,
    length: string,
}

export interface InputWrapperProps {
  length: string,
  active: boolean
  locked: boolean
}

export interface LabelProps {
  error: string,
  active: boolean,
}

export interface InputElementProps {
  error: string,
  length: string,
  active: boolean,
}
