import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Input from './ui/Input';
import { InputElement } from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import Checkbox from './ui/Checkbox';
import { CheckboxElement } from './ui/Checkbox';
import ColorPicker from './ui/ColorPicker';
import { ColorPickerElement } from './ui/ColorPicker';
import Icon from './ui/Icon';
import Radio from './ui/Radio';
import SwitchToggle from './ui/SwitchToggle';
import { SwitchToggleElement } from './ui/SwitchToggle';
import Slider from './ui/Slider';
import { SliderElement } from './ui/Slider';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

export {
    Input,
    InputElement,
    Select,
    Button,
    Checkbox,
    ColorPicker,
    Icon,
    Radio,
    Slider,
    CheckboxElement,
    ColorPickerElement,
    SwitchToggle,
    SwitchToggleElement,
    SliderElement,
};