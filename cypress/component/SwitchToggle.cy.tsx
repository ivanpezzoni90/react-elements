import React from 'react';

import {SwitchToggle} from '../../src/lib/SwitchToggle';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { AlignPositions, BorderRadius, ElementLength, LabelLength, LabelPositions, ToggleLabelType } from '../../src/lib/types';
import { checkCustomElementProps, checkDefaultElementProps } from '../modules/actions';
import { verifyElementRgbColor, verifyElementRgbColorProp } from '../modules/assertions';
import {
    selectToggleWrapper,
    selectToggleElementSlider,
    selectToggleElementLabel,
    selectToggleElementIcon,
    selectToggleLabel,
    selectToggleElementSwitchInput,
} from '../modules/selectors';
import { log } from '../modules/utils';

describe('Switch Toggle', () => {
    it('Switch Toggle props', () => {
        cy.mount(<SwitchToggle/>);

        log('Verify toggle default props');
        checkDefaultElementProps(
            selectToggleWrapper,
            selectToggleLabel,
            {
                length: `${parseFloat(ElementLength.m)*16}px`,
                labelPosition: 'row',
                labelLength: `${parseFloat(ElementLength.m)*16}px`,
            }
        );

        log('Verify toggle interactions');
        selectToggleElementSwitchInput().should('have.attr', 'data-toggled').and('eq', 'not-toggled');
        selectToggleElementSlider().click();
        selectToggleElementSwitchInput().should('have.attr', 'data-toggled').and('eq', 'toggled');

        log('Verify toggle with passed values');
        cy.mount(<SwitchToggle
            checked
        />);
        selectToggleElementSwitchInput().should('have.attr', 'data-toggled').and('eq', 'toggled');
        cy.mount(<SwitchToggle
            checked={false}
        />);
        selectToggleElementSwitchInput().should('have.attr', 'data-toggled').and('eq', 'not-toggled');

        log('Verify toggle custom props');
        cy.mount(<SwitchToggle
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
            labelOn="FOO"
            labelOff="BAR"
            labelType={ToggleLabelType.label}
        />);

        checkCustomElementProps(
            selectToggleWrapper,
            selectToggleLabel,
            {
                length: `${parseFloat(ElementLength.l)*16}px`,
                labelLength: `${parseFloat(LabelLength.l)*16}px`,
                labelPosition: 'column'
            }
        );
        selectToggleElementLabel().should('have.text', 'BAR');
        selectToggleElementSlider().click();
        selectToggleElementLabel().should('have.text', 'FOO');
        // className
        selectToggleWrapper().should('have.class', 'additional-class');

        cy.mount(<SwitchToggle
            hideLabel
            align={AlignPositions.center}
            color={allColors['Teal']}
            colorOff={allColors['Light Cyan']}
            labelType={ToggleLabelType.icon}
            iconColor={allColors['Prussian Blue']}
            iconOffColor={allColors['Blue Violet']}
        />);

        selectToggleLabel().should('not.exist');
        selectToggleWrapper().should('have.css', 'justify-content').and('eq', 'center');

        log('Color on/off, label type icon and icon color/colorOff');
        // off
        verifyElementRgbColor(selectToggleElementIcon(), allRgbColors['Blue Violet']);
        verifyElementRgbColorProp(selectToggleElementSlider(), allRgbColors['Light Cyan'], 'background-color');
        selectToggleElementSlider().click();
        // on
        verifyElementRgbColor(selectToggleElementIcon(), allRgbColors['Prussian Blue']);
        // TODO: Test ON background color of :before pseudo slider
        // verifyElementRgbColorProp(selectToggleElementSlider(), allRgbColors['Teal'], 'background-color');

    });

    it('Switch toggle callbacks', () => {
        log('Verify onchange called');
        const onChange = cy.stub().as('onChangeHandler');
        cy.mount(<SwitchToggle
            onChange={onChange}
        />);
        selectToggleElementSlider().click();
        cy.get('@onChangeHandler').should('have.been.called');

        log('Verify onchange values');
        let count = 0;
        cy.mount(<SwitchToggle
            onChange={(newValue) => {
                if (count === 0) expect(newValue).to.be.true;
                else expect(newValue).to.be.false;
                count++;
            }}
        />);
        selectToggleElementSlider().click();
        selectToggleElementSlider().click();
    });
});