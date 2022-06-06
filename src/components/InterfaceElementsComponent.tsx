import React from 'react';

import { useState } from 'react';
import styled from 'styled-components';
import { Components, getComponentByKey } from '../constants/componentsMap';
import { SetStringToStateType } from '../types';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1em;
    flex: 1;
    text-align: left;
`;
const Aside = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid #666;
    padding: 1em 1em 1em 0em;

    height: 30em;
    overflow: auto;
`;
const Workarea = styled.div`
    padding: 2em;
    display: flex;
    flex: 1;
    flex-direction: column;

    height: 30em;
    overflow: auto;
`;
const Component = styled.div`
    display: flex;
    padding: 0.5em 2em 0.5em 2em;
    font-size: 20px;
    font-weight: semibold;
    cursor: pointer;
    &:hover {
        ${({ active }: { active: boolean }) => !active ? 'background: #dfdede' : ''};
    }
    ${({ active }: { active: boolean }) => active
        ? `background: #adadad;
            color: #ffffff;`
        : ''}
`;

type AsideClickCallbackType = (key: string) => void;

function IEAside({
    currentComponentKey,
    onClick
}: {
    currentComponentKey: string,
    onClick: AsideClickCallbackType
}) {
    return (
        <Aside
            className="ie__aside"
        >
            {Components.map(c => (
                <Component
                    active={currentComponentKey === c.key}
                    key={`${c.key}_${c.name}`}
                    onClick={() => onClick(c.key)}
                >
                    {c.name}
                </Component>
            ))}
        </Aside>
    );
}

function IEWorkarea({
    currentComponentKey
}: {
    currentComponentKey: string
}) {
    const currentComponent = getComponentByKey(currentComponentKey);
    const Editor = currentComponent?.editor();
    return (
        <Workarea
            className="ie__workarea"
        >
            <Editor />
        </Workarea>
    );
}

export default function IEComponent() {
    const [currentKey, setCurrentKey]: [
        currentKey: string, setCurrentKey: SetStringToStateType
    ] = useState(Components[0].key);

    const onClick: AsideClickCallbackType = (key: string) => {
        setCurrentKey(key);
    };

    return (
        <Container
            className="ie"
        >
            <IEAside
                currentComponentKey={currentKey}
                onClick={onClick}
            />
            <IEWorkarea
                currentComponentKey={currentKey}
            />
        </Container>
    );
}
