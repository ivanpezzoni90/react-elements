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
        log('Verify checkbox default props');
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

        log('Verify checkbox with passed value');
        cy.mount(<Checkbox
            checked
        />);
        selectCheckboxElementCheck().should('have.attr', 'data-checked').and('eq', 'checked');
        verifyElementRgbColorProp(selectCheckboxElementCheck(), allRgbColors['Dim Gray'], 'background-color');
        cy.mount(<Checkbox
            checked={false}
        />);
        selectCheckboxElementCheck().should('have.attr', 'data-checked').and('eq', 'not-checked');
        verifyElementRgbColorProp(selectCheckboxElementCheck(), allRgbColors['White'], 'background-color');

        log('Verify checkbox custom props');
        cy.mount(<Checkbox
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
        selectCheckboxWrapper().should('have.class', 'additional-class');

        cy.mount(<Checkbox
            hideLabel
            align={AlignPositions.center}
            color={allColors['Teal']}
            colorOff={allColors['Light Cyan']}
        />);

        selectCheckboxLabel().should('not.exist');
        selectCheckboxWrapper().should('have.css', 'justify-content').and('eq', 'center');

        log('Verify checkbox click interactions and colors');

        log('Verify not checked status');
        selectCheckboxElementCheck().should('have.attr', 'data-checked').and('eq', 'not-checked');
        verifyElementRgbColorProp(selectCheckboxElementCheck(), allRgbColors['White'], 'background-color');
        log('Click and verify checked status');
        verifyElementRgbColorProp(selectCheckboxElementCheck().click(), allRgbColors['Teal'], 'background-color');
        selectCheckboxElementCheck().should('have.attr', 'data-checked').and('eq', 'checked');
        verifyElementRgbColorProp(selectCheckboxElementIcon(), allRgbColors['Light Cyan'], 'stroke');
        log('Click again and verify not checked status');
        verifyElementRgbColorProp(selectCheckboxElementCheck().click(), allRgbColors['White'], 'background-color');
        selectCheckboxElementCheck().should('have.attr', 'data-checked').and('eq', 'not-checked');
    });
});