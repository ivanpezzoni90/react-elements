export type Component = {
    key: string,
    name: string,
    editor: Function
};

export type Editor = {
    type: string,
    default: string | boolean | Array<string>,
    label: string,
    options?: Array<Option>,
    prop?: string
};

export type Option = {
    label: string,
    value: string
};

export enum InputLength {
    s = 's',
    m = 'm',
    l = 'l',
    full = 'full'
}