import React from 'react';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import {Input} from '../../src/lib/Input';
import { InputTypes } from '../../src/lib/Input/config';
import { BorderRadius, ElementHeight, ElementLength, LabelLength, LabelPositions } from '../../src/lib/types';
import { checkDefaultElementProps } from '../modules/actions';
import { verifyElementNotHasRgbColor, verifyElementRgbColor, verifyElementRgbColorProp } from '../modules/assertions';
import { selectInput, selectInputLabel, selectInputNumberIcons, selectInputWrapper } from '../modules/selectors';
import { log } from '../modules/utils';

describe('Input', () => {
    it('Input props', () => {
        cy.mount(<Input/>);
        log('Verify input default props and styles');
       
        checkDefaultElementProps(
            selectInputWrapper,
            selectInputLabel
        );
        // height
        selectInputWrapper().should('have.css', 'height').and('eq', `${parseFloat(ElementHeight.m)*16}px`);
        // value
        selectInput().should('have.value', '');
        // textColor
        verifyElementRgbColor(selectInput().type('check my color'), allRgbColors['Dim Gray']);

        log('Check default label transition behaviour');
        
        selectInput().clear().blur();

        log('Verify label when not active');
        selectInputLabel().should('have.css', 'font-size').and('eq', '16px');
        
        log('Verify label onFocus');
        selectInput().focus();
        selectInputLabel().should('have.css', 'font-size').and('eq', '12px');

        log('Verify label onBlur');
        selectInput().blur();
        selectInputLabel().should('have.css', 'font-size').and('eq', '16px');

        log('Verify label when there is text inside');
        selectInput().type('Some text');
        selectInputLabel().should('have.css', 'font-size').and('eq', '12px');


        log('Verify custom props and styles');
        cy.mount(<Input
            label="Name"
            length={ElementLength.m}
            placeholder="Your name"
        />);

        // label
        selectInputLabel().should('have.text', 'Name');

        // length
        selectInputWrapper().should('have.css', 'width')
            .and('eq', `${parseInt(ElementLength.m, 10)*16}px`);

        // placeholder
        selectInput().should('have.attr', 'placeholder').and('eq', 'Your name');

        cy.mount(<Input
            hideLabel
        />);

        // hideLabel
        selectInputLabel().should('not.exist');

        cy.mount(<Input
            error
            errorMessage="Error label"
            value="Error value"
            hideBottomBorder
        />);

        verifyElementRgbColor(selectInputLabel().should('have.text', 'Error label'), allRgbColors['Lava']);
        verifyElementRgbColor(selectInput().should('have.value', 'Error value'), allRgbColors['Lava']);
        // TODO: How to test there is no bottom border?


        cy.mount(<Input
            shadow={false}
            labelColor={allColors['Teal']}
            textColor={allColors['Teal']}
            borderColor={allColors['Teal']}
            labelPosition={LabelPositions.horizontal}
            labelLength={LabelLength.m}
            showBorders
            borderRadius={BorderRadius.l}
        />);

        
        // TODO: How to test there is no box-shadow?
        verifyElementRgbColor(selectInputLabel(), allRgbColors['Teal']);
        verifyElementRgbColor(selectInput(), allRgbColors['Teal']);
        verifyElementRgbColorProp(selectInputWrapper(), allRgbColors['Teal'], 'border-bottom-color');
        verifyElementRgbColorProp(selectInputWrapper(), allRgbColors['Teal'], 'border-top-color');
        verifyElementRgbColorProp(selectInputWrapper(), allRgbColors['Teal'], 'border-left-color');
        verifyElementRgbColorProp(selectInputWrapper(), allRgbColors['Teal'], 'border-right-color');

        selectInputWrapper().should('have.css', 'flex-direction').and('eq', 'row');
        selectInputLabel().should('have.css', 'max-width').and('eq', `${parseFloat(LabelLength.m)*16}px`);
        selectInputWrapper().should('have.css', 'border-radius').and('eq', `${parseFloat(BorderRadius.l)*16}px`);
    });
    it('Text input', () => {
        cy.mount(<Input
            min={5}
            max={15}
        />);
        log('Verify initial value');
        selectInput().should('have.value', '');
        
        log('Verify value after typing');
        selectInput().type('This is a test').should('have.value', 'This is a test');

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
        
        log('Verify only numeric values are allowed');
        selectInput().type('test').should('have.value', '');
        selectInput().type('100').should('have.value', '100');

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

    it('Date Input', () => {
        cy.mount(<Input
            type={InputTypes.date}
            min="2022-01-10"
            max="2022-01-20"
        />);

        log('Verify initial value');
        selectInput().should('have.value', '');

        log('Verify value');
        selectInput().type('2022-01-15').should('have.value', '2022-01-15');

        log('Verify min and max typing');
        verifyElementRgbColor(
            selectInput().type('2022-01-05').should('have.value', '2022-01-05'),
            allRgbColors['Lava']
        );
        verifyElementRgbColor(
            selectInput().type('2022-01-25').should('have.value', '2022-01-25'),
            allRgbColors['Lava']
        );
    });
});