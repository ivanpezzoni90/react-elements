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

        checkDefaultElementProps(
            selectToggleWrapper,
            selectToggleLabel,
            {
                length: `${parseFloat(ElementLength.m)*16}px`,
                labelPosition: 'row',
                labelLength: `${parseFloat(ElementLength.m)*16}px`,
            }
        );

        selectToggleElementLabel().should('have.text', 'YES');
        selectToggleElementSlider().click();
        selectToggleElementLabel().should('have.text', 'NO');

        cy.mount(<SwitchToggle
            label="Name"
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
        selectToggleElementLabel().should('have.text', 'MAH');
        selectToggleElementSlider().click();
        selectToggleElementLabel().should('have.text', 'BOH');

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
        verifyElementRgbColorProp(selectToggleElementSlider(), allRgbColors['Teal'], 'background-color');
        selectToggleElementSlider().click();
        verifyElementRgbColorProp(selectToggleElementSlider(), allRgbColors['Light Cyan'], 'background-color');
        selectToggleElementSlider().click();

        log('Label type icon and icon color/colorOff');
        verifyElementRgbColor(selectToggleElementIcon(), allRgbColors['Prussian Blue']);
        selectToggleElementSlider().click();
        verifyElementRgbColor(selectToggleElementIcon(), allRgbColors['Blue Violet']);
    });
});