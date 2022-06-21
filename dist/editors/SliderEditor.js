"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CheckboxEditor;

var _react = _interopRequireWildcard(require("react"));

var _EditorBuilder = _interopRequireDefault(require("./EditorBuilder"));

var _Slider = _interopRequireDefault(require("../ui/Slider"));

var _types = require("../types");

var _hooks = require("../hooks");

var _commons = require("./commons");

var _colors = require("../constants/colors");

var _config = require("../ui/Input/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getEditor = function getEditor(props) {
  var editorJson = [{
    type: 'input',
    default: 'Label',
    label: 'Label',
    prop: 'label'
  }, {
    type: 'color',
    default: _colors.allColors['Dim Gray'],
    label: 'Color',
    prop: 'cursorColor'
  }, {
    type: 'checkbox',
    default: false,
    label: 'Simple Element',
    prop: 'simpleElement'
  }, (0, _commons.lengthEditor)(_types.ElementLength.l)]; // max/min

  editorJson.push({
    type: 'input',
    inputType: _config.InputTypes.number,
    label: 'Max',
    prop: 'max',
    default: 100
  }, {
    type: 'input',
    label: 'Min',
    inputType: _config.InputTypes.number,
    prop: 'min',
    default: 0
  }, {
    type: 'input',
    label: 'Step',
    inputType: _config.InputTypes.number,
    prop: 'step',
    default: 20
  }, {
    type: 'toggle',
    label: 'Show value',
    prop: 'showValue',
    default: true
  }, {
    type: 'toggle',
    label: 'Show value tooltip',
    prop: 'showTooltip',
    default: true
  });

  if (props.simpleElement) {
    editorJson.push(_commons.labelPositionEditor, _commons.alignPositionEditor);
  } else {
    editorJson.push(_commons.shadowEditor);
  }

  return editorJson;
};

function CheckboxEditor() {
  return function CheckboxEditorFn() {
    var _useEditorInit = (0, _hooks.useEditorInit)(_Slider.default.defaultProps),
        onChangeProp = _useEditorInit.onChangeProp,
        sliderProps = _useEditorInit.props;

    var editorJson = getEditor(sliderProps);
    var max = sliderProps.max || sliderProps.max === 0 ? sliderProps.max.toString() : '0';
    var parsedMax = parseFloat(max);
    var min = sliderProps.min || sliderProps.min === 0 ? sliderProps.min.toString() : '0';
    var parsedMin = parseFloat(min);
    var step = sliderProps.step || sliderProps.step === 0 ? sliderProps.step.toString() : '0';
    var parsedStep = parseFloat(step);
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_commons.ElementContainer, null, /*#__PURE__*/_react.default.createElement(_Slider.default, _extends({}, sliderProps, {
      max: parsedMax,
      min: parsedMin,
      step: parsedStep,
      value: sliderProps.value
    }))), /*#__PURE__*/_react.default.createElement(_EditorBuilder.default, {
      json: editorJson,
      onChange: onChangeProp
    }));
  };
}