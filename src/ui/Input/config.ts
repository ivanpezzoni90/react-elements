export const calculateInputLength = (length: string) => ({
    s: '8em',
    m: '16em',
    l: '32em',
    full: '100%'
  }[length]);
  
export const calculateInnerInputLength = (length: string) => ({
    s: '6em',
    m: '14em',
    l: '30em',
    full: '100%'
}[length]);

export interface InputProps {
    locked: boolean,
    active: boolean,
    error: string,
    value: string,
    label: string,
    onBlur: Function,
    onChange: Function,
    length: string,
};

export interface InputWrapperProps {
  length: string,
  active: boolean
  locked: boolean
};

export interface LabelProps {
  error: string,
  active: boolean,
};

export interface InputElementProps {
  error: string,
  length: string,
  active: boolean,
};
