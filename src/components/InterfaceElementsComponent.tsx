import React from 'react';

import { useState } from 'react';
import styled from 'styled-components';
import { Components, getComponentByKey } from '../constants/componentsMap';
import { SetStringToStateType } from '../types';
import AsideCaret from './AsideCaret';

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

    transition: width 1s, opacity 1s;
    width: 12em;
    opacity: 1;

    ${({open}: {open: boolean}) => open ? '' : 'width:0; opacity:0;'}
`;
const Workarea = styled.div`
    position: relative;
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
    open,
    onClick
}: {
    currentComponentKey: string,
    onClick: AsideClickCallbackType,
    open: boolean
}) {
    return (
        <Aside
            className="ie__aside"
            open={open}
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
    currentComponentKey,
    getOpen
}: {
    currentComponentKey: string,
    getOpen: (open: boolean) => void
}) {
    const currentComponent = getComponentByKey(currentComponentKey);
    const Editor = currentComponent?.editor();

    return (
        <Workarea
            className="ie__workarea"
        >
            <AsideCaret
                getOpen={getOpen}
            />
            <Editor />
        </Workarea>
    );
}

export default function IEComponent() {
    const [currentKey, setCurrentKey]: [
        currentKey: string, setCurrentKey: SetStringToStateType
    ] = useState(Components[0].key);

    const [open, setOpen] = useState(true);

    const onClick: AsideClickCallbackType = (key: string) => {
        setCurrentKey(key);
    };

    const getOpen = (open: boolean) => {
        setOpen(open);
    };

    return (
        <Container
            className="ie"
        >
            <IEAside
                currentComponentKey={currentKey}
                onClick={onClick}
                open={open}
            />
            <IEWorkarea
                currentComponentKey={currentKey}
                getOpen={getOpen}
            />
        </Container>
    );
}
