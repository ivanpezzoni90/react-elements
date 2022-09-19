import React from 'react';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { IconList } from '../../src/lib/constants/icons';
import { Rating } from '../../src/lib/Rating';
import { IconSize, SpinnerSpeed, SpinnerSteps } from '../../src/lib/types';
import { verifyElementRgbColor } from '../modules/assertions';
import { selectIcon, selectSpinner } from '../modules/selectors';
import { log } from '../modules/utils';

describe('Rating', () => {

    it('Rating props', () => {
        cy.mount(<Rating
        />);

    });
});