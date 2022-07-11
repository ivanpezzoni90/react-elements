import React from 'react';

import {Checkbox} from '../../src/lib/Checkbox';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { AlignPositions, BorderRadius, ElementLength, LabelLength, LabelPositions } from '../../src/lib/types';
import { checkCustomElementProps, checkDefaultElementProps } from '../modules/actions';
import { verifyElementRgbColorProp } from '../modules/assertions';
import { selectCheckboxElementCheck, selectCheckboxElementIcon, selectCheckboxLabel, selectCheckboxWrapper } from '../modules/selectors';
import { log } from '../modules/utils';

describe('Checkbox', () => {
    it('Checkbox props', () => {
        cy.mount(<Checkbox/>);

        checkDefaultElementProps(
            selectCheckboxWrapper,
            selectCheckboxLabel,
            {
                length: `${parseFloat(ElementLength.m)*16}px`,
                labelPosition: 'row',
                labelLength: `${parseFloat(ElementLength.m)*16}px`,
            }
        );

        cy.mount(<Checkbox
            label="Name"
            length={ElementLength.l}
            shadow={false}
            labelColor={allColors['Teal']}
            borderColor={allColors['Teal']}
            labelPosition={LabelPositions.vertical}
            labelLength={LabelLength.l}
            showBorders
            borderRadius={BorderRadius.l}
        />);

        checkCustomElementProps(
            selectCheckboxWrapper,
            selectCheckboxLabel,
            {
                length: `${parseFloat(ElementLength.l)*16}px`,
                labelLength: `${parseFloat(LabelLength.l)*16}px`,
                labelPosition: 'column'
            }
        );

        cy.mount(<Checkbox
            hideLabel
            align={AlignPositions.center}
            color={allColors['Teal']}
            colorOff={allColors['Light Cyan']}
        />);

        selectCheckboxLabel().should('not.exist');
        selectCheckboxWrapper().should('have.css', 'justify-content').and('eq', 'center');

        log('Verify checkbox click interactions and colors');
        verifyElementRgbColorProp(selectCheckboxElementCheck().click(), allRgbColors['Teal'], 'background-color');
        verifyElementRgbColorProp(selectCheckboxElementIcon(), allRgbColors['Light Cyan'], 'stroke');

        verifyElementRgbColorProp(selectCheckboxElementCheck().click(), allRgbColors['White'], 'background-color');
    });
});