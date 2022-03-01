import React, { Fragment, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateID } from '../helpers';
import { ChangeElementValueType, PropsObjectInterface, SetBoolToStateType } from '../types';
import Element from './Element';
import { AlignPositions, LabelPositions } from '../types';

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

const SwitchElementWrapper = styled.div`
    padding-right: 1em;
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

const SwitchToggleAdvancedWrapper = styled.div`
    display: flex;
    align-items: center;
    min-width: 7em;
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    border-bottom: 1px solid #666;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    background-color: #ffffff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);

    &:hover{
        background-color: rgba(255, 255, 255, 0.45);
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    }
`;

interface LabelProps {
    htmlFor: string
}

const SwitchToggleAdvancedLabel = styled.div<LabelProps>`
    display: flex;
    justify-content: flex-start;
    flex: 1;
    padding: 0 1em 0 1em;

    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #666;
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;
`;

interface SwitchToggleProps extends PropsObjectInterface {
    checked: boolean,
    color?: string,
    label?: string,
    simpleElement?: boolean,
    labelPosition?: LabelPositions,
    align?: AlignPositions,
    onChange: ChangeElementValueType
}

function SwitchToggleElement({
    checked,
    onChange,
    color = '#ba0c2f'
}: {
    checked: boolean,
    color?: string,
    onChange: ChangeElementValueType
}) {
    const [
        toggle, setToggle
    ]: [
        toggle: boolean,
        setToggle: SetBoolToStateType
    ] = useState(checked);

    const onClickCb = useCallback(() => {
        setToggle(!toggle);
        onChange(!toggle);
    }, [onChange, toggle]);

    return (<Switch
        toggle={toggle}
        color={color}
    >
        <Input {...{ color }} type="checkbox" defaultChecked={toggle} />
        <Slider {...{ toggle, color }} onClick={onClickCb} />
    </Switch>);
}

const SwitchToggle = (props: SwitchToggleProps) => {
    const {
        checked,
        color,
        label,
        labelPosition,
        simpleElement,
        align,
        onChange
    } = props;

    const id = useRef(generateID());

   
    return (
        <Fragment>
            {simpleElement ? (
                <Element
                id={id.current}
                align={align}
                label={label}
                labelPosition={labelPosition}
                >
                    <SwitchToggleElement
                        checked={checked}
                        color={color}
                        onChange={onChange}
                    />
                </Element>
            ): (
                <SwitchToggleAdvancedWrapper>
                    <SwitchToggleAdvancedLabel
                        htmlFor={id.current}
                    >
                        {label}
                    </SwitchToggleAdvancedLabel>
                    <SwitchElementWrapper>
                        <SwitchToggleElement
                            checked={checked}
                            color={color}
                            onChange={onChange}
                        />
                    </SwitchElementWrapper>
                </SwitchToggleAdvancedWrapper>
            )}
        </Fragment>
    );
};

const defaultProps: PropsObjectInterface = {
    checked: true,
    color: '#ba0c2f',
    label: 'Label',
    labelPosition: undefined,
    simpleElement: false,
    onChange: () => {}
};

SwitchToggle.defaultProps = defaultProps;

export default SwitchToggle;

export { SwitchToggleElement };