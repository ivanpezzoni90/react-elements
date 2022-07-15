
type Selector<R, P = HTMLDivElement> = (parent?: () => Cypress.Chainable<JQuery<P>>) => Cypress.Chainable<JQuery<R>>;

type SelectorWithParam<T, R, P> = (
    param: T,
    parent?: () => Cypress.Chainable<JQuery<P>>
) => Cypress.Chainable<JQuery<R>>;

type SelectorWithParams<T, R, P> = (
    parent?: () => Cypress.Chainable<JQuery<P>>,
    ...params: T[]
) => Cypress.Chainable<JQuery<R>>;


// Component testing


// INPUT
export const selectInputWrapper: Selector<HTMLDivElement> = () => cy.get('.ie-input');

export const selectInput: Selector<HTMLInputElement> = (
    parent = selectInputWrapper
) => parent().find('input');

export const selectTextarea: Selector<HTMLTextAreaElement> = (
    parent = selectInputWrapper
) => parent().find('textarea');

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
export const selectSelectWrapper: Selector<HTMLDivElement> = () => cy.get('.ie-select');

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

export const selectSelectChipWithLabel: SelectorWithParam<string, HTMLElement, HTMLDivElement> = (
    label: string,
    parent = selectSelectWrapper
) => selectSelectChipWithLabel(label, parent).find('.ie-select__element__chip_text').contains(label);

