export const generateID = () => {
    return Math.random().toString(36).slice(2);
};
  
export const calculateInnerElementLength = (length: string) => ({
    s: '6em',
    m: '14em',
    l: '30em',
    full: '100%'
}[length]);

export const mergeClasses = (
    currentClass: string,
    additionalClasses: string | Array<string>
) => {
    const classesToMerge = Array.isArray(additionalClasses)
        ? additionalClasses
        : [additionalClasses];
    let newClass = currentClass;

    classesToMerge.forEach(c => {
        newClass = `${newClass} ${c}`;
    });
    return newClass;
};

export const elaborateComputedWidth = (width: string, padding = 32) => {
    // Subtract padding in px to parsed computed width
    const numWidth = parseInt(width, 10) - padding;
    return `${numWidth}px`;
};

export function splitArrayInGroups<T> (a: T[], size: number) {
    return a.map((item, index) => 
        index % size === 0 ? a.slice(index, index + size) : null
    ).filter(Boolean);
}

export function round(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function checkEventTargetContainsClass(e: any, className: string) {
    return e.target.classList.contains(className)
        || e.target.parentElement.classList.contains(className)
        || e.target.parentElement.parentElement.classList.contains(className);
}

export * from './colorHelpers';
export * from './styleHelpers';
export * from './sliderHelpers';
export * from './spinnerHelpers';