import React from 'react';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import {Input} from '../../src/lib/Input';
import { InputTypes } from '../../src/lib/Input/config';
import { BorderRadius, ElementHeight, ElementLength, LabelLength, LabelPositions } from '../../src/lib/types';
import { checkDefaultElementProps } from '../modules/actions';
import { verifyElementNotHasRgbColor, verifyElementRgbColor, verifyElementRgbColorProp } from '../modules/assertions';
import { selectInput, selectInputLabel, selectInputNumberIcons, selectInputWrapper, selectTextarea } from '../modules/selectors';
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

        log('Verify input with passed value');
        cy.mount(<Input
            value="Falcon"
        />);
        selectInput().should('have.value', 'Falcon');
        selectInputLabel().should('have.css', 'font-size').and('eq', '12px');


        log('Verify custom props and styles');
        cy.mount(<Input
            className="additional-class"
            label="Name"
            length={ElementLength.m}
            placeholder="Your name"
        />);

        // className
        selectInputWrapper().should('have.class', 'additional-class');

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

    it('Input textarea props', () => {
        cy.mount(<Input
            textarea
        />);

        log('Verify initial value');
        selectTextarea().should('have.value', '');
        selectTextarea().should('have.css', 'resize').and('eq', 'vertical');

        log('Verify label is always active on textarea');
        selectInputLabel().should('have.css', 'font-size').and('eq', '12px');

        log('Verify default props');
        checkDefaultElementProps(
            selectInputWrapper,
            selectInputLabel,
            {
                height: null
            }
        );
        // textColor
        verifyElementRgbColor(selectTextarea().type('check my color'), allRgbColors['Dim Gray']);

        const textareaValue = `Long ago, the War of the Magi reduced the world to a scorched wasteland, and magic simply ceased to exist.
        1000 years have passed... Iron, gunpowder, and steam engines have been rediscovered, and high technology reigns...`;
        log('Verify textarea with passed value');
        cy.mount(<Input
            textarea
            value={textareaValue}
        />);
        selectTextarea().should('have.value', textareaValue);
        selectInputLabel().should('have.css', 'font-size').and('eq', '12px');

        log('Verify custom props and styles');
        cy.mount(<Input
            textarea
            className="additional-class"
            label="Name"
            length={ElementLength.m}
            placeholder="Your name"
        />);

        // className
        selectInputWrapper().should('have.class', 'additional-class');

        // label
        selectInputLabel().should('have.text', 'Name');

        // length
        selectInputWrapper().should('have.css', 'width')
            .and('eq', `${parseInt(ElementLength.m, 10)*16}px`);

        // placeholder
        selectTextarea().should('have.attr', 'placeholder').and('eq', 'Your name');

        cy.mount(<Input
            textarea
            hideLabel
        />);

        // hideLabel
        selectInputLabel().should('not.exist');

        cy.mount(<Input
            textarea
            error
            errorMessage="Error label"
            value="Error value"
            hideBottomBorder
        />);

        verifyElementRgbColor(selectInputLabel().should('have.text', 'Error label'), allRgbColors['Lava']);
        verifyElementRgbColor(selectTextarea().should('have.value', 'Error value'), allRgbColors['Lava']);
        // TODO: How to test there is no bottom border?


        cy.mount(<Input
            textarea
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
        verifyElementRgbColor(selectTextarea(), allRgbColors['Teal']);
        verifyElementRgbColorProp(selectInputWrapper(), allRgbColors['Teal'], 'border-bottom-color');
        verifyElementRgbColorProp(selectInputWrapper(), allRgbColors['Teal'], 'border-top-color');
        verifyElementRgbColorProp(selectInputWrapper(), allRgbColors['Teal'], 'border-left-color');
        verifyElementRgbColorProp(selectInputWrapper(), allRgbColors['Teal'], 'border-right-color');

        selectInputWrapper().should('have.css', 'flex-direction').and('eq', 'row');
        selectInputLabel().should('have.css', 'max-width').and('eq', `${parseFloat(LabelLength.m)*16}px`);
        selectInputWrapper().should('have.css', 'border-radius').and('eq', `${parseFloat(BorderRadius.l)*16}px`);


        log('Verify textarea interactions');
        cy.mount(<Input
            textarea
        />);

        selectTextarea()
            .type('But there are some who would enslave the world')
            .should('have.value', 'But there are some who would enslave the world')
            .type('{enter}')
            .type('by reviving the dread destructive force known as “magic.”')
            .should('have.value', 'But there are some who would enslave the world\nby reviving the dread destructive force known as “magic.”')
            .clear()
            .should('have.value', '');
    });

    it('Input callbacks', () => {
        log('Verify onBlur');
        cy.mount(<Input
            onBlur={(newValue) => {
                expect(newValue).to.eq('Sabin');
            }}
        />);
        selectInput().type('Sabin').blur();

        log('Verify onChange');
        cy.mount(<Input
            onChange={(newValue) => {
                expect(newValue).to.eq('T');
            }}
        />);
        selectInput().type('T');

        log('Verify onChange typing with 250ms delay to avoid throttle');
        let count = 0;
        cy.mount(<Input
            onChange={(newValue) => {
                switch(count) {
                    case 0: expect(newValue).to.eq('T');break;
                    case 1: expect(newValue).to.eq('Te');break;
                    case 2: expect(newValue).to.eq('Ter');break;
                    case 3: expect(newValue).to.eq('Terr');break;
                    case 4: expect(newValue).to.eq('Terra');break;
                }
                count++;
            }}
        />);
        selectInput().type('Terra', {delay: 250});

        log('Verify throttled onChange by asserting the first letter and the whole word on the next onChange');
        let count2 = 0;
        cy.mount(<Input
            onChange={(newValue) => {
                if (count2 === 0) {
                    expect(newValue).to.eq('E');
                } else {
                    expect(newValue).to.eq('Edgar');
                }
                count2++;
            }}
        />);

        selectInput().type('Edgar');

    });

    it('Textarea callbacks', () => {
        log('Verify onBlur');
        cy.mount(<Input
            textarea
            onBlur={(newValue) => {
                expect(newValue).to.eq('Sabin');
            }}
        />);
        selectTextarea().type('Sabin').blur();

        log('Verify onChange');
        cy.mount(<Input
            textarea
            onChange={(newValue) => {
                expect(newValue).to.eq('T');
            }}
        />);
        selectTextarea().type('T');
    });
});