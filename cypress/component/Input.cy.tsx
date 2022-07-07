import React from 'react';
import { allRgbColors } from '../../src/lib/constants/colors';
import {Input} from '../../src/lib/Input';
import { InputTypes } from '../../src/lib/Input/config';
import { verifyElementNotHasRgbColor, verifyElementRgbColor } from '../modules/assertions';
import { selectInput, selectInputLabel, selectInputNumberIcons } from '../modules/selectors';
import { log } from '../modules/utils';

describe('Input', () => {
    it('Text input', () => {
        cy.mount(<Input
            min={5}
            max={15}
        />);
        log('Verify initial value');
        selectInput().should('have.value', '');
        
        log('Verify label when not active');
        selectInputLabel().should('have.css', 'font-size').and('eq', '16px');

        log('Verify value after typing');
        selectInput().type('This is a test').should('have.value', 'This is a test');

        log('Verify label when active');
        selectInputLabel().should('have.css', 'font-size').and('eq', '12px');

        log('Verify min and max length');
        verifyElementNotHasRgbColor(
            selectInput().type('111').should('have.value', 'This is a test1'),
            allRgbColors['Lava']
        );
        verifyElementRgbColor(
            selectInput().clear().type('111').should('have.value', '111'),
            allRgbColors['Lava']
        );
        verifyElementNotHasRgbColor(
            selectInput().clear().type('111111').should('have.value', '111111'),
            allRgbColors['Lava']
        );
    });
    it('Number input', () => {
        cy.mount(<Input
            type={InputTypes.number}
            max={101}
            min={100}
        />);
        log('Verify initial value');
        selectInput().should('have.value', '');
        
        log('Verify label when not active');
        selectInputLabel().should('have.css', 'font-size').and('eq', '16px');

        log('Verify only numeric values are allowed');
        selectInput().type('test').should('have.value', '');
        selectInput().type('100').should('have.value', '100');

        log('Verify label when active');
        selectInputLabel().should('have.css', 'font-size').and('eq', '12px');

        log('Verify up/down icons');
        selectInputNumberIcons('up').click();
        selectInput().should('have.value', '101');

        selectInputNumberIcons('down').click();
        selectInput().should('have.value', '100');

        log('Verify min/max with up/down icons');
        selectInputNumberIcons('down').click();
        verifyElementRgbColor(selectInput().should('have.value', '100'), allRgbColors['Lava']);
        verifyElementRgbColor(selectInputLabel(), allRgbColors['Lava']);
        
        selectInputNumberIcons('up').click();
        selectInput().should('have.value', '101');
        selectInputNumberIcons('up').click();

        verifyElementRgbColor(selectInput().should('have.value', '101'), allRgbColors['Lava']);
        verifyElementRgbColor(selectInputLabel(), allRgbColors['Lava']);

        log('Verify min/max typing');
        verifyElementNotHasRgbColor(
            selectInput().clear().type('100').should('have.value', '100'),
            allRgbColors['Lava']
        );

        verifyElementRgbColor(
            selectInput().clear().type('110').should('have.value', '110'),
            allRgbColors['Lava']
        );
        verifyElementRgbColor(selectInputLabel(), allRgbColors['Lava']);

        verifyElementNotHasRgbColor(selectInput().clear().type('100').should('have.value', '100'), allRgbColors['Lava']);

        verifyElementRgbColor(
            selectInput().clear().type('90').should('have.value', '90'),
            allRgbColors['Lava']
        );
        verifyElementRgbColor(selectInputLabel(), allRgbColors['Lava']);
    });
});