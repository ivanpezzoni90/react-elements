import React from 'react';

import {Radio} from '../../src/lib/Radio';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { LabelLength, LabelPositions, Option, Positions, RadioTypes } from '../../src/lib/types';
import {
    selectRadioLabel,
    selectRadioWrapper,
    selectRadioContainer,
    selectRadioNthElementCheckbox,
    selectRadioNthElementLabel,
    selectRadioNthElementToggleLabel,
    selectRadioNthElementToggleSlider,
    selectRadioNthElementIcon,
} from '../modules/selectors';
import { log } from '../modules/utils';
import { verifyElementRgbColor, verifyElementRgbColorProp, verifySwitchToggleValue } from '../modules/assertions';
import { IconList } from '../../src/lib/Icon';

const radioOptionsButton: Option[] = [{
    icon: IconList.volumeDown,
    label: '',
    value: 'down'
}, {
    icon: IconList.volumeUp,
    label: '',
    value: 'up'
}, {
    icon: IconList.volumeMute,
    label: '',
    value: 'mute'
}, {
    icon: IconList.volumeOff,
    label: '',
    value: 'off'
}];

const radioOptionsCheckToggle: Option[] = [{
    label: 'Terra',
    value: 'terra'
}, {
    label: 'Locke',
    value: 'locke'
}, {
    label: 'Edgar',
    value: 'edgar'
}, {
    label: 'Sabin',
    value: 'sabin'
}, {
    label: 'Cyan',
    value: 'cyan'
}, {
    label: 'Setzer',
    value: 'setzer'
}, {
    label: 'Celes',
    value: 'celes'
}];

