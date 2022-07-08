

/**
 * 
 * @param element Cypress element
 * @param color rgb color in format 255,255,255
 * @param prop the prop with the color to check
 * @returns Cypress element
 */
export function verifyElementRgbColorProp<T> (
    element: Cypress.Chainable<JQuery<T>>,
    color: string,
    prop: string
) {
    const parsedColor = `rgb(${color.replaceAll(',', ', ')})`;
    return element.should('have.css', prop).and('eq', parsedColor);
}

export function verifyElementRgbColor<T> (element: Cypress.Chainable<JQuery<T>>, color: string) {
    return verifyElementRgbColorProp(element, color, 'color');
}

export function verifyElementNotHasRgbColor<T> (element: Cypress.Chainable<JQuery<T>>, color: string) {
    const parsedColor = `rgb(${color.replaceAll(',', ', ')})`;
    return element.should('have.css', 'color').and('not.eq', parsedColor);
}