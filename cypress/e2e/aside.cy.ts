import { clickAsideElement } from '../modules/actions';
import { CypressElement, elements } from '../modules/constants';

describe('Aside', () => {
    it('Select aside elements', () => {
        cy.visit('http://localhost:3000');
        Object.values(elements).forEach((e: CypressElement) => {
            clickAsideElement(e);
        });
    });
});