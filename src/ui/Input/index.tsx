import styled from 'styled-components';
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import './InputStyle.css';
import { generateID } from '../../helpers';

const calculateInputLength = (length: string) => ({
    s: '8em',
    m: '16em',
    l: '32em',
    full: '100%'
  }[length]);
  
const calculateInnerInputLength = (length: string) => ({
    s: '6em',
    m: '14em',
    l: '30em',
    full: '100%'
}[length]);

const InputElement = styled.input`
    width: ${({ length }: {length: string}) => (calculateInnerInputLength(length))};
    height: 2.5em;
    position: relative;
    padding: 0 1em;
    border: none;
    border-radius: 4px;
    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    background-color: transparent;
    color: #666;
    outline: none;
    box-shadow: 0px 4px 20px 0px transparent;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
      0.1s padding ease-in-out;
    -webkit-appearance: none;

    ::placeholder,
    ::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
    ::-moz-placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
    :-ms-input-placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
    :-moz-placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
`;

const InputWrapper = styled.div`
    width: ${({ length }: {length: string}) => calculateInputLength(length)};
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    border-bottom: 1px solid #666;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
`;

const Label = styled.label`
  position: absolute;
  top: 1em;
  left: 1em;
  font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #666;
  opacity: 1;
  pointer-events: none;
  transition: 0.1s all ease-in-out;

  ${({className}: {className: string}) => className === 'error' ? 'color: #ec392f;' : ''}
`;

interface InputProps {
    locked: boolean,
    active: boolean,
    error: string,
    value: string,
    label: string,
    onBlur: Function,
    onChange: Function,
    length: string,
};

function Input({
    locked,
    active: activeFromProps,
    error,
    value: valueFromProps,
    label,
    onBlur,
    onChange,
    length,
}: InputProps) {
   
     const [active, setActive] = useState((locked && activeFromProps) || false);
     const [value, setValue] = useState(valueFromProps);

     useEffect(() => {
        setValue(valueFromProps);
     }, [valueFromProps]);
   
     const id = useRef(generateID());
   
     const fieldClassName = useMemo(() => (
       `field ${(locked ? active : active || value)
         && 'active'} ${locked && !active && "locked"}`
     ),[active, locked, value]);
   
     // TODO: Throttle
     const onChangeValue = useCallback((event) => {
       const newValue = event.target.value;
       setValue(newValue);
       onChange(newValue);
     }, [onChange]);
   
     const onFocusCb = useCallback(() => {
       if (!locked) setActive(true)
     }, [locked]);
   
     const onBlurCb = useCallback((event) => {
       if (!locked) setActive(false);
       const newValue = event.target.value;
       onBlur(newValue);
     }, [locked, onBlur]);
   
     return (
       <InputWrapper
         className={fieldClassName}
         length={length}
       >
         <InputElement
          className={error && "error"}
          length={length}

          id={id.current}
          type="text"
          value={value}
          placeholder={label}
          onChange={onChangeValue}
          onFocus={onFocusCb}
          onBlur={onBlurCb}
         />
         <Label
           htmlFor={id.current}
           className={error && "error"}
         >
           {error || label}
         </Label>
       </InputWrapper>
     );
};

Input.defaultProps = {
    locked: false,
    active: false,
    error: '',
    value: '',
    label: 'Label',
    onBlur: () => {},
    onChange: () => {},
    length: 'full'
};

enum InputLength {
    s = "s",
    m = "m",
    l = "l",
    full = "full"
};

export default Input;

export type { InputProps, InputLength };


