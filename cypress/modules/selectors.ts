
type Selector<T> = (parent?: () => Cypress.Chainable<JQuery<T>>) => Cypress.Chainable<JQuery<T>>;
type SelectorWithParam<T, R, P> = (
    param: T,
    parent?: () => Cypress.Chainable<JQuery<P>>
) => Cypress.Chainable<JQuery<R>>;


// Component testing
export const selectInputWrapper: Selector<HTMLDivElement> = () => cy.get('.ie-input');

export const selectInput: Selector<HTMLInputElement> = (
    parent = selectInputWrapper
) => parent().find('input');

export const selectInputLabel: Selector<HTMLLabelElement> = (
    parent = selectInputWrapper
) => parent().find('label');

export const selectInputNumberIcons: SelectorWithParam<'up' | 'down', HTMLDivElement, HTMLDivElement> = (
    icon: 'up' | 'down',
    parent = selectInputWrapper
) =>
    parent().find('.ie-input__element__icons')
        .find(`.ie-input__element__icons__${icon}`);

export const selectSelectWrapper: Selector<HTMLSelectElement> = () => cy.get('.ie-select');

export const selectSelectElement: Selector<HTMLSelectElement> = (
    parent = selectSelectWrapper
) => parent().find('.ie-select__element');

export const selectSelectChipWrapper: Selector<HTMLDivElement> = (
    parent = selectSelectWrapper
) => selectSelectElement(parent).find('.ie-select__element__chips');

export const selectSelectSingleChipIcon: Selector<HTMLDivElement> = (
    parent = selectSelectWrapper
) => selectSelectChipWrapper(parent).find('.ie-select__element__chip_icon');

export const selectSelectSingleChipText: Selector<HTMLDivElement> = (
    parent = selectSelectWrapper
) => selectSelectChipWrapper(parent).find('.ie-select__element__chip_text');

export const selectSelectNthChip: SelectorWithParam<number, HTMLDivElement, HTMLDivElement> = (
    nth: number,
    parent = selectSelectWrapper
) => selectSelectChipWrapper(parent).find('.ie-select__element__chip').eq(nth);

export const selectSelectChipWithLabel: SelectorWithParam<string, HTMLDivElement, HTMLDivElement> = (
    label: string,
    parent = selectSelectWrapper
) => selectSelectChipWrapper(parent).find('.ie-select__element__chip').contains(label);

export const selectSelectLabel: Selector<HTMLSelectElement> = (
    parent = selectSelectWrapper
) => parent().find('div.ie-select__label');

export const selectDropdown: Selector<HTMLDivElement> = () => cy.get('.ie-dropdown');

export const selectDropdownList: Selector<HTMLUListElement> = (parent = selectDropdown) =>
    parent().find('.ie-dropdown__container__list');

export const selectDropdownListNthItem: SelectorWithParam<number, HTMLLIElement, HTMLDivElement> = (
    nth: number,
    parent = selectDropdown
) =>
    parent().find('li.ie-dropdown__container__list__item').eq(nth);

export const selectDropdownListItemWithLabel: SelectorWithParam<string, HTMLLIElement, HTMLDivElement> = (
    label: string,
    parent = selectDropdown
) =>
    parent().find('li.ie-dropdown__container__list__item').contains(label);