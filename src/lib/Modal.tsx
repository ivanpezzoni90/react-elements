import React, { useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { allColors } from './constants/colors';
import { IconList } from './constants/icons';
import { useClickOutside } from './hooks';
import { Icon } from './Icon';
import { Portal } from './Portal';
import { ElementPosition, BorderRadius, Cursors, IconSize, ModalHeight, ModalWidth, Padding, AlignPositions } from './types';

const ModalBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display:flex;
    align-items: center;
    justify-content: center;
`;

interface ModalContentProps {
    width: ModalWidth,
    height: ModalHeight
}
const ModalContent = styled.div<ModalContentProps>`
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: ${allColors['White']};
    display: flex;
    flex-direction: column;
    position: relative;
`;
const ModalHeader = styled.div`
    padding: 0.5em;
    background-color: ${allColors['Cultured']};

    display: flex;
    align-items: center;
    justify-content: center;
`;
const ModalBody = styled.div`
    padding: 1em;
    overflow: auto;
`;
const ModalFooter = styled.div`
    padding: 0.5em;
    background-color: ${allColors['Cultured']};
    margin-top: auto;
`;

const CloseButton = styled.div`
    position: absolute;
    top: -0.5em;
    right: -0.5em;
`;

const HeaderButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
`;
interface FooterButtonsWrapperProps {
    footerButtonsAlign: AlignPositions
}
const FooterButtonsWrapper = styled.div<FooterButtonsWrapperProps>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.footerButtonsAlign};
`;
const HeaderTitleWrapper = styled.div`
    padding: 0 0.5em;
`;

const InnerButtonWrapper = styled.div`
    padding-right: 0.5em;
`;


interface ModalProps {
    width: ModalWidth,
    height: ModalHeight,
    showHeader: boolean,
    showFooter: boolean,
    showCloseButton: boolean,
    children: React.ReactNode,
    headerButtons: React.ReactNode[],
    headerButtonsPosition: ElementPosition,
    footerButtons: React.ReactNode[],
    footerButtonsAlign: AlignPositions,
    closeOnClickOutside: boolean,
    title: string,
    open: boolean,
    onClose: VoidFunction
}

const ModalElement = ({
    width,
    height,
    showHeader,
    showFooter,
    showCloseButton,
    children,
    headerButtons,
    footerButtons,
    closeOnClickOutside,
    headerButtonsPosition,
    footerButtonsAlign,
    title,
    onClose
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useClickOutside(
        modalRef,
        closeOnClickOutside
            ? () => onClose()
            : () => {}
    );

    const onCloseCb = useCallback(() => onClose(), [onClose]);

    const HeaderButtonsComponent = useMemo(() => (
        <HeaderButtonsWrapper
            className="ie-modal__header__buttons"
        >
            {headerButtons.map((hb, i) => (
                <InnerButtonWrapper
                    className="ie-modal__header__buttons__button"
                    key={`header-button-${i}`}
                >
                    {hb}
                </InnerButtonWrapper>
            ))}
        </HeaderButtonsWrapper>
    ), [headerButtons]);

    return (
        <ModalContent
            className="ie-modal"
            ref={modalRef}
            width={width}
            height={height}
        >
            {showHeader &&(<ModalHeader
                className="ie-modal__header"
            >
                {(headerButtonsPosition === ElementPosition.left) && HeaderButtonsComponent}
                <HeaderTitleWrapper
                    className="ie-modal__header__title"
                >
                    {title}
                </HeaderTitleWrapper>
                {(headerButtonsPosition === ElementPosition.right) && HeaderButtonsComponent}
                {showCloseButton && (<CloseButton
                    className="ie-modal__header__close"
                    onClick={onCloseCb}
                >
                    <Icon
                        icon={IconList.close}
                        backgroundColor={allColors['Platinum']}
                        fontSize={IconSize.m}
                        borderRadius={BorderRadius.xl}
                        padding={Padding.xs}
                        cursor={Cursors.pointer}
                    />
                </CloseButton>)}
            </ModalHeader>)}
            <ModalBody
                className="ie-modal__content"
            >
                {children}
            </ModalBody>
            {showFooter && (<ModalFooter
                className="ie-modal__footer"
            >
                <FooterButtonsWrapper
                    className="ie-modal__footer__buttons"
                    footerButtonsAlign={footerButtonsAlign}
                >
                    {footerButtons.map((fb, i) => (
                        <InnerButtonWrapper
                            className="ie-modal__footer__buttons__button"
                            key={`footer-button-${i}`}
                        >
                            {fb}
                        </InnerButtonWrapper>
                    ))}
                </FooterButtonsWrapper>
            </ModalFooter>)}
        </ModalContent>
    );
};

const Modal = ({
    width,
    height,
    showHeader,
    showFooter,
    showCloseButton,
    children,
    headerButtons,
    footerButtons,
    closeOnClickOutside,
    headerButtonsPosition,
    footerButtonsAlign,
    title,
    open,
    onClose
}: ModalProps) => {
   
    if (!open) return null;
    return (
        <Portal
            wrapperId="root"
        >
            <ModalBackground
                className="ie-modal-background"
            >
                <ModalElement
                    width={width}
                    height={height}
                    showHeader={showHeader}
                    showFooter={showFooter}
                    showCloseButton={showCloseButton}
                    headerButtons={headerButtons}
                    footerButtons={footerButtons}
                    closeOnClickOutside={closeOnClickOutside}
                    headerButtonsPosition={headerButtonsPosition}
                    footerButtonsAlign={footerButtonsAlign}
                    title={title}
                    open={open}
                    onClose={onClose}
                >
                    {children}
                </ModalElement>
            </ModalBackground>
        </Portal>
    );
};

const defaultProps: ModalProps = {
    width: ModalWidth.m,
    height: ModalHeight.auto,
    showHeader: true,
    showFooter: true,
    showCloseButton: true,
    children: null,
    headerButtons: [],
    footerButtons: [],
    closeOnClickOutside: false,
    title: 'Modal Title',
    open: false,
    footerButtonsAlign: AlignPositions.right,
    headerButtonsPosition: ElementPosition.left,
    onClose: () => {}
};

Modal.defaultProps = defaultProps;
ModalElement.defaultProps = defaultProps;

export { Modal, ModalElement, ModalProps };