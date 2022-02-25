import React, { ReactChild } from 'react';
import styled from 'styled-components';

const ElementLabel = styled.label``;
const ElementWrapper = styled.div`
  padding: 0.5em;
`;
const LabelTextWrapper = styled.span`
  padding-right: 0.5em;
  padding-bottom: 0.5em;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${({ position }: { position: string }) => position === 'vertical' ? 'column' : 'row'}
`;
const ChildWrapper = styled.div``;

const Element = ({
    id,
    label,
    labelPosition = 'vertical',
    children
}: {
  id: string,
  label: string,
  labelPosition?: string,
  children: Array<ReactChild> | ReactChild
}) => {
    return (
        <ElementWrapper>
            <ElementLabel
                htmlFor={id}
            >
                <FlexWrapper
                    position={labelPosition}
                >
                    <LabelTextWrapper>
                        { label }
                    </LabelTextWrapper>
                    <ChildWrapper>
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

export default Element;

export { LabelPositions };