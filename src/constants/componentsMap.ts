import InputEditor from '../editors/InputEditor';
import SelectEditor from '../editors/SelectEditor';
import CheckboxEditor from '../editors/CheckboxEditor';
import ElementEditor from '../editors/ElementEditor';
import SwitchToggleEditor from '../editors/SwitchToggleEditor';
import IconEditor from '../editors/IconEditor';
import ColorPickerEditor from '../editors/ColorPickerEditor';
import RadioEditor from '../editors/RadioEditor';

import { Component } from '../types';
import ButtonEditor from '../editors/ButtonEditor';

const Components: Component[] = [{
    key: 'input',
    name: 'Input',
    editor: InputEditor
}, {
    key: 'select',
    name: 'Select',
    editor: SelectEditor
}, {
    key: 'checkbox',
    name: 'Checkbox',
    editor: CheckboxEditor
}, {
    key: 'element',
    name: 'Element',
    editor: ElementEditor
}, {
    key: 'switchToggle',
    name: 'Toggle',
    editor: SwitchToggleEditor
},  {
    key: 'icon',
    name: 'Icon',
    editor: IconEditor
}, {
    key: 'colorPicker',
    name: 'Color',
    editor: ColorPickerEditor
}, {
    key: 'button',
    name: 'Button',
    editor: ButtonEditor
}, {
    key: 'radio',
    name: 'Radio',
    editor: RadioEditor
}];

function getComponentByKey(key: string) {
    return Components.find(k => k.key === key);
}

export { Components, getComponentByKey};