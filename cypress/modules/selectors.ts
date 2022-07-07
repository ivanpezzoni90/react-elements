type Selector<T> = (parent?: Cypress.Chainable<JQuery<T>>) => Cypress.Chainable<JQuery<T>>;
type SelectorWithParam<T, C> = (param: T) => Cypress.Chainable<JQuery<C>>;


// Component testing
export const selectInputWrapper: Selector<HTMLDivElement> = () => cy.get('.ie-input');
export const selectInput: Selector<HTMLInputElement> = () => selectInputWrapper().find('input');
export const selectInputLabel: Selector<HTMLLabelElement> = () => selectInputWrapper().find('label');

export const selectInputNumberIcons:
    SelectorWithParam<'up' | 'down', HTMLDivElement> =
    (icon: 'up' | 'down') =>
        selectInputWrapper().find('.ie-input__element__icons')
            .find(`.ie-input__element__icons__${icon}`);

export const selectSelect: Selector<HTMLSelectElement> = () => cy.get('.ie-select');