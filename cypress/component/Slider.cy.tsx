import React from 'react';

import {Slider} from '../../src/lib/Slider';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { BorderRadius, ElementLength, LabelLength, LabelPositions } from '../../src/lib/types';
import { checkCustomElementProps, checkDefaultElementProps } from '../modules/actions';
import { verifyElementRgbColor, verifyElementRgbColorProp } from '../modules/assertions';
import { selectSliderElementDatalist, selectSliderElementDatalistNthOption, selectSliderElementDatalistOptions, selectSliderElementInput, selectSliderElementTooltip, selectSliderElementValue, selectSliderLabel, selectSliderWrapper } from '../modules/selectors';
import { log } from '../modules/utils';

describe('Slider', () => {
    it('Slider props', () => {
        log('Verify slider default props');
        cy.mount(<Slider/>);

        checkDefaultElementProps(
            selectSliderWrapper,
            selectSliderLabel,
            {
                length: `${parseFloat(ElementLength.xl)*16}px`,
                labelLength: '416px',
                labelPosition: 'row',
            }
        );
        
        // value
        selectSliderElementInput().should('have.value', '0');
        // cursorColor
        // TODO: How to verify pseudo element color?
        // min
        selectSliderElementInput().should('have.attr', 'min').and('eq', '0');
        // max
        selectSliderElementInput().should('have.attr', 'max').and('eq', '100');
        // step
        selectSliderElementInput().should('have.attr', 'step').and('eq', '20');
        // type
        selectSliderElementInput().should('have.attr', 'type').and('eq', 'range');
        // showValue and default value color
        verifyElementRgbColor(selectSliderElementValue().should('have.text', '0'), allRgbColors['Dim Gray']);
        // showTooltip
        // TODO: Tooltip doesn't show on mouseover in this test
        // We only test its value and appearance in DOM
        verifyElementRgbColorProp(
            selectSliderElementTooltip().should('have.text', '0'),
            allRgbColors['Dim Gray'],
            'background-color'
        );
        verifyElementRgbColor(selectSliderElementTooltip(), allRgbColors['Cultured']);
        // showSteps
        selectSliderElementDatalistOptions().should('have.length', 6);
        // showStepValue
        selectSliderElementDatalistNthOption(0).should('have.text', '|');


        log('Verify slider with passed value');
        cy.mount(<Slider
            value="60"
        />);
        selectSliderElementInput().should('have.value', '60');
        selectSliderElementValue().should('have.text', '60');
        selectSliderElementTooltip().should('have.text', '60');

        log('Verify slider custom props');
        cy.mount(<Slider
            label="Name"
            className="additional-class"
            length={ElementLength.l}
            shadow={false}
            labelColor={allColors['Teal']}
            borderColor={allColors['Teal']}
            labelPosition={LabelPositions.vertical}
            labelLength={LabelLength.l}
            showBorders
            borderRadius={BorderRadius.l}

            showValue={false}
            showTooltip={false}
            showSteps={false}
        />);

        checkCustomElementProps(
            selectSliderWrapper,
            selectSliderLabel,
            {
                length: `${parseFloat(ElementLength.l)*16}px`,
                labelLength: `${parseFloat(LabelLength.l)*16}px`,
                labelPosition: 'column'
            }
        );
        selectSliderWrapper().should('have.class', 'additional-class');
        
        selectSliderElementValue().should('not.exist');
        selectSliderElementTooltip().should('not.exist');
        selectSliderElementDatalist().should('not.exist');

        log('Verify other slider custom props');
        cy.mount(<Slider
            showStepValue
            hideLabel
            cursorColor={allColors['Teal']}
        />);
        
        // hideLabel
        selectSliderLabel().should('not.exist');
        // showStepValue
        selectSliderElementDatalistNthOption(0).should('have.text', '0');
        selectSliderElementDatalistNthOption(1).should('have.text', '20');
        selectSliderElementDatalistNthOption(2).should('have.text', '40');
        selectSliderElementDatalistNthOption(3).should('have.text', '60');
        selectSliderElementDatalistNthOption(4).should('have.text', '80');
        selectSliderElementDatalistNthOption(5).should('have.text', '100');
        // cursor color, changes color of tooltip, value and dataList
        verifyElementRgbColor(selectSliderElementValue(), allRgbColors['Teal']);
        verifyElementRgbColor(selectSliderElementTooltip(), allRgbColors['Cultured']);
        verifyElementRgbColorProp(selectSliderElementTooltip(), allRgbColors['Teal'], 'background-color');
        
        verifyElementRgbColor(selectSliderElementDatalist(), allRgbColors['Teal']);
    });

    it('Slider values', () => {
        cy.mount(<Slider
            min={20}
            max={60}
            step={5}
            value="35"
        />);

        selectSliderElementInput().should('have.value', '35');
        selectSliderElementInput().should('have.attr', 'min').and('eq', '20');
        selectSliderElementInput().should('have.attr', 'max').and('eq', '60');
        selectSliderElementInput().should('have.attr', 'step').and('eq', '5');
        selectSliderElementValue().should('have.text', '35');
        selectSliderElementTooltip().should('have.text', '35');
        selectSliderElementDatalistOptions().should('have.length', 9);

        selectSliderElementDatalistNthOption(0).should('have.attr', 'value').and('eq', '20');
        selectSliderElementDatalistNthOption(1).should('have.attr', 'value').and('eq', '25');
        selectSliderElementDatalistNthOption(2).should('have.attr', 'value').and('eq', '30');
        selectSliderElementDatalistNthOption(3).should('have.attr', 'value').and('eq', '35');
        selectSliderElementDatalistNthOption(4).should('have.attr', 'value').and('eq', '40');
        selectSliderElementDatalistNthOption(5).should('have.attr', 'value').and('eq', '45');
        selectSliderElementDatalistNthOption(6).should('have.attr', 'value').and('eq', '50');
        selectSliderElementDatalistNthOption(7).should('have.attr', 'value').and('eq', '55');
        selectSliderElementDatalistNthOption(8).should('have.attr', 'value').and('eq', '60');

        log('Change slider value');

        // Added workaround for input type range not firing React onChange
        // when using invoke() and trigger('change')
        // TODO: Remove `.then()` workaround and replace with commented steps when
        // issue is resolved: https://github.com/cypress-io/cypress/issues/1570
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
        ).set;
        const changeRangeInputValue = input => value => {
            nativeInputValueSetter.call(input[0], value);
            const event = new Event('change', { value, bubbles: true } as EventInit);
            input[0].dispatchEvent(event);
            return input;
        };

        // 45
        selectSliderElementInput()
            // .invoke('val', '45')
            // .trigger('change')
            .then(input => changeRangeInputValue(input)(45))
            .should('have.value', '45');
        selectSliderElementValue().should('have.text', '45');
        selectSliderElementTooltip().should('have.text', '45');

        // 60
        selectSliderElementInput()
            // .invoke('val', '60')
            // .trigger('change')
            .then(input => changeRangeInputValue(input)(60))
            .should('have.value', '60');

        selectSliderElementValue().should('have.text', '60');
        selectSliderElementTooltip().should('have.text', '60');
        
        // 20
        selectSliderElementInput()
            // .invoke('val', '20')
            // .trigger('change')
            .then(input => changeRangeInputValue(input)(20))
            .should('have.value', '20');

        selectSliderElementValue().should('have.text', '20');
        selectSliderElementTooltip().should('have.text', '20');
        
        // 30
        selectSliderElementInput()
            // .invoke('val', '30')
            // .trigger('change')
            .then(input => changeRangeInputValue(input)(30))
            .should('have.value', '30');

        selectSliderElementValue().should('have.text', '30');
        selectSliderElementTooltip().should('have.text', '30');


    });
});