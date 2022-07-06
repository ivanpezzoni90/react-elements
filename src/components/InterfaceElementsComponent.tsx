import React from 'react';

import { useState } from 'react';
import styled from 'styled-components';
import { Components, getComponentByKey } from './componentsMap';
import { SetStringToStateType } from '../lib/types';
import { allColors } from '../lib/constants/colors';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    text-align: left;
`;
const Aside = styled.div`
    display: flex;
    flex-direction: column;

    background: ${allColors['Cultured']};

    height: 100vh;
    overflow: auto;

    transition: width 1s, opacity 1s;
    width: 10em;
    opacity: 1;

    padding: 0.5em 1em 0.5em 1em;

    ${({open}: {open: boolean}) => open ? '' : 'width:0; opacity:0;'}
`;
const Workarea = styled.div`
    position: relative;
    padding: 2em;
    display: flex;
    flex: 1;
    flex-direction: column;

    height: 100vh;
    overflow: hidden;
`;
const Component = styled.div`
    display: flex;
    padding: 0.5em 0 0.5em 1em;
    font-size: 14px;
    cursor: pointer;
    font-weight: 400;

    transition: color 0.5s, font-size 0.5s, font-weight 0.5s;

    &:hover {
        ${({ active }: { active: boolean }) => !active
        ? `
            font-weight: 700;
            color: ${allColors['Davys Grey']};
            font-size: 18px;
        `
        : ''}
       
    }
    ${({ active }: { active: boolean }) => active
        ? `
            font-weight: 700;
            color: ${allColors['Cadet Blue']};
            font-size: 18px;
        `
        : ''}
`;
const AsideTitle = styled.div`
    display: flex;
    align-items: center;
    padding: 1.5em 0 1em 1em;
    border-bottom: 1px solid ${allColors['Silver Sand']}
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
            <AsideTitle>{'Components'}</AsideTitle>
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
