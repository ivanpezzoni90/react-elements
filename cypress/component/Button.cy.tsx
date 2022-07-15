import React from 'react';

import {Button} from '../../src/lib/Button';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { AlignPositions, BorderRadius, ButtonIconSize, ElementHeight, ElementLength, ElementSize, FontWeight, IconPosition } from '../../src/lib/types';
import {
    selectButtonLabel,
    selectButton,
    selectButtonIcon,
    selectButtonIconContainer,
} from '../modules/selectors';
import { log } from '../modules/utils';
import { verifyElementRgbColor, verifyElementRgbColorProp } from '../modules/assertions';
import { IconList } from '../../src/lib/Icon';

describe('Button', () => {
    it('Button props', () => {
        cy.mount(<Button/>);

        log('Verify default props');

        // label
        selectButtonLabel().should('have.text', 'Label');
        // length
        selectButton().should('have.css', 'width').and('eq', '484px');
        // height
        selectButton().should('have.css', 'height').and('eq', '63px'); // TODO: Computed height is different from 16*3.5em
        // borderRadius
        selectButton().should('have.css', 'border-radius').and('eq', '9px'); // TODO: Computed bradius is different from 16*0.5em
        // fontWeight
        selectButton().should('have.css', 'font-weight').and('eq', FontWeight.light);
        // fontSize
        selectButton().should('have.css', 'font-size').and('eq', '18px'); // TODO: Computed fsize is different from FontSize.m
        // color
        verifyElementRgbColorProp(selectButton(), allRgbColors['Firebrick'], 'background-color');
        // textcolor
        verifyElementRgbColor(selectButton(), allRgbColors['White']);
        // icon
        selectButtonIconContainer().should('not.exist');
        // disabled (calling click() action verifies the item is clickable)
        selectButton().click();
        // alignment
        selectButton().should('have.css', 'justify-content').and('eq', AlignPositions.center);


        log('Verify custom props');

        cy.mount(<Button
            label="Name"
            className="additional-class"
            length={ElementLength.s}
            height={ElementHeight.s}
            fontWeight={FontWeight.bold}
            fontSize={ElementSize.xl}
            color={allColors['Teal']}
            textColor={allColors['Light Cyan']}
            icon={IconList.search}
            align={AlignPositions.left}
            borderRadius={BorderRadius.xxl}
        />);
        // label
        selectButtonLabel().should('have.text', 'Name');
        // className
        selectButton().should('have.class', 'additional-class');
        // length
        selectButton().should('have.css', 'width').and('eq', '160px');
        // height
        selectButton().should('have.css', 'height').and('eq', '50px'); // TODO: Computed height is different from 16*3.5em
        // borderRadius
        selectButton().should('have.css', 'border-radius').and('eq', '30px'); // TODO: Computed bradius is different from 16*0.5em
        // fontWeight
        selectButton().should('have.css', 'font-weight').and('eq', FontWeight.bold);
        // fontSize
        selectButton().should('have.css', 'font-size').and('eq', ElementSize.xl); // TODO: Computed fsize is different from FontSize.m
        // color
        verifyElementRgbColorProp(selectButton(), allRgbColors['Teal'], 'background-color');
        // textcolor
        verifyElementRgbColor(selectButton(), allRgbColors['Light Cyan']);
        // icon
        log('Verify icon has as default button\'s font size and color white');
        selectButtonIcon().should('have.css', 'font-size').and('eq', ElementSize.xl);
        verifyElementRgbColor(selectButtonIcon(), allRgbColors['White']);
        // alignment
        selectButton().should('have.css', 'justify-content').and('eq', AlignPositions.left);

        cy.mount(<Button
            icon={IconList.eye}
            iconPosition={IconPosition.left}
            buttonIconSize={ButtonIconSize.xl}
            iconColor={allColors['Blue Violet']}
            disabled
        />);

        // Calculating button icon font-size because buttonIconSize prop multiplies by x button font-size
        // Using 18 instead of ElementSize.m (button default) because of the above warnings
        // (computed sizes different from actual)
        selectButtonIcon().should('have.css', 'font-size').and(
            'eq',
            `${18 * ButtonIconSize.xl}px`
        );
        verifyElementRgbColor(selectButtonIcon(), allRgbColors['Blue Violet']);

        log('Verify disabled');
        selectButton().should('have.css', 'opacity').and('eq', '0.5');
        selectButton().should('have.css', 'pointer-events').and('eq', 'none');
        selectButton().should('have.css', 'cursor').and('eq', 'not-allowed');
        selectButton().should('have.attr', 'disabled');
    });
    it('Button callbacks', () => {
        cy.mount(<Button
            onClick={() => {
                expect(true).to.be.true;
            }}
        />);

        selectButton().click();
    });
});