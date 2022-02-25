import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateID } from '../helpers';
import Element from './Element';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  background: ${({ checked }: { checked: boolean }) => (checked ? '#ba0c2f' : '#fff')};
  border-radius: 3px;
  border: 1px solid #666;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #dedede;
  }

  ${Icon} {
    visibility: ${({ checked }: { checked: boolean }) => (checked ? 'visible' : 'hidden')}
  }
`;

function Checkbox({
    className,
    checked: checkedFromProps,
    label,
    labelPosition,
    onChange
}: {
    className: string,
    checked: boolean,
    label: string,
    labelPosition?: string,
    onChange: Function
}) {
    const [
        checked, setChecked
    ]: [
        checked: boolean, setChecked: Function
    ] = useState(checkedFromProps);

    const id = useRef(generateID());

    function onCheckboxChange() {
        setChecked(!checked);
        onChange(!checked);
    }

    useEffect(() => {
        setChecked(checkedFromProps);
    }, [checkedFromProps]);

    return (
        <Element
            id={id.current}
            label={label}
            labelPosition={labelPosition}
        >
            <CheckboxContainer
                className={className}
            >
                <HiddenCheckbox
                    checked={checked}
                    onChange={onCheckboxChange}
                />
                <StyledCheckbox
                    checked={checked}
                >
                    <Icon viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                    </Icon>
                </StyledCheckbox>
            </CheckboxContainer>
        </Element>
    );
}

Checkbox.defaultProps = {
    className: '',
    checked: false,
    label: 'Label',
    labelPosition: undefined,
    onChange: () => {}
};

export default Checkbox;
