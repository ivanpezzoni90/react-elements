import React, { ReactChild } from 'react';
import styled from 'styled-components';
import { mergeClasses } from '../helpers';
import { PropsObjectInterface } from '../types';

const ElementLabel = styled.label``;
const ElementWrapper = styled.div`
  padding: 0.5em;
`;
const LabelTextWrapper = styled.div`
    display: flex;
    align-items: center;
    ${({ position }: { position: string }) => position === 'vertical'
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
    children: Array<ReactChild> | ReactChild
}

const Element = (props: ElementProps) => {
    const {
        id,
        label,
        labelPosition = LabelPositions.horizontal,
        align = AlignPositions.left,
        className = '',
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
                    <LabelTextWrapper
                        className="ie-element__label__text"
                        position={labelPosition}
                    >
                        { label }
                    </LabelTextWrapper>
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

enum LabelPositions {
    vertical = 'vertical',
    horizontal = 'horizontal'
}
enum AlignPositions {
    left = 'flex-start',
    center = 'center',
    right = 'flex-end'
}

const defaultProps: PropsObjectInterface = {
    id: '',
    label: 'Label',
    labelPosition: LabelPositions.horizontal,
    align: AlignPositions.left,
    className: '',
    children: []
};

Element.defaultProps = defaultProps;

export default Element;

export { LabelPositions, AlignPositions };
export type { ElementProps };