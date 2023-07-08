import { Editor, EditorTypes } from '../types';

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
    return a.map((_item, index) => 
        index % size === 0 ? a.slice(index, index + size) : null
    ).filter(Boolean);
}

export function splitEditorsInGroups (a: Editor[], size: number) {
    let cumulativeSize = 0;
    let group: Editor[] = [];
    const groups: Editor[][] = [];
  
    a.forEach((item) => {
        const itemSize = item.type === EditorTypes.radioButton ? 2 : 1;
        if (cumulativeSize + itemSize <= size) {
            group.push(item);
            cumulativeSize += itemSize;
        } else {
            groups.push(group);
            group = [item];
            cumulativeSize = itemSize;
        }
    });
  
    if (group.length > 0) {
        groups.push(group);
    }
  
    return groups;
}

export function getGroupLength (group: Editor[]) {
    let length = 0;
    group.forEach((e) => {
        if (e.type !== EditorTypes.radioButton) {
            length++;
            return;
        }
        length+=2;
    });
    return length;
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