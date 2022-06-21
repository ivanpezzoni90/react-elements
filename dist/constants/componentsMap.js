"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Components = void 0;
exports.getComponentByKey = getComponentByKey;

var _InputEditor = _interopRequireDefault(require("../editors/InputEditor"));

var _SelectEditor = _interopRequireDefault(require("../editors/SelectEditor"));

var _CheckboxEditor = _interopRequireDefault(require("../editors/CheckboxEditor"));

var _ElementEditor = _interopRequireDefault(require("../editors/ElementEditor"));

var _SwitchToggleEditor = _interopRequireDefault(require("../editors/SwitchToggleEditor"));

var _IconEditor = _interopRequireDefault(require("../editors/IconEditor"));

var _ColorPickerEditor = _interopRequireDefault(require("../editors/ColorPickerEditor"));

var _ButtonEditor = _interopRequireDefault(require("../editors/ButtonEditor"));

var _RadioEditor = _interopRequireDefault(require("../editors/RadioEditor"));

var _SliderEditor = _interopRequireDefault(require("../editors/SliderEditor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Components = [{
  key: 'input',
  name: 'Input',
  editor: _InputEditor.default
}, {
  key: 'select',
  name: 'Select',
  editor: _SelectEditor.default
}, {
  key: 'checkbox',
  name: 'Checkbox',
  editor: _CheckboxEditor.default
}, {
  key: 'element',
  name: 'Element',
  editor: _ElementEditor.default
}, {
  key: 'switchToggle',
  name: 'Toggle',
  editor: _SwitchToggleEditor.default
}, {
  key: 'icon',
  name: 'Icon',
  editor: _IconEditor.default
}, {
  key: 'colorPicker',
  name: 'Color',
  editor: _ColorPickerEditor.default
}, {
  key: 'button',
  name: 'Button',
  editor: _ButtonEditor.default
}, {
  key: 'radio',
  name: 'Radio',
  editor: _RadioEditor.default
}, {
  key: 'slider',
  name: 'Slider',
  editor: _SliderEditor.default
}];
exports.Components = Components;

function getComponentByKey(key) {
  return Components.find(function (k) {
    return k.key === key;
  });
}