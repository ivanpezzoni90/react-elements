import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconSize } from '../lib/types';
import { IconList, Icon } from '../lib/Icon';

const AsideCaretContainer = styled.div`
    width: 2em;
    height: 2em;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
    border-right: 1px solid #666;
    ${({open}: {open: boolean}) => open ? '' : 'border-left: 1px solid #666;'}

    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 0;
    top: 0;
`;

export default function AsideCaret(
    { getOpen }: { getOpen: (open: boolean) => void }
) {
    const [open, setOpen] = useState(true);
    const toggleOpen = () => setOpen(!open);
    
    useEffect(() => {
        // Send open status 
        getOpen(open);
    }, [open, getOpen]);
    
    return (
        <AsideCaretContainer
            onClick={toggleOpen}
            open={open}
        >
            {open ? (
                <Icon
                    icon={IconList.caretLeft}
                    fontSize={IconSize.s}
                />
            ) : <Icon
                icon={IconList.caretRight}
                fontSize={IconSize.s}
            />}
        </AsideCaretContainer>
    );
}
