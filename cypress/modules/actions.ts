import { allRgbColors } from '../../src/lib/constants/colors';
import { ElementHeight } from '../../src/lib/types';
import { verifyElementRgbColor, verifyElementRgbColorProp } from './assertions';
import { CypressElement } from './constants';
import { selectDropdownListItemWithLabel, selectDropdownListNthItem } from './selectors';

export const clickAsideElement = (element: CypressElement) => {
    cy.get('.ie__aside').find('.ie__aside__component').contains(element.label).click();
    cy.get('.ie__workarea').find('.ie__workarea__element__wrapper').find(element.class).should('be.visible');
};

export function checkDefaultElementProps (
    wrapper: () => Cypress.Chainable<JQuery<HTMLDivElement>>,
    label: () => Cypress.Chainable<JQuery<HTMLLabelElement>>
) {
    // label
    label().should('have.text', 'Label');
    // TODO: How to check it's 100%?
    // length
    wrapper().should('have.css', 'width').and('eq', '484px');
    // height
    wrapper().should('have.css', 'height').and('eq', `${parseFloat(ElementHeight.m)*16}px`);
    // shadow
    wrapper().should('have.css', 'box-shadow');
    // labelColor
    verifyElementRgbColor(label(), allRgbColors['Dim Gray']);
    // borderColor
    verifyElementRgbColorProp(wrapper(), allRgbColors['Silver Sand'], 'border-bottom-color');
    // labelPosition
    wrapper().should('have.css', 'flex-direction').and('eq', 'column');
    // labelLength
    label().should('have.css', 'max-width').and('eq', '100%');
    // borderRadius
    label().should('have.css', 'border-radius').and('eq', '0px');
}


export const selectOption = (element: Cypress.Chainable<JQuery<HTMLDivElement>>, option: number | string) => {
    element.click();
    if (typeof option === 'string') {
        selectDropdownListItemWithLabel(option).click();
    } else {
        selectDropdownListNthItem(option).click();
    }
    return element;
};