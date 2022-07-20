import { allRgbColors } from '../../src/lib/constants/colors';
import { BorderRadius, ElementHeight, ElementLength, LabelLength } from '../../src/lib/types';
import { verifyElementRgbColor, verifyElementRgbColorProp } from './assertions';
import { CypressElement } from './constants';
import { selectDropdownListItemCheckboxWithLabel, selectDropdownListItemWithLabel, selectDropdownListNthItem, selectDropdownListNthItemCheckbox } from './selectors';

export const clickAsideElement = (element: CypressElement) => {
    cy.get('.ie__aside').find('.ie__aside__component').contains(element.label).click();
    cy.get('.ie__workarea').find('.ie__workarea__element__wrapper').find(element.class).should('be.visible');
};

type checkDefaultPropsDefaults = {
    length?: string,
    labelPosition?: string,
    labelLength?: string,
    height?: string
}

export function checkDefaultElementProps (
    wrapper: () => Cypress.Chainable<JQuery<HTMLDivElement>>,
    label: () => Cypress.Chainable<JQuery<HTMLLabelElement>>,
    defaults?: checkDefaultPropsDefaults
) {
    // label
    label().should('have.text', 'Label');
    // TODO: How to check it's 100%?
    // length
    wrapper().should('have.css', 'width').and('eq', (defaults && defaults.length) || '484px');
    // height
    if (defaults && defaults.height) {
        // Skip height if null
        wrapper().should('have.css', 'height').and('eq', defaults.height || `${parseFloat(ElementHeight.m)*16}px`);
    }
    // shadow
    wrapper().should('have.css', 'box-shadow');
    // labelColor
    verifyElementRgbColor(label(), allRgbColors['Dim Gray']);
    // borderColor
    verifyElementRgbColorProp(wrapper(), allRgbColors['Silver Sand'], 'border-bottom-color');
    // labelPosition
    wrapper().should('have.css', 'flex-direction').and('eq', defaults && defaults.labelPosition || 'column');
    // labelLength
    label().should('have.css', 'max-width').and('eq', defaults && defaults.labelLength || '100%');
    // borderRadius
    label().should('have.css', 'border-radius').and('eq', '0px');
}

export function checkCustomElementProps (
    wrapper: () => Cypress.Chainable<JQuery<HTMLDivElement>>,
    label: () => Cypress.Chainable<JQuery<HTMLLabelElement>>,
    defaults?: checkDefaultPropsDefaults
) {
    // label
    label().should('have.text', 'Name');

    // length
    wrapper().should('have.css', 'width')
        .and('eq', defaults && defaults.length || `${parseInt(ElementLength.m, 10)*16}px`);

    // shadow
    // TODO: How to test there is no box-shadow?

    // labelColor
    verifyElementRgbColor(label(), allRgbColors['Teal']);
   
    // showBorders && borderColor
    verifyElementRgbColorProp(wrapper(), allRgbColors['Teal'], 'border-bottom-color');
    verifyElementRgbColorProp(wrapper(), allRgbColors['Teal'], 'border-top-color');
    verifyElementRgbColorProp(wrapper(), allRgbColors['Teal'], 'border-left-color');
    verifyElementRgbColorProp(wrapper(), allRgbColors['Teal'], 'border-right-color');

    // labelPosition
    wrapper().should('have.css', 'flex-direction').and('eq', defaults && defaults.labelPosition || 'row');
    // labelLength
    label().should('have.css', 'max-width').and(
        'eq',
        defaults && defaults.labelLength || `${parseFloat(LabelLength.m)*16}px`
    );
    // borderRadius
    wrapper().should('have.css', 'border-radius').and('eq', `${parseFloat(BorderRadius.l)*16}px`);
}


export const selectOption = (element: () => Cypress.Chainable<JQuery<HTMLDivElement>>, option: number | string) => {
    element().click();
    if (typeof option === 'string') {
        selectDropdownListItemWithLabel(option).click();
    } else {
        selectDropdownListNthItem(option).click();
    }
    return element;
};
export const selectOptionMultiple = (
    element: () => Cypress.Chainable<JQuery<HTMLDivElement>>,
    option: number | string,
    shouldOpen = false
) => {
    if (shouldOpen) element().click();

    if (typeof option === 'string') {
        selectDropdownListItemCheckboxWithLabel(option).click();
    } else {
        selectDropdownListNthItemCheckbox(option).click();
    }
    return element;
};