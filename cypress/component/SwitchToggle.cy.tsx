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
        selectToggleElementLabel().should('have.text', 'NO');
        selectToggleElementSlider().click();
        selectToggleElementLabel().should('have.text', 'YES');

        log('Verify toggle with passed values');
        cy.mount(<SwitchToggle
            checked
        />);
        selectToggleElementLabel().should('have.text', 'YES');
        cy.mount(<SwitchToggle
            checked={false}
        />);
        selectToggleElementLabel().should('have.text', 'NO');

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
            labelOn="MAH"
            labelOff="BOH"
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
        selectToggleElementLabel().should('have.text', 'BOH');
        selectToggleElementSlider().click();
        selectToggleElementLabel().should('have.text', 'MAH');
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

        log('Color and colorOff');
        // off
        verifyElementRgbColorProp(selectToggleElementSlider(), allRgbColors['Light Cyan'], 'background-color');
        selectToggleElementSlider().click();
        // on
        verifyElementRgbColorProp(selectToggleElementSlider(), allRgbColors['Teal'], 'background-color');
        selectToggleElementSlider().click();

        log('Label type icon and icon color/colorOff');
        // off
        verifyElementRgbColor(selectToggleElementIcon(), allRgbColors['Blue Violet']);
        selectToggleElementSlider().click();
        // on
        verifyElementRgbColor(selectToggleElementIcon(), allRgbColors['Prussian Blue']);
    });
});