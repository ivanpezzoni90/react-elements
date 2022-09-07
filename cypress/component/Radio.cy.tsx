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
    selectRadioNthElementRadio,
} from '../modules/selectors';
import { log } from '../modules/utils';
import { verifyElementRgbColor, verifyElementRgbColorProp, verifySwitchToggleValue } from '../modules/assertions';
import { IconList } from '../../src/lib/constants/icons';

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

const verifyRadioIconInteractions = (nth, multiple) => {
    verifyElementRgbColorProp(
        selectRadioNthElementIcon(nth),
        allRgbColors['Quick Silver'],
        'background-color'
    );
    verifyElementRgbColorProp(
        selectRadioNthElementIcon(nth).click(),
        allRgbColors['Gray Web'],
        'background-color'
    );
    verifyElementRgbColorProp(
        selectRadioNthElementIcon(nth - 1),
        multiple ? allRgbColors['Gray Web'] : allRgbColors['Quick Silver'],
        'background-color'
    );
};

const verifyRadioIconIsSelected = (nth, selected = true) => {
    verifyElementRgbColorProp(
        selectRadioNthElementIcon(nth),
        selected ? allRgbColors['Gray Web'] : allRgbColors['Quick Silver'],
        'background-color'
    );
};

const verifyRadioToggleInteractions = (nth, multiple) => {
    verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(nth), 'NO');
    verifySwitchToggleValue(() => selectRadioNthElementToggleSlider(nth).click(), 'YES');

    verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(nth - 1), multiple ? 'YES' : 'NO');
};

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

        log('Verify default type is radio');
        selectRadioNthElementRadio(0).should('be.visible');

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

    const verifyRadioCheckboxInteraction = (nth, multiple) => {
        selectRadioNthElementCheckbox(nth).should('have.attr', 'data-checked').and('eq', 'not-checked');
        selectRadioNthElementCheckbox(nth).click().should('have.attr', 'data-checked').and('eq', 'checked');

        selectRadioNthElementCheckbox(nth - 1)
            .should('have.attr', 'data-checked')
            .and('eq', multiple ? 'checked' : 'not-checked');
    };

    const verifyRadioRadioInteraction = (nth, multiple) => {
        selectRadioNthElementRadio(nth).should('have.attr', 'data-checked').and('eq', 'not-checked');
        selectRadioNthElementRadio(nth).click().should('have.attr', 'data-checked').and('eq', 'checked');

        selectRadioNthElementRadio(nth - 1)
            .should('have.attr', 'data-checked')
            .and('eq', multiple ? 'checked' : 'not-checked');
    };

    it('Radio type radio interactions', () => {
        log('Verify radio interactions');
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
        />);
        selectRadioNthElementRadio(0).should('have.attr', 'data-checked').and('eq', 'not-checked');
        selectRadioNthElementRadio(0).click().should('have.attr', 'data-checked').and('eq', 'checked');

        log('Select another value and verify both data-checked status');

        verifyRadioRadioInteraction(1, false);
        verifyRadioRadioInteraction(2, false);
        verifyRadioRadioInteraction(3, false);
        verifyRadioRadioInteraction(4, false);
    
        log('Verify labels');
        selectRadioNthElementLabel(0).should('have.text', radioOptionsCheckToggle[0].label);
        selectRadioNthElementLabel(1).should('have.text', radioOptionsCheckToggle[1].label);
        selectRadioNthElementLabel(2).should('have.text', radioOptionsCheckToggle[2].label);
        selectRadioNthElementLabel(3).should('have.text', radioOptionsCheckToggle[3].label);
        selectRadioNthElementLabel(4).should('have.text', radioOptionsCheckToggle[4].label);
        selectRadioNthElementLabel(5).should('have.text', radioOptionsCheckToggle[5].label);

        log('Verify radio passed value');
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            value="terra"
        />);

        selectRadioNthElementRadio(0).should('have.attr', 'data-checked').and('eq', 'checked');

        log('Radio checkbox multiple interactions');
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            multiple
        />);

        selectRadioNthElementRadio(0).should('have.attr', 'data-checked').and('eq', 'not-checked');
        selectRadioNthElementRadio(0).click().should('have.attr', 'data-checked').and('eq', 'checked');
        
        log('Select another item and verify the other one is still selected');
        verifyRadioRadioInteraction(1, true);
        verifyRadioRadioInteraction(2, true);
        verifyRadioRadioInteraction(3, true);
        verifyRadioRadioInteraction(4, true);

        log('Verify radio multiple passed value');
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            value={['terra', 'locke', 'edgar', 'cyan']}
            multiple
        />);
        selectRadioNthElementRadio(0).should('have.attr', 'data-checked').and('eq', 'checked');
        selectRadioNthElementRadio(1).should('have.attr', 'data-checked').and('eq', 'checked');
        selectRadioNthElementRadio(2).should('have.attr', 'data-checked').and('eq', 'checked');
        selectRadioNthElementRadio(4).should('have.attr', 'data-checked').and('eq', 'checked');
    });

    it('Radio type checkbox interactions', () => {
        log('Verify radio checkbox interactions');
        cy.mount(<Radio
            type={RadioTypes.checkbox}
            options={radioOptionsCheckToggle}
        />);
        selectRadioNthElementCheckbox(0).should('have.attr', 'data-checked').and('eq', 'not-checked');
        selectRadioNthElementCheckbox(0).click().should('have.attr', 'data-checked').and('eq', 'checked');

        log('Select another value and verify both data-checked status');

        verifyRadioCheckboxInteraction(1, false);
        verifyRadioCheckboxInteraction(2, false);
        verifyRadioCheckboxInteraction(3, false);
        verifyRadioCheckboxInteraction(4, false);
    
        log('Verify labels');
        selectRadioNthElementLabel(0).should('have.text', radioOptionsCheckToggle[0].label);
        selectRadioNthElementLabel(1).should('have.text', radioOptionsCheckToggle[1].label);
        selectRadioNthElementLabel(2).should('have.text', radioOptionsCheckToggle[2].label);
        selectRadioNthElementLabel(3).should('have.text', radioOptionsCheckToggle[3].label);
        selectRadioNthElementLabel(4).should('have.text', radioOptionsCheckToggle[4].label);
        selectRadioNthElementLabel(5).should('have.text', radioOptionsCheckToggle[5].label);

        log('Verify radio checkbox passed value');
        cy.mount(<Radio
            type={RadioTypes.checkbox}
            options={radioOptionsCheckToggle}
            value="terra"
        />);

        selectRadioNthElementCheckbox(0).should('have.attr', 'data-checked').and('eq', 'checked');

        log('Radio checkbox multiple interactions');
        cy.mount(<Radio
            type={RadioTypes.checkbox}
            options={radioOptionsCheckToggle}
            multiple
        />);

        selectRadioNthElementCheckbox(0).should('have.attr', 'data-checked').and('eq', 'not-checked');
        selectRadioNthElementCheckbox(0).click().should('have.attr', 'data-checked').and('eq', 'checked');
        
        log('Select another item and verify the other one is still selected');
        verifyRadioCheckboxInteraction(1, true);
        verifyRadioCheckboxInteraction(2, true);
        verifyRadioCheckboxInteraction(3, true);
        verifyRadioCheckboxInteraction(4, true);

        log('Verify radio checkbox multiple passed value');
        cy.mount(<Radio
            type={RadioTypes.checkbox}
            options={radioOptionsCheckToggle}
            value={['terra', 'locke', 'edgar', 'cyan']}
            multiple
        />);
        selectRadioNthElementCheckbox(0).should('have.attr', 'data-checked').and('eq', 'checked');
        selectRadioNthElementCheckbox(1).should('have.attr', 'data-checked').and('eq', 'checked');
        selectRadioNthElementCheckbox(2).should('have.attr', 'data-checked').and('eq', 'checked');
        selectRadioNthElementCheckbox(4).should('have.attr', 'data-checked').and('eq', 'checked');
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

        verifyRadioToggleInteractions(1, false);
        verifyRadioToggleInteractions(2, false);
        verifyRadioToggleInteractions(3, false);
        verifyRadioToggleInteractions(4, false);

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

        log('Verify radio toggle multiple interactions');
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            type={RadioTypes.toggle}
            multiple
        />);
        verifySwitchToggleValue(() => selectRadioNthElementToggleSlider(0).click(), 'YES');
        log('Select another value and verify other toggles are still checked');
        verifyRadioToggleInteractions(1, true);
        verifyRadioToggleInteractions(2, true);
        verifyRadioToggleInteractions(3, true);
        verifyRadioToggleInteractions(4, true);


        log('Verify radio toggle multiple passed value');
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            type={RadioTypes.toggle}
            value={['terra', 'locke', 'edgar', 'cyan']}
            multiple
        />);

        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(0), 'YES');
        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(1), 'YES');
        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(2), 'YES');
        verifySwitchToggleValue(() => selectRadioNthElementToggleLabel(4), 'YES');
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

        verifyRadioIconInteractions(1, false);
        verifyRadioIconInteractions(2, false);
        verifyRadioIconInteractions(3, false);

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

        log('Verify radio icon multiple interactions');
        cy.mount(<Radio
            options={radioOptionsButton}
            type={RadioTypes.icon}
            multiple
        />);
        verifyElementRgbColorProp(
            selectRadioNthElementIcon(0).click(),
            allRgbColors['Gray Web'],
            'background-color'
        );
        verifyRadioIconInteractions(1, true);
        verifyRadioIconInteractions(2, true);
        verifyRadioIconInteractions(3, true);

        log('Verify radio icon multiple passed value');
        cy.mount(<Radio
            options={radioOptionsButton}
            type={RadioTypes.icon}
            value={['down', 'up', 'off']}
            multiple
        />);
        verifyRadioIconIsSelected(0);
        verifyRadioIconIsSelected(1);
        verifyRadioIconIsSelected(3);
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
        const verifyMultipleOnChange = (newValue, count) => {
            switch(count) {
                case 0: expect(newValue).to.deep.equal(['terra']); break;
                case 1: expect(newValue).to.deep.equal(['terra', 'locke']); break;
                case 2: expect(newValue).to.deep.equal(['terra', 'locke', 'edgar']); break;
                case 3: expect(newValue).to.deep.equal(['terra', 'locke', 'edgar', 'sabin']); break;
                case 4: expect(newValue).to.deep.equal(['terra', 'locke', 'edgar', 'sabin', 'cyan']); break;
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
            type={RadioTypes.checkbox}
            options={radioOptionsCheckToggle}
            onChange={(newValue) => {
                verifyOnChange(newValue, countC);
                countC++;
            }}
        />);
        selectRadioValues(RadioTypes.checkbox);

        log('type checkbox called');
        const onChange = cy.stub().as('onChangeHandler');
        cy.mount(<Radio
            type={RadioTypes.checkbox}
            options={radioOptionsCheckToggle}
            onChange={onChange}
        />);
        selectRadioNthElementCheckbox(0).click();
        cy.get('@onChangeHandler').should('have.been.called');

        log('type checkbox multiple');
        let countC2 = 0;
        cy.mount(<Radio
            multiple
            type={RadioTypes.checkbox}
            options={radioOptionsCheckToggle}
            onChange={(newValue) => {
                verifyMultipleOnChange(newValue, countC2);
                countC2++;
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

        log('type toggle called');
        const onChangeT = cy.stub().as('onChangeTHandler');
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            type={RadioTypes.toggle}
            onChange={onChangeT}
        />);
        selectRadioNthElementToggleSlider(0).click();
        cy.get('@onChangeTHandler').should('have.been.called');

        log('type toggle multiple');
        let countT2 = 0;
        cy.mount(<Radio
            multiple
            options={radioOptionsCheckToggle}
            type={RadioTypes.toggle}
            onChange={(newValue) => {
                verifyMultipleOnChange(newValue, countT2);
                countT2++;
            }}
        />);
        selectRadioValues(RadioTypes.toggle);

        log('type icon');
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

        log('type icon called');
        const onChangeI = cy.stub().as('onChangeIHandler');
        cy.mount(<Radio
            options={radioOptionsCheckToggle}
            type={RadioTypes.icon}
            onChange={onChangeI}
        />);
        selectRadioNthElementIcon(0).click();
        cy.get('@onChangeIHandler').should('have.been.called');

        log('type icon multiple');
        let countI2 = 0;
        cy.mount(<Radio
            multiple
            options={radioOptionsCheckToggle}
            type={RadioTypes.icon}
            onChange={(newValue) => {
                verifyMultipleOnChange(newValue, countI2);
                countI2++;
            }}
        />);
        selectRadioValues(RadioTypes.icon);
    });
});