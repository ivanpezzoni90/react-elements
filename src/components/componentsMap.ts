import InputEditor from '../editors/InputEditor';
import SelectEditor from '../editors/SelectEditor';
import CheckboxEditor from '../editors/CheckboxEditor';
import SwitchToggleEditor from '../editors/SwitchToggleEditor';
import IconEditor from '../editors/IconEditor';
import ColorPickerEditor from '../editors/ColorPickerEditor';
import ButtonEditor from '../editors/ButtonEditor';
import RadioEditor from '../editors/RadioEditor';
import SliderEditor from '../editors/SliderEditor';
import SpinnerEditor from '../editors/SpinnerEditor';
import ModalEditor from '../editors/ModalEditor';
import RatingEditor from '../editors/RatingEditor';
import BadgeEditor from '../editors/BadgeEditor';

import { Component } from '../lib/types';
import ButtonGroupEditor from '../editors/ButtonGroupEditor';

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
}, {
    key: 'slider',
    name: 'Slider',
    editor: SliderEditor
}, {
    key: 'spinner',
    name: 'Spinner',
    editor: SpinnerEditor
}, {
    key: 'modal',
    name: 'Modal',
    editor: ModalEditor
}, {
    key: 'rating',
    name: 'Rating',
    editor: RatingEditor
}, {
    key: 'badge',
    name: 'Badge',
    editor: BadgeEditor
}, {
    key: 'buttonGroup',
    name: 'Button Group',
    editor: ButtonGroupEditor
}];

function getComponentByKey(key: string) {
    return Components.find(k => k.key === key);
}

export { Components, getComponentByKey};