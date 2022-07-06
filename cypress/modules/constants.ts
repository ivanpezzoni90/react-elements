export interface CypressElement {
    label: string,
    class: string
}

export interface CypressElements {
    input: CypressElement,
    select: CypressElement,
    checkbox: CypressElement,
    button: CypressElement,
    color: CypressElement,
    icon: CypressElement,
    radio: CypressElement,
    slider: CypressElement,
    toggle: CypressElement
}

export const elements: CypressElements = {
    input: {
        label: 'Input',
        class: '.ie-input'
    },
    select: {
        label: 'Select',
        class: '.ie-select'
    },
    checkbox: {
        label: 'Checkbox',
        class: '.ie-checkbox'
    },
    button: {
        label: 'Button',
        class: '.ie-button'
    },
    color: {
        label: 'Color',
        class: '.ie-color-picker'
    },
    icon: {
        label: 'Icon',
        class: '.ie-icon'
    },
    radio: {
        label: 'Radio',
        class: '.ie-radio'
    },
    slider: {
        label: 'Slider',
        class: '.ie-slider'
    },
    toggle: {
        label: 'Toggle',
        class: '.ie-toggle'
    },

};