describe('Radio', () => {
    it('Radio default props', () => {
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
        />);

        // label & hideLabel
        selectRadioLabel().should('have.text', 'Label');
        // labelPosition
        selectRadioWrapper().should('have.css', 'flex-direction').and('eq', 'column');
        // position
        selectRadioContainer().should('have.css', 'flex-direction').and('eq', 'column');

        log('Verify default type is checkbox');
        selectRadioNthElementCheckbox(0).should('be.visible');

        // labelColor
        verifyElementRgbColor(selectRadioLabel(), allRgbColors['Dim Gray']);
    });
    it('Radio custom props', () => {
        cy.mount(<Radio
            className="additional-class"
            options={radioOptionsCheckToggle}
            label="Names"
            labelColor={allColors['Teal']}
            labelPosition={LabelPositions.horizontal}
            labelLength={LabelLength.s}
            position={Positions.horizontal}
        />);

        // className
        selectRadioWrapper().should('have.class', 'additional-class');

        // label & hideLabel
        selectRadioLabel().should('have.text', 'Names');
        // labelPosition
        selectRadioWrapper().should('have.css', 'flex-direction').and('eq', 'row');
        // position
        selectRadioContainer().should('have.css', 'flex-direction').and('eq', 'row');

        // labelColor
        verifyElementRgbColor(selectRadioLabel(), allRgbColors['Teal']);
    });
    it('Radio type checkbox interactions', () => {
        log('Verify radio checkbox interactions');
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
        />);
        selectRadioNthElementCheckbox(0).should('have.attr', 'data-checked').and('eq', 'not-checked');
        selectRadioNthElementCheckbox(0).click().should('have.attr', 'data-checked').and('eq', 'checked');

        log('Select another value and verify both data-checked status');

        // Second el
        selectRadioNthElementCheckbox(1).should('have.attr', 'data-checked').and('eq', 'not-checked');
        selectRadioNthElementCheckbox(1).click().should('have.attr', 'data-checked').and('eq', 'checked');

        selectRadioNthElementCheckbox(0).should('have.attr', 'data-checked').and('eq', 'not-checked');
    
        // Third el
        selectRadioNthElementCheckbox(2).should('have.attr', 'data-checked').and('eq', 'not-checked');
        selectRadioNthElementCheckbox(2).click().should('have.attr', 'data-checked').and('eq', 'checked');

        selectRadioNthElementCheckbox(1).should('have.attr', 'data-checked').and('eq', 'not-checked');

        // Fourth el
        selectRadioNthElementCheckbox(3).should('have.attr', 'data-checked').and('eq', 'not-checked');
        selectRadioNthElementCheckbox(3).click().should('have.attr', 'data-checked').and('eq', 'checked');

        selectRadioNthElementCheckbox(2).should('have.attr', 'data-checked').and('eq', 'not-checked');

        // Fifth el
        selectRadioNthElementCheckbox(4).should('have.attr', 'data-checked').and('eq', 'not-checked');
        selectRadioNthElementCheckbox(4).click().should('have.attr', 'data-checked').and('eq', 'checked');

        selectRadioNthElementCheckbox(3).should('have.attr', 'data-checked').and('eq', 'not-checked');

        log('Verify labels');
        selectRadioNthElementLabel(0).should('have.text', radioOptionsCheckToggle[0].label);
        selectRadioNthElementLabel(1).should('have.text', radioOptionsCheckToggle[1].label);
        selectRadioNthElementLabel(2).should('have.text', radioOptionsCheckToggle[2].label);
        selectRadioNthElementLabel(3).should('have.text', radioOptionsCheckToggle[3].label);
        selectRadioNthElementLabel(4).should('have.text', radioOptionsCheckToggle[4].label);
        selectRadioNthElementLabel(5).should('have.text', radioOptionsCheckToggle[5].label);

        log('Verify radio checkbox passed value');
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            value="terra"
        />);

        selectRadioNthElementCheckbox(0).should('have.attr', 'data-checked').and('eq', 'checked');
    });
    it('Radio type toggle interactions', () => {
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            type={RadioTypes.toggle}
        />);

        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(0), 'NO');
        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(1), 'NO');
        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(2), 'NO');
        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(3), 'NO');

        verifySwitchToggleValue(() => selectRadioNthElementToggleSlider(0).click(), 'YES');

        log('Select another value and verify other toggle labels');

        // Second el
        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(1), 'NO');
        verifySwitchToggleValue(() => selectRadioNthElementToggleSlider(1).click(), 'YES');

        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(0), 'NO');
        
        // Third el
        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(2), 'NO');
        verifySwitchToggleValue(() => selectRadioNthElementToggleSlider(2).click(), 'YES');

        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(1), 'NO');
        
        // Fourth el
        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(3), 'NO');
        verifySwitchToggleValue(() => selectRadioNthElementToggleSlider(3).click(), 'YES');

        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(2), 'NO');
       
        // Fifth el
        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(4), 'NO');
        verifySwitchToggleValue(() => selectRadioNthElementToggleSlider(4).click(), 'YES');

        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(3), 'NO');

        log('Verify labels');
        selectRadioNthElementLabel(0).should('have.text', radioOptionsCheckToggle[0].label);
        selectRadioNthElementLabel(1).should('have.text', radioOptionsCheckToggle[1].label);
        selectRadioNthElementLabel(2).should('have.text', radioOptionsCheckToggle[2].label);
        selectRadioNthElementLabel(3).should('have.text', radioOptionsCheckToggle[3].label);
        selectRadioNthElementLabel(4).should('have.text', radioOptionsCheckToggle[4].label);
        selectRadioNthElementLabel(5).should('have.text', radioOptionsCheckToggle[5].label);

        log('Verify radio toggle passed value');
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            type={RadioTypes.toggle}
            value="locke"
        />);

        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(1), 'YES');
    });

    it('Radio type icon interactions', () => {
        cy.mount(<Radio
            options={radioOptionsButton}
            type={RadioTypes.icon}
        />);

        log('Verify icons are not selected by checking background color');
        verifyElementRgbColorProp(selectRadioNthElementIcon(0), allRgbColors['Quick Silver'], 'background-color');
        verifyElementRgbColorProp(selectRadioNthElementIcon(1), allRgbColors['Quick Silver'], 'background-color');
        verifyElementRgbColorProp(selectRadioNthElementIcon(2), allRgbColors['Quick Silver'], 'background-color');
        verifyElementRgbColorProp(selectRadioNthElementIcon(3), allRgbColors['Quick Silver'], 'background-color');

        log('Verify interactions');
        verifyElementRgbColorProp(selectRadioNthElementIcon(0).click(), allRgbColors['Gray Web'], 'background-color');

        // Second el
        verifyElementRgbColorProp(selectRadioNthElementIcon(1), allRgbColors['Quick Silver'], 'background-color');
        verifyElementRgbColorProp(selectRadioNthElementIcon(1).click(), allRgbColors['Gray Web'], 'background-color');

        verifyElementRgbColorProp(selectRadioNthElementIcon(0), allRgbColors['Quick Silver'], 'background-color');
        
        // Third el
        verifyElementRgbColorProp(selectRadioNthElementIcon(2), allRgbColors['Quick Silver'], 'background-color');
        verifyElementRgbColorProp(selectRadioNthElementIcon(2).click(), allRgbColors['Gray Web'], 'background-color');

        verifyElementRgbColorProp(selectRadioNthElementIcon(1), allRgbColors['Quick Silver'], 'background-color');
       
        // Fourth el
        verifyElementRgbColorProp(selectRadioNthElementIcon(3), allRgbColors['Quick Silver'], 'background-color');
        verifyElementRgbColorProp(selectRadioNthElementIcon(3).click(), allRgbColors['Gray Web'], 'background-color');

        verifyElementRgbColorProp(selectRadioNthElementIcon(2), allRgbColors['Quick Silver'], 'background-color');

        log('Verify labels not exists');
        selectRadioNthElementLabel(0).should('not.exist');
        selectRadioNthElementLabel(1).should('not.exist');
        selectRadioNthElementLabel(2).should('not.exist');
        selectRadioNthElementLabel(3).should('not.exist');

        log('Verify radio icon passed value');
        cy.mount(<Radio
            options={radioOptionsButton}
            type={RadioTypes.icon}
            value="mute"
        />);

        verifyElementRgbColorProp(selectRadioNthElementIcon(2), allRgbColors['Gray Web'], 'background-color');
    });

    it('Radio callbacks', () => {
        const verifyOnChange = (newValue, count) => {
            switch(count) {
                case 0: expect(newValue).to.eq('terra'); break;
                case 1: expect(newValue).to.eq('locke'); break;
                case 2: expect(newValue).to.eq('edgar'); break;
                case 3: expect(newValue).to.eq('sabin'); break;
                case 4: expect(newValue).to.eq('cyan'); break;
            }
        };

        const selectRadioValues = (type: RadioTypes) => {
            let selector;
            switch(type) {
                case RadioTypes.checkbox: selector = selectRadioNthElementCheckbox;break;
                case RadioTypes.toggle: selector = selectRadioNthElementToggleSlider;break;
                case RadioTypes.icon: selector = selectRadioNthElementIcon;break;
            }
            selector(0).click();
            selector(1).click();
            selector(2).click();
            selector(3).click();
            selector(4).click();
        };

        log('type checkbox');
        let countC = 0;
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            onChange={(newValue) => {
                verifyOnChange(newValue, countC);
                countC++;
            }}
        />);
        selectRadioValues(RadioTypes.checkbox);

        log('type toggle');
        let countT = 0;
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            type={RadioTypes.toggle}
            onChange={(newValue) => {
                verifyOnChange(newValue, countT);
                countT++;
            }}
        />);
        selectRadioValues(RadioTypes.toggle);

        log('type toggle');
        let countI = 0;
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            type={RadioTypes.icon}
            onChange={(newValue) => {
                verifyOnChange(newValue, countI);
                countI++;
            }}
        />);
        selectRadioValues(RadioTypes.icon);
    });
});