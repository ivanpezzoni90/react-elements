import React from 'react';

import {ColorPicker} from '../../src/lib/ColorPicker';
import { allColors } from '../../src/lib/constants/colors';
import { AlignPositions, BorderRadius, ElementLength, LabelLength, LabelPositions } from '../../src/lib/types';
import { checkCustomElementProps, checkDefaultElementProps } from '../modules/actions';
import {
    selectColorPickerWrapper,
    selectColorPickerLabel,
    selectColorPickerElementPicker,
    selectColorPickerElementInfoColor,
    selectColorPickerElementInfoLabel,
    selectDropDownColorListNthRowNthItem,
    selectDropDownColorListFooterInput,
    selectInputLabel,
    selectInput,
} from '../modules/selectors';
import { log } from '../modules/utils';

describe('Color Picker', () => {
    it('Color picker props', () => {
        log('Verify color picker default props');
        cy.mount(<ColorPicker/>);

        checkDefaultElementProps(
            selectColorPickerWrapper,
            selectColorPickerLabel,
            {
                length: `${parseFloat(ElementLength.m)*16}px`,
                labelPosition: 'row',
                labelLength: `${parseFloat(ElementLength.m)*16}px`,
            }
        );
        selectColorPickerElementInfoColor().should('have.text', '');
        selectColorPickerElementInfoLabel().should('have.text', '');

        log('Verify color picker with passed value');
        cy.mount(<ColorPicker
            value={allColors['Teal']}
        />);
        log('Verify selected color info');
        selectColorPickerElementInfoColor().should('have.text', allColors['Teal']);
        selectColorPickerElementInfoLabel().should('have.text', 'Teal');
        log('Verify selected color in dropdown');
        selectColorPickerElementPicker().click();
        selectInputLabel(selectDropDownColorListFooterInput).should('have.text', 'Teal');
        selectInput(selectDropDownColorListFooterInput).should('have.value', allColors['Teal']);
        selectDropDownColorListNthRowNthItem(undefined, 6, 0).should('have.css', 'box-shadow');


        log('Verify color picker custom props');
        cy.mount(<ColorPicker
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
            selectColorPickerWrapper,
            selectColorPickerLabel,
            {
                length: `${parseFloat(ElementLength.l)*16}px`,
                labelLength: `${parseFloat(LabelLength.l)*16}px`,
                labelPosition: 'column'
            }
        );
        selectColorPickerWrapper().should('have.class', 'additional-class');

        cy.mount(<ColorPicker
            hideLabel
            align={AlignPositions.center}
        />);

        selectColorPickerLabel().should('not.exist');
        selectColorPickerWrapper().should('have.css', 'justify-content').and('eq', 'center');

        log('Verify picker interactions');
        cy.mount(<ColorPicker/>);
        selectColorPickerElementPicker().click();
        
        log('Verify mouseover and mouseover box shadow');
        selectDropDownColorListNthRowNthItem(undefined, 0, 0).trigger('mouseover');
        selectDropDownColorListNthRowNthItem(undefined, 0, 0).should('have.css', 'box-shadow');
        selectInputLabel(selectDropDownColorListFooterInput).should('have.text', 'Ruby Red');
        selectDropDownColorListNthRowNthItem(undefined, 0, 1).trigger('mouseover');
        selectInputLabel(selectDropDownColorListFooterInput).should('have.text', 'Firebrick');
        selectDropDownColorListNthRowNthItem(undefined, 0, 2).trigger('mouseover');
        selectInputLabel(selectDropDownColorListFooterInput).should('have.text', 'Firebrick 2');
        selectDropDownColorListNthRowNthItem(undefined, 0, 3).trigger('mouseover');
        selectInputLabel(selectDropDownColorListFooterInput).should('have.text', 'Lava');

        log('Select a color');
        selectDropDownColorListNthRowNthItem(undefined, 1, 0).trigger('mouseover');
        selectInputLabel(selectDropDownColorListFooterInput).should('have.text', 'Cyber Yellow');
        selectDropDownColorListNthRowNthItem(undefined, 1, 0).click();
        log('Verify selected color input and box shadow');
        selectInputLabel(selectDropDownColorListFooterInput).should('have.text', 'Cyber Yellow');
        selectInput(selectDropDownColorListFooterInput).should('have.value', allColors['Cyber Yellow']);
        selectDropDownColorListNthRowNthItem(undefined, 1, 0).should('have.css', 'box-shadow');
        log('Verify selected color info');
        selectColorPickerElementInfoColor().should('have.text', '#ffd400');
        selectColorPickerElementInfoLabel().should('have.text', 'Cyber Yellow');

        log('Verify mouseover interactions after selecting a color');
        selectDropDownColorListNthRowNthItem(undefined, 2, 0).trigger('mouseover');
        log('Both mouseover and selected color should have box shadow');
        selectDropDownColorListNthRowNthItem(undefined, 2, 0).should('have.css', 'box-shadow');
        selectDropDownColorListNthRowNthItem(undefined, 1, 0).should('have.css', 'box-shadow');
        log('Input should show mouseover name');
        selectInputLabel(selectDropDownColorListFooterInput).should('have.text', 'Dark Orange');

        log('Verify custom color');
        cy.wait(500); // TODO: Wait period for re-renders of input element
        selectInput(selectDropDownColorListFooterInput).clear().type('#ff6').should('have.value', '#ff6').blur();
        selectInputLabel(selectDropDownColorListFooterInput).should('have.text', '');

        selectColorPickerElementInfoColor().should('have.text', '#ff6');
        selectColorPickerElementInfoLabel().should('have.text', '');
    });

    it('Color picker callbacks', () => {
        const onClick = cy.stub().as('onClickHandler');
        cy.mount(<ColorPicker
            onChange={onClick}
        />);
        selectColorPickerElementPicker().click();
        selectDropDownColorListNthRowNthItem(undefined, 4, 0).click();
        cy.get('@onClickHandler').should('have.been.called');

        cy.mount(<ColorPicker
            onChange={(color) => {
                expect(color).to.eq(allColors['Prussian Blue']);
            }}
        />);

        selectColorPickerElementPicker().click();
        selectDropDownColorListNthRowNthItem(undefined, 4, 0).click();

        cy.mount(<ColorPicker
            onChange={(color) => {
                expect(color).to.eq('#ff6');
            }}
        />);
        selectColorPickerElementPicker().click();
        selectInput(selectDropDownColorListFooterInput).clear().type('#ff6').blur();
    });
});