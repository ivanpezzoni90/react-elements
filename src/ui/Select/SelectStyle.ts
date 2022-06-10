/* eslint-disable indent */

import styled from 'styled-components';
import {
    calculateInnerElementLength,
    darkOrLightColor,
    fontColorFromBackground,
    lightenDarkenColor
} from '../../helpers';
import { ElementLength } from '../../types';

import {
    SelectElementProps,
    SelectWrapperProps,
    LabelProps,
    ListItemProps,
    DropDownContainerProps,
} from './config';

export const SelectElement = styled.div<SelectElementProps>`
    width: ${(props) => (
        props.length === ElementLength.full
            ? props.computedWidth
            : calculateInnerElementLength(props.length)
        )
    };   
    display: flex;
    text-align: left;
    height: 1.75em;
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
    padding: 0.5em 1em 0 1em;
`;

export const SelectWrapper = styled.div<SelectWrapperProps>`
    display: flex;
    flex-direction: column;
    width: ${props => props.length};
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    border-bottom: 1px solid ${props => props.borderColor};
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    ${props => props.hasValue && props.shadow
        ? `background-color: #ffffff;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);`
        : ''
    }
    &:hover{
        ${props => props.shadow ? 'background-color: rgba(255, 255, 255, 0.45);' : ''}
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    }
`;

export const Label = styled.div<LabelProps>`
    padding: 1em 1em 0 1em;
    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.labelColor};
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    padding: .25em 1.5em 0 1.5em;
    opacity: 1;
    color: ${props => props.labelColor};
    font-size: 12px;

    max-width: ${({length}) => length};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

export const CaretWrapper = styled.div`
    position: absolute;
    top: 1.5em;
    right: 0.5em;
`;
export const ResetWrapper = styled.div`
    position: absolute;
    top: 1.25em;
    right: 2em;
    z-index: 1;
`;

export const DropDownListContainer = styled('div')<DropDownContainerProps>`
    position: absolute;
    width: ${props => props.length};
    ${props => props.zIndex ? `z-index: ${props.zIndex}` : ''}
`;

export const DropDownList = styled('ul')`
    margin: 3.75em 0 0 0;
    padding: 0;
    background-color: #ffffff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    color: #666;
    font-size: 1em;
    font-weight: 500;
    text-align: left;
`;

export const ListItem = styled('li')<ListItemProps>`
    display: flex;
    list-style: none;
    padding: 0.5em 1em 0.5em 1em;
    color: ${props => props.textColor};
    &:hover {
        ${props => !props.selected
            ? `background: ${lightenDarkenColor(
                // Color
                props.optionSelectedColor as string,
                // Amount: is calculated positive (lighten) when color is dark,
                // negative (darken) when color is light
                darkOrLightColor(props.optionSelectedColor as string) === 'dark'
                    ? 60
                    : -10
            )}`
            : ''
        };
    }
    ${props => props.selected
        ? `background: ${props.optionSelectedColor};
            color: ${fontColorFromBackground(props.optionSelectedColor as string)};`
        : ''
    }
`;

export const ListIcon = styled.div`
    padding-right: 0.25em;
`;