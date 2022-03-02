
import styled from 'styled-components';
import {
    calculateInnerInputLength,
    calculateInputLength
} from '../../helpers';

import {
    SelectElementProps,
    SelectWrapperProps,
    LabelProps,
    ListItemProps,
    DropDownContainerProps,
} from './config';

export const SelectElement = styled.div<SelectElementProps>`
    width: ${(props) => (calculateInnerInputLength(props.length))};
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
    color: #666;
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
    padding: 2em 1em 0.5em 1.25em;
`;

export const SelectWrapper = styled.div<SelectWrapperProps>`
    width: ${props => calculateInputLength(props.length)};
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    border-bottom: 1px solid #666;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    ${props => props.hasValue && props.shadow
        ? `background-color: #ffffff;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);`
        : ''}
    &:hover{
        ${props => props.shadow ? 'background-color: rgba(255, 255, 255, 0.45);' : ''}
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    }
`;

export const Label = styled.div<LabelProps>`
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

    ${props => props.hasValue
        ? `top: .25em;
        left: 1.5em;
        opacity: 1;
        color: #666;
        font-size: 12px;`
        : ''}
`;

export const IconWrapper = styled.div`
    position: absolute;
    top: 1.5em;
    right: 0.5em;
`;

export const DropDownListContainer = styled('div')<DropDownContainerProps>`
    position: absolute;
    width: ${props => calculateInputLength(props.length)};
    ${props => props.zIndex ? `z-index: ${props.zIndex}` : ''}
`;

export const DropDownList = styled('ul')`
    margin: 0;
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
    &:hover {
        ${props => !props.selected ? 'background: #dfdede' : ''};
    }
    ${props => props.selected
        ? `background: #adadad;
            color: #ffffff;`
        : ''}
`;

export const ListIcon = styled.div`
    padding-right: 0.25em;
`;