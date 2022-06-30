/* eslint-disable indent */
import styled from 'styled-components';

import {
    InputElementProps,
    InputTypes,
    InputWrapperProps,
    LabelProps,
} from './config';

import {
    calculateInnerElementLength,
} from '../helpers';
import { allColors } from '../constants/colors';
import { ElementLength } from '../types';

export const InputElementStyle = styled.input<InputElementProps>`
    width: ${(props) => (
        props.length === ElementLength.full
            ? props.computedWidth
            : calculateInnerElementLength(props.length)
        )
    };
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

    ${({type}) => type === InputTypes.number ? `
        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            margin: 0;
        }
    ` : ''}
    ${({type}) => type === InputTypes.date ? `
        ::-webkit-calendar-picker-indicator {
            padding: 0px;
            margin: 0px;
        }
    ` : ''}
`;

export const InputWrapper = styled.div<InputWrapperProps>`
    display: flex;
    flex-direction: column;
    cursor: text;
    width: ${(props) => props.length};
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: ${props => props.borderRadius};
    ${(props) => props.hideBottomBorder ? '' : `border-bottom: 1px solid ${props.borderColor};`}
    ${(props) => props.showBorders ? `border: 1px solid ${props.borderColor}` : ''};
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
    padding: 1em 1em 0 1em;
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
        ? `padding: .25em 1.5em 0 1.5em;
        opacity: 1;
        color: ${props.error ? allColors['Lava'] : props.labelColor};
        font-size: 12px;`
        : ''
    }

    ${props => !props.active ? 'height: 3em;' : ''}

    ${props => props.hideLabel || props.label === '' ? 'height: 1.5em;' : ''}

    max-width: ${({length}) => length};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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