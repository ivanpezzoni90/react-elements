import React from 'react';

import {Icon, IconList} from '../../src/lib/Icon';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { BorderRadius, Cursors, IconSize, Padding } from '../../src/lib/types';
import {
    selectIcon,
    selectIconWrapper,
} from '../modules/selectors';
import { log } from '../modules/utils';
import { verifyElementRgbColor, verifyElementRgbColorProp } from '../modules/assertions';

describe('Icon', () => {
    it('Icon props', () => {
        cy.mount(<Icon
            icon={IconList.home}
        />);

        log('Verify default props');
        // color
        verifyElementRgbColor(selectIcon(), allRgbColors['Dim Gray']);
        // fontSize
        selectIcon().should('have.css', 'font-size').and('eq', IconSize.xs);
        // backgroundColor
        selectIconWrapper().should('have.css', 'background-color').and('eq', `rgba(${allRgbColors['Transparent'].replaceAll(',', ', ')})`);
        // borderRadius
        selectIconWrapper().should('have.css', 'border-radius').and('eq', `${BorderRadius.no}px`);
        // padding
        selectIconWrapper().should('have.css', 'padding').and('eq', `${Padding.no}px`);
        // cursor
        selectIconWrapper().should('have.css', 'cursor').and('eq', Cursors.auto);

        log('Verify custom props');
        cy.mount(<Icon
            className="additional-class"
            icon={IconList.shoppingCart}
            color={allColors['Teal']}
            fontSize={IconSize.xl}
            backgroundColor={allColors['Azure']}
            borderRadius={BorderRadius.xxl}
            padding={Padding.m}
            cursor={Cursors.pointer}
        />);
        // TODO: Can't verify the icon is changing

        selectIconWrapper().should('have.class', 'additional-class');
        // color
        verifyElementRgbColor(selectIcon(), allRgbColors['Teal']);
        // fontSize
        selectIcon().should('have.css', 'font-size').and('eq', IconSize.xl);
        // backgroundColor
        verifyElementRgbColorProp(selectIconWrapper(), allRgbColors['Azure'], 'background-color');
        // borderRadius
        selectIconWrapper().should('have.css', 'border-radius').and('eq', `${parseFloat(BorderRadius.xxl)*16}px`);
        // padding
        selectIconWrapper().should('have.css', 'padding').and('eq', `${parseFloat(Padding.m)*16}px`);
        // cursor
        selectIconWrapper().should('have.css', 'cursor').and('eq', Cursors.pointer);
    });

    it('Icon callbacks', () => {
        cy.mount(<Icon
            icon={IconList.download}
            onClick={() => {
                expect(true).to.be.true;
            }}
        />);

        selectIcon().click();
    });
});