import { CypressElement } from './constants';

export const clickAsideElement = (element: CypressElement) => {
    cy.get('.ie__aside').find('.ie__aside__component').contains(element.label).click();
    cy.get('.ie__workarea').find('.ie__workarea__element__wrapper').find(element.class).should('be.visible');
};