export const selectSelectLabel: Selector<HTMLLabelElement> = (
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

export const selectDropdownListItemWithLabel: SelectorWithParam<string, HTMLElement, HTMLDivElement> = (
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


// CHECKBOX

export const selectCheckboxWrapper: Selector<HTMLDivElement> = () => cy.get('.ie-checkbox');

export const selectCheckboxElement: Selector<HTMLDivElement> = (
    parent = selectCheckboxWrapper
) => parent().find('.ie-checkbox__element');

export const selectCheckboxElementCheck: Selector<HTMLDivElement> = (
    parent = selectCheckboxWrapper
) => selectCheckboxElement(parent).find('.checkbox__element__checkbox');

export const selectCheckboxElementIcon: Selector<HTMLDivElement> = (
    parent = selectCheckboxWrapper
) => selectCheckboxElementCheck(parent).find('.checkbox__element__checkbox__icon');

export const selectCheckboxLabel: Selector<HTMLLabelElement> = (
    parent = selectCheckboxWrapper
) => parent().find('label');


// TOGGLE

export const selectToggleWrapper: Selector<HTMLDivElement> = () => cy.get('.ie-toggle');

export const selectToggleElement: Selector<HTMLDivElement> = (
    parent = selectToggleWrapper
) => parent().find('.ie-toggle__element');

export const selectToggleElementSwitch: Selector<HTMLDivElement> = (
    parent = selectToggleWrapper
) => selectToggleElement(parent).find('.ie-toggle__element__switch');

export const selectToggleElementSlider: Selector<HTMLDivElement> = (
    parent = selectToggleWrapper
) => selectToggleElementSwitch(parent).find('.ie-toggle__element__switch__slider');

export const selectToggleElementLabel: Selector<HTMLDivElement> = (
    parent = selectToggleWrapper
) => selectToggleElementSlider(parent).find('.ie-toggle__element__switch__slider__label');

export const selectToggleElementIcon: Selector<HTMLDivElement> = (
    parent = selectToggleWrapper
) => selectToggleElementLabel(parent).find('.ie-icon > svg');

export const selectToggleLabel: Selector<HTMLLabelElement> = (
    parent = selectToggleWrapper
) => parent().find('.ie-toggle__label');


// COLOR

export const selectColorPickerWrapper: Selector<HTMLDivElement> = () => cy.get('.ie-color-picker');

export const selectColorPickerElement: Selector<HTMLDivElement> = (
    parent = selectColorPickerWrapper
) => parent().find('.ie-color-picker__element');

export const selectColorPickerElementInfoColor: Selector<HTMLDivElement> = (
    parent = selectColorPickerWrapper
) => selectColorPickerElement(parent)
    .find('.ie-color-picker__element__info__color');

export const selectColorPickerElementInfoLabel: Selector<HTMLDivElement> = (
    parent = selectColorPickerWrapper
) => selectColorPickerElement(parent)
    .find('.ie-color-picker__element__info__label');

export const selectColorPickerElementPicker: Selector<HTMLDivElement> = (
    parent = selectColorPickerWrapper
) => selectColorPickerElement(parent).find('.ie-color-picker__element__picker');

export const selectColorPickerLabel: Selector<HTMLLabelElement> = (
    parent = selectColorPickerWrapper
) => parent().find('.ie-color-picker__label');

// Color dropdown
export const selectDropdownColor: Selector<HTMLDivElement> = () => cy.get('.ie-dropdown__color');

export const selectDropDownColorList: Selector<HTMLDivElement> = (
    parent = selectDropdownColor 
) => parent().find('.ie-dropdown__color__list');

export const selectDropDownColorListFooterInput: Selector<HTMLDivElement> = (
    parent = selectDropdownColor 
) => selectDropDownColorList(parent).find('.ie-dropdown__color__list__footer__input');

export const selectDropDownColorListRows: Selector<HTMLDivElement> = (
    parent = selectDropdownColor 
) => selectDropDownColorList(parent).find('.ie-dropdown__color__list__row');

export const selectDropDownColorListNthRow: SelectorWithParam<number, HTMLDivElement, HTMLDivElement> = (
    nth: number,
    parent = selectDropdownColor,
) => selectDropDownColorListRows(parent).eq(nth);

export const selectDropDownColorListNthRowItems: SelectorWithParam<number, HTMLDivElement, HTMLDivElement> = (
    nth: number,
    parent = selectDropdownColor,
) => selectDropDownColorListNthRow(nth, parent).find('.ie-dropdown__color__list__row__item');

export const selectDropDownColorListNthRowNthItem: SelectorWithParams<number, HTMLDivElement, HTMLDivElement> = (
    parent = selectDropdownColor,
    nthRow: number,
    nthItem: number,
) => selectDropDownColorListNthRowItems(nthRow, parent).eq(nthItem);


// ICON

export const selectIconWrapper: Selector<HTMLDivElement> = () => cy.get('.ie-icon');
export const selectIcon: Selector<HTMLDivElement> = (
    parent = selectIconWrapper
) => parent().find('svg');


// BUTTON
export const selectButton: Selector<HTMLDivElement> = () => cy.get('.ie-button');

export const selectButtonLabel: Selector<HTMLDivElement> = (
    parent = selectButton
) => parent().find('.ie-button__label');

export const selectButtonIconContainer: Selector<HTMLDivElement> = (
    parent = selectButton
) => parent().find('.ie-button__icon');

export const selectButtonIcon: Selector<HTMLDivElement> = (
    parent = selectButton
) => selectButtonIconContainer(parent).find('svg');


// RADIO

export const selectRadioWrapper: Selector<HTMLDivElement> = () => cy.get('.ie-radio');

export const selectRadioLabel: Selector<HTMLDivElement> = (
    parent = selectRadioWrapper
) => parent().find('.ie-radio__label');

export const selectRadioContainer: Selector<HTMLDivElement> = (
    parent = selectRadioWrapper
) => parent().find('.ie-radio__container');

export const selectRadioElements: Selector<HTMLDivElement> = (
    parent = selectRadioWrapper
) => selectRadioContainer(parent).find('.ie-radio__element');

export const selectRadioNthElement: SelectorWithParam<number, HTMLDivElement, HTMLDivElement> = (
    nth: number,
    parent = selectRadioWrapper
) => selectRadioElements(parent).eq(nth);

export const selectRadioNthElementLabel: SelectorWithParam<number, HTMLDivElement, HTMLDivElement> = (
    nth: number,
    parent = selectRadioWrapper
) => selectRadioNthElement(nth,parent).find('.ie-radio__element__label');

export const selectRadioNthElementCheckbox: SelectorWithParam<number, HTMLDivElement, HTMLDivElement> = (
    nth: number,
    parent = selectRadioWrapper
) => selectCheckboxElementCheck(() => selectRadioNthElement(nth,parent));

export const selectRadioNthElementToggleLabel: SelectorWithParam<number, HTMLDivElement, HTMLDivElement> = (
    nth: number,
    parent = selectRadioWrapper
) => selectToggleElementLabel(() => selectRadioNthElement(nth,parent));

export const selectRadioNthElementToggleSlider: SelectorWithParam<number, HTMLDivElement, HTMLDivElement> = (
    nth: number,
    parent = selectRadioWrapper
) => selectToggleElementSlider(() => selectRadioNthElement(nth,parent));

export const selectRadioNthElementIcon: SelectorWithParam<number, HTMLDivElement, HTMLDivElement> = (
    nth: number,
    parent = selectRadioWrapper
) => selectRadioNthElement(nth,parent).find('.ie-radio__element__icon');


// SLIDER


export const selectSliderWrapper: Selector<HTMLDivElement> = () => cy.get('.ie-slider');

export const selectSliderElement: Selector<HTMLDivElement> = (
    parent = selectSliderWrapper
) => parent().find('.ie-slider__element');

export const selectSliderLabel: Selector<HTMLLabelElement> = (
    parent = selectSliderWrapper
) => parent().find('label');

export const selectSliderElementValue: Selector<HTMLDivElement> = (
    parent = selectSliderWrapper
) => selectSliderElement(parent).find('.ie-slider__element__value');

export const selectSliderElementInput: Selector<HTMLDivElement> = (
    parent = selectSliderWrapper
) => selectSliderElement(parent).find('.ie-slider__element__slider__input');

export const selectSliderElementTooltip: Selector<HTMLDivElement> = (
    parent = selectSliderWrapper
) => selectSliderElement(parent).find('.ie-slider__element__slider__tooltip');

export const selectSliderElementDatalist: Selector<HTMLDivElement> = (
    parent = selectSliderWrapper
) => selectSliderElement(parent).find('.ie-slider__element__slider__data-list');

export const selectSliderElementDatalistOptions: Selector<HTMLDivElement> = (
    parent = selectSliderWrapper
) => selectSliderElementDatalist(parent).find('.ie-slider__element__slider__data-list__option');

export const selectSliderElementDatalistNthOption: SelectorWithParam<number, HTMLOptionElement, HTMLDivElement> = (
    nth: number,
    parent = selectSliderWrapper
) => selectSliderElementDatalistOptions(parent).eq(nth);



