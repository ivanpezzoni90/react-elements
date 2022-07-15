import React from 'react';
import { allColors, allRgbColors } from '../../src/lib/constants/colors';
import { IconList } from '../../src/lib/Icon';
import {Select} from '../../src/lib/Select';
import { BorderRadius, ElementLength, LabelLength, LabelPositions, Option } from '../../src/lib/types';
import { checkCustomElementProps, checkDefaultElementProps, selectOption, selectOptionMultiple } from '../modules/actions';
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

        log('Verify select with passed value');
        cy.mount(<Select
            value="search"
            options={selectOptions}
        />);
        selectSelectSingleChipIcon().should('be.visible');
        selectSelectSingleChipText().should('have.text', 'Search');
        cy.mount(<Select
            multiple
            value={['home', 'eye', 'search', 'phone']}
            options={selectOptions}
        />);
        selectSelectNthChipText(0).should('have.text', 'Home');
        selectSelectNthChipText(1).should('have.text', 'Eye');
        selectSelectNthChipText(2).should('have.text', 'Phone');
        selectSelectNthChipText(3).should('have.text', 'Search');

        cy.mount(<Select
            label="Name"
            className="additional-class"
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

        checkCustomElementProps(selectSelectWrapper, selectSelectLabel);

        // className
        selectSelectWrapper().should('have.class', 'additional-class');

        // textColor
        verifyElementRgbColor(selectSelectElement(), allRgbColors['Teal']);


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
    it('Select callbacks', () => {
        log('Verify onChange');
        cy.mount(<Select
            options={selectOptions}
            onChange={(newValue) => {
                expect(newValue).to.eq('heart');
            }}
        />);
        selectOption(selectSelectWrapper, 0);

        log('Verify multiple onChange');
        let count = 0;
        cy.mount(<Select
            multiple
            options={selectOptions}
            onChange={(newValue) => {
                switch(count) {
                    case 0: expect(newValue).to.deep.equal(['heart']);break;
                    case 1: expect(newValue).to.deep.equal(['heart', 'eye']);break;
                    case 2: expect(newValue).to.deep.equal(['heart', 'eye', 'redo']);break;
                    case 3: expect(newValue).to.deep.equal(['heart', 'eye', 'redo', 'search']);break;
                    
                    case 4: expect(newValue).to.deep.equal(['eye', 'redo', 'search']);break;
                    case 5: expect(newValue).to.deep.equal(['redo', 'search']);break;
                    case 6: expect(newValue).to.deep.equal(['search']);break;
                    case 7: expect(newValue).to.deep.equal([]);break;
                }
                count++;
            }}
        />);

        log('Select values');
        selectOptionMultiple(selectSelectWrapper, 0, true);
        selectOptionMultiple(selectSelectWrapper, 2);
        selectOptionMultiple(selectSelectWrapper, 4);
        selectOptionMultiple(selectSelectWrapper, 6);
        log('Unselect values');
        selectOptionMultiple(selectSelectWrapper, 0);
        selectOptionMultiple(selectSelectWrapper, 2);
        selectOptionMultiple(selectSelectWrapper, 4);
        selectOptionMultiple(selectSelectWrapper, 6);
    });
});