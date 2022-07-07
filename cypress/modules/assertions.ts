

/**
 * 
 * @param element Cypress element
 * @param color rgb color in format 255,255,255
 * @returns Cypress element
 */
export function verifyElementRgbColor<T> (element: Cypress.Chainable<JQuery<T>>, color: string) {
    const parsedColor = `rgb(${color.replaceAll(',', ', ')})`;
    return element.should('have.css', 'color').and('eq', parsedColor);
}

export function verifyElementNotHasRgbColor<T> (element: Cypress.Chainable<JQuery<T>>, color: string) {
    const parsedColor = `rgb(${color.replaceAll(',', ', ')})`;
    return element.should('have.css', 'color').and('not.eq', parsedColor);
}