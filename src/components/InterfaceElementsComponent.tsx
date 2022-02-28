import React from 'react';

import { useState } from 'react';
import styled from 'styled-components';
import { Components, getComponentByKey } from '../constants/componentsMap';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1em;
`;
const Aside = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid #666;
    padding: 1em 1em 1em 0em;
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
const Workarea = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
`;


function IEAside({
    currentComponentKey,
    onClick
}: {
    currentComponentKey: string,
    onClick: Function
}) {
    return (
        <Aside>
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
        <Workarea>
            <Editor />
        </Workarea>
    );
}

export default function IEComponent() {
    const [currentKey, setCurrentKey]: [
        currentKey: string, setCurrentKey: Function
    ] = useState(Components[0].key);

    const onClick = (key: string) => {
        setCurrentKey(key);
    };

    return (
        <Container>
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
