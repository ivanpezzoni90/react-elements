/* eslint-disable indent */

import styled from 'styled-components';
import { allColors } from '../constants/colors';
import {
    calculateInnerElementLength,
    darkOrLightColor,
    fontColorFromBackground,
    lightenDarkenColor
} from '../helpers';
import { BorderRadius, ElementLength, LabelLength, LabelPositions } from '../types';

import {
    SelectElementProps,
    SelectWrapperProps,
    LabelProps,
    ListItemProps,
    DropDownContainerProps,
} from './config';


export const SelectContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

export const RelativeDropDownContainer = styled.div`
    position: relative
`;

export const SelectElement = styled.div<SelectElementProps>`
    width: ${(props) => (
        props.length === ElementLength.full
            ? props.computedWidth
            : calculateInnerElementLength(props.length)
        )
    };   
    display: flex;
    align-items: center;
    text-align: left;
    height: 1.75em;
    position: relative;
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
    margin: 0 2em 0 1em;
    padding-bottom: 0.25em;

    overflow: auto;
    white-space: nowrap;
`;

export const SelectWrapper = styled.div<SelectWrapperProps>`
    display: flex;
    ${props => props.labelPosition === LabelPositions.vertical
        ? `flex-direction: column;
            justify-content: center;
        ` : `flex-direction: row;
            align-items: center
        `};
    width: ${props => props.length};
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: ${props => props.borderRadius};
    ${(props) => props.hideBottomBorder ? '' : `border-bottom: 1px solid ${props.borderColor};`}
    ${(props) => props.showBorders ? `border: 1px solid ${props.borderColor}` : ''};
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    ${props => props.hasValue && props.shadow
        ? `background-color: #ffffff;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);`
        : ''
    }
    &:hover{
        ${props => props.shadow ? 'background-color: rgba(255, 255, 255, 0.45);' : ''}
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    }
`;

export const Label = styled.div<LabelProps>`
    display: flex;
    align-items: center;
    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    ${props => props.labelPosition === LabelPositions.horizontal
        ? 'font-size: 16px;'
        : 'font-size: 12px;'
    }
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.labelColor};
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    padding: .25em 1.5em 0 1.5em;
    opacity: 1;
    color: ${props => props.labelColor};

    max-width: ${({length, labelLength}) => labelLength === LabelLength.auto ? length : labelLength};
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
    width: ${(props) => (
        props.length === ElementLength.full
            ? props.computedWidth
            : props.length
        )
    };   
    ${props => props.zIndex ? `z-index: ${props.zIndex}` : ''}
`;

export interface DropDownListInterface {
    borderRadius?: BorderRadius
}
export const DropDownList = styled('ul')<DropDownListInterface>`
    border-radius: ${props => props.borderRadius};
    margin-top: 0;
    padding: 0;
    background-color: #ffffff;
    box-shadow: 0px 4px 20px 0px  rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    color: #666;
    font-size: 1em;
    font-weight: 500;
    text-align: left;

    max-height: 20em;
    overflow: auto;
`;

export const ListItem = styled('li')<ListItemProps>`
    display: flex;
    align-items: center;
    list-style: none;
    padding: ${props => props.multiple ? '0.125em 1em 0.125em 1em' : '0.5em 1em 0.5em 1em'};
    color: ${props => props.textColor};
    &:hover {
        ${props => !props.selected || props.multiple
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
    ${props => props.selected && !props.multiple
        ? `background: ${props.optionSelectedColor};
            color: ${fontColorFromBackground(props.optionSelectedColor as string)};`
        : ''
    }
`;

export const ListIcon = styled.div`
    padding-right: 0.25em;
`;

interface SelectChipInterface {
    color?: string,
    borderRadius?: BorderRadius
}
export const SelectChip = styled.div<SelectChipInterface>`
    box-sizing: border-box;
    background-color: ${({color}) => color};
    border-radius: ${({borderRadius}) => borderRadius};
    display: flex;
    align-items: center;
    margin-right: 0.75em;
    font-size: 12px;
`;

export const ChipText = styled.div`
    padding: 0 0.5em 0 ${({multiple}: {multiple: boolean}) => multiple ? '0.5em' : '0'};
`;

export const ChipsWrapper = styled.div`
    display: flex;
`;

interface ChipIconWrapperInterface {
    borderRadius?: BorderRadius
}

export const ChipIconWrapper = styled.div<ChipIconWrapperInterface>`
    &:hover {
        background-color: ${({color}) => color};
        border-radius: ${({borderRadius}) => borderRadius};
    }
    border-left: 1px solid ${allColors['Silver Sand']};
    padding: 0.25em;
`;

export const DropDownSearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em 1em 0.5em 1em;
`;

export const DropDownSearchIconWrapper = styled.div`
    padding-left: 1em;
    position: absolute;
    right: 1.5em;
`;
