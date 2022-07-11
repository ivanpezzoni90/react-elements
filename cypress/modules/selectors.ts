
type Selector<R, P = HTMLDivElement> = (parent?: () => Cypress.Chainable<JQuery<P>>) => Cypress.Chainable<JQuery<R>>;

type SelectorWithParam<T, R, P> = (
    param: T,
    parent?: () => Cypress.Chainable<JQuery<P>>
) => Cypress.Chainable<JQuery<R>>;


// Component testing


// INPUT
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


// SELECT
export const selectSelectWrapper: Selector<HTMLSelectElement> = () => cy.get('.ie-select');

export const selectSelectElement: Selector<HTMLSelectElement> = (
    parent = selectSelectWrapper
) => parent().find('.ie-select__element');

export const selectSelectChipWrapper: Selector<HTMLDivElement> = (
    parent = selectSelectWrapper
) => selectSelectElement(parent).find('.ie-select__element__chips');

export const selectSelectChips: Selector<HTMLDivElement> = (
    parent = selectSelectWrapper
) => selectSelectElement(parent).find('.ie-select__element__chips')
    .find('.ie-select__element__chip');

export const selectSelectResetButton: Selector<HTMLDivElement> = (
    parent = selectSelectWrapper
) => parent().find('.ie-select__reset');

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

export const selectSelectNthChipClose: SelectorWithParam<number, HTMLDivElement, HTMLDivElement> = (
    nth: number,
    parent = selectSelectWrapper
) => selectSelectChipWrapper(parent).find('.ie-select__element__chip')
    .eq(nth).find('.ie-select__element__chip__close');

export const selectSelectNthChipText: SelectorWithParam<number, HTMLDivElement, HTMLDivElement> = (
    nth: number,
    parent = selectSelectWrapper
) => selectSelectNthChip(nth, parent).find('.ie-select__element__chip_text');

export const selectSelectChipWithLabel: SelectorWithParam<string, HTMLDivElement, HTMLDivElement> = (
    label: string,
    parent = selectSelectWrapper
) => selectSelectChipWithLabel(label, parent).find('.ie-select__element__chip_text').contains(label);

export const selectSelectLabel: Selector<HTMLSelectElement> = (
    parent = selectSelectWrapper
) => parent().find('div.ie-select__label');


// DROPDOWN

export const selectDropdown: Selector<HTMLDivElement> = () => cy.get('.ie-dropdown');

export const selectDropdownList: Selector<HTMLUListElement> = (parent = selectDropdown) =>
    parent().find('.ie-dropdown__container__list');

export const selectDropdownFilter: Selector<HTMLDivElement> = (parent = selectDropdown) =>
    selectInput(() => parent().find('.ie-dropdown__container__list__filter__input'));

export const selectDropdownListNthItem: SelectorWithParam<number, HTMLLIElement, HTMLDivElement> = (
    nth: number,
    parent = selectDropdown
) =>
    parent().find('li.ie-dropdown__container__list__item').eq(nth);

export const selectDropdownListItems: Selector<HTMLDivElement> = (
    parent = selectDropdown
) =>
    parent().find('li.ie-dropdown__container__list__item');

export const selectDropdownListItemWithLabel: SelectorWithParam<string, HTMLLIElement, HTMLDivElement> = (
    label: string,
    parent = selectDropdown
) =>
    parent().find('li.ie-dropdown__container__list__item').contains(label);

export const selectDropdownListNthItemCheckbox: SelectorWithParam<number, HTMLLIElement, HTMLDivElement> = (
    nth: number,
    parent = selectDropdown
) => selectDropdownListNthItem(nth, parent).find('.ie-checkbox__element');

export const selectDropdownListItemCheckboxWithLabel: SelectorWithParam<string, HTMLLIElement, HTMLDivElement> = (
    label: string,
    parent = selectDropdown
) => selectDropdownListItemWithLabel(label, parent).find('.ie-checkbox__element');

