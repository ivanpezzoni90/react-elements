/* eslint-disable indent */
import styled from 'styled-components';

import {
    CommonElementProps,
    InputTypes,
    InputWrapperProps,
    LabelProps,
} from './config';

import {
    calculateInnerElementLength,
} from '../helpers';
import { allColors } from '../constants/colors';
import { ElementLength, LabelLength, LabelPositions } from '../types';

const inputTextareaStyles = (props: CommonElementProps) => `
    width: ${
        props.length === ElementLength.full
            ? props.computedWidth
            : calculateInnerElementLength(props.length)
    };
    position: relative;
    padding: 0 1em;
    border: none;
    border-radius: 4px;
    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    background-color: transparent;
    color: ${props.textColor};
    outline: none;
    ${props.shadow ? 'box-shadow: 0px 4px 20px 0px transparent;' : ''}
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
      0.1s padding ease-in-out;
    -webkit-appearance: none;

    ${props.error ? `color: ${allColors['Lava']};` : ''}
`;

export const InputElementStyle = styled.input<CommonElementProps>`
    ${props => inputTextareaStyles(props)}
    height: 2.5em;

    ${({type}) => type === InputTypes.date ? `
        :invalid {
            color:${allColors['Lava']};
        }
    `: ''}
    ${({type}) => type === InputTypes.number ? `
        -moz-appearance: textfield;

        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
            -webkit-appearance: none;
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

export const TextAreaElementStyle = styled.textarea<CommonElementProps>`
    ${props => inputTextareaStyles(props)}

    resize: vertical;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
    display: flex;
    ${props => props.labelPosition === LabelPositions.vertical
        ? `flex-direction: column;
            justify-content: center;
        ` : `flex-direction: row;
            align-items: center;
            ${props.textarea ? 'padding: 0.5em 0;' : ''}
        `}
    cursor: text;
    width: ${(props) => props.length};
    ${props => props.textarea ? '' : `height: ${props.height};`}
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: ${props => props.borderRadius};
    ${(props) => props.hideBottomBorder ? '' : `border-bottom: 1px solid ${props.borderColor};`}
    ${(props) => props.showBorders ? `border: 1px solid ${props.borderColor}` : ''};
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    ${props => props.locked ? 'pointer-events: none;' : ''}
    ${props => props.active && props.shadow
        ? `background-color: ${allColors['White']};
            box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);`
        : ''
    }
    &:hover{
      background-color: rgba(255, 255, 255, 0.45);
      ${props => props.shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : ''}
    }
`;

export const Label = styled.label<LabelProps>`
    display: flex;
    ${props => props.labelPosition === LabelPositions.vertical
        ? 'padding: 1em 1em 0 1em;'
        : 'padding: 0 1em;'
    }
    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.labelColor};
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    ${(props) => props.error ? `color: ${allColors['Lava']};` : ''}

    ${props => props.active && props.labelPosition === LabelPositions.vertical
        ? `padding: .25em 1.5em 0 1.5em;
        opacity: 1;
        color: ${props.error ? allColors['Lava'] : props.labelColor};
        font-size: 12px;`
        : ''
    }

    ${props => !props.active && props.labelPosition === LabelPositions.vertical
        ? 'height: 3em;'
        : ''
    }

    max-width: ${({length, labelLength}) => labelLength === LabelLength.auto ? length : labelLength};
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