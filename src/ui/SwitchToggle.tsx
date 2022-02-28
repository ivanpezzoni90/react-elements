import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateID } from '../helpers';
import Element, { AlignPositions, LabelPositions } from './Element';

interface Slider {
    toggle: boolean,
    color: string
}
interface Switch {
    toggle: boolean,
    color: string
}

const Slider = styled.span<Slider>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ toggle, color }) => (toggle ? color : 'white')};
  border-radius: 15px;
  border: 1px solid gray;
  transition: 0.4s;

  &:before {
    content: "";

    position: absolute;
    left: 1px;
    bottom: 1px;

    width: 20px;
    height: 20px;
    border-radius: 100%;

    background-color: ${({ toggle, color }) => (toggle ? 'white' : color)};

    transition: 0.4s;
  }
`;

const Input = styled.input`
  &:checked + ${Slider}:before {
    transform: translateX(23.4px);
  }
`;

const Switch = styled.label<Switch>`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  background-color: ${({ toggle, color }) => (toggle ? color : 'white')};
  border-radius: 15px;
  transition: 0.4s;

  & ${Input} {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const SwitchToggle = (props: {
    checked: boolean,
    color: string,
    label: string,
    labelPosition: LabelPositions,
    align?: AlignPositions,
    onChange: Function
}) => {
    const {
        checked,
        color,
        label,
        labelPosition,
        align,
        onChange
    } = props;

    const [toggle, setToggle] = useState(checked);

    const onClickCb = useCallback(() => {
        setToggle(!toggle);
        onChange(!toggle);
    }, [onChange, toggle]);

    const id = useRef(generateID());

   
    return (
        <Element
            id={id.current}
            align={align}
            label={label}
            labelPosition={labelPosition}
        >
            <Switch
                toggle={toggle}
                color={color}
            >
                <Input {...{ color }} type="checkbox" defaultChecked={toggle} />
                <Slider {...{ toggle, color }} onClick={onClickCb} />
            </Switch>
        </Element>
    );
};

SwitchToggle.defaultProps = {
    checked: true,
    color: '#ba0c2f',
    label: 'Label',
    labelPosition: undefined,
    onChange: () => {}
};

export default SwitchToggle;