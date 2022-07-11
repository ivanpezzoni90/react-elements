import React from 'react';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { IconList } from '../../src/lib/Icon';
import {Select} from '../../src/lib/Select';
import { BorderRadius, ElementLength, LabelLength, LabelPositions, Option } from '../../src/lib/types';
import { checkDefaultElementProps } from '../modules/actions';
import { verifyElementRgbColor, verifyElementRgbColorProp } from '../modules/assertions';
import { selectDropdownFilter, selectDropdownListItems, selectDropdownListNthItem, selectDropdownListNthItemCheckbox, selectSelectChips, selectSelectElement, selectSelectLabel, selectSelectNthChip, selectSelectNthChipClose, selectSelectNthChipText, selectSelectResetButton, selectSelectSingleChipIcon, selectSelectSingleChipText, selectSelectWrapper } from '../modules/selectors';
import { log } from '../modules/utils';

const selectOptions: Option[] = [{
    icon: IconList.heart,
    label: 'Heart',
    value: 'heart'
}, {
    icon: IconList.home,
    label: 'Home',
    value: 'home'
}, {
    icon: IconList.eye,
    label: 'Eye',
    value: 'eye'
}, {
    icon: IconList.phone,
    label: 'Phone',
    value: 'phone'
}, {
    icon: IconList.redo,
    label: 'Redo',
    value: 'redo'
}, {
    icon: IconList.undo,
    label: 'Undo',
    value: 'undo'
}, {
    icon: IconList.search,
    label: 'Search',
    value: 'search'
}];

describe('Select', () => {
    it('Select props', () => {
        cy.mount(<Select/>);
        log('Verify select default props and styles');
        
        checkDefaultElementProps(
            selectSelectWrapper,
            selectSelectLabel,
        );

        cy.mount(<Select
            label="Name"
            length={ElementLength.m}
            shadow={false}
            labelColor={allColors['Teal']}
            textColor={allColors['Teal']}
            borderColor={allColors['Teal']}
            optionSelectedColor={allColors['Teal']}
            labelPosition={LabelPositions.horizontal}
            labelLength={LabelLength.m}
            showBorders
            borderRadius={BorderRadius.l}
            options={selectOptions}
        />);

        // log('Verify close on click outside');
        // selectSelectWrapper().click();
        // selectDropdownList().should('be.visible');
        // cy.get('body').click('bottomRight');
        // selectDropdown().should('not.exist');

        // label
        selectSelectLabel().should('have.text', 'Name');

        // length
        selectSelectWrapper().should('have.css', 'width')
            .and('eq', `${parseInt(ElementLength.m, 10)*16}px`);

        // TODO: How to test there is no box-shadow?
        verifyElementRgbColor(selectSelectLabel(), allRgbColors['Teal']);
        verifyElementRgbColor(selectSelectElement(), allRgbColors['Teal']);
        verifyElementRgbColorProp(selectSelectWrapper(), allRgbColors['Teal'], 'border-bottom-color');
        verifyElementRgbColorProp(selectSelectWrapper(), allRgbColors['Teal'], 'border-top-color');
        verifyElementRgbColorProp(selectSelectWrapper(), allRgbColors['Teal'], 'border-left-color');
        verifyElementRgbColorProp(selectSelectWrapper(), allRgbColors['Teal'], 'border-right-color');

        selectSelectWrapper().should('have.css', 'flex-direction').and('eq', 'row');
        selectSelectLabel().should('have.css', 'max-width').and('eq', `${parseFloat(LabelLength.m)*16}px`);
        selectSelectWrapper().should('have.css', 'border-radius').and('eq', `${parseFloat(BorderRadius.l)*16}px`);

        log('Verify dropdown interactions and option selected color');
        selectSelectWrapper().click();
        verifyElementRgbColor(selectDropdownListNthItem(0), allRgbColors['Teal']);
        selectDropdownListNthItem(0).click();
        
        log('Verify select chip');
        selectSelectSingleChipIcon().should('be.visible');
        verifyElementRgbColor(
            selectSelectSingleChipText(),
            allRgbColors['Teal']
        );
        selectSelectSingleChipText().should('have.text', 'Heart');
        
        log('Verify option selected');
        selectSelectWrapper().click('right');
        verifyElementRgbColorProp(selectDropdownListNthItem(0), allRgbColors['Teal'], 'background-color');
        verifyElementRgbColor(selectDropdownListNthItem(0), allRgbColors['Cultured']);


        cy.mount(<Select
            resettable
            multiple
            chipBorderRadius={BorderRadius.l}
            filterable
            closeOnClickOutside={false}
            hideBottomBorder
            hideLabel
            options={selectOptions}
        />);

        // TODO: Verify how to click outside if iframe body is same size as select element
        // log('Verify close on click outside false');
        // selectSelectWrapper().click();
        // selectDropdownList().should('be.visible');
        
        // cy.get('body').click('bottomRight');
        // selectDropdownList().should('be.visible');

        // selectSelectWrapper().click();
        // selectDropdown().should('not.exist');

        log('Verify multiple select');
        selectSelectWrapper().click();
        selectDropdownListNthItemCheckbox(0).click();
        selectDropdownListNthItemCheckbox(1).click();
        selectDropdownListNthItemCheckbox(2).click();


        selectSelectNthChipText(0).should('have.text', 'Heart');
        selectSelectNthChipText(1).should('have.text', 'Home');
        selectSelectNthChipText(2).should('have.text', 'Eye');

        selectSelectNthChipClose(0).click();
        selectSelectNthChipText(0).should('have.text', 'Home');
        selectSelectNthChipText(1).should('have.text', 'Eye');
        selectSelectNthChip(2).should('not.exist');

        log('Verify Chip border radius');
        selectSelectNthChip(0).should('have.css', 'border-radius').and('eq', `${parseFloat(BorderRadius.l)*12}px`);

        log('Verify filterable');
        selectDropdownFilter().type('h');
        selectDropdownListItems().should('have.length', 4);

        selectDropdownFilter().type('o');
        selectDropdownListItems().should('have.length', 2);
    
        selectDropdownFilter().type('m');
        selectDropdownListItems().should('have.length', 1);

        selectDropdownFilter().type('{backspace}');
        selectDropdownListItems().should('have.length', 2);

        selectDropdownFilter().type('{backspace}');
        selectDropdownListItems().should('have.length', 4);

        selectDropdownFilter().clear();
        selectDropdownListItems().should('have.length', 7);

        log('Verify resettable');
        selectSelectResetButton().click();
        selectSelectChips().should('have.length', 0);

        // hideBottomBorder
        // TODO: How to test there is no bottom border?
        
        log('Verify hide label');
        selectSelectLabel().should('not.exist');
    });
});