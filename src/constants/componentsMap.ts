import InputEditor from '../editors/InputEditor';
import SelectEditor from '../editors/SelectEditor';
import CheckboxEditor from '../editors/CheckboxEditor';
import ElementEditor from '../editors/ElementEditor';
import SwitchToggleEditor from '../editors/SwitchToggleEditor';

import { Component } from '../types';


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
    name: 'Switch Toggle',
    editor: SwitchToggleEditor
}];

function getComponentByKey(key: string) {
    return Components.find(k => k.key === key);
}

export { Components, getComponentByKey};