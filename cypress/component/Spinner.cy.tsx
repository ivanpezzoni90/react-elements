import React from 'react';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { IconList } from '../../src/lib/constants/icons';
import { Spinner } from '../../src/lib/Spinner';
import { IconSize, SpinnerSpeed, SpinnerSteps } from '../../src/lib/types';
import { verifyElementRgbColor } from '../modules/assertions';
import { selectIcon, selectSpinner } from '../modules/selectors';
import { log } from '../modules/utils';

describe('Spinner', () => {

    it('Spinner props', () => {
        cy.mount(<Spinner
            icon={IconList.loader}
        />);

        log('Verify spinner default props');
        // color
        verifyElementRgbColor(selectIcon(), allRgbColors['Dim Gray']);
        // fontSize
        selectIcon().should('have.css', 'font-size').and('eq', IconSize.m);

        selectSpinner().should('have.css', 'animation-name').and('eq', 'spin-animation');
        selectSpinner().should('have.css', 'animation-play-state').and('eq', 'running');
        selectSpinner().should('have.css', 'animation-duration').and('eq', SpinnerSpeed.normal);
        // TODO: How to verify steps??

        cy.mount(<Spinner
            fontSize={IconSize.xl}
            speed={SpinnerSpeed.verySlow}
            steps={SpinnerSteps.single}
            color={allColors['Teal']}
        />);
    
        log('Verify spinner custom props');
        // color
        verifyElementRgbColor(selectIcon(), allRgbColors['Teal']);
        // fontSize
        selectIcon().should('have.css', 'font-size').and('eq', IconSize.xl);

        selectSpinner().should('have.css', 'animation-name').and('eq', 'spin-animation');
        selectSpinner().should('have.css', 'animation-play-state').and('eq', 'running');
        selectSpinner().should('have.css', 'animation-duration').and('eq', SpinnerSpeed.verySlow);
        // TODO: How to verify steps??
    });
});