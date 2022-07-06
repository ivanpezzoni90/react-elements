type Selector<T> = (parent?: Cypress.Chainable<JQuery<T>>) => Cypress.Chainable<JQuery<T>>;

export const selectInput: Selector<HTMLInputElement> = () => cy.get('.ie-input').find('input');
export const selectSelect: Selector<HTMLSelectElement> = () => cy.get('.ie-select');