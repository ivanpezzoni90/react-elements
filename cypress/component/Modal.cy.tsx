import React from 'react';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { IconList } from '../../src/lib/constants/icons';
import { Modal, ModalElement } from '../../src/lib/Modal';
import {ModalWithButton} from '../../src/editors/ModalEditor';
import { AlignPositions, ElementLength, ElementPosition, IconSize, ModalHeight, ModalWidth, SpinnerSpeed, SpinnerSteps } from '../../src/lib/types';
import { verifyElementRgbColor, verifyElementRgbColorProp } from '../modules/assertions';
import { selectButtonLabel, selectIcon, selectModal, selectModalBackground, selectModalButton, selectModalClose, selectModalContent, selectModalFooter, selectModalFooterButtons, selectModalFooterButtonWrapper, selectModalFooterNthButton, selectModalHeader, selectModalHeaderButtons, selectModalHeaderNthButton, selectModalTitle, selectSpinner } from '../modules/selectors';
import { log } from '../modules/utils';
import { Button, Icon } from '../../src/lib';
import { should } from 'chai';

describe('Modal', () => {
    const headerButtons = [
        <Icon
            key="1"
            icon={IconList.heart}
            className="modal-header-button-1"
            color={allColors['Teal']}
            fontSize={IconSize.l}
        />,
        <Icon
            key="2"
            className="modal-header-button-2"
            icon={IconList.broadsword}
            color={allColors['Firebrick']}
            fontSize={IconSize.xl}
        />
    ];

    const footerButtons = [
        <Button
            key='1'
            className="modal-footer-button-1"
            label="Reset"
            color={allColors['Silver Sand']}
            length={ElementLength.s}
        />,
        <Button
            key='2'
            className="modal-footer-button-2"
            label="Confirm"
            color={allColors['Firebrick']}
            length={ElementLength.s}
        />
    ];

    const body = (<div
        className="modal-body-content"
    >
        <div>Modal body content</div>
        <div>More content</div>
    </div>);

    it('Modal props', () => {
        log('Verify modal default props');
        cy.mount(<ModalWithButton/>);

        selectModalButton().click();
        selectModalBackground().should('be.visible');
        selectModalClose().should('be.visible');
        selectModalHeader().should('be.visible');
        selectModalContent().should('be.visible');
        selectModalFooter().should('be.visible');

        selectModalTitle().should('have.text', 'Modal Title');
        selectModalHeaderButtons().should('have.length', 0);
        selectModalFooterButtons().should('have.length', 0);

        selectModal().should('have.css', 'width').and('eq', '300px');
        selectModal().should('have.css', 'height').and('eq', '82.5px');

        // Verify click outside false
        cy.get('body').click('topLeft');
        selectModal().should('be.visible');

        selectModalFooterButtonWrapper().should('have.css', 'justify-content').and('eq', 'flex-end');
        

        log('Verify modal custom props');
        cy.mount(<ModalWithButton
            title='Custom title'
            width={ModalWidth.l}
            height={ModalHeight.l}
            showCloseButton={false}
            closeOnClickOutside
            headerButtons={headerButtons}
            headerButtonsPosition={ElementPosition.right}
            footerButtons={footerButtons}
            footerButtonsAlign={AlignPositions.left}
        >
            {body}
        </ModalWithButton>);

        selectModalButton().click();

        // width height
        selectModal().should('have.css', 'width').and('eq', '400px');
        selectModal().should('have.css', 'height').and('eq', '400px');

        // header buttons
        verifyElementRgbColor(
            selectModalHeaderNthButton(0).find('.modal-header-button-1').find('svg'),
            allRgbColors['Teal']
        );
        selectModalHeaderNthButton(0).find('.modal-header-button-1').find('svg')
            .should('have.css', 'font-size').and('eq', IconSize.l);

        verifyElementRgbColor(
            selectModalHeaderNthButton(1).find('.modal-header-button-2').find('svg'),
            allRgbColors['Firebrick']
        );
        selectModalHeaderNthButton(1).find('.modal-header-button-2').find('svg')
            .should('have.css', 'font-size').and('eq', IconSize.xl);

        // modal body/children
        selectModalContent().find('.modal-body-content').should('be.visible');

        // footer buttons
        selectModalFooterButtonWrapper().should('have.css', 'justify-content').and('eq', 'flex-start');
        verifyElementRgbColorProp(
            selectModalFooterNthButton(0).find('button'),
            allRgbColors['Silver Sand'],
            'background-color'
        );
        selectButtonLabel(() => selectModalFooterNthButton(0).find('button')).should('have.text', 'Reset');

        verifyElementRgbColorProp(
            selectModalFooterNthButton(1).find('button'),
            allRgbColors['Firebrick'],
            'background-color'
        );
        selectButtonLabel(() => selectModalFooterNthButton(1).find('button')).should('have.text', 'Confirm');

        // title
        selectModalTitle().should('have.text', 'Custom title');

        // showCloseButton
        selectModalClose().should('not.exist');
        
        // closeOnClickOutside
        cy.get('body').click('topLeft');
        selectModal().should('not.exist');


        log('Verify another set of custom props');
        
        cy.mount(<ModalWithButton
            showHeader={false}
            showFooter={false}
        />);

        selectModalButton().click();

        selectModalHeader().should('not.exist');
        selectModalFooter().should('not.exist');
    });

    it('Verify modal callbacks', () => {
        const onClose = cy.stub().as('modalOnCloseHandler');

        cy.mount(<ModalElement
            closeOnClickOutside
            onClose={onClose}
        />);

        // close button
        selectModalClose().click();
        cy.get('@modalOnCloseHandler').should('have.been.called');

        const onCloseOutside = cy.stub().as('modalOnCloseOutsideHandler');
        cy.mount(<ModalWithButton
            closeOnClickOutside
            onClose={onCloseOutside}
        />);
        selectModalButton().click();

        // closeOnClickOutside
        cy.get('body').click('topLeft');
        cy.get('@modalOnCloseOutsideHandler').should('have.been.called');
    });
});