/* eslint-disable indent */
import styled from 'styled-components';

import {
    InputElementProps,
    InputTypes,
    InputWrapperProps,
    LabelProps,
} from './config';

import {
    calculateInnerInputLength,
    calculateInputLength
} from '../../helpers';
import { allColors } from '../../constants/colors';

export const InputElement = styled.input<InputElementProps>`
    width: ${(props) => (calculateInnerInputLength(props.length))};
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
    color: ${props => props.textColor};
    outline: none;
    ${props => props.shadow ? 'box-shadow: 0px 4px 20px 0px transparent;' : ''}
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
    ${(props) => props.error ? `color: ${allColors['Lava']};` : ''}

    ${props => props.active
        ? 'padding: 24px 16px 8px 16px;'
        : ''
    }
`;

export const InputWrapper = styled.div<InputWrapperProps>`
    width: ${(props) => calculateInputLength(props.length)};
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    border-bottom: 1px solid ${props => props.borderColor};
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    ${props => props.locked ? 'pointer-events: none;' : ''}
    ${props => props.active && props.shadow
        ? `background-color: ${allColors['White']};
            box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);`
        : ''
}
    &:hover{
      background-color: rgba(255, 255, 255, 0.45);
      ${props => props.shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : ''}
    }
`;

export const Label = styled.label<LabelProps>`
    position: absolute;
    top: 1em;
    left: 1em;
    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.labelColor};
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    ${(props) => props.error ? `color: ${allColors['Lava']};` : ''}

    ${props => props.active
        ? `top: .25em;
        left: 1.5em;
        opacity: 1;
        color: ${props.error ? allColors['Lava'] : props.labelColor};
        font-size: 12px;`
        : ''
}
`;

export const InputNumberIcons = styled.div`
    position: absolute;
    top: 0.75em;
    right: 1em;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;
export const IconWrapper = styled.div``;