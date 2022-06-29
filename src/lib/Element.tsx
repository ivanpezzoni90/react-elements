import React, { ReactChild } from 'react';
import styled from 'styled-components';
import { allColors } from './constants/colors';
import { mergeClasses } from './helpers';
import { PropsObjectInterface } from './types';
import { AlignPositions, LabelPositions } from './types';

const ElementLabel = styled.label``;
const ElementWrapper = styled.div`
  padding: 0.5em;
`;

interface LabelTextWrapperInterface {
    position?: LabelPositions
    labelColor?: string
}
const LabelTextWrapper = styled.div<LabelTextWrapperInterface>`
    display: flex;
    align-items: center;
    color: ${props => props.labelColor};
    ${({ position }) => position === 'vertical'
        ? 'padding-bottom: 0.25em;'
        : 'padding-right: 0.5em;'}
`;

const FlexWrapper = styled.div`
    display: flex;
    flex-direction: ${({ position }: { position: string }) => position === 'vertical'
        ? 'column'
        : 'row'}
`;
const ChildWrapper = styled.div`
    display: flex;
    justify-content: ${({ align }: { align: string }) =>
        AlignPositions[align as keyof typeof AlignPositions]}
`;

interface ElementProps extends PropsObjectInterface {
    id: string,
    label: string,
    labelPosition?: LabelPositions,
    className?: string,
    align?: AlignPositions,
    labelColor?: string,
    hideLabel?: boolean,
    children: Array<ReactChild> | ReactChild
}

const Element = (props: ElementProps) => {
    const {
        id,
        label,
        labelPosition = LabelPositions.horizontal,
        align = AlignPositions.left,
        className = '',
        labelColor,
        hideLabel,
        children
    } = props;

    return (
        <ElementWrapper
            className={mergeClasses('ie-element', className)}
        >
            <ElementLabel
                className="ie-element__label"
                htmlFor={id}
            >
                <FlexWrapper
                    position={labelPosition}
                >
                    {hideLabel ? null : (
                        <LabelTextWrapper
                            className="ie-element__label__text"
                            position={labelPosition}
                            labelColor={labelColor}
                        >
                            { label }
                        </LabelTextWrapper>
                    )}
                    <ChildWrapper
                        className="ie-element__label__child"
                        align={align}
                    >
                        { children }
                    </ChildWrapper>
                </FlexWrapper>
            </ElementLabel>
        </ElementWrapper>
    );
};

const defaultProps: PropsObjectInterface = {
    id: '',
    label: 'Label',
    labelPosition: LabelPositions.horizontal,
    align: AlignPositions.left,
    className: '',
    labelColor: allColors['Dim Gray'],
    hideLabel: false,
    children: []
};

Element.defaultProps = defaultProps;

export { Element };
export type { ElementProps };