export const generateID = () => {
    return Math.random().toString(36).slice(2);
};

export const calculateInputLength = (length: string) => ({
    s: '8em',
    m: '16em',
    l: '32em',
    full: '100%'
}[length]);
  
export const calculateInnerInputLength = (length: string) => ({
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